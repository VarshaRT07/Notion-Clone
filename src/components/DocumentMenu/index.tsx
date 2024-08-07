import React from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Menu({ documentId }: { documentId: Id<"documents"> }) {
  const { user } = useUser();
  const router = useRouter();
  const archive = useMutation(api.documents.archive);

  const onArchive = (event: any) => {
    event.stopPropagation();
    if (!documentId) return;
    const promise = archive({ id: documentId }).then(() => {
      router.push("/documents");
    });
    console.log(promise);

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  return (
    <div className="group">
      <div className="ml-auto  flex items-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e: any) => e.stopPropagation()}
            asChild
          >
            <div
              role="button"
              className="h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-60 z-[9999] m-2"
            align="start"
            sideOffset={15}
            forceMount
          >
            <DropdownMenuItem onClick={onArchive}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground p-2">
              Last edited by: {user?.fullName}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
Menu.Skeleton = function TitleSkeleton() {
    return <Skeleton className="h-9 w-20 rounded-md" />;
  };
