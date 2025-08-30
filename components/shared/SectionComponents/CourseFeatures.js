import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

export function CourseFeatures({ sectionData, props }) {
  const { heading, features } = sectionData

  return (
    <section {...props} className="w-full px-6 py-12 bg-white">
      <div className="max-w-5xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-center">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <CheckCircle className="w-5 h-5 mt-1 text-green-500" />
              <div>
                <h4 className="font-semibold text-lg">{feature.title}</h4>
                {feature.description && (
                  <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
