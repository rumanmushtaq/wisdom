"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Bell,
  Check,
  XCircle,
  Info,
  AlertTriangle,
  CheckCheck,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import {
  setNotifications,
  setUnreadCount,
  setPagination,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification as deleteNotificationAction,
} from "@/store/slices/notifications";
import NotificationsService from "@/services/notifications";

interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type:
    | "WELCOME"
    | "TASK"
    | "DEPOSIT"
    | "WITHDRAWAL"
    | "REFERRAL"
    | "SYSTEM"
    | "SUCCESS"
    | "WARNING"
    | "INFO"
    | "ERROR";
  priority: "LOW" | "MEDIUM" | "HIGH";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? "s" : ""} ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diffInSeconds / 604800)} week${Math.floor(diffInSeconds / 604800) > 1 ? "s" : ""} ago`;
}

export default function NotificationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount, total, allTotal, totalPages, page } =
    useSelector((state: RootState) => state.notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNotifications(currentPage, filter);
  }, [currentPage, filter]);

  const fetchNotifications = async (
    pageToFetch: number,
    activeFilter: "all" | "unread",
  ) => {
    setIsLoading(true);
    const params = {
      page: pageToFetch,
      limit: 10,
      isRead: activeFilter === "unread" ? "false" : undefined,
    };
    const response = await NotificationsService.getAllNotifications(
      params as any,
    );
    if (
      response.success &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      dispatch(setNotifications(response.data.data));
      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
          totalPages: response.data.totalPages,
          isFiltered: activeFilter !== "all",
        }),
      );
      dispatch(setUnreadCount(response.data.unreadCount));
    }
    setIsLoading(false);
  };

  const handleMarkAsRead = async (id: string) => {
    const response = await NotificationsService.markAsRead(id);
    if (response.success) {
      dispatch(markNotificationAsRead(id));
      // Re-fetch to update counts and state if needed, though Redux might handle it
      // For consistency with server state:
      fetchNotifications(currentPage, filter);
    }
  };

  const handleMarkAllAsRead = async () => {
    const response = await NotificationsService.markAllAsRead();
    if (response.success) {
      dispatch(markAllNotificationsAsRead());
      fetchNotifications(currentPage, filter);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    const response = await NotificationsService.deleteNotification(id);
    if (response.success) {
      dispatch(deleteNotificationAction(id));
      fetchNotifications(currentPage, filter);
    }
  };

  const handleClearAllRead = async () => {
    const readNotifications = notifications.filter((n) => n.isRead);
    for (const notification of readNotifications) {
      await NotificationsService.deleteNotification(notification._id);
    }
    fetchNotifications(currentPage, filter);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "SUCCESS":
      case "WELCOME":
      case "REFERRAL":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
            <Check className="h-5 w-5 text-green-400" />
          </div>
        );
      case "WARNING":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
        );
      case "ERROR":
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

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="ellipsis1" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationEllipsis key="ellipsis2" />);
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
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
                  onClick={handleMarkAllAsRead}
                  className="border-white/10 hover:border-primary"
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all read
                </Button>
              )}
              {notifications.some((n) => n.isRead) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAllRead}
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
            onValueChange={(v) => {
              const newFilter = v as "all" | "unread";
              setFilter(newFilter);
              setCurrentPage(1);
            }}
            className="mb-6"
          >
            <TabsList className="bg-[#1a1a1a] border border-white/10">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#BFFF00] data-[state=active]:text-black"
              >
                All ({allTotal || total})
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
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden mb-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BFFF00] mb-4"></div>
                <p className="text-lg font-medium">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
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
              <ScrollArea className="h-[calc(100vh-380px)]">
                <div className="divide-y divide-white/5">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`flex gap-4 px-6 py-4 hover:bg-white/5 transition-colors group ${
                        !notification.isRead ? "bg-white/5" : ""
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
                                className={`font-medium ${
                                  notification.isRead
                                    ? "text-gray-400"
                                    : "text-white"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-[#BFFF00] rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                              {formatTimeAgo(notification.createdAt)}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white/10"
                                onClick={() =>
                                  handleMarkAsRead(notification._id)
                                }
                                title="Mark as read"
                              >
                                <Check className="h-4 w-4 text-green-400" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white/10"
                              onClick={() =>
                                handleDeleteNotification(notification._id)
                              }
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

          {/* Pagination Section */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between px-2 py-4">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * 10 + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * 10, total)}
                </span>{" "}
                of <span className="font-medium">{total}</span> notifications
              </p>
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {renderPaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
