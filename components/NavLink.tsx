"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className = "", onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const base =
    "text-sm font-medium px-3 py-2 rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";
  // Subtle hover like before: light bg and soft blue border on hover
  const inactive = "text-foreground/90 border-transparent hover:bg-primary/10 hover:border-primary/30 hover:text-foreground";
  const active = "border-primary";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${isActive ? active : inactive} ${className}`}
    >
      {children}
    </Link>
  );
}
