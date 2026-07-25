import { createContext, useContext } from "react";

export interface Operation{
    name: string
    details?: string
}

export interface LoaderContextValue {
  startWaiting: (operation: Operation) => void;
  stopWaiting: (operationName: string) => void;
  waiting:  boolean;
  title: string | null
  details?: string
}

export const LoaderContext = createContext<LoaderContextValue | null>(null);

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useLoader must be used within <LoaderProvider>");
  return ctx;
}
