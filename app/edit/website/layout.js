import { DashboardNav } from "@/components/shared/DashboardNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayerSidebar } from "@/features/editor/components/LayerSidebar";
import { Propertybar } from "@/features/editor/components/Propertybar";
import { EditorProvider } from "@/features/editor/components/EditorProvider"
import { getUserSection } from "@/features/website/actions/get-user-sections";
import { SaveButton } from "@/features/editor/components/SaveButton";

export default async function WebsiteEditorLayout({ children }) {
  const { error, data } = await getUserSection()
  if (error) {
    return (<div className="text-center">{error.message}</div>)
  }

  const section = data.section || []

  return (
    <EditorProvider initialSections={section}>
      <div className="flex flex-col h-screen min-h-screen bg-gray-50">
        {/* Top Nav */}
        <DashboardNav
          back_button
          border
          title="Customize landing page"
          className="bg-white shadow-sm px-4"
        >
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Live
            </Badge>
            <SaveButton />
          </div>
        </DashboardNav>

        {/* Main Editor Area */}
        <div className="flex flex-1 h-[100%]">
          {/* Left Sidebar */}
          <LayerSidebar />

          {/* Center Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100">
            {children}
          </div>

          {/* Right Sidebar */}
          <Propertybar />
        </div>
      </div>
    </EditorProvider>
  )
}
