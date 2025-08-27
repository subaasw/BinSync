import { useState } from "react";
import {
  BarChart3,
  Users,
  Truck,
  AlertCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const pickupData = [
  { month: "Jan", completed: 85, missed: 15 },
  { month: "Feb", completed: 92, missed: 8 },
  { month: "Mar", completed: 88, missed: 12 },
  { month: "Apr", completed: 95, missed: 5 },
  { month: "May", completed: 90, missed: 10 },
  { month: "Jun", completed: 98, missed: 2 },
];

const communityData = [
  { name: "Green Valley", value: 35, color: "#22c55e" },
  { name: "Eco Heights", value: 25, color: "#3b82f6" },
  { name: "Sustainable Gardens", value: 20, color: "#f59e0b" },
  { name: "Recycling Community", value: 15, color: "#ef4444" },
  { name: "New Community", value: 5, color: "#8b5cf6" },
];

const issueData = [
  { month: "Jan", reported: 12, resolved: 10 },
  { month: "Feb", reported: 8, resolved: 8 },
  { month: "Mar", reported: 15, resolved: 13 },
  { month: "Apr", reported: 6, resolved: 6 },
  { month: "May", reported: 10, resolved: 9 },
  { month: "Jun", reported: 4, resolved: 4 },
];

export default function AdminReportsPage() {
  const [selectedReport, setSelectedReport] = useState("overview");

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
  }: {
    icon: any;
    title: string;
    value: string;
    subtitle: string;
    color?: string;
  }) => (
    <Card
      className="border-l-4"
      style={{
        borderLeftColor: "#3b82f6",
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Communities"
          value="5"
          subtitle="Active communities"
        />
        <StatCard
          icon={Truck}
          title="This Month Pickups"
          value="98"
          subtitle="2 missed pickups"
        />
        <StatCard
          icon={AlertCircle}
          title="Open Issues"
          value="4"
          subtitle="91% resolution rate"
        />
        <StatCard
          icon={TrendingUp}
          title="Performance"
          value="94%"
          subtitle="Pickup completion"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Pickup Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pickupData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="missed"
                    name="Missed"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={communityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      ${name} ${(percent || 0 * 100).toFixed(0)}%
                    }
                  >
                    {communityData.map((entry, index) => (
                      <Cell key={cell-${index}} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPickups = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Truck}
          title="Total Pickups"
          value="568"
          subtitle="This year"
        />
        <StatCard
          icon={Calendar}
          title="Scheduled"
          value="623"
          subtitle="Total scheduled"
        />
        <StatCard
          icon={TrendingUp}
          title="Success Rate"
          value="91%"
          subtitle="Completion rate"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pickup Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pickupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="missed"
                  name="Missed"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Pickup Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                community: "Green Valley",
                date: "Today",
                status: "Completed",
                time: "9:30 AM",
              },
              {
                community: "Eco Heights",
                date: "Today",
                status: "In Progress",
                time: "10:15 AM",
              },
              {
                community: "Sustainable Gardens",
                date: "Yesterday",
                status: "Completed",
                time: "2:45 PM",
              },
              {
                community: "Recycling Community",
                date: "Yesterday",
                status: "Missed",
                time: "11:00 AM",
              },
            ].map((pickup, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{pickup.community}</p>
                  <p className="text-sm text-gray-600">
                    {pickup.date} at {pickup.time}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    pickup.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : pickup.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pickup.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIssues = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={AlertCircle}
          title="Total Issues"
          value="55"
          subtitle="All time"
          color="#ef4444"
        />
        <StatCard
          icon={TrendingUp}
          title="Resolved"
          value="50"
          subtitle="This month"
          color="#22c55e"
        />
        <StatCard
          icon={Calendar}
          title="Open"
          value="5"
          subtitle="Pending resolution"
          color="#f59e0b"
        />
        <StatCard
          icon={BarChart3}
          title="Resolution Rate"
          value="91%"
          subtitle="Average time: 2 days"
          color="#3b82f6"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issues Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={issueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="reported"
                  name="Reported"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  name="Resolved"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Missed pickup on Oak Street",
                community: "Green Valley",
                status: "Open",
                priority: "High",
                date: "2 hours ago",
              },
              {
                title: "Bin damaged during collection",
                community: "Eco Heights",
                status: "In Progress",
                priority: "Medium",
                date: "1 day ago",
              },
              {
                title: "Schedule change request",
                community: "Sustainable Gardens",
                status: "Resolved",
                priority: "Low",
                date: "3 days ago",
              },
              {
                title: "New pickup location needed",
                community: "Recycling Community",
                status: "Open",
                priority: "Medium",
                date: "5 days ago",
              },
            ].map((issue, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">{issue.title}</p>
                  <p className="text-sm text-gray-600">
                    {issue.community} • {issue.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      issue.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : issue.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {issue.priority}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      issue.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : issue.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-gray-600">View system performance and analytics</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Report Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedReport === "overview" ? "default" : "outline"}
              onClick={() => setSelectedReport("overview")}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={selectedReport === "pickups" ? "default" : "outline"}
              onClick={() => setSelectedReport("pickups")}
              className="flex items-center gap-2"
            >
              <Truck className="h-4 w-4" />
              Pickups
            </Button>
            <Button
              variant={selectedReport === "issues" ? "default" : "outline"}
              onClick={() => setSelectedReport("issues")}
              className="flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              Issues
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedReport === "overview" && renderOverview()}
      {selectedReport === "pickups" && renderPickups()}
      {selectedReport === "issues" && renderIssues()}
    </div>
  );
}
