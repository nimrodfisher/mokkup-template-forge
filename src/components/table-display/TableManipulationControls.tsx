
import React from 'react';
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Plus, Minus, RowsIcon, Columns3 } from "lucide-react";
import { Element } from "@/types/wireframe";
import { useWireframe } from "@/hooks/useWireframe";

interface TableManipulationControlsProps {
  element: Element;
  localData: string[][];
  localHeaders: string[];
  showControls: boolean;
  isEditable: boolean;
}

export function TableManipulationControls({
  element,
  localData,
  localHeaders,
  showControls,
  isEditable
}: TableManipulationControlsProps) {
  const { updateElementProperties } = useWireframe();

  // Function to add a new row
  const handleAddRow = (index: number) => {
    const newData = [...localData];
    const newRow = Array(localHeaders.length).fill('New cell');
    newData.splice(index + 1, 0, newRow);
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to delete a row
  const handleDeleteRow = (index: number) => {
    if (localData.length <= 1) return; // Prevent deleting the last row
    const newData = [...localData];
    newData.splice(index, 1);
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to add a new column
  const handleAddColumn = (index: number) => {
    const newHeaders = [...localHeaders];
    newHeaders.splice(index + 1, 0, `New Header`);
    
    const newData = localData.map(row => {
      const newRow = [...row];
      newRow.splice(index + 1, 0, 'New cell');
      return newRow;
    });
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  // Function to delete a column
  const handleDeleteColumn = (index: number) => {
    if (localHeaders.length <= 1) return; // Prevent deleting the last column
    
    const newHeaders = [...localHeaders];
    newHeaders.splice(index, 1);
    
    const newData = localData.map(row => {
      const newRow = [...row];
      newRow.splice(index, 1);
      return newRow;
    });
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  // Render column controls above the table
  const renderColumnControls = () => {
    if (!isEditable || !showControls) return null;
    
    return (
      <TooltipProvider>
        <div className="flex absolute -top-10 left-0 right-0 justify-around">
          {localHeaders.map((_, index) => (
            <div key={index} className="flex space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 bg-green-50 border-green-200 hover:bg-green-100"
                    onClick={() => handleAddColumn(index)}
                  >
                    <Columns3 className="h-4 w-4 text-green-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Column</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 bg-red-50 border-red-200 hover:bg-red-100"
                    onClick={() => handleDeleteColumn(index)}
                    disabled={localHeaders.length <= 1}
                  >
                    <Minus className="h-4 w-4 text-red-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Column</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </TooltipProvider>
    );
  };

  // Cell manipulation controls for each row
  const renderRowControls = (rowIndex: number) => {
    if (!isEditable || !showControls) return null;
    
    return (
      <TooltipProvider>
        <div className="flex flex-col space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-green-50 border-green-200 hover:bg-green-100"
                onClick={() => handleAddRow(rowIndex)}
              >
                <RowsIcon className="h-4 w-4 text-green-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Row</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-red-50 border-red-200 hover:bg-red-100"
                onClick={() => handleDeleteRow(rowIndex)}
                disabled={localData.length <= 1}
              >
                <Minus className="h-4 w-4 text-red-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Row</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  };

  return {
    renderColumnControls,
    renderRowControls
  };
}
