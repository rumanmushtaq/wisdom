"use client";
import { CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Deposit } from "@/store/slices/deposit";



interface DepositsTableProps {
  deposits: Deposit[];
}

export function DepositsTable({ deposits }: DepositsTableProps) {
  const getStatusBadge = (status: Deposit["status"]) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30 border-0">
            <XCircle className="w-3.5 h-3.5 mr-1.5" />
            Rejected
          </Badge>
        );
      case "PENDING":
      default:
        return (
          <Badge className="bg-pending/20 text-pending hover:bg-pending/30 border-0">
            <Clock className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
            Pending
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateId = (id: string) => {
    if (id.length <= 16) return id;
    return `${id.slice(0, 8)}...${id.slice(-6)}`;
  };

  if (deposits.length === 0) {
    return (
      <div className="glass-hover p-12 rounded-xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Deposits Yet</h3>
        <p className="text-muted-foreground text-sm">
          Your deposit history will appear here once you make your first
          deposit.
        </p>
      </div>
    );
  }

  return (
    <div
      className="glass p-6 rounded-xl border 
                shadow-sm hover:shadow-md 
                hover:border-primary 
                transition-all duration-300 overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-border/30 hover:bg-transparent">
            <TableHead className="text-muted-foreground font-semibold">
              Date
            </TableHead>
            <TableHead className="text-muted-foreground font-semibold">
              Amount
            </TableHead>
            <TableHead className="text-muted-foreground font-semibold">
              Transaction ID
            </TableHead>
            <TableHead className="text-muted-foreground font-semibold">
              Proof
            </TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deposits.map((deposit, index) => (
            <TableRow
              key={deposit?._id}
              className="border-border/20 hover:bg-secondary/30 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-medium">
                {deposit?.createdAt ? formatDate(deposit?.createdAt): "N/A"}
              </TableCell>
              <TableCell>
                <span className="font-bold text-lg">
                  ${deposit.amount.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-sm ml-1">USDT</span>
              </TableCell>
              <TableCell>
                <code className="px-2 py-1 bg-secondary/50 rounded text-xs font-mono">
                  {truncateId(deposit.transactionId)}
                </code>
              </TableCell>
              <TableCell>
                {deposit?.image ? (
                  <a
                    href={deposit?.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {getStatusBadge(deposit.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
