"use client"

import {Button} from "@/components/ui/button"

export function DashboardNav({children, back_button=false, title}) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        {back_button && (
          <Button variant="ghost">
            Back
          </Button>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div>
        {children}
      </div> 
    </div>
  )
}
