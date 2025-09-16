"use client";

import React, { useContext, useState, useEffect, createContext } from "react";
import cuid from "cuid";

const moduleBuilderContext = createContext(null);

// ContentType constants to mirror Prisma enum values
const ContentType = {
  LESSON: "LESSON",
  QUIZ: "QUIZ",
};

function genDefaultLessonContent() {
  return {
    id: cuid(),
    content_type: ContentType.LESSON,
    position: 0,
    lesson: {
      id: cuid(),
      title: "Untitled Lesson",
      content: "",
    },
    quiz: null,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

function reindexPositions(arr) {
  return arr.map((item, idx) => ({ ...item, position: idx }));
}

function ModuleBuilderProvider({ children, course }) {
  // initial module (chapter) shape that matches the new Prisma schema
  const initialModuleId = cuid();
  const initialContent = genDefaultLessonContent();
  const initialModule = {
    id: initialModuleId,
    title: "Untitled",
    description: "",
    position: 0,
    contents: [initialContent],
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Prefer course.module (new schema: modules with contents array)
  const initialModules = (course && Array.isArray(course.module) && course.module.length > 0)
    ? course.module.map((m, idx) => ({ ...m, position: typeof m.position === 'number' ? m.position : idx }))
    : [initialModule];

  const [modules, setModules] = useState(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("module-builder-data") : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse stored module-builder-data:", e);
    }
    return initialModules;
  });

  const [currentModuleId, setCurrentModuleId] = useState(
    () => (modules && modules.length > 0 ? modules[0].id : initialModuleId)
  );

  const [currentModuleContentId, setCurrentModuleContentId] = useState(
    () => (modules && modules.length > 0 && modules[0].contents && modules[0].contents.length > 0 ? modules[0].contents[0].id : initialContent.id)
  );

  // Load from course on mount if localStorage empty (covers SSR -> CSR transitions)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("module-builder-data");
      if (stored) return; // keep local copy if present

      if (course && Array.isArray(course.module) && course.module.length > 0) {
        const normalized = course.module.map((m, idx) => ({ ...m, position: typeof m.position === 'number' ? m.position : idx }));
        setModules(normalized);
        setCurrentModuleId(normalized[0].id);
        if (normalized[0].contents && normalized[0].contents.length > 0) {
          setCurrentModuleContentId(normalized[0].contents[0].id);
        }
        return;
      }

      // otherwise keep current state
      if (modules.length > 0) {
        setCurrentModuleId(modules[0].id);
        if (modules[0].contents && modules[0].contents.length > 0) {
          setCurrentModuleContentId(modules[0].contents[0].id);
        }
      }
    } catch (e) {
      console.error("Error during module-builder initialization:", e);
    }
  }, []);

  // Persist to localStorage when modules change
  useEffect(() => {
    try {
      localStorage.setItem("module-builder-data", JSON.stringify(modules));
    } catch (e) {
      console.error("Failed to persist module-builder-data:", e);
    }
  }, [modules]);

  // -- Module operations --
  function addModule(title = "Untitled", description = "") {
    const lastPosition = modules.length > 0 ? (modules[modules.length - 1].position ?? modules.length - 1) : 0;
    const newContent = genDefaultLessonContent();
    const newModule = {
      id: cuid(),
      title,
      description,
      position: lastPosition + 1,
      contents: [newContent],
      created_at: new Date(),
      updated_at: new Date(),
    };

    setModules((prev) => {
      const next = [...prev, newModule];
      return reindexPositions(next);
    });
    setCurrentModuleId(newModule.id);
    setCurrentModuleContentId(newContent.id);
  }

  function removeModule(id) {
    setModules((prev) => {
      const next = prev.filter((m) => m.id !== id);
      if (next.length > 0) {
        setCurrentModuleId(next[Math.max(0, next.length - 1)].id);
        if (next[next.length - 1].contents && next[next.length - 1].contents.length > 0) {
          setCurrentModuleContentId(next[next.length - 1].contents[0].id);
        } else {
          setCurrentModuleContentId(null);
        }
      } else {
        setCurrentModuleId(null);
        setCurrentModuleContentId(null);
      }
      return reindexPositions(next);
    });
  }

  function updateModule(id, data) {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...data, updated_at: new Date() } : m)));
  }

  function moveModule(fromIndex, toIndex) {
    setModules((prev) => {
      const result = [...prev];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return reindexPositions(result);
    });
  }

  // -- Content operations (inside modules) --
  function addContent(moduleId, type = ContentType.LESSON, title) {
    let newContent;
    console.log("from server action ", title)
    setModules((prev) => {
      return prev.map((m) => {
        if (m.id !== moduleId) return m;
        newContent =
          type === ContentType.LESSON
            ? {
                id: cuid(),
                content_type: ContentType.LESSON,
                position: m.contents.length,
                lesson: {
                  id: cuid(),
                  title: title || "Untitled",
                  content: "",
                },
                quiz: null,
                created_at: new Date(),
                updated_at: new Date(),
              }
            : {
                id: cuid(),
                content_type: ContentType.QUIZ,
                position: m.contents.length,
                lesson: null,
                quiz: {
                  id: cuid(),
                  prompt: "",
                  questions: [
                    {
                      id: cuid(),
                      text: "Placeholder question",
                      options: [{ id: cuid(), text: "Option 1" }, { id: cuid(), text: "Option 2" }],
                      correct: null,
                    },
                  ],
                },
                created_at: new Date(),
                updated_at: new Date(),
              };

        const nextContents = [...(m.contents || []), newContent];
        return { ...m, contents: reindexPositions(nextContents), updated_at: new Date() };
      });
    });
    setCurrentModuleId(moduleId);
    if (newContent) setCurrentModuleContentId(newContent.id);
  }

  function removeContent(moduleId, contentId) {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== moduleId) return m;
        const nextContents = (m.contents || []).filter((c) => c.id !== contentId);
        if (currentModuleContentId === contentId) {
          setCurrentModuleContentId(nextContents.length > 0 ? nextContents[0].id : null);
        }
        return { ...m, contents: reindexPositions(nextContents), updated_at: new Date() };
      })
    );
  }

  function updateContent(moduleId, contentId, data) {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== moduleId) return m;
        const nextContents = (m.contents || []).map((c) => (c.id === contentId ? { ...c, ...data, updated_at: new Date() } : c));
        return { ...m, contents: nextContents, updated_at: new Date() };
      })
    );
  }

  function moveContent({ fromModuleId, toModuleId = fromModuleId, fromIndex, toIndex }) {
    setModules((prev) => {
      const working = JSON.parse(JSON.stringify(prev));

      const fromModule = working.find((m) => m.id === fromModuleId);
      const toModule = working.find((m) => m.id === toModuleId);
      if (!fromModule || !toModule) return prev;

      const [moved] = (fromModule.contents || []).splice(fromIndex, 1);
      if (!moved) return prev;

      // if inserting into same module and target index > fromIndex, adjust target index
      let targetIndex = toIndex;
      if (fromModuleId === toModuleId && toIndex > fromIndex) targetIndex = toIndex - 1;

      (toModule.contents = toModule.contents || []).splice(targetIndex, 0, moved);

      // reindex both modules' contents
      fromModule.contents = reindexPositions(fromModule.contents || []);
      toModule.contents = reindexPositions(toModule.contents || []);

      return reindexPositions(working);
    });
  }

  function saveModules() {
    try {
      const layoutData = {
        modules,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem("website-builder-layout", JSON.stringify(layoutData));
      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Failed to save layout:", error);
      alert("Failed to save layout. Please try again.");
    }
  }

  const values = {
    // module-level
    addModule,
    removeModule,
    updateModule,
    moveModule,

    // content-level
    addContent,
    removeContent,
    updateContent,
    moveContent,

    // misc
    saveModules,
    modules,
    setModules,
    currentModuleId,
    setCurrentModuleId,
    currentModuleContentId,
    setCurrentModuleContentId,
    courseId: course && course.id,
    ContentType,
  };

  return <moduleBuilderContext.Provider value={values}>{children}</moduleBuilderContext.Provider>;
}

export const useModuleBuilder = () => {
  const context = useContext(moduleBuilderContext);
  if (context === null) {
    throw new Error("useModuleBuilder must be used within a ModuleBuilderProvider");
  }
  return context;
};

export default ModuleBuilderProvider;
