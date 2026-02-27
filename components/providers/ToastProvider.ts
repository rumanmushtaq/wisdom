"use client";

import { useEffect } from "react";
import { toast } from "sonner";


export function ToastProvider() {

  useEffect(() => {

  
    const handleApiError = (event: any) => {

      const { variant, title, description } = event.detail;

      toast("Event",{
        description
      });
    };

    window.addEventListener("api-error", handleApiError);

    return () => {
      window.removeEventListener("api-error", handleApiError);
    };
  }, [toast]);

  return null;
}
