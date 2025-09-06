"use client"

import {Button} from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { ArrowLeft } from 'lucide-react';

export function DashboardNav({
  children,
  back_button = false,
  title,
  border = false,
  className,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "w-full flex items-center justify-between h-14 px-4",
        "",
        border && "border-b border-gray-200",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {back_button && (
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}
