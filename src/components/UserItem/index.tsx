"use client";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronDown, NotebookPen } from "lucide-react";
import { Avatar, AvatarImage } from "../shadcn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu";
const UserItem = () => {
  const { user } = useUser();
  console.log(user, "user");
  return (
    <div className="flex flex-row">
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              role="button"
              className="flex items-center  text-sm p-3 w-full hover:bg-primary/5"
            >
              <div className="gap-x-2 flex items-center max-w-[150px]">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
                <span className="text-start font-medium line-clamp-1">
                  {user?.fullName}&apos;s Notion
                </span>
              </div>
              <ChevronDown className="ml-2 text-muted-foreground h-5 w-6" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-80 absolute z-[9999]"
            align="start"
            alignOffset={11}
            forceMount
          >
            <div className="flex flex-col space-y-4 p-2">
              <p className="text-xs font-medium leading-none text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </p>
              <div className="flex items-center gap-x-2">
                <div className="rounded-md bg-secondary p-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} />
                  </Avatar>
                </div>
                <div className="space-y-1">
                  <p className="text-sm line-clamp-1">
                    {user?.fullName}&apos;s Notion
                  </p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="w-full cursor-pointer text-muted-foreground"
            >
              <SignOutButton>Log out</SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" pt-3">
        <NotebookPen
          className="text-muted-foreground h-4 w-5"
          onClick={() => {
            alert("varsha");
          }}
        />
      </div>
    </div>
  );
};
export default UserItem;
