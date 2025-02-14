"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/jwt";
import { handleError } from "@/lib/server-utils";
import { UserServerResponse } from "@/types/user.type";
import { actionClient } from "@/lib/safe.action";
import {
  accountFormSchema,
  passwordFormSchema,
  removeFromWatchlistSchema,
  watchlistSchema,
} from "@/schema/user.account.schema";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { ROUTES } from "@/constants";
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

export const getWatchlistByUserId = async (userId: string) => {
  try {
    const watchlist = await prisma.savedMovie.findMany({
      where: { userId },
      select: {
        imdbId: true,
        title: true,
        poster: true,
        year: true,
        type: true,
      },
    });
    if (!watchlist) {
      return [];
    }

    return watchlist;
  } catch (error) {
    handleError(error);
  }
};

export const addToWatchlist = actionClient
  .schema(watchlistSchema)
  .action(
    async ({ parsedInput: { userId, imdbId, title, poster, year, type } }) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      const existingWatchlist = await prisma.savedMovie.findUnique({
        where: {
          userId_imdbId: {
            userId,
            imdbId,
          },
        },
      });

      if (existingWatchlist) {
        return { success: false, message: "Item already in watchlist" };
      }

      await prisma.savedMovie.create({
        data: {
          userId,
          imdbId,
          title,
          poster,
          year,
          type,
        },
      });

      revalidatePath(ROUTES.WATCHLIST);
      return { success: true, message: "Item added to watchlist" };
    }
  );

export const removeFromWatchlist = actionClient
  .schema(removeFromWatchlistSchema)
  .action(async ({ parsedInput: { userId, imdbId } }) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    await prisma.savedMovie.delete({
      where: {
        userId_imdbId: {
          userId,
          imdbId,
        },
      },
    });

    revalidatePath(ROUTES.WATCHLIST);
    return { success: true, message: "Item removed from watchlist" };
  });
