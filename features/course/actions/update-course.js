"use server"

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";

export const updateCourse = async (courseId, { name, description, price, thumbnail }) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const updated = await client.course.update({
      where: { id: courseId },
      data: {
        name,
        description,
        price,
        thumbnail,
        updated_at: new Date(),
      },
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
  } catch (error) {
    console.error(error)
    return {
      errors: {
        message: "something went wrong"
      },
      data: null
    }
  }
}
