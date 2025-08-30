
"use server"

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";

export const getCourseById = async (courseId) => {
  try {
    const { userId } = await auth(); // safer than currentUser()
    if (!userId) {
      throw new Error("User not authorized");
    }

    const dbUser = await client.user.findUnique({
      where: {
        clerk_id: userId,

      },
      include: {
        website: {
          include: {
            course: {
              where: {
                id: courseId
              },
              include: {
                module: true
              }
            }
          },
        },
      },
    });
    if (dbUser.website) {
      return {
        errors: null,
        data: dbUser.website.course,
      };
    } else {
      return {
        errors: {
          message: "There is no website associated with user website",
        },
        data: null,
      };
    }
  }catch(error) {
    console.error(error)
    return {
      errors: {
        message: "something went wrong"
      },
      data: null
    }
  }
}
