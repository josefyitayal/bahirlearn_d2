"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { saveModule } from "../actions/save-module"
import { useModuleBuilder } from "../context/moduleBuilderContext"
import { modulesSchema } from "../schema/quiz-schema"

export const SaveButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { modules, courseId } = useModuleBuilder();

  async function saveData() {
    if (modules && modules.length > 0) {
      setIsLoading(true)
      const modulesWithPosition = modules.map((module, index) => ({
        ...module,
        potition: index,
      }));
      const result = modulesSchema.safeParse(modulesWithPosition);
      if (!result.success) {
        const errors = result.error ?? [];

        if (errors.length === 0) {
          toast.error("Validation failed, but no specific errors were returned.");
          return;
        }

        const formattedErrors = result.error.issues.map((err) => {
          const rawPath = err.path.join(" → ");

          // Match by partial path segments instead of full string
          if (err.path.includes("quiz") && err.path.includes("prompt")) {
            return "Quiz prompt is missing — please add a question intro.";
          }

          if (err.path.includes("quiz") && err.path.includes("questions") && err.path.includes("correct")) {
            return "One of your quiz questions is missing a correct answer.";
          }

          return `${rawPath}: ${err.message}`;
        });
        formattedErrors.forEach((msg) => {
          toast.error(msg);
        });
        return;
      }

      const validatedModule = result.data;
      	const {errors, data} = await saveModule(validatedModule, courseId)
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
