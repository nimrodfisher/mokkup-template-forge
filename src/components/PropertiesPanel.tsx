
import { useWireframe } from "@/hooks/useWireframe";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Switch } from "./ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { Image } from "lucide-react";
import { 
  ButtonVariant, 
  FilterVariant, 
  KpiVariant, 
  ButtonSize, 
  FilterAlignment, 
  KpiAlignment, 
  HeaderVariant,
  TextAlignment,
  FontSize,
  FontWeight,
  ImageFit
} from "@/types/wireframe-types";

export function PropertiesPanel() {
  const { selectedElementId, elements, updateElementProperties, removeElement } = useWireframe();
  
  if (!selectedElementId) return null;
  
  const element = elements.find(el => el.id === selectedElementId);
  
  if (!element) return null;
  
  const handleRemove = () => {
    removeElement(selectedElementId);
    toast.success(`${element.type} removed`);
  };
  
  const renderCustomizationOptions = () => {
    switch (element.type) {
      case 'header':
        return renderHeaderProperties();
      case 'filter':
        return renderFilterProperties();
      case 'kpi':
        return renderKpiProperties();
      case 'button':
        return renderButtonProperties();
      case 'textbox':
        return renderTextboxProperties();
      case 'image':
        return renderImageProperties();
      default:
        return (
          <div className="p-4">
            <p className="text-sm text-gray-500">No properties available for this element type.</p>
          </div>
        );
    }
  };
  
  const renderHeaderProperties = () => {
    const headerProps = element.properties || {};
    const [backgroundColor, setBackgroundColor] = useState(headerProps.backgroundColor || '#ffffff');
    const [textColor, setTextColor] = useState(headerProps.textColor || 'black');
    const [title, setTitle] = useState(headerProps.title || 'DASHBOARD TITLE');
    const [showLogo, setShowLogo] = useState(headerProps.showLogo !== false);
    const [showNavigation, setShowNavigation] = useState(headerProps.showNavigation !== false);
    const [variant, setVariant] = useState<HeaderVariant>(headerProps.variant as HeaderVariant || 'default');
    const [description, setDescription] = useState(headerProps.description || 'Dashboard description goes here');
    
    const handleSave = () => {
      updateElementProperties(element.id, {
        backgroundColor,
        textColor,
        title,
        showLogo,
        showNavigation,
        variant,
        description,
      });
      toast.success("Header properties updated");
    };
    
    return (
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Header Properties</h3>
          <p className="text-sm text-gray-500">Customize the header appearance</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              placeholder="#ffffff"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <Input
              id="textColor"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              placeholder="black"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dashboard Title"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="showLogo">Show Logo</Label>
            <Switch
              id="showLogo"
              checked={showLogo}
              onCheckedChange={(checked) => setShowLogo(checked)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="showNavigation">Show Navigation</Label>
            <Switch
              id="showNavigation"
              checked={showNavigation}
              onCheckedChange={(checked) => setShowNavigation(checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="variant">Variant</Label>
            <Select 
              value={variant} 
              onValueChange={(value: HeaderVariant) => setVariant(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="centered">Centered</SelectItem>
                <SelectItem value="with-description">With Description</SelectItem>
                <SelectItem value="with-metrics">With Metrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dashboard description"
            />
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Update Header
          </Button>
        </div>
      </div>
    );
  };
  
  const renderFilterProperties = () => {
    const filterProps = element.properties || {};
    const [filterTitle, setFilterTitle] = useState(filterProps.filterTitle || 'Filter Title');
    const [filterVariant, setFilterVariant] = useState<FilterVariant>(filterProps.filterVariant as FilterVariant || 'dropdown');
    const [filterValues, setFilterValues] = useState(filterProps.filterValues || ['All', 'Value 1', 'Value 2']);
    const [filterAlignment, setFilterAlignment] = useState<FilterAlignment>(filterProps.filterAlignment as FilterAlignment || 'left');
    
    const handleSave = () => {
      updateElementProperties(element.id, {
        filterTitle,
        filterVariant,
        filterValues,
        filterAlignment,
      });
      toast.success("Filter properties updated");
    };
    
    return (
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Filter Properties</h3>
          <p className="text-sm text-gray-500">Customize the filter appearance</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="filterTitle">Filter Title</Label>
            <Input
              id="filterTitle"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              placeholder="Filter Title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="filterVariant">Filter Variant</Label>
            <Select 
              value={filterVariant} 
              onValueChange={(value: FilterVariant) => setFilterVariant(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="radio">Radio</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="daterange">Date Range</SelectItem>
                <SelectItem value="slider">Slider</SelectItem>
                <SelectItem value="search">Search</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="filterValues">Filter Values</Label>
            <Input
              id="filterValues"
              value={filterValues.join(', ')}
              onChange={(e) => setFilterValues(e.target.value.split(',').map(s => s.trim()))}
              placeholder="Value 1, Value 2, Value 3"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="filterAlignment">Filter Alignment</Label>
            <Select 
              value={filterAlignment} 
              onValueChange={(value: FilterAlignment) => setFilterAlignment(value)}
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
          
          <Button onClick={handleSave} className="w-full">
            Update Filter
          </Button>
        </div>
      </div>
    );
  };
  
  const renderKpiProperties = () => {
    const kpiProps = element.properties || {};
    const [kpiVariant, setKpiVariant] = useState<KpiVariant>(kpiProps.kpiVariant as KpiVariant || 'basic');
    const [kpiTitle, setKpiTitle] = useState(kpiProps.kpiTitle || 'Metric Title');
    const [kpiValue, setKpiValue] = useState(kpiProps.kpiValue || '25.2K');
    const [kpiPreviousValue, setKpiPreviousValue] = useState(kpiProps.kpiPreviousValue || '11.6K');
    const [kpiChangePercentage, setKpiChangePercentage] = useState(kpiProps.kpiChangePercentage || '+10%');
    const [kpiAlignment, setKpiAlignment] = useState<KpiAlignment>(kpiProps.kpiAlignment as KpiAlignment || 'left');
    const [showKpiTitle, setShowKpiTitle] = useState(kpiProps.showKpiTitle !== false);
    const [showPreviousValue, setShowPreviousValue] = useState(kpiProps.showPreviousValue !== false);
    const [showChangePercentage, setShowChangePercentage] = useState(kpiProps.showChangePercentage !== false);
    const [indicatorColor, setIndicatorColor] = useState(kpiProps.indicatorColor || '#8B5CF6');
    
    const handleSave = () => {
      updateElementProperties(element.id, {
        kpiVariant,
        kpiTitle,
        kpiValue,
        kpiPreviousValue,
        kpiChangePercentage,
        kpiAlignment,
        showKpiTitle,
        showPreviousValue,
        showChangePercentage,
        indicatorColor,
      });
      toast.success("KPI properties updated");
    };
    
    return (
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">KPI Properties</h3>
          <p className="text-sm text-gray-500">Customize the KPI appearance</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kpiVariant">KPI Variant</Label>
            <Select 
              value={kpiVariant} 
              onValueChange={(value: KpiVariant) => setKpiVariant(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="indicator">Indicator</SelectItem>
                <SelectItem value="comparison">Comparison</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kpiTitle">KPI Title</Label>
            <Input
              id="kpiTitle"
              value={kpiTitle}
              onChange={(e) => setKpiTitle(e.target.value)}
              placeholder="Metric Title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kpiValue">KPI Value</Label>
            <Input
              id="kpiValue"
              value={kpiValue}
              onChange={(e) => setKpiValue(e.target.value)}
              placeholder="25.2K"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kpiPreviousValue">Previous Value</Label>
            <Input
              id="kpiPreviousValue"
              value={kpiPreviousValue}
              onChange={(e) => setKpiPreviousValue(e.target.value)}
              placeholder="11.6K"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kpiChangePercentage">Change Percentage</Label>
            <Input
              id="kpiChangePercentage"
              value={kpiChangePercentage}
              onChange={(e) => setKpiChangePercentage(e.target.value)}
              placeholder="+10%"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="kpiAlignment">KPI Alignment</Label>
            <Select 
              value={kpiAlignment} 
              onValueChange={(value: KpiAlignment) => setKpiAlignment(value)}
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
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="showKpiTitle">Show Title</Label>
            <Switch
              id="showKpiTitle"
              checked={showKpiTitle}
              onCheckedChange={(checked) => setShowKpiTitle(checked)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="showPreviousValue">Show Previous Value</Label>
            <Switch
              id="showPreviousValue"
              checked={showPreviousValue}
              onCheckedChange={(checked) => setShowPreviousValue(checked)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="showChangePercentage">Show Change Percentage</Label>
            <Switch
              id="showChangePercentage"
              checked={showChangePercentage}
              onCheckedChange={(checked) => setShowChangePercentage(checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="indicatorColor">Indicator Color</Label>
            <Input
              id="indicatorColor"
              value={indicatorColor}
              onChange={(e) => setIndicatorColor(e.target.value)}
              placeholder="#8B5CF6"
            />
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Update KPI
          </Button>
        </div>
      </div>
    );
  };
  
  const renderButtonProperties = () => {
    const buttonProps = element.properties || {};
    const [buttonText, setButtonText] = useState(buttonProps.buttonText || 'Button');
    const [buttonVariant, setButtonVariant] = useState<ButtonVariant>(buttonProps.buttonVariant as ButtonVariant || 'default');
    const [buttonSize, setButtonSize] = useState<ButtonSize>(buttonProps.buttonSize as ButtonSize || 'md');
    const [buttonIcon, setButtonIcon] = useState(buttonProps.buttonIcon || false);
    
    const handleSave = () => {
      updateElementProperties(element.id, {
        buttonText,
        buttonVariant,
        buttonSize,
        buttonIcon,
      });
      toast.success("Button properties updated");
    };
    
    return (
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Button Properties</h3>
          <p className="text-sm text-gray-500">Customize the button appearance</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="buttonText">Button Text</Label>
            <Input
              id="buttonText"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Button"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="buttonVariant">Button Variant</Label>
            <Select 
              value={buttonVariant} 
              onValueChange={(value: ButtonVariant) => setButtonVariant(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="buttonSize">Button Size</Label>
            <Select 
              value={buttonSize} 
              onValueChange={(value: ButtonSize) => setButtonSize(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="buttonIcon">Show Icon</Label>
            <Switch
              id="buttonIcon"
              checked={buttonIcon}
              onCheckedChange={(checked) => setButtonIcon(checked)}
            />
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Update Button
          </Button>
        </div>
      </div>
    );
  };
  
  const renderTextboxProperties = () => {
    const textboxProps = element.properties || {};
    const [textboxContent, setTextboxContent] = useState(textboxProps.textboxContent || 'Edit text in left pane...');
    const [textboxTitle, setTextboxTitle] = useState(textboxProps.textboxTitle || 'Title goes here');
    const [showTextboxTitle, setShowTextboxTitle] = useState(textboxProps.showTextboxTitle !== false);
    const [textAlignment, setTextAlignment] = useState<TextAlignment>(textboxProps.textAlignment as TextAlignment || 'left');
    const [fontSize, setFontSize] = useState<FontSize>(textboxProps.fontSize as FontSize || 'md');
    const [fontWeight, setFontWeight] = useState<FontWeight>(textboxProps.fontWeight as FontWeight || 'normal');
    
    const handleSave = () => {
      updateElementProperties(element.id, {
        textboxContent,
        textboxTitle,
        showTextboxTitle,
        textAlignment,
        fontSize,
        fontWeight,
      });
      toast.success("Textbox properties updated");
    };
    
    return (
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Textbox Properties</h3>
          <p className="text-sm text-gray-500">Customize the textbox appearance</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="textboxTitle">Textbox Title</Label>
            <Input
              id="textboxTitle"
              value={textboxTitle}
              onChange={(e) => setTextboxTitle(e.target.value)}
              placeholder="Title goes here"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="showTextboxTitle">Show Title</Label>
            <Switch
              id="showTextboxTitle"
              checked={showTextboxTitle}
              onCheckedChange={(checked) => setShowTextboxTitle(checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textboxContent">Textbox Content</Label>
            <Input
              id="textboxContent"
              value={textboxContent}
              onChange={(e) => setTextboxContent(e.target.value)}
              placeholder="Edit text in left pane..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textAlignment">Text Alignment</Label>
            <Select 
              value={textAlignment} 
              onValueChange={(value: TextAlignment) => setTextAlignment(value)}
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
          
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Select 
              value={fontSize} 
              onValueChange={(value: FontSize) => setFontSize(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontWeight">Font Weight</Label>
            <Select 
              value={fontWeight} 
              onValueChange={(value: FontWeight) => setFontWeight(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Update Textbox
          </Button>
        </div>
      </div>
    );
  };
  
  const renderImageProperties = () => {
    const imageProps = element.properties || {};
    const [imageUrl, setImageUrl] = useState(imageProps.imageUrl || '');
    const [altText, setAltText] = useState(imageProps.altText || 'Image');
    const [imageFit, setImageFit] = useState<ImageFit>(imageProps.imageFit as ImageFit || 'contain');
    const [borderRadius, setBorderRadius] = useState(imageProps.borderRadius || '0');
    
    const handleSave = () => {
      updateElementProperties(element.id, {
        imageUrl,
        altText,
        imageFit,
        borderRadius,
      });
      toast.success("Image properties updated");
    };
    
    return (
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Image Properties</h3>
          <p className="text-sm text-gray-500">Configure the image appearance</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <div className="flex space-x-2">
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="altText">Alt Text</Label>
            <Input
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Image description"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageFit">Image Fit</Label>
            <Select 
              value={imageFit} 
              onValueChange={(value: ImageFit) => setImageFit(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="fill">Fill</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="borderRadius">Border Radius</Label>
            <Select 
              value={borderRadius} 
              onValueChange={(value: string) => setBorderRadius(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select border radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="0.25rem">Small</SelectItem>
                <SelectItem value="0.5rem">Medium</SelectItem>
                <SelectItem value="1rem">Large</SelectItem>
                <SelectItem value="9999px">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {imageUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-md p-2 h-40 flex items-center justify-center">
                <img 
                  src={imageUrl} 
                  alt={altText} 
                  className="max-w-full max-h-full" 
                  style={{
                    objectFit: imageFit as "contain" | "cover" | "fill",
                    borderRadius
                  }}
                />
              </div>
            </div>
          )}
          
          <Button onClick={handleSave} className="w-full">
            Update Image
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-72 border-l bg-white flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold capitalize">{element.type} Properties</h2>
        <Button variant="outline" size="sm" onClick={handleRemove}>
          Remove
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderCustomizationOptions()}
      </div>
    </div>
  );
}
