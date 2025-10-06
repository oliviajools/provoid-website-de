"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="PROVOID Logo"
            width={32}
            height={32}
            priority
          />
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
