
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useWireframe, ButtonVariant, ButtonSize } from "@/hooks/useWireframe";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface ButtonStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function ButtonStyleDialog({ elementId, open, onClose }: ButtonStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  const [buttonText, setButtonText] = useState(element?.properties?.buttonText || 'Button');
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>(
    (element?.properties?.buttonVariant as ButtonVariant) || 'default'
  );
  const [buttonSize, setButtonSize] = useState<ButtonSize>(
    (element?.properties?.buttonSize as ButtonSize) || 'md'
  );
  const [buttonIcon, setButtonIcon] = useState(element?.properties?.buttonIcon || false);
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      buttonText,
      buttonVariant,
      buttonSize,
      buttonIcon,
    });
    onClose();
  };
  
  // Preview component to show how the button will look
  const ButtonPreview = () => {
    const sizeClasses = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };
    
    const variantClasses = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      primary: "bg-purple-600 text-white hover:bg-purple-700",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    };
    
    return (
      <button 
        className={`rounded transition-colors ${sizeClasses[buttonSize]} ${variantClasses[buttonVariant]} flex items-center justify-center`}
      >
        {buttonIcon && (
          <svg className="mr-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {buttonText || 'Button'}
      </button>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Button Style</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="style">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="style" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div>
                <Label>Button Variant</Label>
                <RadioGroup 
                  defaultValue={buttonVariant} 
                  onValueChange={(value) => setButtonVariant(value as ButtonVariant)}
                  className="flex flex-col space-y-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="variant-default" />
                    <Label htmlFor="variant-default">Default</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="primary" id="variant-primary" />
                    <Label htmlFor="variant-primary">Primary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="secondary" id="variant-secondary" />
                    <Label htmlFor="variant-secondary">Secondary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outline" id="variant-outline" />
                    <Label htmlFor="variant-outline">Outline</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ghost" id="variant-ghost" />
                    <Label htmlFor="variant-ghost">Ghost</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Button Size</Label>
                <RadioGroup 
                  defaultValue={buttonSize}
                  onValueChange={(value) => setButtonSize(value as ButtonSize)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sm" id="size-sm" />
                    <Label htmlFor="size-sm">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="md" id="size-md" />
                    <Label htmlFor="size-md">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lg" id="size-lg" />
                    <Label htmlFor="size-lg">Large</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-icon"
                  checked={buttonIcon}
                  onCheckedChange={setButtonIcon}
                />
                <Label htmlFor="show-icon">Show Icon</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Label>Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex items-center justify-center bg-gray-50">
            <ButtonPreview />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
