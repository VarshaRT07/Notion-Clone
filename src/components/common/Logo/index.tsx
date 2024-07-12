import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  width: number;
  height: number;
}
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = ({ width, height }: LogoProps) => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.png"
        height={height}
        width={width}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.png"
        height={height}
        width={width}
        alt="Logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold p-1.5", font.className)}>Notion</p>
    </div>
  );
};
