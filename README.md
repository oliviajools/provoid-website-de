# PROVOID Website

Eine moderne, responsive Website für PROVOID mit zwei Hauptbereichen: **PROVOID-Company** und **PROVOID-Sports**.

## 🚀 Technologie-Stack

- **Framework**: Next.js 15 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI-Komponenten**: shadcn/ui
- **Icons**: Lucide React
- **Primärfarbe**: #3DB8DE

## 📁 Projektstruktur

```
├── app/
│   ├── layout.tsx          # Root Layout mit Header & Footer
│   ├── page.tsx            # Landing Page
│   ├── company/
│   │   └── page.tsx        # PROVOID-Company Seite
│   ├── sports/
│   │   └── page.tsx        # PROVOID-Sports Seite
│   └── globals.css         # Globale Styles & Theme
├── components/
│   ├── ui/                 # shadcn/ui Komponenten
│   ├── Header.tsx          # Hauptnavigation
│   ├── Footer.tsx          # Footer mit Links
│   └── Section.tsx         # Wiederverwendbare Section-Komponente
└── lib/
    └── utils.ts            # Utility-Funktionen
```

## 🎨 Features

- ✅ Vollständig responsive Design (Mobile-First)
- ✅ Moderne UI mit shadcn/ui Komponenten
- ✅ Smooth Scrolling zu Seitenankern
- ✅ SEO-optimiert mit Metadata API
- ✅ Accessibility (WCAG AA konform)
- ✅ Dark Mode Support
- ✅ TypeScript für Type Safety
- ✅ Accordion-Komponenten für strukturierte Inhalte

## 🏃 Entwicklung starten

Installiere die Dependencies:

```bash
npm install
```

Starte den Development Server:

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 📄 Seiten

### Landing Page (/)
- Hero Section mit Willkommenstext
- 5 Informationssektionen:
  - Was ist PROVOID?
  - Was ist die Idee hinter PROVOID?
  - Was ist PROVOIDs Vision?
  - Geschichte von PROVOID
  - Wer ist PROVOID?
- CTA-Bereich mit zwei großen Karten für Company & Sports

### PROVOID-Company (/company)
Accordion-Sektionen:
- Ziel
- Vision
- Leistungen
- Pakete (4 verschiedene Pakete)
- Zielgruppe
- Science behind PROVOID
- Analysis

### PROVOID-Sports (/sports)
Accordion-Sektionen:
- Ziel
- Vision
- Leistungen
- Pakete (4 verschiedene Pakete)
- Zielgruppe
- Science behind PROVOID

## 🎨 Design-System

- **Primärfarbe**: `#3DB8DE` (als `primary` in Tailwind verfügbar)
- **Schriftarten**: Geist Sans & Geist Mono
- **Border Radius**: `rounded-2xl` für Cards
- **Spacing**: Konsistente Spacing-Scale
- **Shadows**: Subtile Schatten für Tiefe

## 🔧 Build & Deployment

Build für Produktion:

```bash
npm run build
```

Starte den Production Server:

```bash
npm start
```

## 📦 Dependencies

Hauptabhängigkeiten:
- `next`: ^15.5.4
- `react`: ^19.0.0
- `tailwindcss`: ^4.x
- `lucide-react`: Icons
- `@radix-ui/*`: UI Primitives für shadcn/ui

## ✅ Acceptance Criteria

- ✅ Responsive Design funktioniert auf allen Geräten
- ✅ Landing Page zeigt alle 5 Info-Blöcke + 2 CTAs
- ✅ Company/Sports Seiten zeigen alle Sektionen in Accordions
- ✅ Primärfarbe #3DB8DE wird konsistent verwendet
- ✅ Keine TypeScript-Fehler
- ✅ Gute Lighthouse-Scores für Accessibility, SEO & Performance

## 📝 Lizenz

© 2025 PROVOID. Alle Rechte vorbehalten.
# provoid-website-de
