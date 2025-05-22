
import React, { useState } from 'react';
import { Element } from "@/types/wireframe";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { TableCellEditor } from "./table-properties/TableCellEditor";

interface TableDisplayProps {
  element: Element;
  isEditable?: boolean;
}

export function TableDisplay({ element, isEditable = false }: TableDisplayProps) {
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
    
    // If we could update the wireframe state, we would do it here
    // updateElementProperties(element.id, { tableData: newData });
  };

  // Function to save header data
  const handleSaveHeader = (colIndex: number, value: string) => {
    const newHeaders = [...localHeaders];
    newHeaders[colIndex] = value;
    setLocalHeaders(newHeaders);
    setEditCell(null);
    
    // If we could update the wireframe state, we would do it here
    // updateElementProperties(element.id, { tableHeaders: newHeaders });
  };

  return (
    <div className="w-full h-full p-2 overflow-auto">
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
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {localData.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              className="hover:bg-transparent"
              style={{ 
                backgroundColor: alternateRowColor && rowIndex % 2 === 1 
                  ? alternateRowBackground 
                  : cellBackground 
              }}
            >
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
