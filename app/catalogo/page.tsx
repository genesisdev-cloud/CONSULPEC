import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const PDF_PATH = '/catalogo-consulpec.pdf';
const WHATSAPP_MESSAGE = 'Hola Consulpec, eh visto el catálogo en su página web y estoy interesado en un producto';
const WHATSAPP_URL = `https://wa.me/595971164885?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const metadata: Metadata = {
  title: 'Catálogo | Consulpec',
  description: 'Catálogo de componentes y accesorios para alambrado eléctrico de Consulpec.',
};

export default function CatalogoPage() {
  return (
    <main className="catalog-page">
      <header className="catalog-bar">
        <Link className="catalog-back" href="/"><ArrowLeft size={17}/>Volver al sitio</Link>
        <Link className="catalog-brand" href="/" aria-label="Consulpec — Inicio"><Image src="/logo-consulpec-mark.png" alt="Consulpec" width={56} height={56} priority /></Link>
        <a className="catalog-open" href={PDF_PATH} target="_blank" rel="noreferrer">Abrir PDF<ExternalLink size={14}/></a>
      </header>
      <iframe className="catalog-viewer" src={`${PDF_PATH}#view=FitH`} title="Catálogo de productos Consulpec" />
      <a className="catalog-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Consultar productos por WhatsApp" title="Consultar por WhatsApp">
        <Image src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" width={27} height={27} unoptimized />
      </a>
    </main>
  );
}
