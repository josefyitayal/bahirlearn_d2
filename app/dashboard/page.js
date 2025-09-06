import { DashboardNav } from "@/components/shared/DashboardNav";
import SimpleContainer from "@/components/shared/SimpleContainer";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-3">
      <DashboardNav title={"Overview"}></DashboardNav>
      <div className="grid grid-cols-3 gap-3">
        <SimpleContainer className={"flex flex-col gap-5 w-full"}>
          <h3 className="font-medium text-lg">Total Members</h3>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">14</h2>
            <p className="text-sm text-muted-foreground">+7% last month</p>
          </div>
        </SimpleContainer>
        <SimpleContainer className={"flex flex-col gap-5 w-full"}>
          <h3 className="font-medium text-lg">Total Members</h3>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">14</h2>
            <p className="text-sm text-muted-foreground">+7% last month</p>
          </div>
        </SimpleContainer>
        <SimpleContainer className={"flex flex-col gap-5 w-full"}>
          <h3 className="font-medium text-lg">Total Members</h3>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">14</h2>
            <p className="text-sm text-muted-foreground">+7% last month</p>
          </div>
        </SimpleContainer>
      </div>
    </div>
  )
}
