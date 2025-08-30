"use server"

import { client } from "@/lib/db";

export const getAllTemplate = async () => {
  try {
    const dbTemplate = await client.template.findMany();

    if (dbTemplate) {
      return {
        errors: null,
        data: dbTemplate
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
