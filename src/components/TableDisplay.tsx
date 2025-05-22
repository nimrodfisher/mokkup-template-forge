
import React, { useState } from 'react';
import { Element } from "@/types/wireframe";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { TableCellEditor } from "./table-properties/TableCellEditor";
import { Button } from "./ui/button";
import { Plus, Minus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useWireframe } from "@/hooks/useWireframe";

interface TableDisplayProps {
  element: Element;
  isEditable?: boolean;
}

export function TableDisplay({ element, isEditable = false }: TableDisplayProps) {
  const { updateElementProperties } = useWireframe();
  
  const {
    tableTitle,
    tableHeaders = ['Header 1', 'Header 2', 'Header 3'],
    tableData = [
      ['Data 1', 'Data 2', 'Data 3'],
      ['Data 4', 'Data 5', 'Data 6'],
      ['Data 7', 'Data 8', 'Data 9'],
    ],
    showTableBorder = true,
    headerBackground = '#f3f4f6',
    headerTextColor = '#111827',
    cellBackground = '#ffffff',
    cellTextColor = '#374151',
    alternateRowColor = false,
    alternateRowBackground = '#f9fafb',
  } = element.properties || {};

  const [editCell, setEditCell] = useState<{ row: number; col: number } | null>(null);
  const [localData, setLocalData] = useState(tableData);
  const [localHeaders, setLocalHeaders] = useState(tableHeaders);
  const [showControls, setShowControls] = useState(false);

  // Function to handle cell click
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (isEditable) {
      setEditCell({ row: rowIndex, col: colIndex });
    }
  };

  // Function to handle header click
  const handleHeaderClick = (colIndex: number) => {
    if (isEditable) {
      setEditCell({ row: -1, col: colIndex });
    }
  };

  // Function to save cell data
  const handleSaveCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...localData];
    newData[rowIndex][colIndex] = value;
    setLocalData(newData);
    setEditCell(null);
    
    // Update the wireframe state
    updateElementProperties(element.id, { tableData: newData });
  };

  // Function to save header data
  const handleSaveHeader = (colIndex: number, value: string) => {
    const newHeaders = [...localHeaders];
    newHeaders[colIndex] = value;
    setLocalHeaders(newHeaders);
    setEditCell(null);
    
    // Update the wireframe state
    updateElementProperties(element.id, { tableHeaders: newHeaders });
  };

  // Function to add a new row
  const handleAddRow = (index: number) => {
    const newData = [...localData];
    const newRow = Array(localHeaders.length).fill('New cell');
    newData.splice(index + 1, 0, newRow);
    setLocalData(newData);
    
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
    setLocalData(newData);
    
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
    
    setLocalHeaders(newHeaders);
    setLocalData(newData);
    
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
    
    setLocalHeaders(newHeaders);
    setLocalData(newData);
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  return (
    <div className="w-full h-full p-2 overflow-auto relative"
         onMouseEnter={() => isEditable && setShowControls(true)}
         onMouseLeave={() => setShowControls(false)}>
      {tableTitle && (
        <div className="text-base font-medium mb-2">{tableTitle}</div>
      )}
      <Table className={showTableBorder ? 'border border-gray-200' : ''}>
        <TableHeader style={{ backgroundColor: headerBackground }}>
          <TableRow className="hover:bg-transparent">
            {localHeaders.map((header, index) => (
              <TableHead 
                key={index} 
                style={{ 
                  color: headerTextColor,
                  borderBottom: showTableBorder ? '1px solid #e5e7eb' : 'none',
                  borderRight: showTableBorder && index < localHeaders.length - 1 ? '1px solid #e5e7eb' : 'none',
                  position: 'relative',
                  cursor: isEditable ? 'pointer' : 'default'
                }}
                onClick={() => handleHeaderClick(index)}
              >
                {editCell && editCell.row === -1 && editCell.col === index ? (
                  <TableCellEditor 
                    value={header} 
                    onSave={(value) => handleSaveHeader(index, value)}
                    textColor={headerTextColor}
                    backgroundColor={headerBackground}
                  />
                ) : (
                  <div className="relative">
                    {header}
                    {isEditable && showControls && (
                      <div className="absolute -top-8 left-0 flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6 bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddColumn(index);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6 bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteColumn(index);
                          }}
                          disabled={localHeaders.length <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {localData.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              className="hover:bg-transparent relative"
              style={{ 
                backgroundColor: alternateRowColor && rowIndex % 2 === 1 
                  ? alternateRowBackground 
                  : cellBackground 
              }}
            >
              {isEditable && showControls && (
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col space-y-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6 bg-white"
                    onClick={() => handleAddRow(rowIndex)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6 bg-white"
                    onClick={() => handleDeleteRow(rowIndex)}
                    disabled={localData.length <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              )}
              {row.map((cell, cellIndex) => (
                <TableCell 
                  key={cellIndex} 
                  style={{ 
                    color: cellTextColor,
                    backgroundColor: cellBackground,
                    borderBottom: showTableBorder ? '1px solid #e5e7eb' : 'none', 
                    borderRight: showTableBorder && cellIndex < row.length - 1 ? '1px solid #e5e7eb' : 'none',
                    padding: editCell && editCell.row === rowIndex && editCell.col === cellIndex ? '0' : undefined,
                    cursor: isEditable ? 'pointer' : 'default'
                  }}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                >
                  {editCell && editCell.row === rowIndex && editCell.col === cellIndex ? (
                    <TableCellEditor 
                      value={cell} 
                      onSave={(value) => handleSaveCell(rowIndex, cellIndex, value)}
                      textColor={cellTextColor}
                      backgroundColor={cellBackground}
                    />
                  ) : (
                    cell
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

