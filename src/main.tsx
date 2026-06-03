import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NotificationProvider } from './components/NotificationProvider.tsx';

createRoot(document.getElementById('root')!).render(
  process.env.NODE_ENV === "development"
    ? <StrictMode><NotificationProvider><App /></NotificationProvider></StrictMode>
    : <NotificationProvider><App /></NotificationProvider>
)
