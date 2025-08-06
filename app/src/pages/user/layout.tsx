import { Outlet } from "react-router";
import UserHeader from "@/components/Header/UserHeader";
import { AuthProvider } from "@/context/UserAuthContext";

export default function UserLayout() {
  return (
    <AuthProvider>
      <UserHeader />
      <Outlet />
    </AuthProvider>
  );
}
