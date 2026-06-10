import React from "react";
import useWithdraws from "./useWithdraws";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Index = ({ user, usersWallets, settings }: any) => {
  const {
    netAmount,
    withdrawalFee,
    handleSubmit,
    handleWithdraw,
    amount,
    control,
    errors,
    setValue,
    isSubmitting,
  } = useWithdraws({settings});

  return (
    <form onSubmit={handleSubmit(handleWithdraw as any)}>
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-6">Withdrawal Details</h2>

        {/* Available Balance */}
        <div className="mb-6 p-4 bg-card/50 rounded-lg border border-border/20">
          <p className="text-sm text-foreground/60 mb-1">Available Balance</p>
          <p className="text-3xl font-bold text-primary">
            ${user?.credits?.toFixed(2)}
          </p>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Withdrawal Amount
          </label>

          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              min: { value: 1, message: "Minimum withdrawal is $1" },
              max: {
                value: user?.credits || 0,
                message: "Insufficient balance",
              },
            }}
            render={({ field }) => (
              <Input
                type="number"
                placeholder="Enter amount"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              />
            )}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
          )}

          {/* Quick Buttons */}
          <div className="mt-2 flex gap-2">
            {[0.25, 0.5, 0.75, 1].map((percent) => (
              <Button
                key={percent}
                type="button"
                onClick={() =>
                  setValue("amount", Number((user?.credits || 0) * percent))
                }
                variant="outline"
                size="sm"
                className="text-xs rounded-lg"
              >
                {percent === 1 ? "Max" : `${percent * 100}%`}
              </Button>
            ))}
          </div>
        </div>

        {/* Address Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Select Recipient Address
          </label>

          <Controller
            name="addressId"
            control={control}
            rules={{ required: "Please select an address" }}
            render={({ field }) => (
              <div className="space-y-2">
                {usersWallets?.map((addr: any) => (
                  <label
                    key={addr?._id}
                    className="flex items-center gap-3 p-3 border border-border/20 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={addr?._id}
                      checked={field.value === addr?._id}
                      onChange={() => field.onChange(addr?._id)}
                    />
                    <div>
                      <p className="font-medium text-sm">{addr?.name}</p>
                      <p className="text-xs font-mono">{addr?.address}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          />

          {errors.addressId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.addressId.message}
            </p>
          )}
        </div>

        {/* Summary */}
        {amount > 0 && (
          <div className="mb-6 space-y-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span>${amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Network Fee ({settings?.handlingFee}%):</span>
              <span>-${withdrawalFee}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-sm">
              <span className="font-medium">You receive:</span>
              <span className="font-bold text-primary">${netAmount}</span>
            </div>
          </div>
        )}

        {(() => {
          const min = Number(settings?.minDeposit ?? 0);
          const max = Number(settings?.maxDeposit ?? Infinity);
          const belowMin = amount > 0 && amount < min;
          const aboveMax = amount > 0 && amount > max;
          const hasError = belowMin || aboveMax;

          return (
            <Button
              type="submit"
              disabled={isSubmitting || hasError}
              className={`w-full rounded-lg cursor-pointer transition-colors ${
                hasError
                  ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                  : "bg-primary"
              }`}
            >
              {isSubmitting
                ? "Processing..."
                : belowMin
                  ? `Amount is less than minimum ($${min})`
                  : aboveMax
                    ? `Amount exceeds maximum ($${max})`
                    : "Withdraw Now"}
            </Button>
          );
        })()}
      </div>
    </form>
  );
};

export default Index;
