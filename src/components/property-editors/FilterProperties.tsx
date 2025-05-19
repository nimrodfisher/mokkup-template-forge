
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { toast } from "sonner";
import { FilterVariant, FilterAlignment } from "@/types/wireframe-types";

interface FilterPropertiesProps {
  elementId: string;
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
}

export function FilterProperties({ elementId, properties, updateElementProperties }: FilterPropertiesProps) {
  const [filterTitle, setFilterTitle] = useState(properties.filterTitle || 'Filter Title');
  const [filterVariant, setFilterVariant] = useState<FilterVariant>(properties.filterVariant as FilterVariant || 'dropdown');
  const [filterValues, setFilterValues] = useState(properties.filterValues || ['All', 'Value 1', 'Value 2']);
  const [filterAlignment, setFilterAlignment] = useState<FilterAlignment>(properties.filterAlignment as FilterAlignment || 'left');
  
  const handleSave = () => {
    updateElementProperties(elementId, {
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
}
