import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'

//import BrowserRouter dari react router
import { BrowserRouter } from 'react-router';

//import QueryClient dan QueryClientProvider dari react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

//init QueryClient
const queryClient = new QueryClient()

//import AuthProvider
import { AuthProvider } from './context/AuthContext';

//import ToastProvider dan ToastContainer
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer />
          </QueryClientProvider>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
