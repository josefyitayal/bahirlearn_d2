"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function CourseListProperty({ section }) {
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
      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={section.data?.heading || ""}
          onChange={(e) => handleChange("heading", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="number">Number of Courses</Label>
        <Input
          type="number"
          id="number"
          min={1}
          value={section.data?.number || 1}
          onChange={(e) => handleChange("number", parseInt(e.target.value, 10))}
        />
      </div>

      <div>
        <Label htmlFor="theme">Theme</Label>
        <Select
          id="theme"
          value={section.data?.theme}
          onValueChange={(val) => handleChange("theme", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stacked">Stacked</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="carousel">Carousel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-muted-foreground">
        ⚡ Courses are fetched automatically from the database.  
        Use the fields above to configure how they’re displayed.
      </div>
    </div>
  )
}
