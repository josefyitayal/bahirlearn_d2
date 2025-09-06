
"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";
import { PlusCircle, Trash2 } from "lucide-react"

export function CurriculumOverviewProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      content: {
        ...section.content,
        [field]: value,
      },
    })
  }

  const handleModuleChange = (moduleIndex, field, value) => {
    const newModules = [...(section.content?.modules || [])]
    newModules[moduleIndex] = { ...newModules[moduleIndex], [field]: value }
    handleChange("modules", newModules)
  }

  const handleLessonChange = (moduleIndex, lessonIndex, value) => {
    const newModules = [...(section.content?.modules || [])]
    newModules[moduleIndex].lessons[lessonIndex] = value
    handleChange("modules", newModules)
  }

  const addModule = () => {
    handleChange("modules", [
      ...(section.content?.modules || []),
      { title: "New Module", lessons: ["New Lesson"] },
    ])
  }

  const removeModule = (index) => {
    const newModules = [...(section.content?.modules || [])]
    newModules.splice(index, 1)
    handleChange("modules", newModules)
  }

  const addLesson = (moduleIndex) => {
    const newModules = [...(section.content?.modules || [])]
    newModules[moduleIndex].lessons.push("New Lesson")
    handleChange("modules", newModules)
  }

  const removeLesson = (moduleIndex, lessonIndex) => {
    const newModules = [...(section.content?.modules || [])]
    newModules[moduleIndex].lessons.splice(lessonIndex, 1)
    handleChange("modules", newModules)
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

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={section.content?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Modules */}
      <div className="flex flex-col gap-4">
        <Label>Modules</Label>
        {section.content?.modules?.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label>Module {moduleIndex + 1} Title</Label>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeModule(moduleIndex)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Remove Module
              </Button>
            </div>
            <Input
              value={module.title}
              onChange={(e) => handleModuleChange(moduleIndex, "title", e.target.value)}
            />

            {/* Lessons */}
            <div className="flex flex-col gap-2 mt-2">
              <Label>Lessons</Label>
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="flex items-center gap-2">
                  <Input
                    value={lesson}
                    onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, e.target.value)}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLesson(moduleIndex, lessonIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addLesson(moduleIndex)}
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Lesson
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addModule} className="mt-2">
          <PlusCircle className="h-4 w-4 mr-1" /> Add Module
        </Button>
      </div>
    </div>
  )
}
