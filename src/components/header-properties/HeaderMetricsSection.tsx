
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

interface HeaderMetricsSectionProps {
  showMetrics: boolean;
  metrics: Array<{title: string, value: string}>;
  onMetricToggle: (checked: boolean) => void;
  onMetricChange: (index: number, field: 'title' | 'value', value: string) => void;
  onAddMetric?: () => void;
  onRemoveMetric?: (index: number) => void;
}

export function HeaderMetricsSection({
  showMetrics,
  metrics,
  onMetricToggle,
  onMetricChange,
  onAddMetric,
  onRemoveMetric
}: HeaderMetricsSectionProps) {
  const [showMetricOptions, setShowMetricOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Metrics</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowMetricOptions(!showMetricOptions)}
            className="h-7 w-7 p-0"
          >
            {showMetricOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-metrics" className="text-sm">Show metrics</Label>
          <Switch 
            id="show-metrics"
            checked={showMetrics} 
            onCheckedChange={onMetricToggle}
          />
        </div>
        
        {showMetricOptions && showMetrics && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-gray-500">Metric Items</Label>
              {onAddMetric && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddMetric}
                  className="h-6 px-2"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              )}
            </div>
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2 p-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Metric {index + 1}</Label>
                  {onRemoveMetric && metrics.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveMetric(index)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label htmlFor={`metric-title-${index}`} className="text-xs text-gray-500 mb-1 block">
                    Title
                  </Label>
                  <Input
                    id={`metric-title-${index}`}
                    value={metric.title}
                    onChange={(e) => onMetricChange(index, 'title', e.target.value)}
                    className="text-sm h-8 mb-1"
                    placeholder="Metric title"
                  />
                </div>
                <div>
                  <Label htmlFor={`metric-value-${index}`} className="text-xs text-gray-500 mb-1 block">
                    Value
                  </Label>
                  <Input
                    id={`metric-value-${index}`}
                    value={metric.value}
                    onChange={(e) => onMetricChange(index, 'value', e.target.value)}
                    className="text-sm h-8"
                    placeholder="123"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
