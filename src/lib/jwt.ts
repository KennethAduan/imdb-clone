import { config } from "@/config/environment";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = config.auth.jwt.secret;
const encodedKey = new TextEncoder().encode(secretKey);

interface SessionPayload {
  SESSION_EXPIRY?: Date;
  expires?: Date;
  userId: string;
  email: string;
}

async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: config.auth.jwt.algorithm })
    .setIssuedAt()
    .setExpirationTime(config.auth.jwt.expiresIn)
    .sign(encodedKey);
}

async function decrypt(input: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(input, encodedKey, {
    algorithms: [config.auth.jwt.algorithm],
  });
  return payload as unknown as SessionPayload;
}

async function getSession(): Promise<SessionPayload | null> {
  if (!config.auth.jwt.sessionName) return null;

  const session = (await cookies()).get(config.auth.jwt.sessionName)?.value;
  if (!session) return null;

  return decrypt(session);
}

async function refreshSession(
  request: NextRequest
): Promise<NextResponse | null> {
  const expiryTime = config.auth.jwt.expiresIn;
  if (!config.auth.jwt.sessionName || !expiryTime) return null;

  const session = request.cookies.get(config.auth.jwt.sessionName)?.value;
  if (!session) return null;

  const parsed = await decrypt(session);
  const expiryDate = new Date(Date.now() + Number(expiryTime));
  parsed.SESSION_EXPIRY = expiryDate;
  parsed.expires = expiryDate;

  const res = NextResponse.next();
  res.cookies.set({
    name: config.auth.jwt.sessionName,
    value: await encrypt(parsed),
    httpOnly: true,
    expires: expiryDate,
  });

  return res;
}

export { getSession, refreshSession, encrypt, decrypt };
