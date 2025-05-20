
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorInput({ id, label, value, onChange }: ColorInputProps) {
  return (
    <div>
      <Label htmlFor={id} className="block mb-1">{label}</Label>
      <div className="flex space-x-2">
        <Input 
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-9 p-1 cursor-pointer"
        />
        <Input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  );
}
