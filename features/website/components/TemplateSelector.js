"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Album } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllTemplate } from "@/features/template/actions/get-all-template"
import { toast } from "sonner"

export function TemplateSelector() {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    async function getData() {
      const { errors, data } = await getAllTemplate()
      if (errors) {
        toast(errors.message)
      }
      setTemplates(data)
    }
    getData()
  }, [])

  if (templates.length === 0) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="px-4 py-6 border border-border rounded-xl shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 rounded-md bg-primary text-white">
          <Album size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Popular Templates</h2>
          <p className="text-muted-foreground text-sm">
            Explore free templates – no coding required
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((temp) => (
          <Card
            key={temp.id}
            className="transition-transform hover:scale-[1.015] hover:shadow-lg"
          >
            <CardContent className="p-0">
              <Image
                src={temp.thumbnail}
                alt={temp.name}
                width={400}
                height={300}
                className="w-full h-[200px] object-cover rounded-t-md"
              />
            </CardContent>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{temp.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                {temp.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="px-4 pb-4">
              <Button className="w-full" onClick={() => handleUseTemplate()}>
                Use
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
