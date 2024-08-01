import { useUser } from "@clerk/clerk-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuTrigger } from "../shadcn/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
export default function Item({
  id,
  icon: Icon,
  label,
  documentIcon,
  isSearch,
  onClick,
  active,
  level = 0,
  onExpand,
  expanded,
}: {
  id?: string;
  icon: any;
  label: string;
  documentIcon?: string;
  isSearch?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  active?: boolean;
  level?: number;
  onExpand?: any;
  expanded?: any;
}) {
  const { user } = useUser();
  const router = useRouter();
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  
  const onCreate = (event: any) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId: any) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const onArchive = (event: any) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => {
      router.push("/documents");
    });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };
  const handleExpand = (event: any) => {
    event.stopPropagation();
    onExpand?.();
  };
  return (
    <div
      onClick={onClick}
      className="flex hover:bg-primary/5 p-2 text-sm"
      key={id}
      role="button"
    >
      {id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
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
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}
Item.Skeleton = function ItemSkeleton({ level }: { level: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
