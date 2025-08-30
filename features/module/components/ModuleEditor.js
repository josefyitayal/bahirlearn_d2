"use client"

import { useState, useEffect } from "react"
import { RichTextEditor } from "@/components/shared/RichTextEditor"
import { useModuleBuilder } from "../context/moduleBuilderContext";
import QuizEditor from "./QuizEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ModuleEditor() {
  const {
    updateModule,
    modules,
    currentModuleId,
  } = useModuleBuilder();

  const module = modules.find(m => m.id === currentModuleId)
  if (!module) return null

  return (
    <div>
      {module.type === "lesson" && (
        <Tabs defaultValue="editing" className="w-full">
          <TabsList className="flex items-center">
            <p className="text-lg font-semibold">Lesson</p>
            <TabsTrigger value="editing">Editing</TabsTrigger>
            <TabsTrigger value="priview">Priview</TabsTrigger>
          </TabsList>
          <TabsContent value="editing">
            <RichTextEditor
              value={module.lesson?.content || ""}
              onChange={(newContent) =>
                updateModule(currentModuleId, {
                  lesson: { ...module.lesson, content: newContent }
                })
              } />
          </TabsContent>
          <TabsContent value="priview">
            <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: module.lesson?.content }}></div>
          </TabsContent>
        </Tabs>
      )}
      {module.type === "quiz" && (
        <QuizEditor
          value={module.quiz || { prompt: "", questions: [] }}
          onChange={(newQuizData) =>
            updateModule(currentModuleId, {
              quiz: { ...module.quiz, ...newQuizData }
            })
          } />
      )}
    </div>
  )
}
