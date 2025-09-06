import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"
import {date_formater} from "@/lib/date-formatter"

export async function CurrentTemplate({template}) {
  return (
    <div className="w-full flex items-center justify-between mx-auto px-4 py-6 border border-border rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <Image src={template.thumbnail} alt={"current template"} width={200} height={200} className="object-cover overflow-hidden rounded-xl h-40 w-48" />
        <div className="flex flex-col justify-between gap-4 h-[100%]">
          <h3 className="rounded-full bg-green-900 text-green-300 text-sm px-2 py-1">Current Template</h3>
          <p className="font-semibold text-lg">{template.name}</p>
          <p className="text-muted-foreground text-sm">Last update: {date_formater(template.updated_at)}</p>
        </div>
      </div>
      <div>
        <Button asChild>
          <Link href={"/edit/website"}>Customize</Link>
        </Button>
      </div>
    </div>
  )
}
