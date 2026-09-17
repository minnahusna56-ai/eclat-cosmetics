import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { StoreProvider } from './context/StoreContext.jsx'
import './index.css'

// Vite injects BASE_URL from `base` in vite.config.js ('/eclat-cosmetics/' in
// the GitHub Pages build, '/' during local dev). React Router's basename must
// not include a trailing slash, so strip it.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)
