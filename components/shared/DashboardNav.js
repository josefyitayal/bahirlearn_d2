"use client"

import {Button} from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { ArrowLeft } from 'lucide-react';

export function DashboardNav({children, back_button=false, title, border=false, props}) {
  return (
    <div {...props} className={cn("w-full flex items-center justify-between py-2", border && "border border-b")}>
      <div className="flex items-center gap-3">
        {back_button && (
          <Button variant="ghost">
            <ArrowLeft />
          </Button>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div> 
    </div>
  )
}
