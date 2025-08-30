"use client"

import {useState, useEffect} from "react"
import { DashboardNav } from "@/components/shared/DashboardNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayerSidebar } from "@/features/editor/components/LayerSidebar";
import { Propertybar } from "@/features/editor/components/Propertybar";
import useWebsiteBuilder from "@/features/editor/store/websiteStore";
import { getUserSection } from "@/features/website/actions/get-user-sections";
import { toast } from "sonner";

export default function WebsiteEditorLayout({children}) {
  const setLandingPageSections = useWebsiteBuilder((state) => state.setLandingPageSections)

  useEffect(() => {
    async function getData() {
      const {error, data} = await getUserSection()
      if (error) {
        toast.error(error.message)
      }
      setLandingPageSections(data.section || [])
    }
    getData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen h-screen max-h-screen bg-gray-50 text-gray-800">
      <DashboardNav back_button={true} border={true} title={"Customize landing page"}>
        <div className="flex items-center gap-3">
          <Badge variant={"default"} className={"bg-green-500 text-green-950"}>Live</Badge> 
          <Button>Save</Button>
        </div>
      </DashboardNav>
      <div className="flex items-start h-[calc(100vh-65px)]">
        <LayerSidebar />
        {children}
        <Propertybar />
      </div>
    </div>
  )
}
