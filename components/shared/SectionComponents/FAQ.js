
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ({ sectionData, ...props }) {
  return (
    <section {...props} className="w-full px-6 py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-6 text-left">
          {sectionData.items.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
