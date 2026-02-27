"use client";
import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, CheckCircle } from "lucide-react";
import useFormHook from "./useFormHook";

export const depositSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 10, {
      message: "Minimum deposit is $10",
    }),
  transactionId: z
    .string()
    .min(1, "Transaction ID is required")
    .min(10, "Transaction ID must be at least 10 characters"),
  paymentProof: z
    .union([z.string().url(), z.instanceof(File), z.literal("")])
    .optional(),
});

export type DepositFormData = z.infer<typeof depositSchema>;

export interface DepositFormProps {
  onSubmit: (data: DepositFormData) => void;
}

export function DepositForm({ onSubmit }: DepositFormProps) {
  const {
    isSubmitting,
    isSubmitted,
    handleFormSubmit,
    handleSubmit,
    errors,
    control,
    previewUrl,
    setPreviewUrl,
    setSelectedFile,
    removeFile,
  } = useFormHook({ onSubmit });

  if (isSubmitted) {
    return (
      <div className="glass-hover p-8 rounded-xl text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Deposit Submitted!</h3>
        <p className="text-muted-foreground">
          Your deposit is pending admin approval. You'll be notified once it's
          confirmed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Amount Field */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-sm font-medium">
          Deposit Amount (USDT)
        </Label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="amount"
              type="number"
              placeholder="Enter amount (min. $10)"
              className="h-12 bg-secondary/50 border-border/50 focus:border-primary"
            />
          )}
        />
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      {/* Transaction ID Field */}
      <div className="space-y-2">
        <Label htmlFor="transactionId" className="text-sm font-medium">
          Binance Transaction ID
        </Label>
        <Controller
          name="transactionId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="transactionId"
              placeholder="Enter your Binance transaction ID"
              className="h-12 bg-secondary/50 border-border/50 focus:border-primary font-mono"
            />
          )}
        />
        {errors.transactionId && (
          <p className="text-sm text-destructive">
            {errors.transactionId.message}
          </p>
        )}
      </div>

      {/* Payment Proof Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Payment Proof Screenshot</Label>
        <Controller
          name="paymentProof"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <div className="space-y-3">
              {!previewUrl ? (
                <label
                  htmlFor="paymentProof"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border/50 rounded-xl cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WebP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    ref={field.ref}
                    id="paymentProof"
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onBlur={field.onBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!e.target.files || e.target.files.length === 0)
                        return;

                      const file = e.target.files[0];

                      // 🔑 CREATE PREVIEW URL
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);

                      setSelectedFile(file);

                      // RHF
                      onChange(file);
                    }}
                  />
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-border/50">
                  <img
                    src={previewUrl}
                    alt="Payment proof preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(onChange)}
                    className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-lg flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">
                      Screenshot uploaded
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        />
        {errors.paymentProof && (
          <p className="text-sm text-destructive">
            {errors.paymentProof.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 gradient-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        {isSubmitting ? "Submitting..." : "Submit Deposit"}
      </Button>
    </form>
  );
}
