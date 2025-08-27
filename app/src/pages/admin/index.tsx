import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  Calendar,
  AlertTriangle,
  Truck,
  MapPin,
  TrendingUp,
  Building,
  Bell,
  Settings,
} from "lucide-react";

const monthlyPickupData = [
  { month: "Jan", scheduled: 120, completed: 115 },
  { month: "Feb", scheduled: 125, completed: 118 },
  { month: "Mar", scheduled: 130, completed: 125 },
  { month: "Apr", scheduled: 128, completed: 120 },
  { month: "May", scheduled: 135, completed: 130 },
  { month: "Jun", scheduled: 140, completed: 135 },
];

const issuesData = [
  { month: "Jan", reported: 8, resolved: 7 },
  { month: "Feb", reported: 12, resolved: 10 },
  { month: "Mar", reported: 6, resolved: 6 },
  { month: "Apr", reported: 15, resolved: 12 },
  { month: "May", reported: 9, resolved: 8 },
  { month: "Jun", reported: 11, resolved: 9 },
];

const upcomingPickups = [
  {
    id: 1,
    community: "Green Valley",
    type: "General Waste",
    date: "2024-01-15",
    time: "09:00 AM",
    status: "scheduled",
  },
  {
    id: 2,
    community: "Eco Heights",
    type: "Recyclables",
    date: "2024-01-15",
    time: "10:30 AM",
    status: "in-progress",
  },
  {
    id: 3,
    community: "Sustainable Gardens",
    type: "Organic Waste",
    date: "2024-01-16",
    time: "08:00 AM",
    status: "scheduled",
  },
];

const recentIssues = [
  {
    id: 1,
    title: "Missed Pickup - Main Street",
    community: "Green Valley",
    priority: "high",
    status: "open",
    reportedBy: "John Doe",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Damaged Bin Replacement",
    community: "Eco Heights",
    priority: "medium",
    status: "in-progress",
    reportedBy: "Jane Smith",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Schedule Change Request",
    community: "Sustainable Gardens",
    priority: "low",
    status: "resolved",
    reportedBy: "Mike Johnson",
    time: "3 days ago",
  },
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-admin-foreground">
            Admin Dashboard
          </h1>
          <p className="text-admin-muted-foreground">
            Manage communities and monitor waste collection performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button className="bg-admin-primary hover:bg-admin-secondary text-white">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Communities
            </CardTitle>
            <Building className="h-4 w-4 text-admin-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">5</div>
            <p className="text-xs text-admin-muted-foreground">
              All communities operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-admin-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">590</div>
            <p className="text-xs text-admin-muted-foreground">
              +12 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Pickups
            </CardTitle>
            <Calendar className="h-4 w-4 text-admin-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">28</div>
            <p className="text-xs text-admin-muted-foreground">Next 3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-admin-foreground">3</div>
            <p className="text-xs text-admin-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-admin-primary" />
              Monthly Pickup Performance
            </CardTitle>
            <CardDescription>
              Scheduled vs completed pickups across all communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPickupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scheduled" fill="#BBDEFB" name="Scheduled" />
                <Bar dataKey="completed" fill="#2196F3" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-admin-primary" />
              Issues Tracking
            </CardTitle>
            <CardDescription>
              Reported vs resolved issues over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={issuesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="reported"
                  stroke="#F44336"
                  name="Reported"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#4CAF50"
                  name="Resolved"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-admin-primary" />
              Upcoming Pickups
            </CardTitle>
            <CardDescription>Next 3 days schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-admin-muted rounded-full">
                      <MapPin className="h-4 w-4 text-admin-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-admin-foreground">
                        {pickup.community}
                      </p>
                      <p className="text-sm text-admin-muted-foreground">
                        {pickup.type} • {pickup.date} at {pickup.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      pickup.status === "in-progress" ? "default" : "secondary"
                    }
                    className={
                      pickup.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-admin-muted text-admin-foreground"
                    }
                  >
                    {pickup.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-admin-primary" />
              Recent Issues
            </CardTitle>
            <CardDescription>Latest reported problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-admin-muted rounded-full">
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          issue.priority === "high"
                            ? "text-red-500"
                            : issue.priority === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-admin-foreground">
                        {issue.title}
                      </p>
                      <p className="text-sm text-admin-muted-foreground">
                        {issue.community} • {issue.reportedBy} • {issue.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge
                      variant="secondary"
                      className={
                        issue.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : issue.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {issue.priority}
                    </Badge>
                    <Badge
                      variant={
                        issue.status === "resolved" ? "default" : "secondary"
                      }
                      className={
                        issue.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : issue.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {issue.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
