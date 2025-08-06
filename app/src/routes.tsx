import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UserLayout from "./pages/user/layout";
import AdminLayout from "./pages/admin/layout";

export default function RoutingPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin" element={<AdminLayout />}></Route>

      <Route path="/user" element={<UserLayout />}></Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
