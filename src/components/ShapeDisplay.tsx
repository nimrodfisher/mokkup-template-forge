
import { Element } from "@/hooks/useWireframe";

export const ShapeDisplay = ({ element }: { element: Element }) => {
  const properties = element.properties || {};
  const variant = properties.shapeVariant || 'triangle';
  const shapeColor = properties.shapeColor || '#9b87f5';
  const textColor = properties.textColor || 'black';
  const title = properties.title || 'Shape';
  const showTitle = properties.showTitle !== false;
  const textAlignment = properties.textAlignment || 'center';
  const hasBorder = properties.hasBorder === true;
  const borderColor = properties.borderColor || '#e5e7eb';
  
  const borderStyle = hasBorder ? `2px solid ${borderColor}` : 'none';
  
  const renderShape = () => {
    switch (variant) {
      case 'triangle':
        return (
          <div className="flex flex-col h-full justify-center items-center p-2">
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
                  borderLeft: '25px solid transparent',
                  borderRight: '25px solid transparent',
                  borderBottom: `50px solid ${shapeColor}`,
                  border: hasBorder ? `1px solid ${borderColor}` : undefined,
                }}
              />
            </div>
          </div>
        );
        
      case 'rectangle':
        return (
          <div className="flex flex-col h-full justify-center items-center p-2">
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
                className="w-16 h-8"
                style={{ 
                  backgroundColor: shapeColor,
                  border: borderStyle,
                  minWidth: '32px',
                  minHeight: '16px'
                }}
              />
            </div>
          </div>
        );
        
      case 'circle':
        return (
          <div className="flex flex-col h-full justify-center items-center p-2">
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
                  width: '40px',
                  height: '40px',
                  backgroundColor: shapeColor,
                  border: borderStyle,
                  minWidth: '20px',
                  minHeight: '20px'
                }}
              />
            </div>
          </div>
        );
        
      case 'oval':
        return (
          <div className="flex flex-col h-full justify-center items-center p-2">
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
                  height: '30px',
                  backgroundColor: shapeColor,
                  border: borderStyle,
                  minWidth: '30px',
                  minHeight: '15px'
                }}
              />
            </div>
          </div>
        );
        
      default:
        // Fallback for any unknown variant
        return (
          <div className="flex flex-col h-full justify-center items-center p-2">
            <div 
              className="text-sm font-medium"
              style={{ color: textColor }}
            >
              {title}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="w-16 h-8"
                style={{ 
                  backgroundColor: shapeColor,
                  border: borderStyle,
                  minWidth: '32px',
                  minHeight: '16px'
                }}
              />
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded">
      {renderShape()}
    </div>
  );
};
