import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import JourneyPage from "@/src/pages/journey"
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/journey" element={<JourneyPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
