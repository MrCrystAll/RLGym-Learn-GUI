import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NotificationProvider } from './components/NotificationProvider.tsx';
import './index.css'
import { LoaderProvider } from './components/LoaderProvider.tsx';


createRoot(document.getElementById('root')!).render(
  process.env.NODE_ENV === "development"
    ? <StrictMode>
      <LoaderProvider>
        <NotificationProvider>
            <App />
          </NotificationProvider>
        </LoaderProvider>
        </StrictMode>
    : <LoaderProvider><NotificationProvider><App /></NotificationProvider></LoaderProvider>
)
