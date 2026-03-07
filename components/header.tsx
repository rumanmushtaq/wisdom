"use client";

import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import useHeader from "@/hooks/useHeader";

// Mock notifications - replace with real data from your API/store
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Task Completed",
    message: "You have successfully completed 'Review Article' task",
    type: "success",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Deposit Confirmed",
    message: "Your deposit of $50.00 has been confirmed",
    type: "success",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "New Task Available",
    message: "A new high-reward task is now available for you",
    type: "info",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    title: "Withdrawal Processed",
    message: "Your withdrawal of $25.00 has been processed",
    type: "success",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "5",
    title: "Referral Bonus",
    message: "You earned $5.00 from your referral signup",
    type: "success",
    time: "1 day ago",
    read: true,
  },
  {
    id: "6",
    title: "Account Security",
    message: "Please verify your email address",
    type: "warning",
    time: "2 days ago",
    read: true,
  },
];

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

  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-400" />;
      case "warning":
        return <XCircle className="h-4 w-4 text-yellow-400" />;
      case "error":
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
                      className={`text-sm font-medium transition-colors ${isActive
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
                        onClick={markAllAsRead}
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
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors ${!notification.read ? "bg-white/5" : ""
                              }`}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-sm font-medium ${notification.read ? "text-gray-400" : "text-white"
                                    }`}
                                >
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-[#BFFF00] rounded-full" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.time}
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
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#BFFF00]/20 rounded-lg">
                <Wallet className="h-4 w-4 text-[#BFFF00]" />
                <div>
                  <p className="text-xs text-gray-500">Balance</p>
                  <p className="text-sm font-semibold text-white">
                    ${user?.credits?.toFixed(2)}
                  </p>
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
                      {(user?.firstName || user?.username)?.[0]?.toUpperCase() || "U"}
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
                    onClick={() => router.push("/wallets")}
                    className="text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    Wallets
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/notifications")}
                    className="text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    Notifications
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
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
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
