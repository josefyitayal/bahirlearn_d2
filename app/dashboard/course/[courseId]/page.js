import { DashboardNav } from "@/components/shared/DashboardNav"
import { Button } from "@/components/ui/button"
import { getCourseById } from "@/features/course/actions/get-course-by-id"
import { LessonSidebar } from "@/features/lesson/components/LessonSidebar"
import { LessonEditor } from "@/features/lesson/components/LessonEditor"
import LessonBuilderProvider from "@/features/lesson/context/lessonBuilderContext"
import { SaveButton } from "@/features/lesson/components/SaveButton"

async function EachCoursePage({params}) {
  const courseId = (await params).courseId


  const {errors, data:course} = await getCourseById(courseId)
  if (errors) {
    return (<div>{errors.message}</div>)
  }
  console.log(course)
  return (
    <LessonBuilderProvider course={course[0]}>
      <div>
        <DashboardNav title={`${course[0].name}`} back_button={true}>
          <SaveButton />
        </DashboardNav>
      </div>
      <div className="w-full flex justify-center ">
        <div className="flex-[0.3]">
          <LessonSidebar />
        </div>
        <div className="flex-[1]">
          <LessonEditor />
        </div>
      </div>
    </LessonBuilderProvider>
  )
}

export default EachCoursePage
