"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "./NavLink";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Image
            src="/logo-provoid-svg.svg"
            alt="PROVOID Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold text-primary">PROVOID</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/company">Company</NavLink>
          <NavLink href="/sports">Sports</NavLink>
          <div className="w-px h-6 bg-border mx-2" />
          <NavLink href="/health">Health</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-primary transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 flex flex-col gap-3">
            <NavLink href="/" className="text-base active:bg-primary/15 active:border-primary/40 rounded-md transition-colors" onClick={closeMenu}>Home</NavLink>
            <NavLink href="/company" className="text-base active:bg-primary/15 active:border-primary/40 rounded-md transition-colors" onClick={closeMenu}>Company</NavLink>
            <NavLink href="/sports" className="text-base active:bg-primary/15 active:border-primary/40 rounded-md transition-colors" onClick={closeMenu}>Sports</NavLink>
            <NavLink href="/health" className="text-base active:bg-primary/15 active:border-primary/40 rounded-md transition-colors" onClick={closeMenu}>Health</NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
