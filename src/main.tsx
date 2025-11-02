import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
const client = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
)
