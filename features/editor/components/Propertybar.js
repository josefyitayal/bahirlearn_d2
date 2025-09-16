"use client"

import { PropertySwitcher } from "@/lib/ProperySwitcher"
import useWebsiteBuilder from "../store/websiteStore"

export function Propertybar() {
  const landingPageSections = useWebsiteBuilder((state) => state.landingPageSections)
  const layerSection = useWebsiteBuilder((state) => state.layerSection)
  const selectedSectionId = useWebsiteBuilder((state) => state.selectedSectionId)

  const combinedSections = [
    ...(layerSection.header || []),
    ...landingPageSections,
    ...(layerSection.footer || [])
  ];

  const selectedSection = combinedSections.find((s) => s.id === selectedSectionId)

  return (
    <div className="w-[300px] h-full bg-white border-l border-gray-200 flex flex-col">
      {selectedSection ? (
        <>
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-base font-semibold">{selectedSection.name}</h2>
            <p className="text-xs text-muted-foreground">Edit section settings</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <PropertySwitcher section={selectedSection} />
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center px-4 text-center text-gray-500 text-sm">
          Click a section to view its settings
        </div>
      )}
    </div>
  )
}
