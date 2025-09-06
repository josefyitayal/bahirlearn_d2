"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function AboutInstructorProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  const handleSocialChange = (platform, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        social_links: {
          ...section.data?.social_links,
          [platform]: value,
        },
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={section.data?.heading || ""}
          onChange={(e) => handleChange("heading", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={section.data?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={section.data?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="bio_text">Bio</Label>
        <Textarea
          id="bio_text"
          value={section.data?.bio_text || ""}
          onChange={(e) => handleChange("bio_text", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          value={section.data?.image_url || ""}
          onChange={(e) => handleChange("image_url", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Social Links</Label>
        {["twitter", "linkedin", "github", "instagram", "youtube"].map((platform) => (
          <div key={platform}>
            <Label htmlFor={platform} className="capitalize">{platform}</Label>
            <Input
              id={platform}
              value={section.data?.social_links?.[platform] || ""}
              onChange={(e) => handleSocialChange(platform, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

