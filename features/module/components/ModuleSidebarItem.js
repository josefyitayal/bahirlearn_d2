"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Trash, GripVertical, LayoutDashboard, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ModuleContents } from "./ModuleContents";
import { CreateModuleContent } from "./CreateModuleContent";
import { useModuleBuilder } from "../context/moduleBuilderContext";
import { Button } from "@/components/ui/button";

export function ModuleSidebarItem({
  id,
  title,
  contents,
  onRename,
  onRemove,
}) {
  const [editing, setEditing] = useState(title === "");
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef(null);

  const isSelected = true
  const { addContent } = useModuleBuilder()

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    if (inputValue.trim() !== "") {
      onRename(id, inputValue.trim());
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  function handleCreateModuleContent(content_type, data) {
    console.log(content_type, data.title)
    addContent(id, content_type, data.title)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex items-center justify-between gap-2 rounded-md border border-transparent px-2 py-1 transition group w-full max-w-full",
          ""
        )}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground mr-2"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <LayoutDashboard className="flex-shrink-0 text-muted-foreground" />

        {/* Title or Input */}
        <div className="flex-grow min-w-0">
          {editing ? (
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Enter lesson name"
              className="h-8 text-sm w-full"
            />
          ) : (
            <button
              onDoubleClick={() => setEditing(true)}
              className="w-full h-8 text-left text-sm truncate"
            >
              {title || "Untitled"}
            </button>
          )}
        </div>

        {/* Action buttons container — fixed width to prevent flicker */}
        <div className="flex items-center gap-2 flex-shrink-0 justify-end">
          {/* Plus Button */}

          <CreateModuleContent onCreate={handleCreateModuleContent} />
          <Button 
            variant="ghost"
            onClick={() => onRemove(id)}
            className="w-0"
          >
            <Trash 
              className="w-4 h-4 text-destructive cursor-pointer hover:bg-gray-100" 
            />
          </Button>
        </div>
      </div>
      <div>
        <ModuleContents contents={contents} moduleId={id} />
      </div>
    </div>
  );
}
