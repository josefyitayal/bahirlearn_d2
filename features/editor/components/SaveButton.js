"use client"

import React, {useState} from 'react'
import { Button } from '@/components/ui/button'
import useWebsiteBuilder from "../store/websiteStore";
import { saveLandingPageSection } from '../actions/save-landingpage-section';
import { toast } from 'sonner';

export function SaveButton() {
  const [isLoading, setIsLoading] = useState(false)
  const landingPageSections = useWebsiteBuilder((state) => state.landingPageSections)
  const subdomain = useWebsiteBuilder((state) => state.subdomain)

  async function handleSave() {
    if (landingPageSections || landingPageSections.length > 0 || subdomain) {
      setIsLoading(true)
      const {error, data} = await saveLandingPageSection(landingPageSections, subdomain)  
      if (error) {
        toast.error(error.message)
      }else {
        toast.success("Successfully saved")
      }
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSave} disabled={isLoading}>
      {isLoading ? "Saving..." : "Save"}
    </Button>
  )
}
