"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function formatTimeLeft(timeLeft) {
  const days = Math.floor(timeLeft / (60 * 60 * 24))
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60)
  const seconds = timeLeft % 60
  return { days, hours, minutes, seconds }
}

export function CountdownTimer({ sectionData }) {
  const { heading, heading_alignment, targetDate, subtext } = sectionData

  const [timeLeft, setTimeLeft] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Ensure hydration-safe: skip rendering until mounted
    setMounted(true)

    const target = new Date(targetDate).getTime()
    const updateTime = () => {
      const now = Date.now()
      const diff = Math.floor((target - now) / 1000)
      setTimeLeft(diff > 0 ? diff : 0)
    }

    updateTime() // run initially
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) return null // Avoid hydration mismatch

  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft)

  return (
    <section className="w-full px-4 py-12 text-center">
      {heading && (
        <h2
          className={cn(
            "text-3xl font-bold mb-4",
            heading_alignment === "center"
              ? "text-center"
              : heading_alignment === "right"
              ? "text-right"
              : "text-left"
          )}
        >
          {heading}
        </h2>
      )}
      {subtext && (
        <p className="text-muted-foreground mb-8 text-sm">{subtext}</p>
      )}

      <div className="flex justify-center gap-4 flex-wrap">
        <Card className="p-4 w-20 sm:w-24 text-center">
          <div className="text-2xl font-bold">{days}</div>
          <div className="text-xs text-muted-foreground">Days</div>
        </Card>
        <Card className="p-4 w-20 sm:w-24 text-center">
          <div className="text-2xl font-bold">{hours}</div>
          <div className="text-xs text-muted-foreground">Hours</div>
        </Card>
        <Card className="p-4 w-20 sm:w-24 text-center">
          <div className="text-2xl font-bold">{minutes}</div>
          <div className="text-xs text-muted-foreground">Minutes</div>
        </Card>
        <Card className="p-4 w-20 sm:w-24 text-center">
          <div className="text-2xl font-bold">{seconds}</div>
          <div className="text-xs text-muted-foreground">Seconds</div>
        </Card>
      </div>
    </section>
  )
}
