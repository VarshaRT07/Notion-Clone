"use client";

import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Logo } from "../common/Logo";
import ModeToggle from "../common/ModeToggle";
import Spinner from "../common/Spinner";
import { Button } from "../shadcn/ui/button";

const Navbar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#111010] fixed top-0 flex items-center w-full p-3"
      )}
    >
      <Logo width={40} height={40} />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner size="default" />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Notion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
