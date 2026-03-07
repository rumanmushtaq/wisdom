"use client";
import { Header } from "@/components/header";
import { ProfileContent } from "@/components/profile";

const Page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="w-full py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
        <ProfileContent />
      </main>
    </div>
  );
};

export default Page;
