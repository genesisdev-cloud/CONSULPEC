import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const PDF_PATH = '/catalogo-consulpec.pdf';
const WHATSAPP_MESSAGE = 'Hola Consulpec, he visto el catálogo en su página web y estoy interesado en un producto';
const WHATSAPP_URL = `https://wa.me/595971164885?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Catálogo de componentes y accesorios para alambrado eléctrico de Consulpec.',
  alternates: {
    canonical: '/catalogo',
  },
  openGraph: {
    title: 'Catálogo de productos | Consulpec',
    description: 'Componentes y accesorios para alambrado eléctrico disponibles en Consulpec.',
    url: '/catalogo',
    type: 'website',
  },
};

export default function CatalogoPage() {
  return (
    <main className="catalog-page">
      <header className="catalog-bar">
        <Link className="catalog-back" href="/"><ArrowLeft size={17}/>Volver al sitio</Link>
        <Link className="catalog-brand" href="/" aria-label="Consulpec — Inicio"><Image src="/logo-consulpec-mark.png" alt="Consulpec" width={56} height={56} priority /></Link>
        <a className="catalog-open" href={PDF_PATH} target="_blank" rel="noreferrer">Abrir PDF<ExternalLink size={14}/></a>
      </header>
      <section className="catalog-pages" aria-label="Catálogo completo de productos Consulpec">
        <h1>Catálogo de productos</h1>
        <p>8 páginas · Deslizá para ver todos los productos. Tocá una página para ampliarla.</p>
        {Array.from({ length: 8 }, (_, index) => (
          <figure className="catalog-sheet" key={index}>
            <a href={`/images/catalogo/pagina-${index + 1}.jpg`} target="_blank" rel="noreferrer" aria-label={`Ampliar página ${index + 1} del catálogo`}>
              <Image src={`/images/catalogo/pagina-${index + 1}.jpg`} alt={`Catálogo de Consulpec, página ${index + 1} de 8`} width={1800} height={1273} sizes="(max-width: 1000px) 100vw, 1000px" priority={index === 0} />
            </a>
            <figcaption>Página {index + 1} de 8</figcaption>
          </figure>
        ))}
      </section>
      <a className="catalog-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Consultar productos por WhatsApp" title="Consultar por WhatsApp">
        <Image src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" width={27} height={27} unoptimized />
      </a>
    </main>
  );
}
