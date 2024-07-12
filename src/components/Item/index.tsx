import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { MouseEventHandler } from "react";
export default function Item({
  id,
  icon,
  label,
  documentIcon,
  isSearch,
  onClick,
  active,
  level = 0,
  onExpand,
  expanded,
}: {
  id: number;
  icon: LucideIcon;
  label: string;
  documentIcon?: string;
  isSearch?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  active?: boolean;
  level?: number;
  onExpand?: any;
  expanded?: any;
}) {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      onClick={onClick}
      className="flex hover:bg-primary/5 p-2 text-sm"
      key={id}
      role="button"
    >
      {/* {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}*/}
      {/* {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        // <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )} */}
      <div className="ml-4 flex">{label}</div>
    </div>
  );
}
