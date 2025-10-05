"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">PROVOID</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/company" className="text-sm font-medium transition-colors hover:text-primary">
            Company
          </Link>
          <Link href="/sports" className="text-sm font-medium transition-colors hover:text-primary">
            Sports
          </Link>
        </nav>
      </div>
    </header>
  );
}
