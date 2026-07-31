'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { ContactModal } from './ContactModal';

type ContactModalContextValue = {
  openContact: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={{ openContact: () => setOpen(true) }}>
      {children}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    // Falls back to a plain mailto link instead of crashing the page.
    // If you're seeing this in the console, <ContactModalProvider> isn't
    // wrapping this component — check app/layout.tsx.
    if (typeof window !== 'undefined') {
      console.warn('useContactModal: no <ContactModalProvider> found in the tree — falling back to mailto.');
    }
    return {
      openContact: () => {
        window.location.href = 'mailto:hello@karrycreative.studio';
      },
    };
  }
  return ctx;
}