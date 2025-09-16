// features/editor/components/LayerSidebar.tsx
"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layers, LayoutTemplate, Trash2 } from "lucide-react";
import useWebsiteBuilder from "../store/websiteStore";
import { AddSectionButton } from "./AddSection";
import { Separator } from "@/components/ui/separator";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableSection({
  section,
  selectedSectionId,
  onSelect,
  onDelete,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Button
        variant={selectedSectionId === section.id ? "secondary" : "ghost"}
        onClick={() => onSelect(section.id)}
        className="w-full justify-between px-3 group flex items-center transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <Layers />
          <span className="truncate text-sm font-medium text-left">
            {section.name}
          </span>
        </div>

        <Button
          variant="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(section.id);
          }}
          asChild
          className="opacity-0 p-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-destructive"
        >
          <span>
            <Trash2 />
          </span>
        </Button>
      </Button>
    </div>
  );
}

export function LayerSidebar() {
  // ✅ simple, stable selectors (no inline fallback logic)
  const landingPageSections = useWebsiteBuilder((s) => s.landingPageSections)
  const layerSection = useWebsiteBuilder((s) => s.layerSection)
  const selectedSectionId = useWebsiteBuilder((s) => s.selectedSectionId)

  const setSelectedSectionId = useWebsiteBuilder((s) => s.setSelectedSectionId)
  const removeSection = useWebsiteBuilder((s) => s.removeSection)
  const moveSection = useWebsiteBuilder((s) => s.moveSection)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = landingPageSections.findIndex((i) => i.id === active.id)
    const newIndex = landingPageSections.findIndex((i) => i.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    // ✅ use store helper; do NOT pass a function to setLandingPageSections
    moveSection(oldIndex, newIndex)
  }

  return (
    <div className="h-full min-w-[260px] w-[260px] bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-500">Layers</p>
      </div>

      <ScrollArea className="flex-1 px-3 py-4 space-y-1">
        {/* Header (static) */}
        {Array.isArray(layerSection.header) && layerSection.header.map((section) => (
          <Button
            key={section.id}
            variant={selectedSectionId === section.id ? "secondary" : "ghost"}
            onClick={() => setSelectedSectionId(section.id)}
            className="w-full justify-between px-3 group flex items-center transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <LayoutTemplate />
              <span className="truncate text-sm font-medium text-left">
                {section.name}
              </span>
            </div>

            {section.is_deletable && (
              <Button
                variant="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeSection(section.id)
                }}
                asChild
                className="opacity-0 p-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-destructive"
              >
                <span><Trash2 /></span>
              </Button>
            )}
          </Button>
        ))}

        <Separator />

        {/* Sortable middle list */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={landingPageSections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3">
              {landingPageSections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  selectedSectionId={selectedSectionId}
                  onSelect={setSelectedSectionId}
                  onDelete={removeSection}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <AddSectionButton className="w-full" />

        <Separator />

        {/* Footer (static) */}
        {Array.isArray(layerSection.footer) && layerSection.footer.map((section) => (
          <Button
            key={section.id}
            variant={selectedSectionId === section.id ? "secondary" : "ghost"}
            onClick={() => setSelectedSectionId(section.id)}
            className="w-full justify-between px-3 group flex items-center transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <LayoutTemplate />
              <span className="truncate text-sm font-medium text-left">
                {section.name}
              </span>
            </div>

            {section.is_deletable && (
              <Button
                variant="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeSection(section.id)
                }}
                asChild
                className="opacity-0 p-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-destructive"
              >
                <span><Trash2 /></span>
              </Button>
            )}
          </Button>
        ))}
      </ScrollArea>
    </div>
  )
}
