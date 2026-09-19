import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caetano's Conveniência — Bebidas geladas, gelo, carvão e tudo pra resenha",
  description:
    "Rede de conveniência e depósito de bebidas com 3 unidades. Cerveja estupidamente gelada, destilados, energéticos, gelo, carvão e snacks. Parou na Caetano's, a noite está garantida.",
  keywords: [
    "conveniência",
    "depósito de bebidas",
    "cerveja gelada",
    "distribuidora",
    "churrasco",
    "caetanos",
  ],
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable}`}>
      <body className="bg-night font-sans text-bone antialiased">{children}</body>
    </html>
  );
}
