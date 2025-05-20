
import React from "react";

export const headerStyles = [
  {
    id: 'default',
    label: 'Default Style',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center">
          <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
          <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
        </div>
      </div>
    )
  },
  {
    id: 'with-metrics',
    label: 'With Metrics',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
          <div className="flex space-x-4">
            <div className="text-[8px]">
              <div>Title 1</div>
              <div className="text-gray-400">Metric 1</div>
            </div>
            <div className="text-[8px]">
              <div>Title 2</div>
              <div className="text-gray-400">Metric 1</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'with-description',
    label: 'With Description',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
          <div className="text-[8px] mt-2 text-gray-500">
            Some dummy description text<br />
            Some dummy description text
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'centered-navigation-purple',
    label: 'Centered Navigation (Purple)',
    preview: (
      <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
        <div className="flex flex-col items-center">
          <div className="font-bold text-xs text-center mt-1">DASHBOARD TITLE</div>
          <div className="flex justify-center space-x-6 mt-1">
            <div className="text-[8px]">Navigation 1</div>
            <div className="text-[8px]">Navigation 2</div>
            <div className="text-[8px]">Navigation 3</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'navigation-top',
    label: 'Top Navigation',
    preview: (
      <div className="bg-gray-50 border rounded-md p-4 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
          <div className="flex space-x-4 text-[8px] text-blue-500">
            <div>Navigation 1</div>
            <div>Navigation 2</div>
            <div>Navigation 3</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'double-logo-purple',
    label: 'Double Logo (Purple)',
    preview: (
      <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
        <div className="flex items-center justify-between">
          <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
          <div className="font-bold text-xs text-center">DASHBOARD TITLE</div>
          <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
        </div>
      </div>
    )
  },
  {
    id: 'dark-navigation',
    label: 'Dark Navigation',
    preview: (
      <div className="bg-[#1A1F2C] rounded-md p-4 mt-1 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-600 text-[8px] flex items-center justify-center rounded text-white">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
          <div className="flex space-x-4 text-[8px] text-gray-300">
            <div>Navigation 1</div>
            <div>Navigation 2</div>
            <div>Navigation 3</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'gradient',
    label: 'Gradient',
    preview: (
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-md p-4 mt-1 text-white">
        <div className="flex items-center">
          <div className="w-16 h-6 bg-white/20 backdrop-blur-sm text-[8px] flex items-center justify-center rounded">Upload Logo</div>
          <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
        </div>
      </div>
    )
  },
  {
    id: 'minimal',
    label: 'Minimal',
    preview: (
      <div className="bg-[#F6F6F7] rounded-md p-4 mt-1">
        <div className="flex items-center justify-center">
          <div className="font-bold text-xs text-gray-800">DASHBOARD TITLE</div>
        </div>
      </div>
    )
  },
  {
    id: 'colorful-banner',
    label: 'Colorful Banner',
    preview: (
      <div className="relative bg-white rounded-md overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#0EA5E9]"></div>
        <div className="p-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'glass-effect',
    label: 'Glass Effect',
    preview: (
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-md p-1 mt-1">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-md border border-white/30">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xs text-white">DASHBOARD TITLE</div>
            <div className="flex space-x-3 text-[8px] text-white">
              <div>Menu 1</div>
              <div>Menu 2</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'search-header',
    label: 'With Search',
    preview: (
      <div className="bg-white border rounded-md p-4 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
          <div className="w-24 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[8px] px-2">
            🔍 Search...
          </div>
        </div>
      </div>
    )
  }
];
