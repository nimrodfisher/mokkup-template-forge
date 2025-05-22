
import React from 'react';
import { Element } from "@/types/wireframe";
import { TableDisplay } from "@/components/TableDisplay";

interface DefaultRendererProps {
  type: string;
  element?: Element;
}

export function DefaultRenderer({ type, element }: DefaultRendererProps) {
  // If this is a simple-table type and we have the element data, use TableDisplay
  if (type === 'simple-table' && element) {
    return <TableDisplay element={element} />;
  }

  // Default fallback for other elements or when element data is missing
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="font-medium">{type}</div>
    </div>
  );
}
