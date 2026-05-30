import { useCallback, useRef, useState, type ReactNode } from "react";
import { NotificationContext, type AppNotification, type NotificationEntry } from "../hooks/useNotifications";

const EXIT_ANIMATION_MS = 350; // must match CSS transition duration
const DEFAULT_DURATION = 5000;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationEntry[]>([]);
  // Track auto-dismiss timers so we can cancel them on manual dismiss
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

    const removeAfterAnimation = useCallback((id: string) => {
        // Phase 1: mark as exiting → triggers CSS outro
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, exiting: true } : n))
        );
        // Phase 2: remove from state after animation completes
        const exitTimer = setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
            timers.current.delete(id);
        }, EXIT_ANIMATION_MS);
        timers.current.set(`exit-${id}`, exitTimer);
    }, []);

      const dismissNotification = useCallback(
        (id: string) => {
            // Cancel the auto-dismiss timer if still running
            const autoTimer = timers.current.get(id);
            if (autoTimer) {
                clearTimeout(autoTimer);
                timers.current.delete(id);
            }
            removeAfterAnimation(id);
        },
        [removeAfterAnimation]
    );

    const pushNotification = useCallback(
    (notification: Omit<AppNotification, "id">): string => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const duration = notification.duration ?? DEFAULT_DURATION;
 
      setNotifications((prev) => [...prev, { ...notification, id, exiting: false }]);
 
      if (duration > 0) {
        const timer = setTimeout(() => {
          timers.current.delete(id);
          removeAfterAnimation(id);
        }, duration);
        timers.current.set(id, timer);
      }
 
      return id;
    },
    [removeAfterAnimation]
  );

  return (
    <NotificationContext.Provider value={{ pushNotification, dismissNotification, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
}
