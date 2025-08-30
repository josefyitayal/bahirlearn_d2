"use client";

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export default function QuizEditor({ value, onChange }) {
  const { prompt, questions } = value;
  const [selectedId, setSelectedId] = useState(
    questions[0]?.id || null
  );

  // whenever questions change, update selected if needed
  useEffect(() => {
    if (!questions.find(q => q.id === selectedId)) {
      setSelectedId(questions[0]?.id || null);
    }
  }, [questions, selectedId]);

  const selected = questions.find(q => q.id === selectedId);

  const update = (newValue) => {
    onChange({ ...value, ...newValue });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      text: "",
      options: [
        { id: uuidv4(), text: "" }
      ]
    };
    const updatedQuestions = [...questions, newQuestion];
    update({ questions: updatedQuestions });
    setSelectedId(newQuestion.id); // ✅ show new question immediately
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    update({ questions: updatedQuestions });
    if (id === selectedId) {
      setSelectedId(updatedQuestions[0]?.id || null);
    }
  };

  const updateQuestionText = (id, text) => {
    update({
      questions: questions.map((q) => (q.id === id ? { ...q, text } : q)),
    });
  };

  const addOption = (id) => {
    update({
      questions: questions.map((q) =>
        q.id === id
          ? {
            ...q,
            options: [...q.options, { id: uuidv4(), text: "" }],
          }
          : q
      ),
    });
  };

  const updateOption = (qId, oId, text) => {
    update({
      questions: questions.map((q) =>
        q.id === qId
          ? {
            ...q,
            options: q.options.map((o) => (o.id === oId ? { ...o, text } : o)),
          }
          : q
      ),
    });
  };

  const deleteOption = (qId, oId) => {
    update({
      questions: questions.map((q) =>
        q.id === qId
          ? {
            ...q,
            options: q.options.filter((o) => o.id !== oId),
            correct: q.correct === oId ? undefined : q.correct,
          }
          : q
      ),
    });
  };

  const setCorrect = (qId, oId) => {
    update({
      questions: questions.map((q) => {
        if (q.id !== qId) return q;

        const correctIndex = q.options.findIndex((opt) => opt === oId);
        return { ...q, correct: correctIndex };
      }),
    });
  };


  return (
    <div className="p-6 space-y-6">
      {/* Prompt */}
      <div>
        <label className="text-sm font-medium">Question prompt</label>
        <Input
          placeholder="Enter global quiz prompt..."
          value={prompt}
          onChange={(e) => update({ prompt: e.target.value })}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Editor */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>
              {selected ? `Editing ${questions.findIndex(item => item.id === selected.id) + 1}` : "No Question Selected"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selected && (
              <>
                <Input
                  placeholder="Question text..."
                  value={selected.text}
                  onChange={(e) => updateQuestionText(selected.id, e.target.value)}
                />

                {/* Options */}
                <div className="space-y-3">
                  {selected.options.map((opt, index) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      {/* Radio button for correct answer */}
                      <input
                        type="radio"
                        name={`correct-${selected.id}`}
                        checked={selected.correct === index}
                        onChange={() => setCorrect(selected.id, opt)}
                        className="h-4 w-4 accent-primary"
                      />

                      <Input
                        placeholder="Option..."
                        value={opt.text}
                        onChange={(e) => updateOption(selected.id, opt.id, e.target.value)}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteOption(selected.id, opt.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addOption(selected.id)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Questions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Questions
              <Button size="icon" variant="outline" onClick={addQuestion}>
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-sm transition",
                    selectedId === q.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <button onClick={() => setSelectedId(q.id)} className="flex-1 text-left">
                    {idx + 1}: {q.text || "Untitled question"}
                  </button>
                  <Button size="icon" variant="ghost" onClick={() => deleteQuestion(q.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
