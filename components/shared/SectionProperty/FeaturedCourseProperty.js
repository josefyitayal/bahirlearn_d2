
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function FeaturedCourseProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  const handleItemChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        item: {
          ...section.data?.item,
          [field]: value,
        },
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

      {/* Heading alignment */}
      <div>
        <Label htmlFor="heading_alignment">Heading Alignment</Label>
        <Select
          id="heading_alignment"
          value={section.data?.heading_alignment}
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

      {/* Theme */}
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
            <SelectItem value="list">List</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="highlight">Highlight</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pricing toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="pricing">Show Pricing</Label>
        <Switch
          id="pricing"
          checked={!!section.data?.pricing}
          onCheckedChange={(val) => handleChange("pricing", val)}
        />
      </div>

      {/* Item fields */}
      <div className="border rounded-xl p-4 flex flex-col gap-4">
        <Label>Featured Item</Label>

        <div>
          <Label htmlFor="item-image">Image</Label>
          <Input
            id="item-image"
            value={section.data?.item?.image || ""}
            onChange={(e) => handleItemChange("image", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="item-title">Title</Label>
          <Input
            id="item-title"
            value={section.data?.item?.title || ""}
            onChange={(e) => handleItemChange("title", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="item-description">Description</Label>
          <Textarea
            id="item-description"
            value={section.data?.item?.description || ""}
            onChange={(e) => handleItemChange("description", e.target.value)}
          />
        </div>

        {section.data?.pricing && (
          <div>
            <Label htmlFor="item-price">Price</Label>
            <Input
              type="number"
              id="item-price"
              value={section.data?.item?.price || ""}
              onChange={(e) => handleItemChange("price", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
