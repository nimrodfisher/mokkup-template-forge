
import { useState } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X, Check } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [alignment, setAlignment] = useState<string>(element?.properties?.alignment || 'left');
  const [borderRadius, setBorderRadius] = useState<string>(element?.properties?.borderRadius || 'none');
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

  const headerStyles = [
    {
      id: 'default',
      label: 'Default Style',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
        </div>
      )
    },
    {
      id: 'with-metrics',
      label: 'With Metrics',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="flex space-x-4">
              <div className="text-[8px]">
                <div>Title 1</div>
                <div className="text-gray-400">Metric 1</div>
              </div>
              <div className="text-[8px]">
                <div>Title 2</div>
                <div className="text-gray-400">Metric 1</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'with-description',
      label: 'With Description',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="text-[8px] mt-2 text-gray-500">
              Some dummy description text<br />
              Some dummy description text
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'centered-navigation-purple',
      label: 'Centered Navigation (Purple)',
      preview: (
        <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
          <div className="flex flex-col items-center">
            <div className="font-bold text-xs text-center mt-1">DASHBOARD TITLE</div>
            <div className="flex justify-center space-x-6 mt-1">
              <div className="text-[8px]">Navigation 1</div>
              <div className="text-[8px]">Navigation 2</div>
              <div className="text-[8px]">Navigation 3</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'navigation-top',
      label: 'Top Navigation',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="flex space-x-4 text-[8px] text-blue-500">
              <div>Navigation 1</div>
              <div>Navigation 2</div>
              <div>Navigation 3</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'double-logo-purple',
      label: 'Double Logo (Purple)',
      preview: (
        <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
          <div className="flex items-center justify-between">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
            <div className="font-bold text-xs text-center">DASHBOARD TITLE</div>
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
          </div>
        </div>
      )
    },
    {
      id: 'dark-navigation',
      label: 'Dark Navigation',
      preview: (
        <div className="bg-[#1A1F2C] rounded-md p-4 mt-1 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-600 text-[8px] flex items-center justify-center rounded text-white">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="flex space-x-4 text-[8px] text-gray-300">
              <div>Navigation 1</div>
              <div>Navigation 2</div>
              <div>Navigation 3</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gradient',
      label: 'Gradient',
      preview: (
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-md p-4 mt-1 text-white">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-white/20 backdrop-blur-sm text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      label: 'Minimal',
      preview: (
        <div className="bg-[#F6F6F7] rounded-md p-4 mt-1">
          <div className="flex items-center justify-center">
            <div className="font-bold text-xs text-gray-800">DASHBOARD TITLE</div>
          </div>
        </div>
      )
    },
    {
      id: 'colorful-banner',
      label: 'Colorful Banner',
      preview: (
        <div className="relative bg-white rounded-md overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#0EA5E9]"></div>
          <div className="p-4 mt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'glass-effect',
      label: 'Glass Effect',
      preview: (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-md p-1 mt-1">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-md border border-white/30">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs text-white">DASHBOARD TITLE</div>
              <div className="flex space-x-3 text-[8px] text-white">
                <div>Menu 1</div>
                <div>Menu 2</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'search-header',
      label: 'With Search',
      preview: (
        <div className="bg-white border rounded-md p-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="w-24 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[8px] px-2">
              🔍 Search...
            </div>
          </div>
        </div>
      )
    }
  ];
  
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
            <div className="py-4 px-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">Available styles</span>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-xs" 
                  onClick={() => setSelectedVariant('default')}
                >
                  Default
                </Button>
              </div>
              
              <RadioGroup 
                value={selectedVariant} 
                onValueChange={setSelectedVariant}
                className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2"
              >
                {headerStyles.map(style => (
                  <div key={style.id} className="relative">
                    <RadioGroupItem 
                      value={style.id} 
                      id={style.id} 
                      className="sr-only peer"
                    />
                    <Label 
                      htmlFor={style.id} 
                      className="border rounded-md p-0 block cursor-pointer peer-focus:ring-2 peer-focus:ring-blue-400 peer-data-[state=checked]:border-blue-500"
                    >
                      <div className="p-1">
                        {style.preview}
                        <div className="text-xs p-2 pt-3 text-center">{style.label}</div>
                      </div>
                      {selectedVariant === style.id && (
                        <div className="absolute top-2 right-2 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="properties" className="p-0 border-0 m-0">
            <div className="py-4 px-6 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="block mb-1">Header Title</Label>
                    <Input 
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Dashboard Title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="block mb-1">Description</Label>
                    <Input 
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Dashboard description"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="showLogo" 
                      checked={showLogo}
                      onCheckedChange={(checked) => setShowLogo(checked === true)}
                    />
                    <Label htmlFor="showLogo">Show Logo</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="showNavigation" 
                      checked={showNavigation}
                      onCheckedChange={(checked) => setShowNavigation(checked === true)}
                    />
                    <Label htmlFor="showNavigation">Show Navigation</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasShadow" 
                      checked={hasShadow}
                      onCheckedChange={(checked) => setHasShadow(checked === true)}
                    />
                    <Label htmlFor="hasShadow">Add Shadow</Label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="backgroundColor" className="block mb-1">Background Color</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="backgroundColor"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-9 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="textColor" className="block mb-1">Text Color</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="textColor"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-9 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="borderColor" className="block mb-1">Border Color</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="borderColor"
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-12 h-9 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="borderWidth" className="block mb-1">Border Width</Label>
                    <Select
                      value={borderWidth}
                      onValueChange={(value) => setBorderWidth(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select border width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1px">Thin (1px)</SelectItem>
                        <SelectItem value="2px">Medium (2px)</SelectItem>
                        <SelectItem value="4px">Thick (4px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="alignment" className="block mb-1">Content Alignment</Label>
                  <Select
                    value={alignment}
                    onValueChange={(value) => setAlignment(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select alignment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="borderRadius" className="block mb-1">Border Radius</Label>
                  <Select
                    value={borderRadius}
                    onValueChange={(value) => setBorderRadius(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="full">Full</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="fontFamily" className="block mb-1">Font Family</Label>
                  <Select
                    value={fontFamily}
                    onValueChange={(value) => setFontFamily(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system-ui">System Default</SelectItem>
                      <SelectItem value="'Arial', sans-serif">Arial</SelectItem>
                      <SelectItem value="'Helvetica', sans-serif">Helvetica</SelectItem>
                      <SelectItem value="'Georgia', serif">Georgia</SelectItem>
                      <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                      <SelectItem value="'Segoe UI', sans-serif">Segoe UI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {hasShadow && (
                  <div>
                    <Label htmlFor="shadowColor" className="block mb-1">Shadow Color</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="shadowColor"
                        type="color"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="w-12 h-9 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
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
