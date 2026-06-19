import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import './styles/index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  document.getElementById('root').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#060d1a;color:#94a3b8;font-family:sans-serif;text-align:center;padding:2rem">
      <div>
        <div style="font-size:2rem;margin-bottom:1rem">⚠️</div>
        <p style="color:white;font-size:1.1rem;margin-bottom:0.5rem">Missing Clerk configuration</p>
        <p style="font-size:0.85rem">VITE_CLERK_PUBLISHABLE_KEY is not set.<br>Add it to your Vercel environment variables and redeploy.</p>
      </div>
    </div>
  `
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </React.StrictMode>
  )
}
