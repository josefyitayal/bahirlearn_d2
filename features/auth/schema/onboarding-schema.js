import {z} from "zod"

export const onboardingFormSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string().min(10).max(300),
  subdomain: z.string().min(3, "Subdomain should be at least 3 characters long")
})
