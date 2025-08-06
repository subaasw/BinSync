import { Outlet } from "react-router";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import AdminHeader from "@/components/Header/AdminHeader";

export default function AdminLayout() {
  return (
    <AdminAuthProvider>
      <AdminHeader />
      <Outlet />
    </AdminAuthProvider>
  );
}
