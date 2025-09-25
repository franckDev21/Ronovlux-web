import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ronovlux Group - Excellence & Raffinement',
  description: 'Votre partenaire d&apos;exception pour la transformation de vos espaces avec granit, marbre, quartz, cuisines et salles de bains premium.',
  keywords: ['granit', 'marbre', 'quartz', 'cuisines', 'salles de bains', 'rénovation', 'premium', 'luxe'],
  authors: [{ name: 'Ronovlux Group' }],
  openGraph: {
    title: 'Ronovlux Group - Excellence & Raffinement',
    description: 'Votre partenaire d&apos;exception pour la transformation de vos espaces',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
