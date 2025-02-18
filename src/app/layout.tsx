import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Manrope } from 'next/font/google'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Escala | Conectando médicos a oportunidades de plantão',
    template: '%s | Escala'
  },
  description: 'Encontre plantões médicos disponíveis de forma simples e rápida. Conectamos médicos a oportunidades ideais, sem burocracia e sem contratos.',
  keywords: 'plantões médicos, vagas médicas, oportunidades médicas, escala médica, plantão hospitalar',
  authors: [{ name: 'Escala' }],
  creator: 'Escala',
  publisher: 'Escala',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://escala.com.br',
    title: 'Escala | Conectando médicos a oportunidades de plantão',
    description: 'Encontre plantões médicos disponíveis de forma simples e rápida. Sem burocracia, sem contratos.',
    siteName: 'Escala',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
