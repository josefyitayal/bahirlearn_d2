"use client";

import Sections from "@/sections.json";
import { useState } from "react";
import { ComponentSwitcher } from "@/lib/componentSwitcher";

export default function Preview() {
  const [index, setIndex] = useState(0);

  const total = Sections.length;
  const section = Sections[index];

  const nextComponent = () => {
    setIndex((prev) => (prev + 1) % total); // loop forward
  };

  const prevComponent = () => {
    setIndex((prev) => (prev - 1 + total) % total); // loop backward
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex gap-4">
        <button
          onClick={prevComponent}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={nextComponent}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      <h1 className="text-xl font-bold">{section?.name}</h1>

      <div className="w-full border rounded-xl shadow p-4">
        <ComponentSwitcher section={section} />
      </div>
    </div>
  );
}
