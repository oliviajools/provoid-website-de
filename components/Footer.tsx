import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="relative w-full border-t mt-24 md:mt-32">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent pointer-events-none" style={{ height: '150%', bottom: 0 }} />
      <div className="container px-4 md:px-6 lg:px-8 pt-6 pb-4 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-provoid-svg.svg"
                alt="PROVOID Logo"
                width={48}
                height={48}
                className="w-12 h-12"
                priority
              />
              <h3 className="text-lg font-semibold text-primary">PROVOID</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              no brain no gain
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
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Kontakt</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>oliviabahr@avoid-procrastination-provoid.com</li>
              <li>+49 1744401044</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PROVOID. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/kontakt" className="text-muted-foreground hover:text-primary transition-colors">
              Kontakt
            </Link>
            <Link href="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
              Datenschutz
            </Link>
            <Link href="/impressum" className="text-muted-foreground hover:text-primary transition-colors">
              Impressum TESTING
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
