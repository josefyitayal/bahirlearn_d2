
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function CurriculumOverview({sectionData, props}) {
  return (
    <section {...props} className="w-full px-6 py-12 bg-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">{sectionData.heading}</h2>
        <p className="text-center text-muted-foreground">{sectionData.description}</p>

        <Accordion type="multiple" className="mt-6">
          {sectionData.modules.map((module, index) => (
            <AccordionItem key={index} value={`module-${index}`}>
              <AccordionTrigger className="text-lg font-medium">{module.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  {module.lessons.map((lesson, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      {lesson}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
