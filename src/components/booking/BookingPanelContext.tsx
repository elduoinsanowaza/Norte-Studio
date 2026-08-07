"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type BookingPanelContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const BookingPanelContext = createContext<BookingPanelContextValue | null>(null);

export function BookingPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
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
