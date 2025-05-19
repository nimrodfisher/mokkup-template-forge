
import { Element } from "@/hooks/useWireframe";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Sample data for bar charts
const data = [
  { name: 'Jan', value1: 40, value2: 24 },
  { name: 'Feb', value1: 60, value2: 40 },
  { name: 'Mar', value1: 25, value2: 35 },
  { name: 'Apr', value1: 80, value2: 30 },
  { name: 'May', value1: 65, value2: 45 },
  { name: 'Jun', value1: 35, value2: 55 },
];

// Chart color configuration
const chartConfig = {
  value1: {
    label: 'Dataset 1',
    theme: { light: '#4f46e5', dark: '#818cf8' },
  },
  value2: {
    label: 'Dataset 2',
    theme: { light: '#818cf8', dark: '#a5b4fc' },
  },
};

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
    // Basic shapes
    if (['triangle', 'rectangle', 'circle', 'oval'].includes(variant)) {
      switch (variant) {
        case 'triangle':
          return (
            <div className="flex flex-col h-full">
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
                    borderLeft: '50px solid transparent',
                    borderRight: '50px solid transparent',
                    borderBottom: `100px solid ${shapeColor}`,
                    border: hasBorder ? `1px solid ${borderColor}` : undefined,
                  }}
                />
              </div>
            </div>
          );
          
        case 'rectangle':
          return (
            <div className="flex flex-col h-full">
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
                  className="w-32 h-16"
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
            <div className="flex flex-col h-full">
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
                    width: '80px',
                    height: '80px',
                    backgroundColor: shapeColor,
                    border: borderStyle,
                  }}
                />
              </div>
            </div>
          );
          
        case 'oval':
          return (
            <div className="flex flex-col h-full">
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
                    width: '120px',
                    height: '60px',
                    backgroundColor: shapeColor,
                    border: borderStyle,
                  }}
                />
              </div>
            </div>
          );
        default:
          return null;
      }
    }
    
    // Bar chart variants
    if (variant.includes('bar')) {
      return (
        <div className="flex flex-col h-full">
          {showTitle && (
            <div 
              className={`mb-2 text-sm font-medium text-${textAlignment}`}
              style={{ color: textColor }}
            >
              {title}
            </div>
          )}
          <div className="flex-1">
            <ChartContainer config={chartConfig}>
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={{ stroke: "#e5e7eb" }} 
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`} 
                />
                <Tooltip 
                  content={({ active, payload, label }) => (
                    <ChartTooltipContent 
                      active={active}
                      payload={payload}
                      label={label}
                      labelClassName="font-medium text-foreground"
                    />
                  )}
                />
                {variant === 'basic-bar' && (
                  <Bar 
                    dataKey="value1" 
                    fill={shapeColor} 
                    radius={[4, 4, 0, 0]}
                    fillOpacity={0.9}
                    strokeWidth={0}
                    barSize={24}
                  />
                )}
                {variant === 'stacked-bar' && (
                  <>
                    <Bar 
                      dataKey="value1" 
                      stackId="stack"
                      fill={shapeColor} 
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.9}
                      strokeWidth={0}
                      barSize={24}
                    />
                    <Bar 
                      dataKey="value2" 
                      stackId="stack"
                      fill={shapeColor} 
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.6}
                      strokeWidth={0}
                      barSize={24}
                    />
                  </>
                )}
                {variant === 'grouped-bar' && (
                  <>
                    <Bar 
                      dataKey="value1" 
                      fill={shapeColor} 
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.9}
                      strokeWidth={0}
                      barSize={12}
                    />
                    <Bar 
                      dataKey="value2" 
                      fill={shapeColor} 
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.6}
                      strokeWidth={0}
                      barSize={12}
                    />
                    <Legend 
                      content={(props) => (
                        <ChartLegendContent 
                          {...props} 
                          className="text-xs text-muted-foreground"
                        />
                      )} 
                    />
                  </>
                )}
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      );
    }
    
    // Default fallback
    return null;
  };
  
  return (
    <div className="w-full h-full p-2">
      {renderShape()}
    </div>
  );
};
