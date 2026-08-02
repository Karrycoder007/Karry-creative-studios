'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type LoaderContextValue = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <LoaderContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  // Fails safe: if used outside the provider, treat the page as already
  // loaded so animations still play rather than staying stuck hidden.
  if (!ctx) return { loaded: true, setLoaded: () => {} };
  return ctx;
}