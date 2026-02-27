"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import DepositPage from "@/views/deposit";

const page = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <DepositPage />
      </main>
    </>
  );
};

export default page;
