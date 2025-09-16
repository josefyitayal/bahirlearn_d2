"use client"

import { useState, useEffect } from "react"
import { RichTextEditor } from "@/components/shared/RichTextEditor"
import { useModuleBuilder } from "../context/moduleBuilderContext";
import QuizEditor from "./QuizEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ModuleEditor() {
  const {
    updateModule,
    updateContent,
    modules,
    currentModuleId,
    currentModuleContentId
  } = useModuleBuilder();

  const content = modules
    .flatMap(module => module.contents) // merge all contents into one array
    .find(c => c.id === currentModuleContentId);

  console.log(modules)
  console.log(content);

  function handleUpdatingLesson(newLessonData) {
    const lessonData = {
      ...content,
      lesson: {
        ...content.lesson,
        content: newLessonData
      }
    }
    updateContent(currentModuleId, content.id, lessonData)
  }

  function handleUpdatingQuiz(newQuizData) {
    const quizData = {
      ...content,
      quiz: {
        ...content.quiz,
        prompt: newQuizData.prompt,
        questions: newQuizData.questions
      }
    }
    updateContent(currentModuleId, content.id, quizData)
  }

  if (!content) return <div>Create Lesson or Quiz</div>

  return (
    <div>
      {content.content_type === "LESSON" && (
        <Tabs defaultValue="editing" className="w-full">
          <TabsList className="flex items-center">
            <p className="text-lg font-semibold">Lesson</p>
            <TabsTrigger value="editing">Editing</TabsTrigger>
            <TabsTrigger value="priview">Priview</TabsTrigger>
          </TabsList>
          <TabsContent value="editing">
            <RichTextEditor
              value={content.lesson?.content || ""}
              onChange={(newLessonData) => handleUpdatingLesson(newLessonData)} />
          </TabsContent>
          <TabsContent value="priview">
            <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.lesson?.content }}></div>
          </TabsContent>
        </Tabs>
      )}
      {content.content_type === "QUIZ" && (
        <QuizEditor
          value={content.quiz || { prompt: "", questions: [] }}
          onChange={(newQuizData) => handleUpdatingQuiz(newQuizData)} />
      )}
    </div>
  )
}
