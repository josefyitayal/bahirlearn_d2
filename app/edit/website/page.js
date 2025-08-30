"use client"

import { ComponentSwitcher } from "@/lib/componentSwitcher";
import { ScrollArea } from "@/components/ui/scroll-area"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

function page() {
  const landingPageSections = useWebsiteBuilder((state) => state.landingPageSections)
  const subdomain = useWebsiteBuilder((state) => state.subdomain)

  return (
    <div className="h-full bg-gray-100 p-4">
      {/* Rendered preview/editor will go here */}
      <ScrollArea className="h-full w-full flex flex-col items-center rounded-md border shadow-md">
        {landingPageSections.map((section) => (
          <ComponentSwitcher key={section.id} section={section} subdomain={subdomain}/>
        ))}
      </ScrollArea>
    </div>
  )
}

export default page
