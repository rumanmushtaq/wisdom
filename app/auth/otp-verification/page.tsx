"use client";

import type React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Lock } from "lucide-react";
import useOtpVerification from "./useOtpVerification";

export default function OtpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    onSubmit,
  } = useOtpVerification();
  return (
    <>
      

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="glass p-8 rounded-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
              <p className="text-foreground/60 text-sm">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* OTP INPUTS */}
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Controller
                    key={index}
                    name={`otp.${index}`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);

                          if (value && e.target.nextSibling) {
                            (e.target.nextSibling as HTMLElement).focus();
                          }
                        }}
                      />
                    )}
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="text-center text-sm text-destructive">
                  OTP is required
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Didn’t receive code?{" "}
              <button className="text-primary font-medium hover:underline">
                Resend
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
