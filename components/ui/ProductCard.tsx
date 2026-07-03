import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
  accent?: boolean;
}

export function ProductCard({ title, description, cta, href, accent = false }: ProductCardProps) {
  return (
    <Link href={href} className={`border ${accent ? 'border-primary-accent' : 'border-border'} ${accent ? 'bg-surface' : 'bg-black'} p-8 rounded-card hover:${accent ? 'border-primary-accent' : 'border-primary-accent'} hover:shadow-lg hover:shadow-primary-accent/10 transition-all duration-300 hover:-translate-y-1 block`}>
      <h3 className={`text-2xl font-semibold mb-4 ${accent ? 'text-text-primary' : 'text-white'}`}>{title}</h3>
      <p className={`${accent ? 'text-text-secondary' : 'text-gray-300'} mb-6`}>{description}</p>
      <span className={`inline-flex items-center text-sm font-medium ${accent ? 'text-primary-accent' : 'text-primary-accent'} hover:text-primary-light transition-colors`}>
        {cta} →
      </span>
    </Link>
  );
}
