"use client";

import React, { useContext, useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

const lessonBuilderContext = createContext(undefined);

function LessonBuilderProvider({ children, course }) {
  const initialLessonId = uuidv4()
  const initialLesson = [{
      id: initialLessonId,
      title: "Untitled",
      description: "",
      content: "<p>Type</p>",
      postion: 0
    }]
  const [lessons, setLessons] = useState(course.lesson && course.lesson.length > 0 ? course.lesson : initialLesson);

  const [currentLessonId, setCurrentLessonId] = useState(course.lesson && course.lesson.length > 0 ? course.lesson[0].id : initialLessonId);

  function addLesson(title, description="") {
    const lastPosition = lessons.length > 0 ? lessons.at(-1)?.position ?? 0 : 0;
    const newLesson = {
      id: uuidv4(),
      title: title,
      description: description, 
      content: "<p>Type</p>",
      postion: lastPosition 
    };
    setLessons((prevLessons) => [...prevLessons, newLesson]);
    setCurrentLessonId(newLesson.id);
  }


  const removeLesson = (id) => {
    setLessons((prevLessons) => {
      const updatedLessons = prevLessons.filter((lesson) => lesson.id !== id);

      // Select last lesson if there is one
      if (updatedLessons.length > 0) {
        setCurrentLessonId(updatedLessons[updatedLessons.length - 1].id);
      } else {
        setCurrentLessonId(null);
      }

      return updatedLessons;
    });
  };


  const updateLesson = (id, data) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === id
          ? { ...lesson, ...data } // update directly
          : lesson
      )
    );
  };

  const moveLesson = (fromIndex, toIndex) => {
    setLessons((prevLessons) => {
      const result = [...prevLessons];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  const saveLessons = () => {
    try {
      const layoutData = {
        lessons,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(
        "website-builder-layout",
        JSON.stringify(layoutData)
      );
      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Failed to save layout:", error);
      alert("Failed to save layout. Please try again.");
    }
  };

  const values = {
    addLesson,
    removeLesson,
    updateLesson,
    moveLesson,
    saveLessons,
    lessons,
    setLessons,
    currentLessonId,
    setCurrentLessonId,
    courseId: course.id
  };
  return (
    <lessonBuilderContext.Provider value={values}>
      {children}
    </lessonBuilderContext.Provider>
  );
}

export const useLessonBuilder = () => {
  const context = useContext(lessonBuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};

export default LessonBuilderProvider;
