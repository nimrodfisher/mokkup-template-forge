
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GeomapDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function GeomapDetailsSection({ properties, handleChange, detailsOpen, setDetailsOpen }: GeomapDetailsSectionProps) {
  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Details</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {detailsOpen && (
        <div className="space-y-3 mb-4">
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <Input
              value={properties.geomapTitle || 'Geographic Data'}
              onChange={(e) => handleChange('geomapTitle', e.target.value)}
              placeholder="Enter map title"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Region</Label>
            <Select
              value={properties.geomapRegion || 'world'}
              onValueChange={(value) => handleChange('geomapRegion', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="world">World</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Map Projection</Label>
            <Select
              value={properties.mapProjection || 'mercator'}
              onValueChange={(value) => handleChange('mapProjection', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mercator">Mercator</SelectItem>
                <SelectItem value="natural-earth">Natural Earth</SelectItem>
                <SelectItem value="equal-earth">Equal Earth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </>
  );
}
