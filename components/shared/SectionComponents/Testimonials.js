
import {Quote} from "lucide-react"
import { cn } from "@/lib/utils"

export function Testimonials({ sectionData, ...props }) {
  return (
    <section {...props} className="w-full px-6 py-12 bg-white">
      <div className="max-w-4xl mx-auto space-y-8 text-center">
        <h2 className={cn("text-3xl font-bold", `text-${sectionData.heading_alignment}`)}>
          {sectionData.heading}
        </h2>
        <div className="space-y-6">
          {sectionData.items.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow-sm border relative"
            >
              <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary opacity-20" />
              <p className="text-lg font-medium italic text-gray-800">"{testimonial.quote}"</p>
              <p className="mt-4 text-sm text-gray-500">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
