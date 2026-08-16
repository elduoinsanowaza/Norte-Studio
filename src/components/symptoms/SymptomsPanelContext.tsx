"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type SymptomsPanelContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** id of the symptom whose detail pop-up is open, if any. */
  detailId: number | null;
  openDetail: (id: number) => void;
  closeDetail: () => void;
};

const SymptomsPanelContext = createContext<SymptomsPanelContextValue | null>(null);

export function SymptomsPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => {
        setIsOpen(false);
        setDetailId(null);
      },
      detailId,
      openDetail: (id: number) => setDetailId(id),
      closeDetail: () => setDetailId(null),
    }),
    [isOpen, detailId]
  );

  return (
    <SymptomsPanelContext.Provider value={value}>
      {children}
    </SymptomsPanelContext.Provider>
  );
}

export function useSymptomsPanel() {
  const ctx = useContext(SymptomsPanelContext);
  if (!ctx) {
    throw new Error("useSymptomsPanel must be used within a SymptomsPanelProvider");
  }
  return ctx;
}
