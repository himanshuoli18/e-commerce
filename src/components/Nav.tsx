"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, ReactNode } from "react"

export function Nav({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center mt-4 fixed inset-x-1 top-0 z-10 drop-shadow-[0_35px_35px_rgba(0,0,34,0.75)]">
        <nav className="bg-primary text-primary-foreground rounded-full font-bold w-2/3 flex justify-center px-4">
          {children}
        </nav>
    </div>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "p-4 rounded-md my-2 mx-1 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  )
}