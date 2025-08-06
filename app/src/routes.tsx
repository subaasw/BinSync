import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

export default function RoutingPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
