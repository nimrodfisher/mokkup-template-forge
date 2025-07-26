
import { Plus, X, MoreHorizontal } from "lucide-react";
import { useWireframe } from "@/hooks/useWireframe";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ScreenTabs() {
  const { screens, switchScreen, addScreen, deleteScreen } = useWireframe();
  const isMobile = useIsMobile();
  
  return (
    <div className="border-b flex items-center px-2 bg-gray-50">
      {isMobile ? (
        // Mobile dropdown for screens
        <div className="flex-1 flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 justify-between">
                <span className="truncate">
                  {screens.find(s => s.isActive)?.name || 'Screen 1'}
                </span>
                <MoreHorizontal className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {screens.map((screen) => (
                <DropdownMenuItem
                  key={screen.id}
                  onClick={() => switchScreen(screen.id)}
                  className={screen.isActive ? "bg-blue-50 text-blue-600" : ""}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{screen.name}</span>
                    {screens.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteScreen(screen.id);
                        }}
                        className="ml-2 h-6 w-6 p-0 hover:bg-red-100"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => addScreen()}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        // Desktop tabs
        <>
          <div className="flex-1 flex overflow-x-auto py-1">
            {screens.map((screen) => (
              <button
                key={screen.id}
                className={`px-4 py-2 text-sm font-medium rounded-t-md mr-1 min-w-[100px] ${
                  screen.isActive 
                    ? "bg-white border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => switchScreen(screen.id)}
              >
                {screen.name}
                {screens.length > 1 && screen.isActive && (
                  <span 
                    className="ml-2 text-gray-400 hover:text-gray-600" 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteScreen(screen.id);
                    }}
                  >
                    ×
                  </span>
                )}
              </button>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2" 
            onClick={() => addScreen()}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Screen
          </Button>
        </>
      )}
    </div>
  );
}
