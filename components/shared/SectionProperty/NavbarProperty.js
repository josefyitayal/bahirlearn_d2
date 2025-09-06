"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function NavbarProperty({ section }) {
  const updateLayoutSection = useWebsiteBuilder((state) => state.updateLayoutSection)

  const handleChange = (field, value) => {
    updateLayoutSection(section.type, section.id, {
      content: {
        ...section.content,
        [field]: value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="navbar-position">Navbar Position</Label>
        <Select
          id="navbar-position"
          value={section.content.is_sticky ? "sticky" : "scrollable"}
          onValueChange={(val) => handleChange("is_sticky", val === "sticky")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sticky">Sticky</SelectItem>
            <SelectItem value="scrollable">Scrollable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="link-alignment">Link Alignment</Label>
        <Select
          id="link-alignment"
          value={section.content.links_alignment}
          onValueChange={(val) => handleChange("links_alignment", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Link Alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="start">Start</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="end">End</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}