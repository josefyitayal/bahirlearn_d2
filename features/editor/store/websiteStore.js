import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import sections from "@/sections.json"

const useWebsiteBuilder = create(
  persist(
    (set, get) => ({
      landingPageSections: [],
      selectedSectionId: null,
      subdomain: null,

      // Add a section by id (no dupes, sets it as selected)
      addSection: (id) => {
        const { landingPageSections } = get()
        if (landingPageSections.find((item) => item.id === id)) {
          console.warn(`Section ${id} already added.`)
          return
        }
        const foundSection = sections.find((s) => s.id === id)
        if (!foundSection) {
          throw new Error(`Section id ${id} not found in sections array.`)
        }
        set((state) => ({
          landingPageSections: [...state.landingPageSections, foundSection],
          selectedSectionId: id,
        }))
      },

      // Remove a section; if it was selected, clear selection
      removeSection: (id) =>
        set((state) => ({
          landingPageSections: state.landingPageSections.filter((s) => s.id !== id),
          selectedSectionId:
            state.selectedSectionId === id ? null : state.selectedSectionId,
        })),

      // Update arbitrary props on a section
      updateProperty: (id, data) =>
        set((state) => ({
          landingPageSections: state.landingPageSections.map((s) =>
            s.id === id ? { ...s, ...data } : s
          ),
        })),

      // Reorder sections by index
      moveSection: (fromIndex, toIndex) =>
        set((state) => {
          const arr = Array.from(state.landingPageSections)
          const [moved] = arr.splice(fromIndex, 1)
          arr.splice(toIndex, 0, moved)
          return { landingPageSections: arr }
        }),

      // Replace the entire template array
      setLandingPageSections: (newLandingPageSections) =>
        set(() => ({ landingPageSections: newLandingPageSections })),

      // Just change selection
      setSelectedSectionId: (id) =>
        set(() => ({ selectedSectionId: id })),

      // Clear everything
      clearTemplate: () =>
        set(() => ({
          landingPageSections: [],
          selectedSectionId: null,
        })),

      // assign subdomain
      setSubdomain: (subdomain) =>
        set(() => ({
          subdomain: subdomain
        }))
    }),
    {
      name: "website-editor-storage",
      getStorage: () => localStorage,
    }
  ))

export default useWebsiteBuilder
