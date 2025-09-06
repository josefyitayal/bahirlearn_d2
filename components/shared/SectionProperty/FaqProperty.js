
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";
import { PlusCircle, Trash2 } from "lucide-react"

export function FaqProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleItemChange = (index, field, value) => {
    const newItems = [...(section.content?.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    updateProperty(section.id, {
      content: { ...section.content, items: newItems },
    })
  }

  const addItem = () => {
    const newItems = [
      ...(section.content?.items || []),
      { question: "New question?", answer: "New answer goes here." },
    ]
    updateProperty(section.id, {
      content: { ...section.content, items: newItems },
    })
  }

  const removeItem = (index) => {
    const newItems = (section.content?.items || []).filter((_, i) => i !== index)
    updateProperty(section.id, {
      content: { ...section.content, items: newItems },
    })
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-4">
        <Label>FAQ Items</Label>
        {section.content?.items?.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 flex flex-col gap-3">
            <div>
              <Label htmlFor={`question-${index}`}>Question</Label>
              <Input
                id={`question-${index}`}
                value={item.question || ""}
                onChange={(e) => handleItemChange(index, "question", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`answer-${index}`}>Answer</Label>
              <Textarea
                id={`answer-${index}`}
                value={item.answer || ""}
                onChange={(e) => handleItemChange(index, "answer", e.target.value)}
              />
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(index)}
              className="self-end mt-2"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={addItem} variant="outline" className="mt-2">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </div>
    </div>
  )
}
