"use client"

import { useState, useEffect } from "react"
import { RichTextEditor } from "@/components/shared/RichTextEditor"
import { useLessonBuilder } from "../context/lessonBuilderContext";

export function LessonEditor() {
  const [content, setContent] = useState(null)
  const {
    updateLesson,
    lessons,
    currentLessonId,
  } = useLessonBuilder();
  useEffect(() => {
    if (!currentLessonId) return;
    const lesson = lessons.find(l => l.id === currentLessonId);
    if (lesson) {
      setContent(lesson.content || "");
    }
  }, [currentLessonId, lessons]);
  const handleContentChange = (newContent) => {
    setContent(newContent);
    if (currentLessonId) {
      updateLesson(currentLessonId, {
        content: newContent
      });
    }
  };
  return (
    <div>
      <RichTextEditor value={content} onChange={handleContentChange} />
    </div>
  )
}
