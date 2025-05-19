
import { useWireframe, Element, FilterVariant } from "@/hooks/useWireframe";
import { Check, ChevronDown, Search, Sliders } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FilterDisplayProps {
  element: Element;
}

export function FilterDisplay({ element }: FilterDisplayProps) {
  const properties = element.properties || {};
  const variant = properties.filterVariant || 'dropdown';
  const title = properties.filterTitle || 'Filter';
  const values = properties.filterValues || ['All', 'Value 1', 'Value 2'];
  const alignment = properties.filterAlignment || 'left';
  
  const getTextAlignClass = () => {
    switch (alignment) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };
  
  const renderFilter = () => {
    switch (variant) {
      case 'dropdown':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title}</div>}
            <Select defaultValue={values[0] || 'All'}>
              <SelectTrigger className="w-full h-8 text-sm">
                <SelectValue placeholder={values[0] || 'All'} />
              </SelectTrigger>
              <SelectContent>
                {values.map((value, index) => (
                  <SelectItem key={index} value={value}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title}</div>}
            <div className="space-y-1">
              {values.map((value, index) => (
                <div key={index} className="flex items-center">
                  <div className={`h-4 w-4 border rounded mr-2 flex items-center justify-center ${index === 0 ? 'bg-blue-600 border-blue-600' : ''}`}>
                    {index === 0 && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'radio':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title}</div>}
            <div className="space-y-1">
              {values.map((value, index) => (
                <div key={index} className="flex items-center">
                  <div className={`h-4 w-4 border rounded-full mr-2 flex items-center justify-center ${index === 1 ? 'border-blue-600' : ''}`}>
                    {index === 1 && <div className="h-2 w-2 bg-blue-600 rounded-full"></div>}
                  </div>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'date':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title || 'Date'}</div>}
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full border rounded bg-white p-1 px-2 text-sm text-left">
                  23/05/23
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                  <div className="text-sm">Date picker would go here</div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
        
      case 'daterange':
        return (
          <div className="w-full">
            <div className="flex space-x-2">
              <div className="flex-1">
                <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>Start Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full border rounded bg-white p-1 px-2 text-sm text-left">
                      23/05/23
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-4">
                      <div className="text-sm">Date picker would go here</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>End Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full border rounded bg-white p-1 px-2 text-sm text-left">
                      16/07/23
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-4">
                      <div className="text-sm">Date picker would go here</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        );
        
      case 'slider':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-2 ${getTextAlignClass()}`}>{title}</div>}
            <div className="px-1 py-2">
              <div className="h-1 bg-gray-200 rounded-full mb-2 relative">
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-3 w-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>
        );
        
      case 'search':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title || 'Search'}</div>}
            <div className="border rounded bg-white p-1 pl-2 flex items-center">
              <Search className="h-3 w-3 text-gray-400 mr-2" />
              <input type="text" className="text-sm outline-none flex-1" placeholder="Search..." />
            </div>
          </div>
        );
        
      default:
        return (
          <div className="w-full flex items-center justify-center p-2">
            <Sliders className="h-5 w-5 mr-2" />
            <div className="font-medium">Filter</div>
          </div>
        );
    }
  };
  
  return (
    <div 
      className="w-full h-full flex items-center p-2"
      style={{
        backgroundColor: properties.backgroundColor || '#ffffff',
        color: properties.textColor || 'black',
      }}
    >
      {renderFilter()}
    </div>
  );
}
