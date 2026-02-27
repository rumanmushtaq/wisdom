"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { Toaster } from "@/components/ui/sonner"
import { ToastProvider } from "@/components/providers/ToastProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  console.log("Providers mounted");
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider />
        {children}
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
