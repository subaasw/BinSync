import { Outlet } from "react-router";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import AdminHeader from "@/components/Header/AdminHeader";

export default function AdminLayout() {
  return (
    <AdminAuthProvider>
      <div className="flex min-h-screen flex-col bg-admin-background admin-theme">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminAuthProvider>
  );
}
