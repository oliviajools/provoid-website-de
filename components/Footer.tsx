import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">PROVOID</h3>
            <p className="text-sm text-muted-foreground">
              Innovative Lösungen für Unternehmen und Sport
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-muted-foreground hover:text-primary transition-colors">
                  PROVOID-Company
                </Link>
              </li>
              <li>
                <Link href="/sports" className="text-muted-foreground hover:text-primary transition-colors">
                  PROVOID-Sports
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Kontakt</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@provoid.de</li>
              <li>+49 (0) 123 456789</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PROVOID. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Datenschutz
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
