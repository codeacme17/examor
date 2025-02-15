"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IMenuItem } from "@/hooks/useMenu";

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { MdiIcon } from "@/components/mdi-icon";
import { useNoteStore } from "@/store";
import { TNote } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface MenuListProps {
  isCollapsed: boolean;
  menus: IMenuItem[];
}

export const MenuList = ({ isCollapsed, menus }: MenuListProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setCurrentNote } = useNoteStore();

  const CLASS_NAME = `flex 
  items-center 
  p-2 
  rounded-md 
  text-primary
  transition-colors 
  bg-transparent
  duration-200 
  dark:hover:bg-muted 
  hover:bg-white
  hover:text-muted-foreground 
  text-sm`;

  const handleClickItem = (item: IMenuItem) => {
    if (item.isDisabled) return;
    router.push(item.path);
    setCurrentNote(item as unknown as TNote);
  };

  return (
    <div className="flex flex-col gap-2">
      {menus.map((item, index) =>
        isCollapsed ? (
          <TooltipProvider key={index}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleClickItem(item)}
                  className={cn(
                    CLASS_NAME,
                    pathname === item.path ? "bg-muted" : "hover:bg-muted",
                    item.isDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
                  )}>
                  {typeof item.icon === "string" ? (
                    <MdiIcon icon={item.icon as string} size="1.4rem" />
                  ) : (
                    <item.icon size={20} />
                  )}

                  <span className="sr-only text-sm">{item.name}</span>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="right" className="flex items-center gap-4">
                {item.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            key={index}
            onClick={() => handleClickItem(item)}
            className={cn(
              CLASS_NAME,
              "justify-start",
              pathname === item.path ? "bg-muted" : "hover:bg-muted",
              item.isDisabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
            )}>
            {typeof item.icon === "string" ? (
              <MdiIcon icon={item.icon as string} className="ml-3 mr-3" size="1.2rem" />
            ) : (
              <item.icon className="ml-3 mr-3" size={20} />
            )}
            <span className="text-xs">{item.name}</span>
          </Button>
        )
      )}
    </div>
  );
};
