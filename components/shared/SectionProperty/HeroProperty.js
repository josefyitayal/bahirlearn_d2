"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function HeroProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="headline">Headline</Label>
        <Input
          id="headline"
          value={section.data?.headline || ""}
          onChange={(e) => handleChange("headline", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="subtext">Subtext</Label>
        <Input
          id="subtext"
          value={section.data?.subtext || ""}
          onChange={(e) => handleChange("subtext", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="cta_text">CTA Text</Label>
        <Input
          id="cta_text"
          value={section.data?.cta_text || ""}
          onChange={(e) => handleChange("cta_text", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="cta_link">CTA Link</Label>
        <Input
          id="cta_link"
          value={section.data?.cta_link || ""}
          onChange={(e) => handleChange("cta_link", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="image">Image Path</Label>
        <Input
          id="image"
          value={section.data?.image || ""}
          onChange={(e) => handleChange("image", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="image_position">Image Position</Label>
        <Select
          id="image_position"
          value={section.data?.image_position}
          onValueChange={(val) => handleChange("image_position", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select image position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="background">Background</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
