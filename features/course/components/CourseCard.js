import { MoreHorizontal  } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link"
import { deleteCourse } from "../actions/delete-course";

export function CourseCard({course, setSelectedCourse, setOpen, setRefreshKey}) {

  async function handleDeleteCourse(courseId) {
    if (courseId) {
      const {errors} = await deleteCourse(courseId)
      if (errors) {
        toast(errors.message)
      }
      setRefreshKey((prev) => prev + 1)
    }
  }

  return (
    <Card
      key={course.id}
      className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={course.thumbnail}
          alt={course.name}
          fill
          className="object-cover w-full h-full"
        />

        {/* Top-left Action Button */}
        <div className="absolute top-2 left-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={4}
            >
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCourse(course)
                  setOpen(true)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() =>
                  handleDeleteCourse(course.id)
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="p-4 space-y-1">
        <Link href={`/edit/course/${course.id}`}>
          <CardTitle className="text-lg hover:underline transition">
            {course.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </CardDescription>
        </Link>
      </CardHeader>
    </Card>
  )
}
