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
} from "recharts";
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Truck,
  Bell,
  TrendingUp,
  Recycle,
} from "lucide-react";
import { useAuth } from "@/context/UserAuthContext";

const pickupData = [
  { month: "Jan", completed: 4, missed: 0 },
  { month: "Feb", completed: 4, missed: 1 },
  { month: "Mar", completed: 4, missed: 0 },
  { month: "Apr", completed: 3, missed: 1 },
  { month: "May", completed: 4, missed: 0 },
  { month: "Jun", completed: 4, missed: 0 },
];

const upcomingPickups = [
  {
    id: 1,
    type: "General Waste",
    date: "2024-01-15",
    time: "09:00 AM",
    status: "scheduled",
  },
  {
    id: 2,
    type: "Recyclables",
    date: "2024-01-17",
    time: "10:30 AM",
    status: "scheduled",
  },
  {
    id: 3,
    type: "Organic Waste",
    date: "2024-01-20",
    time: "08:00 AM",
    status: "scheduled",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Pickup Completed",
    description: "General waste collected successfully",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    action: "Issue Reported",
    description: "Missed pickup on Main Street",
    time: "1 day ago",
    status: "pending",
  },
  {
    id: 3,
    action: "Pickup Scheduled",
    description: "Recyclables pickup for tomorrow",
    time: "2 days ago",
    status: "scheduled",
  },
];

export default function UserDashboard() {
  const { userData } = useAuth();
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-user-foreground">Dashboard</h1>
          <p className="text-user-muted-foreground">
            Welcome back, {userData?.fullName || ""} Here's an overview of your
            waste management activities.
          </p>
        </div>
        <Button className="bg-user-primary hover:bg-user-secondary text-white">
          <Bell className="h-4 w-4" />
          View Notifications
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
            <CheckCircle className="h-4 w-4 text-user-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-user-foreground">23</div>
            <p className="text-xs text-user-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Pickups
            </CardTitle>
            <Calendar className="h-4 w-4 text-user-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-user-foreground">3</div>
            <p className="text-xs text-user-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Missed Pickups
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-user-foreground">2</div>
            <p className="text-xs text-user-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Issues Reported
            </CardTitle>
            <Bell className="h-4 w-4 text-user-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-user-foreground">1</div>
            <p className="text-xs text-user-muted-foreground">
              1 pending resolution
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-user-primary" />
              Pickup Performance
            </CardTitle>
            <CardDescription>
              Monthly pickup completion vs missed pickups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pickupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#4CAF50" name="Completed" />
                <Bar dataKey="missed" fill="#F44336" name="Missed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-user-primary" />
              Upcoming Pickups
            </CardTitle>
            <CardDescription>Your scheduled waste collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-user-muted rounded-full">
                      <Recycle className="h-4 w-4 text-user-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-user-foreground">
                        {pickup.type}
                      </p>
                      <p className="text-sm text-user-muted-foreground">
                        {pickup.date} at {pickup.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-user-muted text-user-foreground"
                  >
                    {pickup.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-user-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest waste management activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-user-muted rounded-full">
                    {activity.status === "completed" && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {activity.status === "pending" && (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                    {activity.status === "scheduled" && (
                      <Calendar className="h-4 w-4 text-user-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-user-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-user-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-user-muted-foreground">
                    {activity.time}
                  </p>
                  <Badge
                    variant={
                      activity.status === "completed" ? "default" : "secondary"
                    }
                    className={
                      activity.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : activity.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-user-muted text-user-foreground"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
