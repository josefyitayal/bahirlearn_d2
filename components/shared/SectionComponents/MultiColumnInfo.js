import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

export function MultiColumnInfo({ sectionData, ...props }) {
  const { heading, heading_alignment, items } = sectionData

  return (
    <section {...props} className="w-full px-4 py-12">
      {heading && (
        <h2 className={cn(
          "text-3xl font-bold mb-10",
          heading_alignment === "center" ? "text-center" : heading_alignment === "right" ? "text-right" : "text-left"
        )}>
          {heading}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items?.map((item, index) => {
          const Icon = Icons[item.icon] || Icons["Circle"]
          return (
            <Card key={index} className="h-full text-center p-6 shadow-md">
              <CardContent className="flex flex-col items-center gap-4">
                <Icon className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
