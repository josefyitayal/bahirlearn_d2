"use server"

import { client } from "@/lib/db";
import {auth} from "@clerk/nextjs/server";

export const getUserSection = async () => {
  try {
    const { userId } = await auth(); // safer than currentUser()
    if (!userId) {
      throw new Error("User not authorized");
    }

    const dbUser = await client.user.findUnique({
      where: { clerk_id: userId },
      include: {
        website: true, 
      },
    });

    if (dbUser) {
      return {
        errors: null,
        data: dbUser.website,
      };
    } else {
      return {
        errors: {
          message: "There is no website",
        },
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      errors: {
        message:
          "something went wrong",
      },
      data: null,
    };
  }
}
