
import { useState } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StylesTab } from "./StylesTab";
import { PropertiesTab } from "./PropertiesTab";

interface HeaderStyleDialogProps {
  elementId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderStyleDialog({ elementId, isOpen, onClose }: HeaderStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  const [selectedVariant, setSelectedVariant] = useState<string>(element?.properties?.variant || 'default');
  const [selectedTab, setSelectedTab] = useState("styles");
  
  // State for additional properties
  const [title, setTitle] = useState<string>(element?.properties?.title || 'DASHBOARD TITLE');
  const [showLogo, setShowLogo] = useState<boolean>(element?.properties?.showLogo !== false);
  const [showNavigation, setShowNavigation] = useState<boolean>(element?.properties?.showNavigation || false);
  const [description, setDescription] = useState<string>(element?.properties?.description || 'Dashboard description goes here');
  const [backgroundColor, setBackgroundColor] = useState<string>(element?.properties?.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState<string>(element?.properties?.textColor || '#000000');
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    (element?.properties?.alignment as "left" | "center" | "right") || "left"
  );
  const [borderRadius, setBorderRadius] = useState<"none" | "sm" | "md" | "lg" | "full">(
    (element?.properties?.borderRadius as "none" | "sm" | "md" | "lg" | "full") || "none"
  );
  const [hasShadow, setHasShadow] = useState<boolean>(element?.properties?.hasShadow || false);
  const [shadowColor, setShadowColor] = useState<string>(element?.properties?.shadowColor || 'rgba(0, 0, 0, 0.1)');
  const [borderWidth, setBorderWidth] = useState<string>(element?.properties?.borderWidth || '0');
  const [borderColor, setBorderColor] = useState<string>(element?.properties?.borderColor || '#e5e7eb');
  const [fontFamily, setFontFamily] = useState<string>(element?.properties?.fontFamily || 'system-ui');
  
  const handleApplyStyle = () => {
    updateElementProperties(elementId, { 
      variant: selectedVariant,
      title,
      showLogo,
      showNavigation,
      description,
      backgroundColor,
      textColor,
      alignment,
      borderRadius,
      hasShadow,
      shadowColor,
      borderWidth,
      borderColor,
      fontFamily
    });
    toast.success("Header style applied successfully");
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Choose header style</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsContent value="styles" className="p-0 border-0 m-0">
            <StylesTab 
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
            />
          </TabsContent>
          
          <TabsContent value="properties" className="p-0 border-0 m-0">
            <PropertiesTab 
              title={title}
              setTitle={setTitle}
              showLogo={showLogo}
              setShowLogo={setShowLogo}
              showNavigation={showNavigation}
              setShowNavigation={setShowNavigation}
              description={description}
              setDescription={setDescription}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              textColor={textColor}
              setTextColor={setTextColor}
              alignment={alignment}
              setAlignment={setAlignment}
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
              hasShadow={hasShadow}
              setHasShadow={setHasShadow}
              shadowColor={shadowColor}
              setShadowColor={setShadowColor}
              borderWidth={borderWidth}
              setBorderWidth={setBorderWidth}
              borderColor={borderColor}
              setBorderColor={setBorderColor}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
            />
          </TabsContent>
        </Tabs>
        
        <div className="bg-gray-50 border-t pt-2 px-6 pb-6">
          <TabsList className="mb-4 w-full bg-gray-100">
            <TabsTrigger value="styles" className="flex-1">Choose Style</TabsTrigger>
            <TabsTrigger value="properties" className="flex-1">Custom Properties</TabsTrigger>
          </TabsList>
          
          <Button 
            variant="default" 
            onClick={handleApplyStyle} 
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
          >
            Apply style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
