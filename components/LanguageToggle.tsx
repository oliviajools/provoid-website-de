"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Switch language / Sprache wechseln"
      className={`flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold tracking-wide text-text-primary transition-colors hover:border-primary-accent hover:text-primary-accent ${className}`}
    >
      <span className={language === "de" ? "text-primary-accent" : ""}>DE</span>
      <span className="text-text-primary/40">/</span>
      <span className={language === "en" ? "text-primary-accent" : ""}>EN</span>
    </button>
  );
}
