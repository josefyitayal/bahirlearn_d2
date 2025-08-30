
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import clsx from "clsx"
import {Menu} from "lucide-react"


const defaultLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar({ sectionData, links=defaultLinks, ...props }) {
  const alignmentMap = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }

  const navAlignment = alignmentMap[sectionData.links_alignment] || "justify-center"

  return (
    <nav
      {...props}
      className={clsx(
        "w-full px-6 py-4 bg-white border-b z-50",
        sectionData.is_sticky && "sticky top-0 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-primary">
          CourseSite
        </Link>

        {/* Desktop Nav Links */}
        <div className={clsx("hidden md:flex flex-1", navAlignment)}>
          <div className="flex gap-3">
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                <Button variant="link" className="text-md text-gray-700 hover:text-primary">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Login */}
        <div className="hidden md:block">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-lg">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {links.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <Button variant="ghost" className="w-full justify-start">
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/login">
                  <Button variant="default" className="w-full mt-4">
                    Login
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
