
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";
import { PlusCircle, Trash2 } from "lucide-react"

export function StatsSectionProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleStatChange = (index, field, value) => {
    const newStats = [...(section.content?.stats || [])]
    newStats[index] = { ...newStats[index], [field]: value }
    updateProperty(section.id, { content: { ...section.content, stats: newStats } })
  }

  const addStat = () => {
    const newStats = [...(section.content?.stats || []), { value: "New", label: "New Label" }]
    updateProperty(section.id, { content: { ...section.content, stats: newStats } })
  }

  const removeStat = (index) => {
    const newStats = [...(section.content?.stats || [])]
    newStats.splice(index, 1)
    updateProperty(section.id, { content: { ...section.content, stats: newStats } })
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <Label>Stats</Label>
      {section.content?.stats?.map((stat, index) => (
        <div key={index} className="border rounded-xl p-4 flex flex-col gap-3">
          <div>
            <Label htmlFor={`stat-value-${index}`}>Value</Label>
            <Input
              id={`stat-value-${index}`}
              value={stat.value}
              onChange={(e) => handleStatChange(index, "value", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`stat-label-${index}`}>Label</Label>
            <Input
              id={`stat-label-${index}`}
              value={stat.label}
              onChange={(e) => handleStatChange(index, "label", e.target.value)}
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeStat(index)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Remove
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={addStat} className="mt-2">
        <PlusCircle className="h-4 w-4 mr-1" /> Add Stat
      </Button>
    </div>
  )
}
