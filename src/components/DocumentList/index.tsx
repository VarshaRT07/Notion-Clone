import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import Item from "../Item";

export default function DocumentList({
  parentDocument,
  level = 0,
}: {
  parentDocument?: any;
  level?: number;
}) {
  const router = useRouter();
  const params = useParams();
  const [expanded, setExpanded] = useState({});
  const documents = useQuery(api.documents.getItems, {
    parentDocument: parentDocument,
  });
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId as keyof typeof prevExpanded],
    }));
  };
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  console.log(expanded, "EXPANDED");
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <div>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No page found
      </p>
      {documents &&
        documents.map((document) => {
          return (
            <Item
              id={document._id}
              onClick={() => onRedirect(document._id)}
              label={document.title}
              icon={FileIcon}
              documentIcon={document.icon}
              active={params.documentId === document._id}
              level={level}
              onExpand={() => onExpand(document._id)}
              expanded={expanded[document._id as keyof typeof expanded]}
            />
          );
        })}
    </div>
  );
}
