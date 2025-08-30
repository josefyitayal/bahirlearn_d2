"use server"

import { client } from "@/lib/db";
import { clerkClient, auth, currentUser } from "@clerk/nextjs/server";

export const updateWebsiteStatus = async (status) => {
  try {
    const { userId } = await auth(); // safer than currentUser()
    if (!userId) {
      throw new Error("User not authorized");
    }

    const user = await client.user.findUnique({
      where: {clerk_id: userId}
    })

    const updatedWebsiteStatus = await client.website.update({
      where: user.website.id
    });

    if (updatedWebsiteStatus) {
      return {
        errors: null,
        data: updateWebsiteStatus,
      }
    } else {
      return {
        errors: {
          message: "There is no website accouding to subdomain"
        },
        data: null
      }
    }
  } catch (error) {
    console.error(error)
    return {
      errors: {
        message: "something went wrong"
      },
      data: null,
    }
  }
}
