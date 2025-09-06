"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function CountdownTimerProperty({ section }) {
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
    <div className="w-full flex flex-col gap-6 p-4">
      {/* Heading */}
      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={section.data?.heading || ""}
          onChange={(e) => handleChange("heading", e.target.value)}
        />
      </div>

      {/* Heading Alignment */}
      <div>
        <Label htmlFor="heading_alignment">Heading Alignment</Label>
        <Select
          id="heading_alignment"
          value={section.data?.heading_alignment || "center"}
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

      {/* Subtext */}
      <div>
        <Label htmlFor="subtext">Subtext</Label>
        <Textarea
          id="subtext"
          value={section.data?.subtext || ""}
          onChange={(e) => handleChange("subtext", e.target.value)}
        />
      </div>

      {/* Target Date */}
      <div>
        <Label htmlFor="targetDate">Target Date</Label>
        <Input
          type="datetime-local"
          id="targetDate"
          value={
            section.data?.targetDate
              ? new Date(section.data.targetDate).toISOString().slice(0, 16)
              : ""
          }
          onChange={(e) => handleChange("targetDate", new Date(e.target.value).toISOString())}
        />
      </div>
    </div>
  )
}

