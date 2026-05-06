import z from "zod";

export const withdrawSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  addressId: z.string().min(1, "Wallet address is required"),
});

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;
