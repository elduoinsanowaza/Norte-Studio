import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BookingPanelProvider } from "@/components/booking/BookingPanelContext";
import BookingPanel from "@/components/booking/BookingPanel";
import FixedCtaButton from "@/components/booking/FixedCtaButton";
import ClientPortalButton from "@/components/ClientPortalButton";
import { SymptomsPanelProvider } from "@/components/symptoms/SymptomsPanelContext";
import SymptomsPanel from "@/components/symptoms/SymptomsPanel";
import MazoButton from "@/components/symptoms/MazoButton";
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
  title: "Norte Studio — Dirección externa de crecimiento",
  description:
    "Las empresas no dejan de crecer por falta de esfuerzo. Dejan de crecer porque resuelven los problemas equivocados. Norte Studio identifica el verdadero cuello de botella de tu empresa.",
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
              <div className="fixed top-ns-2 right-ns-2 z-40 flex items-center gap-ns-1 sm:gap-ns-2">
                <ClientPortalButton />
                <MazoButton />
                <FixedCtaButton />
              </div>
              <BookingPanel />
              <SymptomsPanel />
            </SymptomsPanelProvider>
          </BookingPanelProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
