
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";
import { PlusCircle, Trash2 } from "lucide-react"

export function TestimonialsProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      content: {
        ...section.content,
        [field]: value,
      },
    })
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...(section.content?.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    updateProperty(section.id, {
      content: {
        ...section.content,
        items: newItems,
      },
    })
  }

  const addItem = () => {
    const newItems = [
      ...(section.content?.items || []),
      { author: "New Author", quote: "New testimonial goes here..." },
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
      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={section.content?.heading || ""}
          onChange={(e) => handleChange("heading", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="heading_alignment">Heading Alignment</Label>
        <Select
          id="heading_alignment"
          value={section.content?.heading_alignment}
          onValueChange={(val) => handleChange("heading_alignment", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <Label>Testimonials</Label>
        {section.content?.items?.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 flex flex-col gap-2">
            <div>
              <Label htmlFor={`author-${index}`}>Author</Label>
              <Input
                id={`author-${index}`}
                value={item.author || ""}
                onChange={(e) => handleItemChange(index, "author", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`quote-${index}`}>Quote</Label>
              <Textarea
                id={`quote-${index}`}
                value={item.quote || ""}
                onChange={(e) => handleItemChange(index, "quote", e.target.value)}
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
          Add Testimonial
        </Button>
      </div>
    </div>
  )
}
