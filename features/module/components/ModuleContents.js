"use client"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ModuleContentItem } from "./ModuleContentItem";
import { useEffect, useState } from "react";
import { useModuleBuilder } from "../context/moduleBuilderContext";


export function ModuleContents({contents, moduleId}) {
  const [mounted, setMounted] = useState(false);

  const {addContent, removeContent, updateContent, modules, setModules, currentModuleId, currentModuleContentId, setCurrentModuleContentId} = useModuleBuilder()

  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = modules.findIndex((l) => l.id === active.id);
      const newIndex = modules.findIndex((l) => l.id === over.id);
      const newModules = arrayMove(modules, oldIndex, newIndex);
      setModules(newModules);
    }
  };

  if (!contents) return <div>Loading</div>
  contents.map((c) => {
    console.log(c.lesson.title)
  })

  // function handleCreateModule(data) {
  //   addModule(data.title, data.description)
  // }

  if (!mounted) return null; // Prevent SSR mismatch
  return (
    <div className="w-full flex flex-col ml-5 pr-4 pl-8  border-l h-full">
      <div className="">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={modules.map((module) => module.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-1">
              {contents.map((cont) => (
                <ModuleContentItem
                  key={cont.id}
                  id={cont.id}
                  title={cont.title}
                  content_type={cont.content_type}
                  isSelected={currentModuleContentId === cont.id}
                  onSelect={() => setCurrentModuleContentId(cont.id)}
                  onRename={(id, newTitle) => updateContent(moduleId, id, { title: newTitle })}
                  onRemove={(id) => removeContent(moduleId, id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

}
