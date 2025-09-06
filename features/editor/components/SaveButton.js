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
    console.log(subdomain)
    if (landingPageSections && landingPageSections.length > 0 && subdomain) {
      setIsLoading(true)
      const {errors, data} = await saveLandingPageSection(landingPageSections, subdomain)  
      if (errors) {
        toast.error(errors.message)
      } 
      else if (data)  {
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
