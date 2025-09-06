"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";
import { Switch } from "@/components/ui/switch";


export function FooterProperty({ section }) {
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
        <Label htmlFor="copyright_text">Copyright Text</Label>
        <Input
          id="copyright_text"
          value={section.content?.copyright_text || ""}
          onChange={(e) => handleChange("copyright_text", e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Show Social Links</Label>
        <Switch
          checked={section.content?.show_social_links}
          onCheckedChange={(val) => handleChange("show_social_links", val)}
        />
      </div>
    </div>
  )
}