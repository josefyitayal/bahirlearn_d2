// features/editor/components/EditorProvider.tsx
"use client"

import { useEffect, useRef } from "react"
import useWebsiteBuilder from "../store/websiteStore"

export function EditorProvider({ initialSections, layerSection, subdomain, children }) {
  const setLandingPageSections = useWebsiteBuilder((s) => s.setLandingPageSections)
  const setLayerSection = useWebsiteBuilder((s) => s.setLayerSection)
  const setSubdomain = useWebsiteBuilder((s) => s.setSubdomain)

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // ✅ normalize shapes
    setLandingPageSections(Array.isArray(initialSections) ? initialSections : [])
    setLayerSection(layerSection ?? { header: [], footer: [] })
    setSubdomain(subdomain ?? null)
  }, [initialSections, layerSection, subdomain, setLandingPageSections, setLayerSection, setSubdomain])

  return children
}
