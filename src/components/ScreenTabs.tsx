
import { Plus, X, MoreHorizontal, Edit2 } from "lucide-react";
import { useWireframe } from "@/hooks/useWireframe";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function ScreenTabs() {
  const { screens, switchScreen, addScreen, deleteScreen, renameScreen } = useWireframe();
  const isMobile = useIsMobile();
  const [editingScreenId, setEditingScreenId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  
  const handleRename = (screenId: string, currentName: string) => {
    setEditingScreenId(screenId);
    setEditingName(currentName);
  };
  
  const handleSaveRename = (screenId: string) => {
    if (editingName.trim()) {
      renameScreen(screenId, editingName.trim());
    }
    setEditingScreenId(null);
    setEditingName("");
  };
  
  const handleCancelRename = () => {
    setEditingScreenId(null);
    setEditingName("");
  };
  
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
                <div key={screen.id}>
                  <DropdownMenuItem
                    onClick={() => switchScreen(screen.id)}
                    className={screen.isActive ? "bg-blue-50 text-blue-600" : ""}
                  >
                    <span className="truncate">{screen.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(screen.id, screen.name);
                    }}
                    className="text-sm"
                  >
                    <Edit2 className="w-3 h-3 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  {screens.length > 1 && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteScreen(screen.id);
                      }}
                      className="text-sm text-red-600 hover:bg-red-50"
                    >
                      <X className="w-3 h-3 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </div>
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
              <div key={screen.id} className="relative group">
                {editingScreenId === screen.id ? (
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={() => handleSaveRename(screen.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveRename(screen.id);
                      } else if (e.key === 'Escape') {
                        handleCancelRename();
                      }
                    }}
                    className="w-[100px] h-8 text-sm"
                    autoFocus
                  />
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`px-4 py-2 text-sm font-medium rounded-t-md mr-1 min-w-[100px] ${
                          screen.isActive 
                            ? "bg-white border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                        onClick={() => switchScreen(screen.id)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {screen.name}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleRename(screen.id, screen.name)}
                        className="text-sm"
                      >
                        <Edit2 className="w-3 h-3 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      {screens.length > 1 && (
                        <DropdownMenuItem
                          onClick={() => deleteScreen(screen.id)}
                          className="text-sm text-red-600 hover:bg-red-50"
                        >
                          <X className="w-3 h-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
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
