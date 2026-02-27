"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type ApiErrorPayload = {
  message: string;
  status?: number;
};

export default function ApiToastProvider() {
  const { toast } = useToast();

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ApiErrorPayload>;

      toast({
        variant: "destructive",
        title: customEvent.detail.status
          ? `Error ${customEvent.detail.status}`
          : "Error",
        description: customEvent.detail.message,
      });
    };

    window.addEventListener("api-error", handler);

    return () => {
      window.removeEventListener("api-error", handler);
    };
  }, [toast]);

  return null;
}
