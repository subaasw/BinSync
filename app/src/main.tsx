import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import RoutingPages from "./routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RoutingPages />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
