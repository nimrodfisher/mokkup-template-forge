
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
  
  const borderStyle = hasBorder ? `2px solid ${borderColor}` : 'none';
  
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
                  borderLeft: '40px solid transparent',
                  borderRight: '40px solid transparent',
                  borderBottom: `80px solid ${shapeColor}`,
                  border: hasBorder ? `1px solid ${borderColor}` : undefined,
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
                className="w-24 h-12"
                style={{ 
                  backgroundColor: shapeColor,
                  border: borderStyle,
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
                  width: '60px',
                  height: '60px',
                  backgroundColor: shapeColor,
                  border: borderStyle,
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
                  width: '90px',
                  height: '45px',
                  backgroundColor: shapeColor,
                  border: borderStyle,
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
                  borderLeft: '40px solid transparent',
                  borderRight: '40px solid transparent',
                  borderBottom: `80px solid ${shapeColor}`,
                  border: hasBorder ? `1px solid ${borderColor}` : undefined,
                }}
              />
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full h-full p-2 bg-white">
      {renderShape()}
    </div>
  );
};
