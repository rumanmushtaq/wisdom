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
import { Menu, X, Wallet } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import useHeader from "@/hooks/useHeader";

export function Header() {
  const {
    user,
    pathname,
    handleToLogoutUser,
    mobileOpen,
    setMobileOpen,
    handleToMoveProfile,
  } = useHeader();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tasks", href: "/tasks" },
    { label: "Deposit", href: "/deposit" },
    { label: "Withdraw", href: "/withdraw" },
    { label: "Refer", href: "/refer" },
  ];


  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Right Actions */}
          <div className="flex items-center gap-3">
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
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5">
                    Wallets
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/5">
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
