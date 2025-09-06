"use client"

import { ComponentSwitcher } from "@/lib/componentSwitcher";
import { ScrollArea } from "@/components/ui/scroll-area"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

function page() {
  const landingPageSections = useWebsiteBuilder((state) => state.landingPageSections)
  const subdomain = useWebsiteBuilder((state) => state.subdomain)

  return (
    <div className="h-full p-6">
      <ScrollArea className="h-full w-full flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow-sm">
        {landingPageSections.map((section) => (
          <ComponentSwitcher
            key={section.id}
            section={section}
            subdomain={subdomain}
          />
        ))}
      </ScrollArea>
    </div>
  )
}

export default page
