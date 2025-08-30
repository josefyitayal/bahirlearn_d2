"use client"
import { Button } from "@/components/ui/button";
import { LayoutPanelTop, Trash2 } from "lucide-react";
import useWebsiteBuilder from "../store/websiteStore";
import { AddSectionButton } from "./AddSection";

export function LayerSidebar() {
  const landingPageSections = useWebsiteBuilder((state) => state.landingPageSections)

  return (
    <div className="h-full min-w-[260px] w-[260px] bg-white border-r border-gray-200 py-4 px-6 overflow-y-auto flex flex-col gap-3">
      <p className="text-muted-foreground text-lg text-center">Layers</p>
      <div className="">
        {landingPageSections?.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            onClick={() => { }}
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
              onClick={() => { }}
              asChild
              className="px-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-destructive"
            >
              <span>
                <Trash2 />
              </span>
            </Button>
          </Button>
        ))}
      </div>
      <div>
        <AddSectionButton />
      </div>
    </div>
  )
}
