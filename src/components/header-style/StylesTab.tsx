
import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { StylePreview } from "./StylePreview";
import { headerStyles } from "./headerStylesData";

interface StylesTabProps {
  selectedVariant: string;
  setSelectedVariant: (variant: string) => void;
}

export function StylesTab({ selectedVariant, setSelectedVariant }: StylesTabProps) {
  return (
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
          <StylePreview
            key={style.id}
            id={style.id}
            label={style.label}
            selectedVariant={selectedVariant}
          >
            {style.preview}
          </StylePreview>
        ))}
      </RadioGroup>
    </div>
  );
}
