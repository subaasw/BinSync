import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Bell,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Recycle,
  Settings,
  Truck,
  User,
  Users,
} from "lucide-react";

import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminAuthService } from "@/utils/adminAuth";
import { removeLocalStorage } from "@/utils/localStorage";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Communities", href: "/admin/communities", icon: Users },
  { name: "Pickups", href: "/admin/pickups", icon: Truck },
  { name: "Issues", href: "/admin/issues", icon: MessageSquare },
  { name: "Users", href: "/admin/users", icon: User },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
];

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await adminAuthService.logout();
    removeLocalStorage("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b px-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <Recycle className="h-6 w-6 text-admin-primary" />
                <span>BinSync Admin</span>
              </Link>
            </div>
            <nav className="grid gap-1 p-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? "bg-admin-muted text-admin-primary"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-1 font-semibold"
        >
          <Recycle className="h-6 w-6 text-admin-primary" />
          <span className="font-bold">BinSync</span>
        </Link>

        <nav className="hidden md:flex ml-8 space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.href
                  ? "text-admin-primary bg-admin-muted/50 rounded-md"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:rounded-md"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex items-center gap-2 rounded-full"
              >
                <span className="hidden md:inline-block text-sm">
                  {userData?.fullName || ""}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-muted">
                  <User className="h-4 w-4 text-admin-primary" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center gap-2 p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-muted">
                  <User className="h-4 w-4 text-admin-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{userData?.fullName}</p>
                  <p className="text-xs text-gray-500">{userData?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/profile" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  className="flex cursor-pointer w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
