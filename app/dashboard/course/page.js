"use client"

import { useState, useEffect } from "react"

import { DashboardNav } from "@/components/shared/DashboardNav";
import { Button } from "@/components/ui/button";
import { CourseDialog } from "@/features/course/components/CourseDialog";
import { CourseCard } from "@/features/course/components/CourseCard";
import { getAllCourse } from "@/features/course/actions/get-all-course";

export default function CoursePage() {
  const [open, setOpen] = useState(false)
  const [courses, setCourses] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const { errors, data } = await getAllCourse()
      if (errors) {
        return (<div>{errors.message}</div>)
      }
      setCourses(data)
      setIsLoading(false)
    }
    getData()
  }, [refreshKey])

  if (!courses) {
    return (<div>Loading...</div>)
  }

  return (
    <div>
      <DashboardNav title={"Course"}>
        <Button onClick={() => {
          setSelectedCourse(null);
          setOpen(true);
        }}>
          Create course
        </Button>
      </DashboardNav>

      <CourseDialog
        open={open}
        onOpenChange={setOpen}
        setRefreshKey={setRefreshKey}
        course={selectedCourse}
      />

      {isLoading ? (
        <div className="w-full text-center text-2xl">Course Loading...</div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="text-4xl mb-4">🚀 No courses yet</div>
          <p className="text-lg text-muted-foreground mb-6">
            You haven’t created any courses. Let’s get your first one started!
          </p>
          <Button onClick={() => {
            setSelectedCourse(null);
            setOpen(true);
          }}>
            Create your first course
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              setOpen={setOpen}
              setSelectedCourse={setSelectedCourse}
              setRefreshKey={setRefreshKey}
            />
          ))}
        </div>
      )}
    </div>
  )
}
