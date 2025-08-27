import { Outlet } from "react-router";
import UserHeader from "@/components/Header/UserHeader";
import { AuthProvider } from "@/context/UserAuthContext";

export default function UserLayout() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-user-background">
        <UserHeader />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
