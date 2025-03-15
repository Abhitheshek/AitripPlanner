import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import {Routes , Route} from 'react-router'
import Index from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripid]/index'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
  <Header/>
  <Toaster/>
   <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-trip" element={<Index/>} />
      <Route path="/view-trip/:tripid" element={<ViewTrip/>} />
     
    </Routes>
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
