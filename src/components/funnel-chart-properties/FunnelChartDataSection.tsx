
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FunnelDataEditor } from './FunnelDataEditor';
import { FunnelButtonsEditor } from './FunnelButtonsEditor';
import { FunnelKpisEditor } from './FunnelKpisEditor';

interface FunnelChartDataSectionProps {
  properties: Element['properties'];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelChartDataSection({ properties, updateProperties }: FunnelChartDataSectionProps) {
  const {
    funnelChartData = [
      { name: 'Data A', value: 91537, color: '#4F46E5' },
      { name: 'Data B', value: 83298, color: '#7C3AED' },
      { name: 'Data C', value: 51998, color: '#8B5CF6' },
      { name: 'Data D', value: 38474, color: '#A78BFA' },
      { name: 'Data E', value: 26660, color: '#C4B5FD' }
    ],
    funnelButtons = [],
    funnelKpis = []
  } = properties || {};

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Data</h4>
      
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data" className="space-y-3 mt-4">
          <FunnelDataEditor 
            funnelChartData={funnelChartData}
            updateProperties={updateProperties}
          />
        </TabsContent>
        
        <TabsContent value="customize" className="space-y-3 mt-4">
          <FunnelButtonsEditor 
            funnelButtons={funnelButtons}
            updateProperties={updateProperties}
          />
          <FunnelKpisEditor 
            funnelKpis={funnelKpis}
            updateProperties={updateProperties}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
