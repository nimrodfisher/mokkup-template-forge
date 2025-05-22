
import React from 'react';
import { Element } from "@/types/wireframe";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Plus, Minus, Table2 } from "lucide-react";

interface TablePropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function TableProperties({ element, updateElementProperties, onOpenStyleDialog }: TablePropertiesProps) {
  const properties = element.properties || {};
  const {
    tableTitle = 'Table Title',
    tableHeaders = ['Header 1', 'Header 2', 'Header 3'],
    tableData = [
      ['Data 1', 'Data 2', 'Data 3'],
      ['Data 4', 'Data 5', 'Data 6'],
      ['Data 7', 'Data 8', 'Data 9'],
    ],
    numRows = tableData.length,
    numColumns = tableHeaders.length,
    showTableBorder = true,
  } = properties;

  // Function to update headers
  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...tableHeaders];
    newHeaders[index] = value;
    updateElementProperties(element.id, { tableHeaders: newHeaders });
  };

  // Function to update cell data
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    if (!newData[rowIndex]) {
      newData[rowIndex] = Array(numColumns).fill('');
    }
    newData[rowIndex][colIndex] = value;
    updateElementProperties(element.id, { tableData: newData });
  };

  // Function to add a row
  const addRow = () => {
    const newData = [...tableData];
    const newRow = Array(numColumns).fill('New data');
    newData.push(newRow);
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to remove a row
  const removeRow = () => {
    if (tableData.length <= 1) return;
    const newData = [...tableData];
    newData.pop();
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to add a column
  const addColumn = () => {
    const newHeaders = [...tableHeaders, `Header ${numColumns + 1}`];
    const newData = tableData.map(row => [...row, 'New data']);
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  // Function to remove a column
  const removeColumn = () => {
    if (tableHeaders.length <= 1) return;
    const newHeaders = [...tableHeaders];
    newHeaders.pop();
    const newData = tableData.map(row => {
      const newRow = [...row];
      newRow.pop();
      return newRow;
    });
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label htmlFor="tableTitle">Table Title</Label>
        <Input
          id="tableTitle"
          value={tableTitle}
          onChange={(e) => updateElementProperties(element.id, { tableTitle: e.target.value })}
        />
      </div>

      <Separator />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Headers</Label>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={removeColumn} 
              disabled={tableHeaders.length <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addColumn}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {tableHeaders.map((header, index) => (
            <Input
              key={index}
              value={header}
              onChange={(e) => updateHeader(index, e.target.value)}
              className="text-sm"
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Table Data</Label>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={removeRow}
              disabled={tableData.length <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addRow}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2">
          {tableData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-2">
              {Array.from({ length: numColumns }).map((_, colIndex) => (
                <Input
                  key={colIndex}
                  value={row[colIndex] || ''}
                  onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                  className="text-sm"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex items-center space-x-2">
        <Switch
          id="showTableBorder"
          checked={showTableBorder}
          onCheckedChange={(checked) => updateElementProperties(element.id, { showTableBorder: checked })}
        />
        <Label htmlFor="showTableBorder">Show Table Border</Label>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={onOpenStyleDialog}
      >
        <Table2 className="h-4 w-4 mr-2" />
        Table Style Options
      </Button>
    </div>
  );
}
