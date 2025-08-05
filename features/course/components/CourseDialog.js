import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CourseForm } from "./CourseForm";


export function CourseDialog({open, onOpenChange, course}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{course?.id ? "Edit course" : "Create course"}</DialogTitle>
        </DialogHeader>
        <CourseForm course={course} close={() => onOpenChange(false)}/>
      </DialogContent>
    </Dialog>
  )
}
