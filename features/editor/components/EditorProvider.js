"use client"

import { useRef } from "react";
import useWebsiteBuilder from "../store/websiteStore";

export function EditorProvider({ initialSections, layerSection, subdomain, children }) {
  const setLandingPageSections = useWebsiteBuilder((state) => state.setLandingPageSections);
  const setLayerSection = useWebsiteBuilder((state) => state.setLayerSection);
  const setSubdomain = useWebsiteBuilder((state) => state.setSubdomain);

  const initialized = useRef(false);
  if (!initialized.current) {
    setLandingPageSections(initialSections);
    setSubdomain(subdomain);
    setLayerSection(layerSection);
    initialized.current = true;
  }

  return children;
}
