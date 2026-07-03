"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/Logo-provoid.png" alt="PROVOID" className="h-8" />
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight text-text-primary">PROVOID</span>
            <span className="text-[0.6rem] tracking-widest text-primary-accent uppercase">no brain. no gain.</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={`text-sm font-medium ${isActive("/") ? "text-primary-accent" : "text-text-primary"} hover:text-primary-accent transition-colors`}>Home</Link>
          <Link href="/company" className={`text-sm font-medium ${isActive("/company") ? "text-primary-accent" : "text-text-primary"} hover:text-primary-accent transition-colors`}>Company</Link>
          <Link href="/sports" className={`text-sm font-medium ${isActive("/sports") ? "text-primary-accent" : "text-text-primary"} hover:text-primary-accent transition-colors`}>Sports</Link>
          <Link href="/insights" className={`text-sm font-medium ${isActive("/insights") ? "text-primary-accent" : "text-text-primary"} hover:text-primary-accent transition-colors`}>Neuro-Insights</Link>
          <Link href="/about" className={`text-sm font-medium ${isActive("/about") ? "text-primary-accent" : "text-text-primary"} hover:text-primary-accent transition-colors`}>About</Link>
          <Link href="/kontakt" className={`text-sm font-medium ${isActive("/kontakt") ? "text-primary-accent" : "text-text-primary"} hover:text-primary-accent transition-colors`}>Kontakt</Link>
        </nav>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-text-primary" aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-surface">
          <div className="container py-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-4">
              <img src="/Logo-provoid.png" alt="PROVOID" className="h-8" />
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-tight text-text-primary">PROVOID</span>
                <span className="text-[0.6rem] tracking-widest text-primary-accent uppercase">no brain. no gain.</span>
              </div>
            </div>
            <Link href="/" className={`text-sm font-medium ${isActive("/") ? "text-primary-accent" : "text-text-primary"}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/company" className={`text-sm font-medium ${isActive("/company") ? "text-primary-accent" : "text-text-primary"}`} onClick={() => setMobileMenuOpen(false)}>Company</Link>
            <Link href="/sports" className={`text-sm font-medium ${isActive("/sports") ? "text-primary-accent" : "text-text-primary"}`} onClick={() => setMobileMenuOpen(false)}>Sports</Link>
            <Link href="/insights" className={`text-sm font-medium ${isActive("/insights") ? "text-primary-accent" : "text-text-primary"}`} onClick={() => setMobileMenuOpen(false)}>Neuro-Insights</Link>
            <Link href="/about" className={`text-sm font-medium ${isActive("/about") ? "text-primary-accent" : "text-text-primary"}`} onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/kontakt" className={`text-sm font-medium ${isActive("/kontakt") ? "text-primary-accent" : "text-text-primary"}`} onClick={() => setMobileMenuOpen(false)}>Kontakt</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
