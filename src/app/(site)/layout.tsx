import { BookingPanelProvider } from "@/components/booking/BookingPanelContext";
import BookingPanel from "@/components/booking/BookingPanel";
import { SymptomsPanelProvider } from "@/components/symptoms/SymptomsPanelContext";
import SymptomsPanel from "@/components/symptoms/SymptomsPanel";
import FixedNav from "@/components/FixedNav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingPanelProvider>
      <SymptomsPanelProvider>
        {children}
        <FixedNav />
        <BookingPanel />
        <SymptomsPanel />
      </SymptomsPanelProvider>
    </BookingPanelProvider>
  );
}
