import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-text-primary">PROVOID</span>
              <span className="text-sm tracking-widest text-text-muted uppercase mt-1">no brain. no gain.</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-text-primary hover:text-text-secondary transition-colors">Home</Link></li>
              <li><Link href="/company" className="text-sm text-text-primary hover:text-text-secondary transition-colors">Company</Link></li>
              <li><Link href="/sports" className="text-sm text-text-primary hover:text-text-secondary transition-colors">Sports</Link></li>
              <li><Link href="/insights" className="text-sm text-text-primary hover:text-text-secondary transition-colors">Neuro-Insights</Link></li>
              <li><Link href="/about" className="text-sm text-text-primary hover:text-text-secondary transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li><a href="mailto:olivia@provoid.de" className="text-sm text-text-primary hover:text-text-secondary transition-colors">olivia@provoid.de</a></li>
              <li><a href="tel:+491744401044" className="text-sm text-text-primary hover:text-text-secondary transition-colors">+49 174 440 1044</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li><Link href="/kontakt" className="text-sm text-text-primary hover:text-text-secondary transition-colors">Kontakt</Link></li>
              <li><Link href="/datenschutz" className="text-sm text-text-primary hover:text-text-secondary transition-colors">Datenschutz</Link></li>
              <li><Link href="/impressum" className="text-sm text-text-primary hover:text-text-secondary transition-colors">Impressum</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <p className="text-sm text-text-muted">© {new Date().getFullYear()} PROVOID. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
