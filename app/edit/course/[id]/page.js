import { DashboardNav } from "@/components/shared/DashboardNav"
import { getCourseById } from "@/features/course/actions/get-course-by-id"
import { ModuleSidebar } from "@/features/module/components/ModuleSidebar"
import { ModuleEditor } from "@/features/module/components/ModuleEditor"
import { SaveButton } from "@/features/module/components/SaveButton"
import { redirect } from "next/navigation"
import ModuleBuilderProvider from "@/features/module/context/moduleBuilderContext"

async function EachCoursePage({params}) {
  const courseId = (await params).courseId

  if (courseId) {
    redirect("/dashboard/course")
  }
  const {errors, data:course} = await getCourseById(courseId)
  if (errors) {
    return (<div>{errors.message}</div>)
  }
  return (
    <ModuleBuilderProvider course={course[0]}>
      <div>
        <DashboardNav title={`${course[0].name}`} back_button={true} border={true} className="px-3">
          <SaveButton />
        </DashboardNav>
      </div>
      <div className="w-full flex justify-center ">
        <div className="flex-[0.3]">
          <ModuleSidebar />
        </div>
        <div className="flex-[1]">
          <ModuleEditor />
        </div>
      </div>
    </ModuleBuilderProvider>
  )
}

export default EachCoursePage
