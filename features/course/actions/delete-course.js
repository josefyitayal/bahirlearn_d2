"use server"

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";

export const deleteCourse = async (courseId) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const deleted = await client.course.deleteMany({
      where: { id: courseId },
    }); // won't throw

    return { errors: null, data: deleted };
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
