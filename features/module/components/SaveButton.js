"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { saveModule } from "../actions/save-module";
import { useModuleBuilder } from "../context/moduleBuilderContext";
import { modulesSchema } from "../schema/quiz-schema";

export const SaveButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { modules, courseId } = useModuleBuilder();

  async function saveData() {
    if (!modules || modules.length === 0) {
      toast.error("No modules to save");
      return;
    }

    setIsLoading(true);

    // Ensure module and content positions are numbered and consistent
    const modulesWithPosition = modules.map((mod, modIdx) => {
      const contents = (mod.contents || []).map((c, contentIdx) => ({
        ...c,
        position: contentIdx,
      }));
      return {
        ...mod,
        position: modIdx,
        contents,
      };
    });
    console.log(modulesWithPosition, "from save button")

    // Validate with Zod
    const result = modulesSchema.safeParse(modulesWithPosition);

    if (!result.success) {
      // Gather and present friendly errors
      const issues = result.error.issues || [];
      if (issues.length === 0) {
        toast.error("Validation failed.");
        setIsLoading(false);
        return;
      }

      // Deduplicate messages
      const messages = [];
      issues.forEach((issue) => {
        const path = issue.path.join(" → ");
        // friendly mappings
        if (issue.path.includes("contents") && issue.path.includes("content_type")) {
          messages.push(`A content item is missing a valid content_type (LESSON or QUIZ).`);
          return;
        }
        if (issue.path.includes("contents") && issue.path.includes("quiz") && issue.path.includes("prompt")) {
          messages.push("A quiz is missing a prompt.");
          return;
        }
        if (issue.path.includes("contents") && issue.path.includes("quiz") && issue.path.includes("questions")) {
          console.log(issue)
          messages.push("One of your quizzes is missing questions or has invalid questions.");
          return;
        }
        messages.push(`${path}: ${issue.message}`);
      });

      // show unique
      Array.from(new Set(messages)).forEach((m) => toast.error(m));
      setIsLoading(false);
      return;
    }

    // If valid, call server action
    try {
      const validatedModule = result.data;
      const { errors, data } = await saveModule(validatedModule, courseId);
      setIsLoading(false);
      if (errors) {
        toast.error(errors.message || "Failed to save modules");
      } else {
        toast.success("Successfully saved modules");
      }
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save modules");
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={saveData} disabled={isLoading}>
      {isLoading ? "Saving..." : "Save"}
    </Button>
  );
};
