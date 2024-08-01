"use client";
import { Footer } from "@/components/common/Footer";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/shadcn/ui/button";
import Slider from "@/components/SliderInfo";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
export default function LandingPage() {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="min-h-full flex flex-col overflow-hidden ">
      <div
        className="flex flex-col items-center justify-center md:justify-start
      text-center gap-y-4 flex-1 px-6"
      >
        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
            Write, plan, share.
            <br /> With AI at your side.
          </h1>
          <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            Notion is the connected workspace where better, faster work happens.
          </h3>
          <div className="">
            {isLoading && (
              <div className="w-full flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            )}
            {isAuthenticated && !isLoading && (
              <Button asChild>
                <Link href="/documents">
                  Enter Notion
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            )}
            {!isAuthenticated && !isLoading && (
              <SignInButton mode="modal">
                <Button>
                  Get Notion free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center max-w-5xl">
          <div className="flex items-center">
            <div className="relative w-[300px] h-[250px] sm:w-[450px] sm:h-[300px] md:h-[350px] md:w-[600px] dark:hidden">
              <Image
                src="/home-hero.png"
                fill
                className="object-contain dark:hidden"
                alt="Documents"
              />
            </div>
            {theme === "dark" && (
              <>
                <div className="relative w-[200px] h-[250px] md:h-[300px] md:w-[300px] sm:w-[350px] sm:h-[350px] md:block">
                  <Image
                    src="/documents-dark.png"
                    fill
                    className="object-contain"
                    alt="Documents"
                  />
                </div>
                <div className="relative hidden w-[200px] h-[250px] md:h-[300px] md:w-[300px] sm:w-[350px] sm:h-[350px] md:block">
                  <Image
                    src="/reading-dark.png"
                    fill
                    className="object-contain "
                    alt="Reading"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Slider />
      <div
        className="flex flex-col items-center justify-center md:justify-start
      text-center gap-y-4 flex-1 px-6 overflow-hidden"
      >
        <div className="max-w-4xl space-y-4 m-10">
          <h1 className="text-2xl sm:text-5xl md:text-5xl font-bold">
            Consolidate tools.
            <br /> Cut costs.
          </h1>
        </div>
        <div className="flex flex-col items-center max-w-5xl ml-20">
          <div className="relative aspect-auto h-[110px]">
            <Image
              src="/tools-before-notion.png"
              height={88}
              width={568}
              className="object-contain"
              alt="Documents"
            />

            <div className="-translate-y-full mix-blend-multiply	">
              <Image
                style={{
                  paddingBottom: "22px",
                  marginLeft: "18px",
                }}
                src="/tools-strikethrough.png"
                height={78}
                width={568}
                className="object-contain "
                alt="Documents"
              />
            </div>

            <div className="-translate-y-[170%] translate-x-[77%] overflow-clip ">
              <Image
                src="/pencil.png"
                width={217}
                height={183}
                style={{
                  aspectRatio: "auto",
                }}
                className="object-contain dark:hidden"
                alt="Documents"
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl">
          <h1 className="text-3xl">
            `&quot;`We got rid of nearly a dozen different tools because of what
            Notion does for us.`&quot;`
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}
