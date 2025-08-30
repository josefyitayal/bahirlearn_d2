import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"


export function FeaturedCourse({ sectionData, ...props }) {
  const { theme, heading, heading_alignment, pricing, item } = sectionData

  return (
    <section {...props} className="w-full px-4 py-8">
      {heading && (
        <h2 className={`text-3xl font-bold mb-6 text-${heading_alignment || "left"}`}>
          {heading}
        </h2>
      )}

      {theme === "list" ? (
        <Card className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-5xl mx-auto">
          <div className="w-full md:w-1/2 h-64 relative">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 py-4 space-y-4">
            <CardTitle className="text-2xl font-semibold">{item.title}</CardTitle>
            <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
            <p className={cn("text-lg font-semibold text-primary", `${pricing ? "block" : "hidden" }` )}>price: {item.price}</p>
            <Link href={item.ctaLink || "#"} passHref>
              <Button>Learn More</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md border text-center bg-white">
          {/* Image */}
          <div className="relative w-full h-48">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-snug line-clamp-3">{item.description}</p>

            <p className={cn("text-lg font-semibold text-primary", `${pricing ? "block" : "hidden" }` )}>${item.price}</p>

            {/* CTA */}
            <Link href={item.ctaLink || "#"} passHref>
              <Button className="w-full mt-3">Learn More</Button>
            </Link>
          </div>
        </div>

      )}
    </section>
  )
}
