import type { Metadata } from 'next';
import './globals.css';

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = productionHost
  ? `https://${productionHost}`
  : 'https://consulpec-paraguay.smrcartes.chatgpt.site';

export const metadata: Metadata = {
  title: 'Consulpec | Inteligencia aplicada al campo',
  description: 'Relevamiento, mapeo, proyectos de intensificación y acompañamiento técnico para el campo paraguayo.',
  icons: {
    icon: [{ url: '/logo-consulpec-mark.png', type: 'image/png' }],
    shortcut: '/logo-consulpec-mark.png',
    apple: '/logo-consulpec-mark.png',
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Consulpec | Inteligencia aplicada al campo',
    description: 'Decisiones de campo, hechas visibles. Consultoría, mapeo e intensificación para el campo paraguayo.',
    url: siteUrl,
    siteName: 'Consulpec Paraguay',
    locale: 'es_PY',
    type: 'website',
    images: [{ url: `${siteUrl}/og.png`, width: 1731, height: 909, alt: 'Consulpec — Inteligencia aplicada al campo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consulpec | Inteligencia aplicada al campo',
    description: 'Decisiones de campo, hechas visibles.',
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
