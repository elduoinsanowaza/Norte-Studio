import type { Metadata } from "next";
import "./encuesta.css";
import EncuestaWizard from "@/components/encuestaMedicos/EncuestaWizard";

export const metadata: Metadata = {
  title: "Encuesta · Profesionales de la salud en Durango — Norte Studio",
  description:
    "Cinco minutos tuyos nos ayudan muchísimo. Responde y llévate 5% de descuento en la primera renta de tu próximo consultorio.",
  robots: { index: false, follow: false },
};

export default function EncuestaMedicosPage() {
  return <EncuestaWizard />;
}
