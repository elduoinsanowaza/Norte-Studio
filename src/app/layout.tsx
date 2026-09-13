import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BookingPanelProvider } from "@/components/booking/BookingPanelContext";
import BookingPanel from "@/components/booking/BookingPanel";
import { SymptomsPanelProvider } from "@/components/symptoms/SymptomsPanelContext";
import SymptomsPanel from "@/components/symptoms/SymptomsPanel";
import FixedNav from "@/components/FixedNav";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norte-studio.vercel.app"),
  title: "Norte Studio — Infraestructura digital para negocios",
  description:
    "Las empresas no dejan de crecer por falta de esfuerzo. Dejan de crecer porque resuelven los problemas equivocados. Norte Studio construye la infraestructura digital que tu empresa necesita.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${cormorantGaramond.variable} antialiased`}
    >
      <body>
        <LenisProvider>
          <BookingPanelProvider>
            <SymptomsPanelProvider>
              {children}
              <FixedNav />
              <BookingPanel />
              <SymptomsPanel />
            </SymptomsPanelProvider>
          </BookingPanelProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
