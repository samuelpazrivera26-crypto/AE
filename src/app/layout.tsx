import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ARIDA ERIUS — Nacidos en el Ruido",
  description:
    "Maison conceptual de streetwear. Cero gravedad, alquimia fría y ruido analógico.",
  icons: { icon: "/assets/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${syne.variable} ${jakarta.variable} font-body`}>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
