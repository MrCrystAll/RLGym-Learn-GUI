import { createContext, useContext } from "react";

export type NotificationSeverity = "error" | "warning" | "info" | "success";
 
export interface AppNotification {
  id: string;
  message: string;
  severity: NotificationSeverity;
  title?: string;
  duration?: number; // ms, 0 = sticky (manual dismiss only)
}
 
export interface NotificationEntry extends AppNotification {
  exiting: boolean; // true = playing outro animation, not yet removed
}
 
export interface NotificationContextValue {
  pushNotification: (notification: Omit<AppNotification, "id">) => string;
  dismissNotification: (id: string) => void;
  notifications: NotificationEntry[];
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within <NotificationProvider>");
  return ctx;
}
