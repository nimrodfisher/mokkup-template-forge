
import { Element } from "@/hooks/useWireframe";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for charts
const sampleData = [
  { name: "Jan", value1: 400, value2: 240 },
  { name: "Feb", value1: 300, value2: 138 },
  { name: "Mar", value1: 200, value2: 250 },
  { name: "Apr", value1: 278, value2: 390 },
  { name: "May", value1: 189, value2: 480 },
  { name: "Jun", value1: 239, value2: 380 }
];

const barChartConfig = {
  value1: {
    label: "Dataset 1",
    color: "#9b87f5"
  },
  value2: {
    label: "Dataset 2",
    color: "#7E69AB"
  }
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

      case 'bar-chart-basic':
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
              <ChartContainer config={barChartConfig} className="w-full h-full">
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value1" fill={shapeColor} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        );
        
      case 'bar-chart-stacked':
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
              <ChartContainer config={barChartConfig} className="w-full h-full">
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="value1" stackId="stack" fill={shapeColor} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="value2" stackId="stack" fill="#7E69AB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        );
        
      case 'bar-chart-grouped':
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
              <ChartContainer config={barChartConfig} className="w-full h-full">
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="value1" fill={shapeColor} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="value2" fill="#7E69AB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full h-full p-2">
      {renderShape()}
    </div>
  );
};
