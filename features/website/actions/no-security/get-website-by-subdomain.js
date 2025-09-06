"use server"

import { client } from "@/lib/db";
import { cache } from 'react'

export const getWebsiteBySubdomain = cache(async (subdomain) => {
    try {
        const dbWebsite = await client.website.findUnique({
            where: { subdomain },
            select: {
                name: true,
                description: true,
                subdomain: true,
                logo: true,
                is_published: true,
                theme: true,
                layer_section: true,
                section: true,
                template: {
                    select: {
                        id: true,
                        // add other safe template fields here
                    }
                },
                created_at: true,
                updated_at: true
            }
        });


        if (dbWebsite) {
            return {
                errors: null,
                data: dbWebsite,
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
})
