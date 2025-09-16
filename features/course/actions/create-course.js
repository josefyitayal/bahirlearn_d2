"use server"

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";
import { courseFormSchema } from "../schema/courseFormSchema";
import slug from "slug"

export const createCourse = async (name, description, price, thumbnail) => {
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
        website: true,
      },
    });

    if (dbUser) {
      const validatedFields = courseFormSchema.safeParse({
        name: name,
        description: description,
        price: price,
        thumbnail: thumbnail,
      });
      if (!validatedFields.success) {
        return {
          errors: {
            message: validatedFields.error.message
          },
          data: null
        }
      }
      const dbCourse = await client.course.create({
        data: {
          name: validatedFields.data.name,
          description: validatedFields.data.description,
          thumbnail: validatedFields.data.thumbnail,
          price: validatedFields.data.price,
          slug: slug(validatedFields.data.name), 
          website_id: dbUser.website.id,
        },
      });
      if (dbCourse) {
        return {
          errors: null,
          data: dbCourse,
        };
      } else {
        return {
          errors: {
            message: "Failed to create course",
          },
          data: null,
        };
      }
    } else {
      return {
        errors: {
          message: "There is no website associate for the user",
        },
        data: null,
      };
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
