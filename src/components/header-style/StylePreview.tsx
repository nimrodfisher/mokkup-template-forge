
import React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export interface HeaderStylePreviewProps {
  id: string;
  label: string;
  selectedVariant: string;
  children: React.ReactNode;
}

export function StylePreview({ id, label, selectedVariant, children }: HeaderStylePreviewProps) {
  return (
    <div className="relative">
      <RadioGroupItem 
        value={id} 
        id={id} 
        className="sr-only peer"
      />
      <Label 
        htmlFor={id} 
        className="border rounded-md p-0 block cursor-pointer peer-focus:ring-2 peer-focus:ring-blue-400 peer-data-[state=checked]:border-blue-500"
      >
        <div className="p-1">
          {children}
          <div className="text-xs p-2 pt-3 text-center">{label}</div>
        </div>
        {selectedVariant === id && (
          <div className="absolute top-2 right-2 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
      </Label>
    </div>
  );
}
