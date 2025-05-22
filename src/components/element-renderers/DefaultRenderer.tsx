
import React from 'react';

interface DefaultRendererProps {
  type: string;
}

export function DefaultRenderer({ type }: DefaultRendererProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="font-medium">{type}</div>
    </div>
  );
}
