"use client";

import type React from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import useSignup from "./useSignup";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUpPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    onSubmit,
    password,
    showPassword,
    setShowPassword,
  } = useSignup();
  const acceptTerms = watch("acceptTerms");

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="glass p-8 rounded-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-foreground/60 text-sm">
                Join Wisdom Works and start earning today
              </p>
            </div>

            {/* GLOBAL ERROR */}
            {errors.root?.message && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* USERNAME */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Choose a username" />
                  )}
                />
                {errors.username && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

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
                        className="pl-10"
                        placeholder="your@email.com"
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

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="********"
                        type={showPassword?.password ? "text" : "password"}
                        className="px-10"
                      />
                    )}
                  />
                  {showPassword?.password ? (
                    <Eye
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: false,
                        }))
                      }
                      className="absolute right-3 top-3 h-4 w-4 text-primary"
                    />
                  ) : (
                    <EyeOff
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: true,
                        }))
                      }
                      className="absolute right-3 top-3 h-4 w-4 text-primary"
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: "Confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="********"
                        type={
                          showPassword?.confirmPassword ? "text" : "password"
                        }
                        className="px-10"
                      />
                    )}
                  />
                  {showPassword?.confirmPassword ? (
                    <Eye
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: false,
                        }))
                      }
                      className="absolute right-3 top-3 h-4 w-4 text-primary"
                    />
                  ) : (
                    <EyeOff
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: true,
                        }))
                      }
                      className="absolute right-3 top-3 h-4 w-4 text-primary"
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* TERMS & CONDITIONS */}
              <div>
                <Controller
                  name="acceptTerms"
                  control={control}
                  rules={{
                    required: "You must accept the Terms & Conditions",
                  }}
                  render={({ field }) => (
                    <div className="flex items-start gap-3">
                      <Checkbox
                      id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label htmlFor="terms" className="text-sm text-foreground/70">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-primary underline"
                          target="_blank"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-primary underline"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  )}
                />

                {errors.acceptTerms && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              {/* REFERRAL CODE */}
              {/* <div>
                <label className="block text-sm font-medium mb-2">
                  Referral Code (Optional)
                </label>
                <Controller
                  name="referralCode"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter referral code" />
                  )}
                />
              </div> */}

              <Button
                type="submit"
                disabled={isSubmitting || !acceptTerms}
                className="w-full bg-primary hover:bg-primary/90 rounded-lg cursor-pointer"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/20 text-center text-sm">
              <p className="text-foreground/60">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
