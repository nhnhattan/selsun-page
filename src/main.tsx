import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Information from "./Information.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/information" element={<Information />} />
      </Routes>
    </HashRouter>
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "#22c55e",
            color: "white",
          },
          iconTheme: {
            primary: "white",
            secondary: "#16a34a",
          },
        },
        error: {
          style: { background: "red", color: "white" },
          iconTheme: {
            primary: "white",
            secondary: "#b91c1c",
          },
        },
      }}
    />
  </StrictMode>
);
