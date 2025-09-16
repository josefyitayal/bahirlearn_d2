import { create } from 'zustand'
import sections from "@/sections.json"

const useWebsiteBuilder = create((set, get) => ({
  // ✅ always arrays/objects
  landingPageSections: [],
  layerSection: { header: [], footer: [] },
  selectedSectionId: null,
  subdomain: null,

  addSection: (id) => {
    const { landingPageSections } = get()
    if (landingPageSections.find((item) => item.id === id)) return
    const foundSection = sections.find((s) => s.id === id)
    if (!foundSection) throw new Error(`Section id ${id} not found in sections array.`)
    set((state) => ({
      landingPageSections: [...state.landingPageSections, foundSection],
      selectedSectionId: id,
    }))
  },

  removeSection: (id) =>
    set((state) => ({
      landingPageSections: state.landingPageSections.filter((s) => s.id !== id),
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
    })),

  updateProperty: (id, data) =>
    set((state) => ({
      landingPageSections: state.landingPageSections.map((s) =>
        s.id === id ? { ...s, ...data } : s
      ),
    })),

  updateLayerSection: (sectionType, id, data) =>
    set((state) => ({
      layerSection: {
        ...state.layerSection,
        [sectionType]: (state.layerSection[sectionType] ?? []).map((section) =>
          section.id === id ? { ...section, ...data } : section
        ),
      },
    })),

  moveSection: (fromIndex, toIndex) =>
    set((state) => {
      const arr = state.landingPageSections.slice()
      const [moved] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, moved)
      return { landingPageSections: arr }
    }),

  // ✅ IMPORTANT: this expects an ARRAY (do not pass a function)
  setLandingPageSections: (newLandingPageSections) =>
    set(() => ({ landingPageSections: Array.isArray(newLandingPageSections) ? newLandingPageSections : [] })),

  setLayerSection: (newLayerSection) =>
    set(() => ({
      layerSection: {
        header: newLayerSection?.header ?? [],
        footer: newLayerSection?.footer ?? [],
      }
    })),

  setSelectedSectionId: (id) => set(() => ({ selectedSectionId: id })),

  clearTemplate: () =>
    set(() => ({ landingPageSections: [], selectedSectionId: null })),

  setSubdomain: (subdomain) => set(() => ({ subdomain }))
}))

export default useWebsiteBuilder
