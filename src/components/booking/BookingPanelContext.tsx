"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type BookingPanelContextValue = {
  isOpen: boolean;
  /** Set when the panel is opened from the "Una carta, una señal" CTA. */
  deckSummary: string[] | null;
  open: (deckSummary?: string[]) => void;
  close: () => void;
};

const BookingPanelContext = createContext<BookingPanelContextValue | null>(null);

export function BookingPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deckSummary, setDeckSummary] = useState<string[] | null>(null);

  const value = useMemo(
    () => ({
      isOpen,
      deckSummary,
      open: (summary?: string[]) => {
        setDeckSummary(summary ?? null);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
        setDeckSummary(null);
      },
    }),
    [isOpen, deckSummary]
  );

  return (
    <BookingPanelContext.Provider value={value}>
      {children}
    </BookingPanelContext.Provider>
  );
}

export function useBookingPanel() {
  const ctx = useContext(BookingPanelContext);
  if (!ctx) {
    throw new Error("useBookingPanel must be used within a BookingPanelProvider");
  }
  return ctx;
}
