

export interface Deposit {
  _id?: string;
  amount: number;
  balanceBefore: number;
  image: string;
  type: string;
  transactionId: string;
  updatedAt: string;
  paymentProof: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
  userId : string
}

export interface DepositState {
  deposits: any[];
}
