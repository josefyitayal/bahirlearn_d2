
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function CallToActionProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      content: {
        ...section.content,
        [field]: value,
      },
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={section.content?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="button_text">Button Text</Label>
        <Input
          id="button_text"
          value={section.content?.button_text || ""}
          onChange={(e) => handleChange("button_text", e.target.value)}
        />
      </div>
    </div>
  )
}
