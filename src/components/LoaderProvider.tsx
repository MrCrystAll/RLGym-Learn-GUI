import { useState, type ReactNode } from "react";
import { type Operation, LoaderContext } from "../hooks/useLoader";

export function LoaderProvider({ children }: { children: ReactNode }) {
    const [waiting, setWaiting] = useState<boolean>(false);
    const [title, setTitle] = useState<string | null>(null);
    const [details, setDetails] = useState<string | undefined>(undefined);

    const startWaiting = (operation: Operation) => {
        setTitle(operation.name)
        setDetails(operation.details);
        setWaiting(true)
    }

    const stopWaiting = (operationName: string) => {
        setWaiting(false);
        setTitle(null);
        setDetails(undefined);
    }

    return (
  <LoaderContext.Provider
    value={{
      startWaiting,
      stopWaiting,
      waiting: waiting,
      title: title,
      details: details
    }}
  >
    {children}
  </LoaderContext.Provider>
);
}