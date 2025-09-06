
"use client";

import { useEffect } from "react";
import useWebsiteBuilder from "@/features/editor/store/websiteStore";

export function EditorProvider({ initialSections, children }) {
  const setLandingPageSections = useWebsiteBuilder((state) => state.setLandingPageSections)
  
  useEffect(() => {
    setLandingPageSections(initialSections);
  }, [initialSections, setLandingPageSections]);

  return children;
}
