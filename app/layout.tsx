import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://consulpec.com.py';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Consulpec',
  url: siteUrl,
  logo: `${siteUrl}/logo-consulpec-mark.png`,
  email: 'comercial@consulpec.com.py',
  telephone: '+595971164885',
  description: 'Consultoría, relevamiento, mapeo y acompañamiento técnico para el campo paraguayo.',
  areaServed: {
    '@type': 'Country',
    name: 'Paraguay',
  },
  sameAs: ['https://www.instagram.com/consulpecpy/'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+595971164885',
    email: 'comercial@consulpec.com.py',
    contactType: 'customer service',
    areaServed: 'PY',
    availableLanguage: ['Spanish', 'English', 'Portuguese'],
  },
};

export const metadata: Metadata = {
  title: {
    default: 'Consulpec | Inteligencia aplicada al campo',
    template: '%s | Consulpec',
  },
  description: 'Relevamiento, mapeo, proyectos de intensificación y acompañamiento técnico para el campo paraguayo.',
  applicationName: 'Consulpec',
  authors: [{ name: 'Consulpec', url: siteUrl }],
  creator: 'Consulpec',
  publisher: 'Consulpec',
  keywords: [
    'Consulpec',
    'consultoría agropecuaria Paraguay',
    'alambrado eléctrico',
    'relevamiento de parcelas',
    'intensificación ganadera',
    'mapeo de campo',
  ],
  icons: {
    icon: [{ url: '/logo-consulpec-mark.png', type: 'image/png' }],
    shortcut: '/logo-consulpec-mark.png',
    apple: '/logo-consulpec-mark.png',
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
