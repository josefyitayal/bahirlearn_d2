import { BookMarked, Home, TvMinimal, Users, Wallet } from "lucide-react";


export const sidebarItems = [
  {
    icon: Home,
    label: "Home",
    href: "/dashboard"
  },
  {
    icon: Users,
    label: "Members",
    href: "/dashboard/members"
  },
  {
    icon: Wallet,
    label: "Earn",
    href: "/dashboard/earn"
  },
  {
    icon: BookMarked,
    label: "Course",
    href: "/dashboard/course"
  },
  {
    icon: TvMinimal,
    label: "Customize",
    href: "/dashboard/customize"
  }
]
