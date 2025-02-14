"use server";

import { config } from "@/config/environment";
import { encrypt } from "@/lib/jwt";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe.action";
import { signUpSchema, signInSchema } from "@/schema/auth.schema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, username, password } }) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, name: username, password: hashedPassword },
    });

    const token = await encrypt({ userId: newUser.id, email: newUser.email });

    (await cookies()).set(config.auth.jwt.sessionName, token, {
      expires: new Date(Date.now() + Number(config.auth.jwt.expiresIn)),
      httpOnly: true,
    });

    return { success: true, message: "User created successfully" };
  });

export const signInAction = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid credentials" };
    }

    const token = await encrypt({ userId: user.id, email: user.email });

    (await cookies()).set(config.auth.jwt.sessionName, token, {
      expires: new Date(Date.now() + Number(config.auth.jwt.expiresIn)),
      httpOnly: true,
    });

    return { success: true, message: "User signed in successfully" };
  });

export const signOutAction = actionClient.action(async () => {
  try {
    (await cookies()).delete(config.auth.jwt.sessionName);
    return { success: true, message: "User signed out successfully" };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, message: "Failed to sign out" };
  }
});
