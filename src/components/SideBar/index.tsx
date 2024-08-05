"use client";
import { useSearch, useSettings } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  SearchIcon,
  Settings,
  Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { api } from "../../../convex/_generated/api";
import { Logo } from "../common/Logo";
import DocumentList from "../DocumentList";
import Item from "../Item";
import UserItem from "../UserItem";
import TrashBox from "../TrashBox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function SideBar() {
  const router = useRouter();
  const params = useParams();
  const search = useSearch();
  const settings = useSettings();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef: any = useRef(false);
  const sidebarRef: any = useRef(null);
  const navbarRef: any = useRef(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const createDocHandler = create({ title: "New Doc" }).then(
      (documentId) => {}
    );

    toast.promise(createDocHandler, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  useEffect(() => {
    isMobile ? collapse() : resizePage();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseMove = (event: any) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  const handleMouseDown = (event: any) => {
    event.preventDefault();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resizePage = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {};
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div className="m-2">
          <Logo width={30} height={40} />
        </div>

        <div
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          role="button"
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item icon={SearchIcon} label="Search" onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item icon={PlusCircle} label="New Page" onClick={onCreate} />
          {/* <Item icon={InboxIcon}  label="Inbox" /> */}
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resizePage}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {params.documentId ? (
            <div> </div>
          ) : (
            // <Navbar isCollapsed={isCollapsed} onResetWidth={resizePage} />
            <nav className="bg-transparent px-3 py-2 w-full">
              {isCollapsed && (
                <MenuIcon
                  onClick={resizePage}
                  role="button"
                  className="h-6 w-6 text-muted-foreground"
                />
              )}
            </nav>
          )}
        </nav>
      </div>
    </>
  );
}
