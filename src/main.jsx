import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Routes.jsx';
import "./index.css"
import AuthProvider from './Provider/AuthProvider/AuthProvider.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className=' font-font-family bg-secondary-100'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
