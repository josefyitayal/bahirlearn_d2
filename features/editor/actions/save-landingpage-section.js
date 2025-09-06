"use server"

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";

export const saveLandingPageSection = async (sectionData, subdomain) => {
  try {
    const { userId } = await auth(); // safer than currentUser()
    if (!userId) {
      throw new Error("User not authorized");
    }

    const updated = await client.course.update({
      where: { subdomain: subdomain },
      update: {
        section: sectionData
      },
      create: {}
    });

    if (updated) {
      return { errors: null, data: updated };
    }else {
      return {
        errors: {
          message: "faild to update course"
        },
        data: null
      }
    }
  } catch(error) {
    console.error(error)
    return {
      errors: {
        message: "something went wrong"
      },
      data: null
    }
  }
}
