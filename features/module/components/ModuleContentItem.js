"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Trash, GripVertical, LayoutDashboard, Plus, BookOpenText, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function ModuleContentItem({
  id,
  title,
  content_type,
  isSelected,
  onSelect,
  onRename,
  onRemove,
}) {
  const [editing, setEditing] = useState(title === "");
  const [inputValue, setInputValue] = useState(title ?? "");
  const inputRef = useRef(null);
  
  console.log(title, "fsdfasdf")

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


  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md border border-transparent px-2 py-1.5 transition group w-full",
        isSelected
          ? "bg-accent border-border shadow-sm font-semibold"
          : "hover:bg-muted/60"
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

      {/* Icon */}
      {content_type === "LESSON" ? (
        <BookOpenText className="flex-shrink-0 text-muted-foreground" />
      ) : (
        <ListChecks className="flex-shrink-0 text-muted-foreground" />
      )}

      {/* Title or Input */}
      <div className="flex-shrink overflow-hidden w-[100px]">
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
            onClick={onSelect}
            onDoubleClick={() => setEditing(true)}
            className="h-8 text-left text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {title || "Untitled"}
          </button>
        )}
      </div>

      {/* Action buttons container — fixed width to prevent flicker */}
      <div className="flex items-center gap-2 flex-shrink-0 w-[40px] justify-end">
        <Trash
          onClick={() => onRemove(id)}
          className={cn(
            "w-4 h-4 text-destructive cursor-pointer transition-opacity",
            editing ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100",
            isSelected ? "opacity-100" : ""
          )}
        />
      </div>
    </div>
  );
}
