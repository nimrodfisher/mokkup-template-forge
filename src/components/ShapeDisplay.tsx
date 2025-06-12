
import { Element } from "@/hooks/useWireframe";

export const ShapeDisplay = ({ element }: { element: Element }) => {
  const properties = element.properties || {};
  const variant = properties.shapeVariant || 'triangle';
  const shapeColor = properties.shapeColor || '#9b87f5';
  const textColor = properties.textColor || 'black';
  const title = properties.title || 'Title goes here';
  const showTitle = properties.showTitle !== false;
  const textAlignment = properties.textAlignment || 'center';
  const hasBorder = properties.hasBorder === true;
  const borderColor = properties.borderColor || '#e5e7eb';
  
  // Size properties with defaults that fit within typical canvas elements
  const shapeWidth = properties.shapeWidth || 60;
  const shapeHeight = properties.shapeHeight || 40;
  
  const renderShape = () => {
    switch (variant) {
      case 'triangle':
        return (
          <div className="flex flex-col h-full min-h-[120px]">
            {showTitle && (
              <div 
                className={`mb-2 text-sm font-medium text-${textAlignment}`}
                style={{ color: textColor }}
              >
                {title}
              </div>
            )}
            <div className="flex-1 flex items-center justify-center">
              <div 
                style={{ 
                  width: 0, 
                  height: 0, 
                  borderLeft: `${shapeWidth/2}px solid transparent`,
                  borderRight: `${shapeWidth/2}px solid transparent`,
                  borderBottom: `${shapeHeight}px solid ${shapeColor}`,
                }}
              />
            </div>
          </div>
        );
        
      case 'rectangle':
        return (
          <div className="flex flex-col h-full min-h-[120px]">
            {showTitle && (
              <div 
                className={`mb-2 text-sm font-medium text-${textAlignment}`}
                style={{ color: textColor }}
              >
                {title}
              </div>
            )}
            <div className="flex-1 flex items-center justify-center">
              <div 
                style={{ 
                  width: `${shapeWidth}px`,
                  height: `${shapeHeight}px`,
                  backgroundColor: shapeColor,
                  border: hasBorder ? `2px solid ${borderColor}` : 'none',
                }}
              />
            </div>
          </div>
        );
        
      case 'circle':
        return (
          <div className="flex flex-col h-full min-h-[120px]">
            {showTitle && (
              <div 
                className={`mb-2 text-sm font-medium text-${textAlignment}`}
                style={{ color: textColor }}
              >
                {title}
              </div>
            )}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="rounded-full"
                style={{ 
                  width: `${Math.min(shapeWidth, shapeHeight)}px`,
                  height: `${Math.min(shapeWidth, shapeHeight)}px`,
                  backgroundColor: shapeColor,
                  border: hasBorder ? `2px solid ${borderColor}` : 'none',
                }}
              />
            </div>
          </div>
        );
        
      case 'oval':
        return (
          <div className="flex flex-col h-full min-h-[120px]">
            {showTitle && (
              <div 
                className={`mb-2 text-sm font-medium text-${textAlignment}`}
                style={{ color: textColor }}
              >
                {title}
              </div>
            )}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="rounded-full"
                style={{ 
                  width: `${shapeWidth}px`,
                  height: `${shapeHeight}px`,
                  backgroundColor: shapeColor,
                  border: hasBorder ? `2px solid ${borderColor}` : 'none',
                }}
              />
            </div>
          </div>
        );
        
      default:
        // Fallback to triangle if variant is undefined
        return (
          <div className="flex flex-col h-full min-h-[120px]">
            {showTitle && (
              <div 
                className={`mb-2 text-sm font-medium text-${textAlignment}`}
                style={{ color: textColor }}
              >
                {title}
              </div>
            )}
            <div className="flex-1 flex items-center justify-center">
              <div 
                style={{ 
                  width: 0, 
                  height: 0, 
                  borderLeft: `${shapeWidth/2}px solid transparent`,
                  borderRight: `${shapeWidth/2}px solid transparent`,
                  borderBottom: `${shapeHeight}px solid ${shapeColor}`,
                }}
              />
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full h-full p-2 bg-white overflow-hidden">
      {renderShape()}
    </div>
  );
};
