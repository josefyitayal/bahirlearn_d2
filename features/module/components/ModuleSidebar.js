"use client"

import React, { useState, useEffect } from "react";
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
import { ModuleSidebarItem } from "./ModuleSidebarItem";
import { CreateModule } from "./CreateModule";
import { useModuleBuilder } from "../context/moduleBuilderContext";

export function ModuleSidebar() {
  const [mounted, setMounted] = useState(false);

  const {addModule, removeModule, updateModule, modules, setModules, currentModuleId, setCurrentModuleId} = useModuleBuilder()

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

  function handleCreateModule(type, data) {
    console.log(type, data) 
    addModule(type, data.title, data.description)
  }

  if (!mounted) return null; // Prevent SSR mismatch
  return (
    <div className="w-full flex flex-col px-5 border-r h-full">
      <div className="flex items-center justify-between">
        <p>Modules</p>
        <CreateModule onCreate={handleCreateModule} /> 
      </div>
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
            <div className="flex flex-col gap-1.5">
              {modules.map((module) => (
                <ModuleSidebarItem
                  key={module.id}
                  id={module.id}
                  title={module.title}
                  type={module.type}
                  isSelected={currentModuleId === module.id}
                  onSelect={() => setCurrentModuleId(module.id)}
                  onRename={(id, newTitle) => updateModule(id, { title: newTitle })}
                  onRemove={removeModule}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

}
