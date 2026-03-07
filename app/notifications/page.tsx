"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Check,
  XCircle,
  Info,
  AlertTriangle,
  CheckCheck,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  time: string;
  read: boolean;
  createdAt: string;
}

// Mock notifications - replace with real data from your API/store
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Task Completed",
    message: "You have successfully completed 'Review Article' task and earned $2.50",
    type: "success",
    time: "2 min ago",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Deposit Confirmed",
    message: "Your deposit of $50.00 has been confirmed and added to your balance",
    type: "success",
    time: "1 hour ago",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    title: "New Task Available",
    message: "A new high-reward task 'Product Testing' is now available for you",
    type: "info",
    time: "3 hours ago",
    read: true,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "4",
    title: "Withdrawal Processed",
    message: "Your withdrawal of $25.00 has been processed successfully",
    type: "success",
    time: "5 hours ago",
    read: true,
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: "5",
    title: "Referral Bonus",
    message: "You earned $5.00 from your referral 'john_doe' signup",
    type: "success",
    time: "1 day ago",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "6",
    title: "Account Security",
    message: "Please verify your email address to secure your account",
    type: "warning",
    time: "2 days ago",
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "7",
    title: "Package Upgraded",
    message: "Congratulations! Your package has been upgraded to Premium",
    type: "success",
    time: "3 days ago",
    read: true,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "8",
    title: "Task Deadline",
    message: "You have 2 pending tasks that expire in 24 hours",
    type: "warning",
    time: "4 days ago",
    read: true,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: "9",
    title: "Weekly Summary",
    message: "Your weekly earnings: $45.50 from tasks, $10.00 from referrals",
    type: "info",
    time: "5 days ago",
    read: true,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: "10",
    title: "System Maintenance",
    message: "Scheduled maintenance on March 10th from 2AM-4AM UTC",
    type: "info",
    time: "1 week ago",
    read: true,
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
            <Check className="h-5 w-5 text-green-400" />
          </div>
        );
      case "warning":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
        );
      case "error":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
        );
      default:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
            <Info className="h-5 w-5 text-blue-400" />
          </div>
        );
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Bell className="h-8 w-8 text-[#BFFF00]" />
                Notifications
              </h1>
              <p className="text-muted-foreground mt-1">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="border-white/10 hover:border-primary"
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all read
                </Button>
              )}
              {notifications.some((n) => n.read) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllRead}
                  className="border-white/10 hover:bg-red-500 text-red-400 hover:text-black"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear read
                </Button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as "all" | "unread")}
            className="mb-6"
          >
            <TabsList className="bg-[#1a1a1a] border border-white/10">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#BFFF00] data-[state=active]:text-black"
              >
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-[#BFFF00] data-[state=active]:text-black"
              >
                Unread ({unreadCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Notifications List */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Bell className="h-16 w-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">
                  {filter === "unread"
                    ? "No unread notifications"
                    : "No notifications"}
                </p>
                <p className="text-sm mt-1">
                  {filter === "unread"
                    ? "You've read all your notifications"
                    : "We'll notify you when something arrives"}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-320px)]">
                <div className="divide-y divide-white/5">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors group ${!notification.read ? "bg-white/5" : ""
                        }`}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3
                                className={`font-medium ${notification.read
                                    ? "text-gray-400"
                                    : "text-white"
                                  }`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-[#BFFF00] rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                              {notification.time}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white/10"
                                onClick={() => markAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <Check className="h-4 w-4 text-green-400" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white/10"
                              onClick={() => deleteNotification(notification.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
