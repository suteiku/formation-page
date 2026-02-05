import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FormationPage - Créez et vendez vos formations en ligne",
  description: "Plateforme tout-en-un pour créer et vendre des formations en ligne en moins de 10 minutes. Page de vente, paiements, espace membre - tout inclus.",
  keywords: ["formation en ligne", "vendre formation", "créer cours", "e-learning", "plateforme formation"],
  authors: [{ name: "FormationPage" }],
  openGraph: {
    title: "FormationPage - Créez et vendez vos formations en ligne",
    description: "Créez votre page de vente, recevez les paiements, et livrez votre formation - tout au même endroit.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-foreground`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
