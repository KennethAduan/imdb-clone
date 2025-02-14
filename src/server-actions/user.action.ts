"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/jwt";
import { handleError } from "@/lib/server-utils";
import { UserServerResponse } from "@/types/user.type";
import { actionClient } from "@/lib/safe.action";
import {
  accountFormSchema,
  passwordFormSchema,
} from "@/schema/user.account.schema";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
export const getUserAction = async () => {
  try {
    const auth = await getSession();
    const user = await prisma.user.findUnique({
      where: { id: auth?.userId },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: user } as UserServerResponse;
  } catch (error) {
    handleError(error);
  }
};

export const updateAccountAction = actionClient
  .schema(accountFormSchema)
  .action(async ({ parsedInput: { email, username } }) => {
    const user = await prisma.user.update({
      where: { email },
      data: { name: username },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    revalidatePath("/profile");
    return { success: true, message: "User updated successfully" };
  });

export const updatePasswordAction = actionClient
  .schema(passwordFormSchema)
  .action(async ({ parsedInput: { email, currentPassword, newPassword } }) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    const checkPassword = await bcrypt.compare(
      currentPassword,
      user?.password ?? ""
    );

    if (!checkPassword) {
      return { success: false, message: "Invalid current password" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    if (!updatedUser) {
      return { success: false, message: "Failed to update password" };
    }

    revalidatePath("/profile");
    return { success: true, message: "Password updated successfully" };
  });
