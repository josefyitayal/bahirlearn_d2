"use server"

import { clerkClient, auth, currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/db";
import { onboardingFormSchema } from "../schema/onboarding-schema";

export const createUser = async (name, subdomain, description) => {
  try {
    const { userId } = await auth(); // safer than currentUser()
    if (!userId) {
      throw new Error("User not authorized");
    }

    const clearSubdomain = subdomain.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-")

    const validatedFields = onboardingFormSchema.safeParse({
      name: name,
      description: description,
      subdomain: clearSubdomain,
    });

    if (!validatedFields.success) {
      return {
        errors: {
          message: validatedFields.error.message,
          data: null
        }
      }
    }
    console.log(validatedFields, "validatedFields")
    const existingWebsite = await client.website.findUnique({
      where: {
        subdomain: validatedFields.data.subdomain,
      },
    });

    if (existingWebsite) {
      return {
        errors: {
          message: "Subdomain is already taken",
        },
        data: null,
      };
    }

    const defaultTemplate = await client.template.findFirst({
      where: {
        name: "Default",
        price: 0
      },
      orderBy: {
        created_at: "asc",
      },
      include: {
        page: true,
      }
    });
    if (!defaultTemplate) throw new Error("No Default template found");

    const clerkUser = await currentUser();

    const dbUser = await client.user.upsert({
      where: {
        clerk_id: userId,
      },
      update: {}, // Don't update if user exists
      create: {
        clerk_id: userId,
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        email: clerkUser.emailAddresses[0].emailAddress,
        profile_picture: clerkUser.imageUrl,

        website: {
          create: {
            name: validatedFields.data.name,
            description: validatedFields.data.description,
            subdomain: validatedFields.data.subdomain
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
              .replace(/-+/g, "-"),
            template_id: defaultTemplate.id,
            theme: defaultTemplate.theme,
            layer_section: defaultTemplate.layer_section
          },
        },
      },
      include: {
        website: true,
      },
    });

    const website = dbUser.website[0];

    // 3. Clone template pages to the website
    if (website && defaultTemplate.pages.length > 0) {
      await client.page.createMany({
        data: defaultTemplate.page.map((page) => ({
          name: page.name,
          slug: page.slug,
          section: page.section,
          is_system: page.is_system,
          website_id: website.id,
        })),
      });
    }

    const clerkClientVariable = await clerkClient();

    if (dbUser) {
      const res = await clerkClientVariable.users.updateUser(userId, {
        publicMetadata: {
          onboardingComplete: true,
        },
      });
      if (res) {
        return {
          errors: null,
          data: dbUser,
        };
      }else {
        return {
          errors: {
            message: "clerk onboarding changing field"
          },
          data: null
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      errrors: {
        message: "Something went wrong",
        data: null
      }
    }
  }
}
