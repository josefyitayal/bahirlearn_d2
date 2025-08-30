"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Plus} from "lucide-react"

export function CreateModule({onCreate}) {
  const [tabValue, setTabValue] = useState("lesson")
  const [lessonName, setLessonName] = useState("Lesson")
  const [lessonDescription, setLessonDescription] = useState("")
  const [quizName, setQuizName] = useState("Quiz")
  const [quizDescription, setQuizDescription] = useState("")

  function handleCreate() {
    if (tabValue === "lesson") {
      if (lessonName) {
        onCreate(tabValue, {title: lessonName, description: lessonDescription})
      }
    }else {
      if (quizName) {
        onCreate(tabValue, {title: quizName, description: quizDescription})
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon"><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create {tabValue === "lesson" ? "Lesson" : "Quiz"}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Tabs value={tabValue} onValueChange={(value) => setTabValue(value)} className="">
            <TabsList>
              <TabsTrigger value="lesson">Lesson</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="lesson" className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="input-title">Title</Label>
                <Input id="input-title" value={lessonName} onChange={(v) => setLessonName(v.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="input-description">Description <span className="text-sm text-muted-foreground">(option)</span></Label>
                <Input id="input-description" value={lessonDescription} onChange={(v) => setLessonDescription(v.target.value)}/>
              </div>
            </TabsContent>
            <TabsContent value="quiz" className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="input-quiz-name">Quiz name</Label>
                <Input id="input-quiz-name" value={quizName} onChange={(v) => setQuizName(v.target.value)}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="input-quiz-description">Description <span className="text-sm text-muted-foreground">(option)</span></Label>
                <Input id="input-quiz-description" value={quizDescription} onChange={(v) => setQuizDescription(v.target.value)}/>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
