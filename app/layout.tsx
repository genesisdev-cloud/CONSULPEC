import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consulpec | Inteligencia aplicada al campo',
  description: 'Relevamiento, mapeo, proyectos de intensificación, acompañamiento técnico e insumos para el campo paraguayo.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
