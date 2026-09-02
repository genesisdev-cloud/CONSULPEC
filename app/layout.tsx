import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consulpec | Inteligencia aplicada al campo',
  description: 'Relevamiento, mapeo, proyectos de intensificación y acompañamiento técnico para el campo paraguayo.',
  metadataBase: new URL('https://consulpec-paraguay.smrcartes.chatgpt.site'),
  openGraph: {
    title: 'Consulpec | Inteligencia aplicada al campo',
    description: 'Decisiones de campo, hechas visibles. Consultoría, mapeo e intensificación para el campo paraguayo.',
    url: 'https://consulpec-paraguay.smrcartes.chatgpt.site',
    siteName: 'Consulpec Paraguay',
    locale: 'es_PY',
    type: 'website',
    images: [{ url: 'https://consulpec-paraguay.smrcartes.chatgpt.site/og.png', width: 1731, height: 909, alt: 'Consulpec — Inteligencia aplicada al campo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consulpec | Inteligencia aplicada al campo',
    description: 'Decisiones de campo, hechas visibles.',
    images: ['https://consulpec-paraguay.smrcartes.chatgpt.site/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
