import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ShopifyApp from './ShopifyApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopifyApp />
  </StrictMode>,
)
