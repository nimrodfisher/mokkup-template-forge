
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderNavigationSectionProps {
  showNavigation: boolean;
  navigationItems: string[];
  onNavigationToggle: (checked: boolean) => void;
  onNavigationItemChange: (index: number, value: string) => void;
}

export function HeaderNavigationSection({
  showNavigation,
  navigationItems,
  onNavigationToggle,
  onNavigationItemChange
}: HeaderNavigationSectionProps) {
  const [showNavOptions, setShowNavOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Navigation</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowNavOptions(!showNavOptions)}
            className="h-7 w-7 p-0"
          >
            {showNavOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-nav" className="text-sm">Show navigation</Label>
          <Switch 
            id="show-nav"
            checked={showNavigation} 
            onCheckedChange={onNavigationToggle}
          />
        </div>
        
        {showNavOptions && showNavigation && (
          <div className="space-y-2 pt-2">
            {navigationItems.map((item, index) => (
              <div key={index} className="mb-2">
                <Label htmlFor={`nav-item-${index}`} className="text-xs text-gray-500 mb-1 block">
                  Item {index + 1}
                </Label>
                <Input
                  id={`nav-item-${index}`}
                  value={item}
                  onChange={(e) => onNavigationItemChange(index, e.target.value)}
                  className="text-sm h-8"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
