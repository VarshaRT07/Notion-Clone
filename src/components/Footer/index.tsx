import { Button } from "@/components/shadcn/ui/button";
import { Logo } from "../common/Logo";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-3 bg-background z-50 dark:bg-[#111010]">
      <Logo width={40} height={40} />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
