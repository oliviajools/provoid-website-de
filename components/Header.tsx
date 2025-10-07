"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
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
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-base font-medium transition-colors hover:text-primary py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/company" 
              className="text-base font-medium transition-colors hover:text-primary py-2"
              onClick={closeMenu}
            >
              Company
            </Link>
            <Link 
              href="/sports" 
              className="text-base font-medium transition-colors hover:text-primary py-2"
              onClick={closeMenu}
            >
              Sports
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
