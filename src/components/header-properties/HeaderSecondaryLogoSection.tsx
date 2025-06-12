
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Upload, Trash2 } from 'lucide-react';

interface HeaderSecondaryLogoSectionProps {
  showSecondaryLogo: boolean;
  secondaryLogoUrl?: string;
  onSecondaryLogoToggle: (checked: boolean) => void;
  onSecondaryLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondaryLogoRemove: () => void;
}

export function HeaderSecondaryLogoSection({ 
  showSecondaryLogo, 
  secondaryLogoUrl, 
  onSecondaryLogoToggle, 
  onSecondaryLogoUpload, 
  onSecondaryLogoRemove 
}: HeaderSecondaryLogoSectionProps) {
  const [showSecondaryLogoOptions, setShowSecondaryLogoOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Secondary Logo</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowSecondaryLogoOptions(!showSecondaryLogoOptions)}
            className="h-7 w-7 p-0"
          >
            {showSecondaryLogoOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-secondary-logo" className="text-sm">Show secondary logo</Label>
          <Switch 
            id="show-secondary-logo"
            checked={showSecondaryLogo} 
            onCheckedChange={onSecondaryLogoToggle}
          />
        </div>
        
        {showSecondaryLogoOptions && showSecondaryLogo && (
          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Upload Secondary Logo</Label>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => document.getElementById('secondary-logo-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {secondaryLogoUrl ? 'Change Secondary Logo' : 'Upload Secondary Logo'}
                </Button>
                <input
                  id="secondary-logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={onSecondaryLogoUpload}
                  className="hidden"
                />
                {secondaryLogoUrl && (
                  <div className="mt-2 p-2 border rounded-md">
                    <img 
                      src={secondaryLogoUrl} 
                      alt="Secondary Logo Preview" 
                      className="h-12 w-auto object-contain mx-auto mb-2"
                    />
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="w-full"
                      onClick={onSecondaryLogoRemove}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Secondary Logo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
