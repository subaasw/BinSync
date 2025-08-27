import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AdminLoginPage from "./pages/admin-login";
import UserLayout from "./pages/user/layout";
import UserDashboard from "./pages/user";
import AdminLayout from "./pages/admin/layout";
import SchedulePickupPage from "./pages/user/schedule-pickup";
import ReportIssuesPage from "./pages/user/report-issues";
import PickupHistoryPage from "./pages/user/pickup-history";
import NotificationsPage from "./pages/user/notifications";
import ProfilePage from "./pages/user/profile";
import AdminDashboard from "./pages/admin";
import IssuesPage from "./pages/admin/issues";
import AdminReportsPage from "./pages/admin/reports";

export default function RoutingPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin-login" element={<AdminLoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="issues" element={<IssuesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
      </Route>

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="schedule-pickup" element={<SchedulePickupPage />} />
        <Route path="report-issues" element={<ReportIssuesPage />} />
        <Route path="pickup-history" element={<PickupHistoryPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
