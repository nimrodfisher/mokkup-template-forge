
import { ElementType, useWireframe } from "@/hooks/useWireframe";
import { useDrag } from "react-dnd";

interface ComponentItemProps {
  label: string;
  type: ElementType;
}

export function ComponentItem({ label, type }: ComponentItemProps) {
  const [, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="aspect-w-5 aspect-h-3 bg-gray-50 border rounded-md flex flex-col items-center justify-center cursor-grab hover:border-blue-500 hover:shadow-sm transition-all"
    >
      <div className="p-2 text-center">
        <div className="mb-1 flex justify-center">
          <ComponentIcon type={type} />
        </div>
        <div className="text-xs text-gray-600">{label}</div>
      </div>
    </div>
  );
}

function ComponentIcon({ type }: { type: ElementType }) {
  switch (type) {
    case 'header':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'button':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'filter':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'kpi':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 14l2-3 3 3 5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'column-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="5" y="10" width="3" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10.5" y="6" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="13" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'bar-chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="6" y="5" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="10.5" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="6" y="16" width="5" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}
