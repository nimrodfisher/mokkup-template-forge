
import React from 'react';
import { Element } from '@/hooks/useWireframe';

interface ShapeDisplayProps {
  element: Element;
}

export const ShapeDisplay: React.FC<ShapeDisplayProps> = ({ element }) => {
  const { properties } = element;
  const shapeVariant = properties?.shapeVariant || 'triangle';
  const shapeColor = properties?.shapeColor || '#9b87f5';
  const showTitle = properties?.showTitle !== false;
  const title = properties?.title || 'Title goes here';
  const textAlignment = properties?.textAlignment || 'center';

  const renderShape = () => {
    switch (shapeVariant) {
      case 'triangle':
        return (
          <div 
            className="mx-auto"
            style={{ 
              width: 0, 
              height: 0, 
              borderLeft: '50px solid transparent',
              borderRight: '50px solid transparent',
              borderBottom: `100px solid ${shapeColor}`
            }} 
          />
        );
      case 'rectangle':
        return (
          <div 
            className="mx-auto"
            style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: shapeColor 
            }} 
          />
        );
      case 'circle':
        return (
          <div 
            className="mx-auto rounded-full"
            style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: shapeColor 
            }} 
          />
        );
      case 'oval':
        return (
          <div 
            className="mx-auto rounded-full"
            style={{ 
              width: '100%', 
              height: '100%',
              backgroundColor: shapeColor 
            }} 
          />
        );
      case 'bar-chart':
        return (
          <div className="w-full h-full flex items-end justify-between space-x-1 px-2">
            <div className="w-full h-[60%]" style={{ backgroundColor: shapeColor }}></div>
            <div className="w-full h-[80%]" style={{ backgroundColor: shapeColor }}></div>
            <div className="w-full h-[40%]" style={{ backgroundColor: shapeColor }}></div>
            <div className="w-full h-[90%]" style={{ backgroundColor: shapeColor }}></div>
            <div className="w-full h-[65%]" style={{ backgroundColor: shapeColor }}></div>
            <div className="w-full h-[55%]" style={{ backgroundColor: shapeColor }}></div>
          </div>
        );
      case 'stacked-bar':
        const secondaryColor = shadeColor(shapeColor, 40); // lighter shade
        return (
          <div className="w-full h-full flex items-end justify-between space-x-1 px-2">
            <div className="flex flex-col w-full">
              <div className="h-[30%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[30%]" style={{ backgroundColor: secondaryColor }}></div>
            </div>
            <div className="flex flex-col w-full">
              <div className="h-[45%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[25%]" style={{ backgroundColor: secondaryColor }}></div>
            </div>
            <div className="flex flex-col w-full">
              <div className="h-[20%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[35%]" style={{ backgroundColor: secondaryColor }}></div>
            </div>
            <div className="flex flex-col w-full">
              <div className="h-[50%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[40%]" style={{ backgroundColor: secondaryColor }}></div>
            </div>
            <div className="flex flex-col w-full">
              <div className="h-[35%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[45%]" style={{ backgroundColor: secondaryColor }}></div>
            </div>
            <div className="flex flex-col w-full">
              <div className="h-[30%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[30%]" style={{ backgroundColor: secondaryColor }}></div>
            </div>
          </div>
        );
      case 'stacked-100-bar':
        const secondColor = shadeColor(shapeColor, 40);
        const thirdColor = shadeColor(shapeColor, 70);
        return (
          <div className="w-full h-full flex items-end justify-between space-x-1 px-2">
            <div className="flex flex-col w-full h-full">
              <div className="h-[40%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[30%]" style={{ backgroundColor: secondColor }}></div>
              <div className="h-[30%]" style={{ backgroundColor: thirdColor }}></div>
            </div>
            <div className="flex flex-col w-full h-full">
              <div className="h-[20%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[50%]" style={{ backgroundColor: secondColor }}></div>
              <div className="h-[30%]" style={{ backgroundColor: thirdColor }}></div>
            </div>
            <div className="flex flex-col w-full h-full">
              <div className="h-[10%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[40%]" style={{ backgroundColor: secondColor }}></div>
              <div className="h-[50%]" style={{ backgroundColor: thirdColor }}></div>
            </div>
            <div className="flex flex-col w-full h-full">
              <div className="h-[45%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[30%]" style={{ backgroundColor: secondColor }}></div>
              <div className="h-[25%]" style={{ backgroundColor: thirdColor }}></div>
            </div>
            <div className="flex flex-col w-full h-full">
              <div className="h-[33%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="h-[33%]" style={{ backgroundColor: secondColor }}></div>
              <div className="h-[34%]" style={{ backgroundColor: thirdColor }}></div>
            </div>
          </div>
        );
      case 'multi-series-bar':
        const altColor = shadeColor(shapeColor, 40);
        return (
          <div className="w-full h-full flex items-end justify-between px-2">
            <div className="flex items-end space-x-1 h-full">
              <div className="w-full h-[60%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="w-full h-[45%]" style={{ backgroundColor: altColor }}></div>
            </div>
            <div className="flex items-end space-x-1 h-full">
              <div className="w-full h-[80%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="w-full h-[65%]" style={{ backgroundColor: altColor }}></div>
            </div>
            <div className="flex items-end space-x-1 h-full">
              <div className="w-full h-[40%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="w-full h-[70%]" style={{ backgroundColor: altColor }}></div>
            </div>
            <div className="flex items-end space-x-1 h-full">
              <div className="w-full h-[90%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="w-full h-[50%]" style={{ backgroundColor: altColor }}></div>
            </div>
            <div className="flex items-end space-x-1 h-full">
              <div className="w-full h-[65%]" style={{ backgroundColor: shapeColor }}></div>
              <div className="w-full h-[80%]" style={{ backgroundColor: altColor }}></div>
            </div>
          </div>
        );
      default:
        return <div>Unknown shape variant</div>;
    }
  };

  // Helper function to lighten or darken a color
  function shadeColor(color: string, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.max(0, R + percent));
    G = Math.min(255, Math.max(0, G + percent));
    B = Math.min(255, Math.max(0, B + percent));

    const RR = R.toString(16).padStart(2, '0');
    const GG = G.toString(16).padStart(2, '0');
    const BB = B.toString(16).padStart(2, '0');

    return "#" + RR + GG + BB;
  }

  return (
    <div className="w-full h-full flex flex-col">
      {showTitle && (
        <div 
          className={`text-${textAlignment} px-2 py-1 font-medium text-sm`}
        >
          {title}
        </div>
      )}
      <div className="flex-1 flex items-center justify-center">
        {renderShape()}
      </div>
    </div>
  );
};
