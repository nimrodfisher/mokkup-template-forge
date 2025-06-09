
import { cn } from "@/lib/utils";
import { SidebarTabs } from "./SidebarTabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "border-r bg-background flex flex-col h-full",
      isMobile ? "w-16" : "w-64",
      className
    )}>
      <SidebarTabs />
    </div>
  );
}
