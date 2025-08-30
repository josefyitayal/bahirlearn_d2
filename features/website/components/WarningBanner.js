import { Button } from "@/components/ui/button";

export function WarningBanner() {
  return (
    <div className="flex items-center justify-between rounded-sm bg-orange-300 p-2">
      <p className="text-sm">Your website is password protected. To remove selecte plan.</p>
      <div className="flex items-center gap-3">
        <Button variant="link" className="text-sm">Manage password</Button>
        <Button className="text-sm">Select Plan</Button>
      </div>
    </div>
  )
}
