"use client";

import { useEffect } from "react";
import { toast } from "sonner";


type ApiErrorPayload = {
  message: string;
  status?: number;
};

export default function ApiToastProvider() {


  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ApiErrorPayload>;

      toast.error(
    customEvent.detail.message
    
    );
    };

    window.addEventListener("api-error", handler);

    return () => {
      window.removeEventListener("api-error", handler);
    };
  }, [toast]);

  return null;
}
