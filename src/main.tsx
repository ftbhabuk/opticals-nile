import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import App from "./App"
import JourneyPage from "@/src/pages/journey"
import ShopPage from "@/src/pages/shop"
import FaqPage from "@/src/pages/faq"
import TermsPage from "@/src/pages/terms"
import { ScrollToTop } from "@/components/scroll-to-top"
import Navigation from "@/components/mobile-nav"
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
