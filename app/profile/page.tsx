"use client";
import { Header } from "@/components/header";
import { ProfileContent } from "@/components/profile";

const Page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8 px-4 max-w-4xl mx-auto">
        <ProfileContent />
      </main>
    </div>
  );
};

export default Page;
