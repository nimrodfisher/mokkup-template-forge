import { useState } from "react";
import { useWireframe, Element } from "@/hooks/useWireframe";
import { FilterDisplay } from "./FilterDisplay";
import { FilterStyleDialog } from "./FilterStyleDialog";
import { KpiStyleDialog } from "./KpiStyleDialog";
import { KpiDisplay } from "./KpiDisplay";
import { ButtonStyleDialog } from "./ButtonStyleDialog";
import { TextboxStyleDialog } from "./TextboxStyleDialog";
import { ShapeStyleDialog } from "./ShapeStyleDialog";
import { ShapeDisplay } from "./ShapeDisplay";
import { toast } from "sonner";
import { ImageStyleDialog } from "./ImageStyleDialog";
import { HeaderStyleDialog } from "./HeaderStyleDialog";

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
}

export function CanvasElement({ element, isSelected }: CanvasElementProps) {
  const [showFilterStyleDialog, setShowFilterStyleDialog] = useState(false);
  const [showKpiStyleDialog, setShowKpiStyleDialog] = useState(false);
  const [showButtonStyleDialog, setShowButtonStyleDialog] = useState(false);
  const [showTextboxStyleDialog, setShowTextboxStyleDialog] = useState(false);
  const [showImageStyleDialog, setShowImageStyleDialog] = useState(false);
  const [showShapeStyleDialog, setShowShapeStyleDialog] = useState(false);
  const [showHeaderStyleDialog, setShowHeaderStyleDialog] = useState(false);
  const { updateElement, selectElement, removeElement } = useWireframe();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.type === 'filter') {
      setShowFilterStyleDialog(true);
    } else if (element.type === 'kpi') {
      setShowKpiStyleDialog(true);
    } else if (element.type === 'button') {
      setShowButtonStyleDialog(true);
    } else if (element.type === 'textbox') {
      setShowTextboxStyleDialog(true);
    } else if (element.type === 'image') {
      setShowImageStyleDialog(true);
    } else if (element.type === 'shapes') {
      setShowShapeStyleDialog(true);
    } else if (element.type === 'header') {
      setShowHeaderStyleDialog(true);
    }
  };
  
  const handleMouseDownOnElement = (e: React.MouseEvent) => {
    if (isSelected) {
      e.stopPropagation();
      setIsDragging(true);
      
      const startX = e.clientX;
      const startY = e.clientY;
      const startElementX = element.position.x;
      const startElementY = element.position.y;
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        
        updateElement(element.id, {
          position: {
            x: startElementX + dx,
            y: startElementY + dy,
          }
        });
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };
  
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.size.width;
    const startHeight = element.size.height;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      const newWidth = Math.max(50, startWidth + dx);
      const newHeight = Math.max(30, startHeight + dy);
      
      updateElement(element.id, {
        size: {
          width: newWidth,
          height: newHeight,
        }
      });
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleDelete = (e: React.KeyboardEvent) => {
    if (isSelected && e.key === 'Delete') {
      removeElement(element.id);
      toast.success(`${element.type} removed`);
    }
  };
  
  // Render element content based on type
  const renderElementContent = () => {
    switch (element.type) {
      case 'header':
        const headerProperties = element.properties || {};
        const variant = headerProperties.variant || 'default';
        
        // Determine styles based on variant
        let containerStyles = "w-full h-full flex items-center";
        let contentLayout = "";
        
        switch(variant) {
          case 'centered-navigation-purple':
            containerStyles += " bg-[#9b87f5] p-4 flex-col justify-center text-white";
            contentLayout = "flex flex-col items-center";
            break;
          case 'double-logo-purple':
            containerStyles += " bg-[#9b87f5] p-4 text-white";
            contentLayout = "flex items-center justify-between w-full";
            break;
          case 'with-description':
            containerStyles += " p-4 flex-col";
            contentLayout = "flex flex-col";
            break;
          case 'with-metrics':
            containerStyles += " p-4";
            contentLayout = "flex items-center justify-between w-full";
            break;
          case 'navigation-top':
            containerStyles += " p-4";
            contentLayout = "flex items-center justify-between w-full";
            break;
          case 'dark-navigation':
            containerStyles += " bg-[#1A1F2C] p-4 text-white";
            contentLayout = "flex items-center justify-between w-full";
            break;
          case 'gradient':
            containerStyles += " bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-4 text-white";
            contentLayout = "flex items-center";
            break;
          case 'minimal':
            containerStyles += " bg-[#F6F6F7] p-4";
            contentLayout = "flex items-center justify-center";
            break;
          case 'colorful-banner':
            containerStyles += " bg-white p-0 flex-col";
            contentLayout = "flex items-center justify-between w-full";
            break;
          default: 
            containerStyles += " p-4";
            contentLayout = "flex items-center";
        }
        
        return (
          <div 
            className={containerStyles}
            style={{
              backgroundColor: variant !== 'gradient' && variant !== 'colorful-banner' ? headerProperties.backgroundColor || undefined : undefined,
              color: headerProperties.textColor || undefined,
            }}
          >
            {variant === 'colorful-banner' && (
              <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#0EA5E9]"></div>
            )}
            
            {variant === 'double-logo-purple' ? (
              <>
                {headerProperties.showLogo && (
                  <div className="h-full max-h-12 aspect-square bg-gray-200 flex items-center justify-center text-gray-800">
                    {headerProperties.logoUrl ? (
                      <img src={headerProperties.logoUrl} alt="Logo" className="h-full max-h-12 object-contain" />
                    ) : (
                      'Logo'
                    )}
                  </div>
                )}
                
                {headerProperties.title && (
                  <div className="font-bold text-lg text-center">{headerProperties.title}</div>
                )}
                
                <div className="h-full max-h-12 aspect-square bg-gray-200 flex items-center justify-center text-gray-800">
                  {headerProperties.logoUrl ? (
                    <img src={headerProperties.logoUrl} alt="Logo" className="h-full max-h-12 object-contain" />
                  ) : (
                    'Logo'
                  )}
                </div>
              </>
            ) : variant === 'centered-navigation-purple' ? (
              <div className="flex flex-col items-center">
                {headerProperties.title && (
                  <div className="font-bold text-lg mb-2">{headerProperties.title}</div>
                )}
                
                <div className="flex justify-center space-x-6">
                  <div className="text-sm">Navigation 1</div>
                  <div className="text-sm">Navigation 2</div>
                  <div className="text-sm">Navigation 3</div>
                </div>
              </div>
            ) : variant === 'minimal' ? (
              <div className="font-bold text-center">{headerProperties.title || 'DASHBOARD TITLE'}</div>
            ) : variant === 'colorful-banner' ? (
              <div className="p-4 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {headerProperties.showLogo && (
                      <div className="mr-3">
                        {headerProperties.logoUrl ? (
                          <img 
                            src={headerProperties.logoUrl} 
                            alt="Logo" 
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-400">
                            Logo
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="font-bold">{headerProperties.title || 'DASHBOARD TITLE'}</div>
                  </div>
                  
                  {headerProperties.showNavigation && (
                    <div className="flex space-x-4 text-sm">
                      <button className="hover:underline">Link 1</button>
                      <button className="hover:underline">Link 2</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={contentLayout}>
                <div className="flex items-center">
                  {headerProperties.showLogo && (
                    <div className="mr-3">
                      {headerProperties.logoUrl ? (
                        <img 
                          src={headerProperties.logoUrl} 
                          alt="Logo" 
                          className="h-full max-h-12 object-contain"
                        />
                      ) : (
                        <div className={`h-10 w-10 ${variant === 'dark-navigation' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-400'} flex items-center justify-center`}>
                          Logo
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    {headerProperties.title && (
                      <div className="font-bold text-lg">{headerProperties.title}</div>
                    )}
                    
                    {variant === 'with-description' && headerProperties.description && (
                      <div className="text-sm mt-1 text-gray-600">{headerProperties.description}</div>
                    )}
                  </div>
                </div>
                
                {variant === 'with-metrics' && (
                  <div className="flex space-x-6">
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-500">Metric 1</div>
                      <div className="font-bold">123</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-500">Metric 2</div>
                      <div className="font-bold">456</div>
                    </div>
                  </div>
                )}
                
                {(variant === 'navigation-top' || variant === 'dark-navigation') && (
                  <div className={`flex space-x-4 text-sm ${variant === 'dark-navigation' ? 'text-gray-300' : 'text-blue-500'}`}>
                    <div>Navigation 1</div>
                    <div>Navigation 2</div>
                    <div>Navigation 3</div>
                  </div>
                )}
                
                {headerProperties.showNavigation && variant !== 'navigation-top' && variant !== 'dark-navigation' && (
                  <div className="ml-auto flex space-x-3">
                    <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors">Link 1</button>
                    <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors">Link 2</button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'button': {
        const buttonProps = element.properties || {};
        const sizeClasses = {
          sm: "px-3 py-1 text-xs",
          md: "px-4 py-2 text-sm",
          lg: "px-6 py-3 text-base",
        };
        
        const variantClasses = {
          default: "bg-blue-500 text-white hover:bg-blue-600",
          primary: "bg-purple-600 text-white hover:bg-purple-700",
          secondary: "bg-gray-500 text-white hover:bg-gray-600",
          outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
          ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        };
        
        const size = (buttonProps.buttonSize as keyof typeof sizeClasses) || 'md';
        const variant = (buttonProps.buttonVariant as keyof typeof variantClasses) || 'default';
        
        return (
          <div className="w-full h-full flex items-center justify-center">
            <button 
              className={`rounded transition-colors ${sizeClasses[size]} ${variantClasses[variant]} flex items-center justify-center`}
            >
              {buttonProps.buttonIcon && (
                <svg className="mr-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {buttonProps.buttonText || 'Button'}
            </button>
          </div>
        );
      }
      case 'textbox': {
        const textboxProps = element.properties || {};
        const textAlignment = textboxProps.textAlignment || 'left';
        const fontSize = textboxProps.fontSize || 'md';
        const fontWeight = textboxProps.fontWeight || 'normal';
        
        const fontSizeClasses = {
          sm: 'text-sm',
          md: 'text-base',
          lg: 'text-lg',
          xl: 'text-xl',
        };
        
        const fontWeightClasses = {
          normal: 'font-normal',
          medium: 'font-medium',
          bold: 'font-bold',
        };
        
        return (
          <div 
            className="w-full h-full p-4 overflow-auto"
            style={{ textAlign: textAlignment as any }}
          >
            {textboxProps.showTextboxTitle !== false && textboxProps.textboxTitle && (
              <h3 className={`mb-2 ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]} ${fontWeightClasses[fontWeight as keyof typeof fontWeightClasses]}`}>
                {textboxProps.textboxTitle}
              </h3>
            )}
            <div className={`${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]} ${fontWeightClasses[fontWeight as keyof typeof fontWeightClasses]}`}>
              {textboxProps.textboxContent || 'Edit text in left pane...'}
            </div>
          </div>
        );
      }
      case 'image': {
        const imageProps = element.properties || {};
        
        // Define shadow classes based on properties
        const shadowClasses = imageProps.hasShadow 
          ? {
              sm: 'shadow-sm',
              md: 'shadow-md', 
              lg: 'shadow-lg',
              xl: 'shadow-xl',
            }[imageProps.shadowSize || 'md'] || 'shadow-md'
          : '';
          
        // Define border radius classes
        const radiusClasses = {
          none: 'rounded-none',
          sm: 'rounded-sm',
          md: 'rounded-md',
          lg: 'rounded-lg',
          full: 'rounded-full',
        }[imageProps.borderRadius || 'md'] || 'rounded-md';
        
        // Define object-fit style
        const objectFitClass = {
          contain: 'object-contain',
          cover: 'object-cover',
          fill: 'object-fill',
          none: 'object-none',
          'scale-down': 'object-scale-down',
        }[imageProps.imageFit || 'contain'] || 'object-contain';
        
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            {imageProps.imageUrl ? (
              <img 
                src={imageProps.imageUrl}
                alt={imageProps.imageAlt || 'Image'}
                className={`w-full h-full ${objectFitClass} ${radiusClasses} ${shadowClasses} ${
                  imageProps.hasBorder ? 'border' : ''
                }`}
                style={imageProps.hasBorder ? { borderColor: imageProps.borderColor } : {}}
              />
            ) : (
              <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
                Image Placeholder
              </div>
            )}
          </div>
        );
      }
      case 'filter':
        return <FilterDisplay element={element} />;
      case 'kpi':
        return <KpiDisplay element={element} />;
      case 'shapes':
        return <ShapeDisplay element={element} />;
      case 'delete':
        return (
          <div className="w-full h-full flex items-center justify-center bg-red-500 text-white p-2 rounded">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            <div className="font-medium">{element.type}</div>
          </div>
        );
    }
  };
  
  return (
    <>
      <div
        className={`absolute cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={{
          left: element.position.x,
          top: element.position.y,
          width: element.size.width,
          height: element.size.height,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          boxShadow: isSelected ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none',
          zIndex: isSelected ? 10 : 1,
        }}
        onClick={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDownOnElement}
        onKeyDown={handleDelete}
        tabIndex={0}
      >
        {renderElementContent()}
        
        {isSelected && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize"
            onMouseDown={handleResizeMouseDown}
          />
        )}
      </div>
      
      {showFilterStyleDialog && (
        <FilterStyleDialog 
          elementId={element.id} 
          open={showFilterStyleDialog} 
          onClose={() => setShowFilterStyleDialog(false)}
        />
      )}
      
      {showKpiStyleDialog && (
        <KpiStyleDialog
          elementId={element.id}
          open={showKpiStyleDialog}
          onClose={() => setShowKpiStyleDialog(false)}
        />
      )}
      
      {showButtonStyleDialog && (
        <ButtonStyleDialog
          elementId={element.id}
          open={showButtonStyleDialog}
          onClose={() => setShowButtonStyleDialog(false)}
        />
      )}
      
      {showTextboxStyleDialog && (
        <TextboxStyleDialog
          elementId={element.id}
          open={showTextboxStyleDialog}
          onClose={() => setShowTextboxStyleDialog(false)}
        />
      )}
      
      {showImageStyleDialog && (
        <ImageStyleDialog
          elementId={element.id}
          open={showImageStyleDialog}
          onClose={() => setShowImageStyleDialog(false)}
        />
      )}
      
      {showShapeStyleDialog && (
        <ShapeStyleDialog
          elementId={element.id}
          isOpen={showShapeStyleDialog}
          onClose={() => setShowShapeStyleDialog(false)}
        />
      )}
      
      {showHeaderStyleDialog && (
        <HeaderStyleDialog 
          elementId={element.id} 
          isOpen={showHeaderStyleDialog}
          onClose={() => setShowHeaderStyleDialog(false)}
        />
      )}
    </>
  );
}
