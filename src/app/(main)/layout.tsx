"use client";

import SearchCommand from "@/components/common/SearchCommand";
import Spinner from "@/components/common/Spinner";
import SideBar from "@/components/SideBar";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const MainLayout = ({ children }: any) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen dark:bg-[#000]">
      <SideBar />
      <main className="flex-1 h-full max-h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
