"use client";

import type React from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { ArrowRight, Mail, Lock } from "lucide-react";
import useForgetPassword from "./useForgetPassword";

export default function Page() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    onSubmit,
  } = useForgetPassword();

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="glass p-8 rounded-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-foreground/60 text-sm">
                Sign in to your Wisdom Works account
              </p>
            </div>

            {/* GLOBAL ERROR */}
            {errors.root?.message && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* REMEMBER ME */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 rounded-lg"
              >
                {isSubmitting ? "Submitting ..." : "Submit"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/20 text-center text-sm">
              <p className="text-foreground/60">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
