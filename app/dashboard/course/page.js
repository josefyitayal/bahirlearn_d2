"use client"

import {useState, useEffect} from "react"

import { DashboardNav } from "@/components/shared/DashboardNav";
import { Button } from "@/components/ui/button";
import { CourseDialog } from "@/features/course/components/CourseDialog";

export default function CoursePage() {
  const [open, setOpen] = useState(false)
  const [course, setCourse] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <div>
      <DashboardNav title={"Course"}>
        <Button onClick={()=>{setSelectedCourse(null);setOpen(true)}}>Create course</Button>        
      </DashboardNav>
      <CourseDialog open={open} onOpenChange={setOpen} course={selectedCourse}/>
    </div>
  )
}
