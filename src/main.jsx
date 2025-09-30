import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import CartProvider from './Context/CartProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-serif bg-base-200 min-h-screen'>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </div>
  </StrictMode>,
)
