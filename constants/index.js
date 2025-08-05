import { BookMarked, Home, TvMinimal, Users } from "lucide-react";


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
    icon: BookMarked,
    label: "Course",
    href: "/dashboard/course"
  },
  {
    icon: TvMinimal,
    label: "Website",
    href: "/dashboard/website"
  }
]
