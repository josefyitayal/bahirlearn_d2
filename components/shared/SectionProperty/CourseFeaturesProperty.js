"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";
import { PlusCircle, Trash2 } from "lucide-react"

export function CourseFeaturesProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...(section.data?.features || [])]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    updateProperty(section.id, {
      data: {
        ...section.data,
        features: newFeatures,
      },
    })
  }

  const addFeature = () => {
    const newFeatures = [
      ...(section.data?.features || []),
      { title: "New Feature", description: "Description goes here..." },
    ]
    updateProperty(section.id, {
      data: { ...section.data, features: newFeatures },
    })
  }

  const removeFeature = (index) => {
    const newFeatures = (section.data?.features || []).filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: { ...section.data, features: newFeatures },
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

      <div className="flex flex-col gap-4">
        <Label>Features</Label>
        {section.data?.features?.map((feature, index) => (
          <div key={index} className="border rounded-xl p-4 flex flex-col gap-2 relative">
            <div>
              <Label htmlFor={`feature-title-${index}`}>Title</Label>
              <Input
                id={`feature-title-${index}`}
                value={feature.title || ""}
                onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`feature-desc-${index}`}>Description</Label>
              <Textarea
                id={`feature-desc-${index}`}
                value={feature.description || ""}
                onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
              />
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFeature(index)}
              className="self-end mt-2"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={addFeature} variant="outline" className="mt-2">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>
    </div>
  )
}
