"use client"

import { onboardingFormSchema } from "@/features/auth/schema/onboarding-schema"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {zodResolver} from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createUser } from "@/features/auth/actions/create-user"
import { toast } from "sonner"
import { redirect } from "next/navigation"

export default function OnboardingPage() {
  const form = useForm({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      name: "",
      description: "",
      subdomain: ""
    }
  })

  async function onSubmit(values) {
    const {name, description, subdomain} = values;
    const {errors, data} = await createUser(name, subdomain, description)

    if (errors) {
      toast(errors.message)
    }
    if (data) {
      redirect(`/dashboard`)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 bg-muted/40">
      <Card className="w-full max-w-xl shadow-xl rounded-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">Create Your Website</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Start building your store by setting up your first website.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Acme Store" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Your public-facing website name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subdomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Subdomain</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. acme" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Will be accessible at: acme.yourdomain.com
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Brief summary of your website" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Helps visitors understand what your site is about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Create Website</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
