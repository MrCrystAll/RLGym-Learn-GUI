import { useNotifications } from "../hooks/useNotifications";
import {ToastContainer as BSToastContainer} from "react-bootstrap"
import ToastItem from "./NotificationToast";

export function NotificationContainer() {
  const { notifications, dismissNotification } = useNotifications();
 
  return (
    <BSToastContainer
      position="bottom-end"
      containerPosition="fixed"
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      {notifications.map((n) => (
        <ToastItem
          key={n.id}
          id={n.id}
          title={n.title}
          message={n.message}
          severity={n.severity}
          duration={n.duration ?? 5000}
          exiting={n.exiting}
          onDismiss={dismissNotification}
        />
      ))}
    </BSToastContainer>
  );
}

