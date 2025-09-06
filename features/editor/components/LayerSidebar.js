"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutPanelTop, Trash2 } from "lucide-react";
import useWebsiteBuilder from "../store/websiteStore";
import { AddSectionButton } from "./AddSection";

export function LayerSidebar() {
  const landingPageSections = useWebsiteBuilder((state) => state.landingPageSections)
  const setSelectedSectionId = useWebsiteBuilder((state) => state.setSelectedSectionId)
  const removeSection = useWebsiteBuilder((state) => state.removeSection)

  function handleClickingSection(sectionId) {
      setSelectedSectionId(sectionId)
  }
  
  function handleDeleteSection(sectionId) {
    removeSection(sectionId)
  }

  // if (!landingPageSections || landingPageSections.length === 0) {
  //   return <div className="p-4 text-muted-foreground">No sections found for this page.</div>
  // }
  //
  return (
    <div className="h-full min-w-[260px] w-[260px] bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-500">Layers</p>
      </div>

      <ScrollArea className="flex-1 px-3 py-4 space-y-1">
        {landingPageSections?.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            onClick={() => handleClickingSection(section.id)}
            className="w-full justify-between px-3 group flex items-center transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <LayoutPanelTop />
              <span className="truncate text-sm font-medium text-left">
                {section.name}
              </span>
            </div>

            {/* Fix: render asChild to avoid nested <button> */}
            <Button
              variant="icon"
              onClick={() => handleDeleteSection(section.id)}
              asChild
              className="opacity-0 p-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-destructive"
            >
              <span>
                <Trash2 />
              </span>
            </Button>
          </Button>
        ))}
      </ScrollArea>

      <div className="p-3 border-t border-gray-200">
        <AddSectionButton className="w-full" />
      </div>
    </div>
  )
}
