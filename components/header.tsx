"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X, Wallet, Bell, Check, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import useHeader from "@/hooks/useHeader";
import {
  setNotifications,
  setUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/store/slices/notifications";
import NotificationsService from "@/services/notifications";

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

export function Header() {
  const {
    user,
    pathname,
    router,
    handleToLogoutUser,
    mobileOpen,
    setMobileOpen,
    handleToMoveProfile,
  } = useHeader();

  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notifications,
  );

  useEffect(() => {
    if (user?.firstName || user?.username) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    const response = await NotificationsService.getAllNotifications();
    if (
      response.success &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      dispatch(setNotifications(response.data.data));
      dispatch(setUnreadCount(response.data.unreadCount));
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const response = await NotificationsService.markAsRead(id);
    if (response.success) {
      dispatch(markNotificationAsRead(id));
    }
  };

  const handleMarkAllAsRead = async () => {
    const response = await NotificationsService.markAllAsRead();
    if (response.success) {
      dispatch(markAllNotificationsAsRead());
    }
  };

  const getNotificationIcon = (
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
      | "ERROR",
  ) => {
    switch (type) {
      case "SUCCESS":
      case "WELCOME":
      case "REFERRAL":
        return <Check className="h-4 w-4 text-green-400" />;
      case "WARNING":
        return <XCircle className="h-4 w-4 text-yellow-400" />;
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Bell className="h-4 w-4 text-blue-400" />;
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tasks", href: "/tasks" },
    { label: "Deposit", href: "/deposit" },
    { label: "Withdraw", href: "/withdraw" },
    { label: "Refer", href: "/refer" },
    { label: "Wallets", href: "/wallets" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-20">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white">
                WISDOM WORKS
              </span>
            </Link>

            {/* Desktop Navigation - Updated to match reference design */}
            <nav className="hidden md:flex items-center gap-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group"
                  >
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[#BFFF00]"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#BFFF00]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            {(user?.firstName || user?.username) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative rounded-full hover:bg-white/5"
                  >
                    <Bell className="h-5 w-5 text-gray-400 hover:text-white" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-[#BFFF00] rounded-full">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 bg-[#1a1a1a] border-white/10 p-0"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-[#BFFF00] hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
                        <Bell className="h-8 w-8 mb-2 opacity-50" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {notifications.map((notification) => (
                          <div
                            key={notification._id}
                            onClick={() => handleMarkAsRead(notification._id)}
                            className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors ${
                              !notification.isRead ? "bg-white/5" : ""
                            }`}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-sm font-medium ${
                                    notification.isRead
                                      ? "text-gray-400"
                                      : "text-white"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                {!notification.isRead && (
                                  <span className="w-2 h-2 bg-[#BFFF00] rounded-full" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {formatTimeAgo(notification.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  {notifications.length > 0 && (
                    <div className="border-t border-white/10 p-2">
                      <Link
                        href="/notifications"
                        className="block w-full text-center text-sm text-gray-400 hover:text-white py-1.5 transition-colors"
                      >
                        View all notifications
                      </Link>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {user?.credits >= 0 && (
              <div className="flex items-center gap-3">
                {user?.tierId && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#BFFF00]/10 border border-[#BFFF00]/30 rounded-full">
                    <span className="text-[10px] font-bold text-[#BFFF00] uppercase tracking-wider">
                      {user.tierId.name}
                    </span>
                  </div>
                )}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#BFFF00]/20 rounded-lg">
                  <Wallet className="h-4 w-4 text-[#BFFF00]" />
                  <div>
                    <p className="text-xs text-gray-500">Balance</p>
                    <p className="text-sm font-semibold text-white">
                      ${user?.credits?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Menu */}
            {(user?.firstName || user?.username) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full hover:bg-white/5"
                  >
                    <div className="w-8 h-8 bg-[#BFFF00]/20 rounded-full flex items-center justify-center text-[#BFFF00] font-semibold">
                      {(user?.firstName ||
                        user?.username)?.[0]?.toUpperCase() || "U"}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#1a1a1a] border-white/10"
                >
                  <DropdownMenuItem
                    onClick={handleToMoveProfile}
                    className="text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleToLogoutUser}
                    className="text-red-400 hover:text-red-300 hover:bg-white/5"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-white/5 pt-4">
            <div className="mb-4 px-3 py-3 bg-[#1a1a1a] border border-[#BFFF00]/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#BFFF00]" />
                <div>
                  <p className="text-xs text-gray-500">Current Balance</p>
                  <p className="text-base font-semibold text-white">
                    ${user?.credits?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {navItems.map((item) => {
              const isActive = pathname === item?.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#BFFF00] bg-[#BFFF00]/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item?.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
