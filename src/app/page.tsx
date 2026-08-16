import Hero from "@/components/sections/Hero";
import BottleSection from "@/components/sections/BottleSection";
import Method from "@/components/sections/Method";
import Cases from "@/components/sections/Cases";
import Tools from "@/components/sections/Tools";
import Objections from "@/components/sections/Objections";
import Closing from "@/components/sections/Closing";
import DiagnosticoInicial from "@/components/sections/DiagnosticoInicial";
import ColorTransition from "@/components/ColorTransition";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <BottleSection />
        <ColorTransition from="white" to="black" />
        <Method />
        <Cases />
        <Tools />
        <ColorTransition from="black" to="white" />
        <Objections />
        <ColorTransition from="white" to="black" />
        <Closing />
        <ColorTransition from="black" to="white" />
        <DiagnosticoInicial />
        <ColorTransition from="white" to="black" />
      </main>
      <Footer />
    </>
  );
}
