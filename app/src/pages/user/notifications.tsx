"use client";

import { useEffect, useState } from "react";
import { Bell, Calendar, Check, File, Recycle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { userAuthService } from "@/utils/userAuth";

type NotificationProps = {
  _id: string;
  communityId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  message: string;
  type: string;
  metadata: {
    reportId: string;
    userId: string;
    priority: string | null;
  };
  read: string[];
  recipients: string[];
};

const getNotificationIcon = (type: string, read: boolean) => {
  const iconClass = read ? "text-gray-400" : "text-user-primary";

  switch (type) {
    case "NEW_PICKUP_REQUEST":
      return <Calendar className={`h-5 w-5 ${iconClass}`} />;
    case "NEW_REPORT":
      return <File className={`h-5 w-5 ${iconClass}`} />;
    case "community":
      return <Recycle className={`h-5 w-5 ${iconClass}`} />;
    case "reminder":
      return <Bell className={`h-5 w-5 ${iconClass}`} />;
    default:
      return <Bell className={`h-5 w-5 ${iconClass}`} />;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationProps[] | []>(
    []
  );

  const markAllAsRead = () => {
    console.log("Marking all notifications as read");
  };

  const clearAllNotifications = () => {
    console.log("Clearing all notifications");
  };

  useEffect(() => {
    const fetchPickupHistory = async () => {
      const notifications: NotificationProps[] =
        await userAuthService.getNotifications();
      setNotifications(notifications);
    };

    fetchPickupHistory();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your waste management activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button variant="outline" onClick={clearAllNotifications}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3"></CardHeader>
        <CardContent className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  notification.type === "NEW_REPORT"
                    ? "bg-user-muted/30 border-user-primary/20"
                    : ""
                }`}
              >
                <div
                  className={`rounded-full p-2 ${
                    notification.type === "NEW_REPORT"
                      ? "bg-user-muted"
                      : "bg-gray-100"
                  }`}
                >
                  {getNotificationIcon(
                    notification.type,
                    notification.type !== "NEW_REPORT"
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={`font-medium ${
                          notification.type === "NEW_REPORT"
                            ? "text-user-primary"
                            : ""
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(notification.createdAt).toLocaleDateString()} at{" "}
                      {new Date(notification.createdAt).toTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-lg font-medium">No notifications</h3>
              <p className="text-sm text-gray-500">
                You don't have any notifications in this category.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
