
import {Button} from "@/components/ui/button"

export function CallToAction({sectionData, props}) {
  const {heading, description, button_text} = sectionData;

  return (
    <div className="bg-primary text-primary-foreground flex flex-col items-center gap-5 rounded-md py-5">
      <h2 className="text-3xl font-bold text-center">{heading}</h2>
      <p className="text-center">{description}</p>
      <Button variant="secondary">{button_text}</Button>
    </div>
  )
}
