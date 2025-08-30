"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {Button} from "@/components/ui/button"
import { CirclePlus } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import sections from "@/sections.json"
import useWebsiteBuilder from "../store/websiteStore";

const fullSections = [
  {
    id: "hero-section",
    image: "/placeholder.svg"
  },
  {
    id: "about-instractor",
    image: "/placeholder.svg"
  },
  {
    id: "course-features",
    image: "/placeholder.svg"
  },
  {
    id: "testimonials",
    image: "/placeholder.svg"
  },
  {
    id: "course-list",
    image: "/placeholder.svg"
  },
  {
    id: "featured-course",
    image: "/placeholder.svg"
  },
  {
    id: "faq",
    image: "/placeholder.svg"
  },
  {
    id: "call-to-action",
    image: "/placeholder.svg"
  },
  {
    id: "multi-column-info",
    image: "/placeholder.svg"
  },
  {
    id: "countdown-timer",
    image: "/placeholder.svg"
  },
  {
    id: "curriculum-overview",
    image: "/placeholder.svg"
  },
  {
    id: "stats-section",
    image: "/placeholder.svg"
  },
]

export function AddSectionButton() {
  const [hovered, setHovered] = useState(null);
  const [search, setSearch] = useState("");
  const addSection = useWebsiteBuilder((state) => state.addSection)

  const mergedSection = sections
  .filter((layer) => {
    const match = fullSections.find((item) => item.id === layer.id);
    return !layer.is_locked && match;
  })
  .map((layer) => {
    const match = fullSections.find((item) => item.id === layer.id);
    return {
      id: layer.id,
      name: layer.name,
      image: match.image,
    };
  });


  const filtered = mergedSection.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  
  function handleSectionClicked(sectionId) {
    addSection(sectionId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full flex justify-center">
        <Button variant="icon" className="">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Settings Dialog</DialogTitle>
        </VisuallyHidden>
        <div className="flex h-[400px]">
          {/* Left: Search + List */}
          <div className="w-1/2 border-r p-4">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <ScrollArea className="h-[320px]">
              <div className="flex flex-col gap-2 items-center">
                {filtered.map((item) => (
                  <Button
                    key={item.id}
                    variant={"outline"}
                    onClick={() => handleSectionClicked(item.id)}
                    onMouseEnter={() => setHovered(item.image)}
                    className={cn(
                      "px-3 py-2 rounded-md cursor-pointer hover:bg-muted transition w-full"
                    )}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right: Image Preview */}
          <div className="w-1/2 flex items-center justify-center bg-muted">
            {hovered ? (
              <img
                src={hovered}
                alt="Preview"
                className="max-h-[300px] rounded-md object-cover"
              />
            ) : (
              <p className="text-muted-foreground">Hover an item to preview</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
