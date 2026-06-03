import { useEffect, useState } from "react";
import type { NotificationSeverity } from "../hooks/useNotifications";
import { Toast } from "react-bootstrap";

// Map your severity to Bootstrap's bg variant
const variantMap: Record<NotificationSeverity, string> = {
  error:   "danger",
  warning: "warning",
  info:    "info",
  success: "success",
};
 
// Map severity to a readable label for the toast header
const labelMap: Record<NotificationSeverity, string> = {
  error:   "Error",
  warning: "Warning",
  info:    "Info",
  success: "Success",
};
 
interface ToastItemProps {
  id: string;
  title?: string;
  message: string;
  severity: NotificationSeverity;
  duration: number;
  exiting: boolean;
  onDismiss: (id: string) => void;
}
 
function ToastItem({ id, title, message, severity, duration, exiting, onDismiss }: ToastItemProps) {
  const [show, setShow] = useState(false);
 
  // Trigger enter on next frame so Bootstrap's fade transition fires
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, []);
 
  // When the parent marks this as exiting, hide it (triggers fade-out)
  useEffect(() => {
    if (exiting) setShow(false);
  }, [exiting]);
 
  return (
    <Toast
      show={show}
      onClose={() => onDismiss(id)}
      autohide={duration > 0}
      delay={duration}
      bg={variantMap[severity]}
      className="text-white"
    >
      <Toast.Header closeVariant="white" className={`bg-${variantMap[severity]} text-white border-0`}>
        <strong className="me-auto">{title ?? labelMap[severity]}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastItem