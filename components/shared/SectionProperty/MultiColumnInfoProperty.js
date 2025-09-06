
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function MultiColumnInfoProperty({ section }) {
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
    handleChange("items", newItems)
  }

  const addItem = () => {
    handleChange("items", [
      ...(section.content?.items || []),
      { title: "New title", description: "New description" },
    ])
  }

  const removeItem = (index) => {
    const newItems = [...(section.content?.items || [])]
    newItems.splice(index, 1)
    handleChange("items", newItems)
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      {/* Heading */}
      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={section.content?.heading || ""}
          onChange={(e) => handleChange("heading", e.target.value)}
        />
      </div>

      {/* Alignment */}
      <div>
        <Label>Heading Alignment</Label>
        <Select
          value={section.content?.heading_alignment || "left"}
          onValueChange={(value) => handleChange("heading_alignment", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4">
        <Label>Columns</Label>
        {section.content?.items?.map((item, index) => (
          <div key={index} className="p-3 border rounded-lg flex flex-col gap-3">
            <div>
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                value={item.title}
                onChange={(e) => handleItemChange(index, "title", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`desc-${index}`}>Description</Label>
              <Textarea
                id={`desc-${index}`}
                value={item.description}
                onChange={(e) => handleItemChange(index, "description", e.target.value)}
              />
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button variant="outline" onClick={addItem}>
          + Add Column
        </Button>
      </div>
    </div>
  )
}
