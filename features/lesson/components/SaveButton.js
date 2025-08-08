"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { useLessonBuilder } from "../context/lessonBuilderContext"
import { saveLesson } from "../actions/save-lesson"

export const SaveButton = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { lessons, courseId } = useLessonBuilder();

	async function saveData() {
		if (lessons && lessons.length > 0) {
			setIsLoading(true)
			const lessonsWithPosition = lessons.map((lesson, index) => ({
			  ...lesson,
			  postion: index,
			}));
      console.log(lessonsWithPosition)
			const {errors, data} = await saveLesson(lessonsWithPosition, courseId)
			setIsLoading(false)
			if (errors) {
				toast.error(errors.message)
			}
			if (data) {
				toast.success("Successfully saved")
			}

		}
	}

	return (
		<Button onClick={saveData} disabled={isLoading}>
			{isLoading ? "Saving..." : "Save"}
		</Button>
	)
}
