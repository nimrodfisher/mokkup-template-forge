
import React from 'react';
import { Element } from "@/types/wireframe";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface TableDisplayProps {
  element: Element;
}

export function TableDisplay({ element }: TableDisplayProps) {
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

  return (
    <div className="w-full h-full p-2 overflow-auto">
      {tableTitle && (
        <div className="text-base font-medium mb-2">{tableTitle}</div>
      )}
      <Table className={showTableBorder ? 'border border-gray-200' : ''}>
        <TableHeader style={{ backgroundColor: headerBackground }}>
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header, index) => (
              <TableHead 
                key={index} 
                style={{ 
                  color: headerTextColor,
                  borderBottom: showTableBorder ? '1px solid #e5e7eb' : 'none',
                  borderRight: showTableBorder && index < tableHeaders.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, rowIndex) => (
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
                  }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
