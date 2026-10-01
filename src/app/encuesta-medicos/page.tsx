import type { Metadata } from "next";
import "./encuesta.css";
import EncuestaWizard from "@/components/encuestaMedicos/EncuestaWizard";

export const metadata: Metadata = {
  title: "Encuesta · Médicos en Durango — Norte Studio",
  description:
    "5 minutos sobre cómo arrancas o haces crecer tu consulta privada en Durango. Responde y llévate 5% de descuento en la primera renta de tu próximo consultorio.",
  robots: { index: false, follow: false },
};

export default function EncuestaMedicosPage() {
  return <EncuestaWizard />;
}
