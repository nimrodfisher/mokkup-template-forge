
import React from "react";
import { ChevronDown } from "@/components/properties/ChevronDown";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DonutChartDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function DonutChartDetailsSection({
  properties,
  handleChange,
  detailsOpen,
  setDetailsOpen
}: DonutChartDetailsSectionProps) {
  return (
    <div className="space-y-2">
      <div 
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        <span className="font-medium">Details</span>
        <ChevronDown open={detailsOpen} />
      </div>
      
      {detailsOpen && (
        <div className="space-y-3 pl-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="showTitle"
              checked={properties.showTitle !== false}
              onCheckedChange={(checked) => handleChange('showTitle', checked)}
            />
            <Label htmlFor="showTitle" className="text-xs">Title</Label>
          </div>
          
          {properties.showTitle !== false && (
            <div>
              <Label className="text-xs text-gray-600">Edit Text</Label>
              <Input
                value={properties.donutChartTitle || ''}
                onChange={(e) => handleChange('donutChartTitle', e.target.value)}
                placeholder="Title goes here"
                className="text-xs h-8"
              />
            </div>
          )}
          
          <div>
            <Label className="text-xs text-gray-600">Alignment</Label>
            <Select 
              value={properties.titleAlignment || 'left'} 
              onValueChange={(value) => handleChange('titleAlignment', value)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
