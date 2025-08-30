"use client"

import {getAllCourseBySubdomain} from "@/features/courses"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from 'axios';

function CardCourseGrid({ course }) {
  return (
    <Card className="overflow-hidden p-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-lg">{course.title}</CardTitle>
        </CardHeader>

        <CardContent className="p-0 text-sm text-muted-foreground mb-4">
          {course.description || "No description available."}
        </CardContent>

        <CardFooter className="p-0 flex justify-end items-center text-xs text-gray-500">
          <Button variant="outline" size="sm">View</Button>
        </CardFooter>
      </div>
    </Card>
  )
}

function VerticalCourseList({ course }) {
  return (
    <Card className="overflow-hidden p-0 shadow-sm hover:shadow-md transition-shadow">
      {/* Image block */}
      <CardHeader className="p-0">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>

      {/* Title + Description */}
      <CardContent className="px-6 py-4">
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <p className="mt-2 text-sm text-muted-foreground">
          {course.description || "No description available."}
        </p>
      </CardContent>

      {/* Status + Action */}
      <CardFooter className="px-6 py-4 flex justify-end items-center text-xs text-gray-500">
        <Button variant="secondary" size="sm">View</Button>
      </CardFooter>
    </Card>
  )
}

// components/SkeletonCourseList.jsx
function SkeletonCourseList({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="animate-pulse bg-white shadow rounded-lg p-4"
        >
          <div className="h-40 bg-gray-200 rounded mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}


export function CardCourse({ course, theme, props }) {
  console.log(theme, course, props)
  return (
    <div {...props}>
      {"stacked" === "stacked" ? (
          <VerticalCourseList course={course} />
        ) : (
          <CardCourseGrid course={course} />
        )
      }
    </div>
  )
}

export function CourseList({ sectionData, subdomain }) {
  const { heading, number, theme } = sectionData;
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`/api/courses/by-subdomain?subdomain=${subdomain}`);
        console.log(res)
        if (res.status === 200 && Array.isArray(res.data.data)){
          setCourses(res.data.data.slice(0, number || courses.length));
        }else {
          const items = []
          for (let i = 0; i < number; i++) {
            items.push({
              id: `placeholder-${i}`,
              title: `Course Title ${i + 1}`,
              description: `Course description number ${i + 1}`,
              thumbnail: "/placeholder.svg"
            })
          }
          setCourses(items);
        }
      }catch(err) {
        console.error("Failed to fetch courses:", err)
      }
    }
    getData()
  }, [subdomain])
  
  useEffect(() => {
    console.log(courses)
  }, [courses])
  

  return (
    <section className="py-10 px-5 ">
      <h2 className="text-3xl font-bold text-center mb-6">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses === null ? (
          <SkeletonCourseList count={number} />
        ) : (
          courses.map((cou) => (
            <CardCourse key={cou.id} course={cou} theme={theme} />
          ))
        )}
      </div>
    </section>
  )
}
