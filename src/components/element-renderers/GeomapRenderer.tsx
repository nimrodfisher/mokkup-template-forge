
import React from 'react';
import { Globe, Map, MapPin } from 'lucide-react';

interface GeomapRendererProps {
  properties: any;
}

export function GeomapRenderer({ properties }: GeomapRendererProps) {
  const {
    geomapTitle = 'Geographic Data',
    geomapStyle = 'default',
    geomapPrimaryColor = '#3B82F6',
    geomapSecondaryColor = '#EFF6FF',
    geomapRegion = 'world',
    showTooltips = true,
    showZoomControls = true,
    showButtons = false,
    showDropdowns = false,
    showKpis = false,
    showText = false,
    geomapButtons = [],
    geomapKpis = [],
    geomapData = [
      { region: 'North America', value: 75, coordinates: [-100, 45] },
      { region: 'Europe', value: 65, coordinates: [10, 50] },
      { region: 'Asia', value: 85, coordinates: [100, 35] },
      { region: 'South America', value: 45, coordinates: [-60, -15] },
      { region: 'Africa', value: 55, coordinates: [20, 0] }
    ]
  } = properties;

  const renderAddOns = () => (
    <div className="absolute top-2 left-2 z-20 space-y-2">
      {/* KPIs */}
      {showKpis && geomapKpis.length > 0 && (
        <div className="bg-white p-2 rounded shadow-sm space-y-1">
          {geomapKpis.map((kpi: any, index: number) => (
            <div key={index} className="text-xs">
              <div className="font-medium text-gray-700">{kpi.title}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{kpi.value}</span>
                {kpi.change && (
                  <span className="text-green-600 text-xs">↗ {kpi.change}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      {showButtons && geomapButtons.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {geomapButtons.map((button: any, index: number) => (
            <button
              key={index}
              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            >
              {button.title}
            </button>
          ))}
        </div>
      )}

      {/* Dropdowns */}
      {showDropdowns && (
        <div className="bg-white rounded shadow-sm">
          <select className="px-2 py-1 text-xs border rounded">
            <option>Select Region</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
        </div>
      )}

      {/* Text */}
      {showText && (
        <div className="bg-white p-2 rounded shadow-sm">
          <div className="text-xs text-gray-600">
            Interactive geographic visualization
          </div>
        </div>
      )}
    </div>
  );

  const renderDefaultGeomap = () => (
    <div className="w-full h-full bg-gray-50 border rounded-lg relative overflow-hidden">
      {/* Title */}
      <div className="absolute top-2 left-2 z-10">
        <h3 className="text-sm font-medium text-gray-800">{geomapTitle}</h3>
      </div>

      {/* Add-ons */}
      {renderAddOns()}

      {/* Zoom Controls */}
      {showZoomControls && (
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
          <button className="w-6 h-6 bg-white border rounded text-xs">+</button>
          <button className="w-6 h-6 bg-white border rounded text-xs">-</button>
        </div>
      )}

      {/* Simple World Map Representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-80 max-h-48">
          {/* World outline */}
          <div className="absolute inset-4 border-2 border-gray-300 rounded-lg bg-blue-50">
            {/* Continents representation */}
            {geomapData.map((item, index) => (
              <div
                key={index}
                className="absolute w-8 h-6 rounded"
                style={{
                  backgroundColor: geomapPrimaryColor,
                  opacity: item.value / 100,
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index % 2) * 20}%`
                }}
                title={showTooltips ? `${item.region}: ${item.value}` : undefined}
              >
                <MapPin className="w-3 h-3 text-white absolute -top-1 -left-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: geomapPrimaryColor }}></div>
          <span>High</span>
          <div className="w-3 h-3 rounded" style={{ backgroundColor: geomapSecondaryColor }}></div>
          <span>Low</span>
        </div>
      </div>
    </div>
  );

  const renderChoroplethMap = () => (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 border rounded-lg relative overflow-hidden">
      <div className="absolute top-2 left-2 z-10">
        <h3 className="text-sm font-medium text-gray-800">{geomapTitle}</h3>
      </div>

      {/* Add-ons */}
      {renderAddOns()}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Choropleth regions */}
          <div className="grid grid-cols-3 gap-1 h-full p-4">
            {geomapData.slice(0, 6).map((item, index) => (
              <div
                key={index}
                className="rounded border"
                style={{
                  backgroundColor: geomapPrimaryColor,
                  opacity: item.value / 100
                }}
                title={showTooltips ? `${item.region}: ${item.value}%` : undefined}
              >
                <div className="p-2 text-xs text-white font-medium">
                  {item.region.substring(0, 8)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBubbleMap = () => (
    <div className="w-full h-full bg-gray-50 border rounded-lg relative overflow-hidden">
      <div className="absolute top-2 left-2 z-10">
        <h3 className="text-sm font-medium text-gray-800">{geomapTitle}</h3>
      </div>

      {/* Add-ons */}
      {renderAddOns()}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Base map */}
          <div className="absolute inset-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            {/* Bubble markers */}
            {geomapData.map((item, index) => (
              <div
                key={index}
                className="absolute rounded-full border-2 border-white shadow-md"
                style={{
                  backgroundColor: geomapPrimaryColor,
                  width: `${Math.max(item.value / 5, 12)}px`,
                  height: `${Math.max(item.value / 5, 12)}px`,
                  left: `${20 + (index * 15)}%`,
                  top: `${25 + (index % 3) * 20}%`
                }}
                title={showTooltips ? `${item.region}: ${item.value}` : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHeatIntensityMap = () => (
    <div className="w-full h-full bg-black border rounded-lg relative overflow-hidden">
      <div className="absolute top-2 left-2 z-10">
        <h3 className="text-sm font-medium text-white">{geomapTitle}</h3>
      </div>

      {/* Add-ons */}
      {renderAddOns()}

      <div className="absolute inset-0">
        {/* Heat intensity visualization */}
        <div className="grid grid-cols-4 grid-rows-3 h-full gap-1 p-4">
          {Array.from({ length: 12 }, (_, index) => {
            const intensity = (geomapData[index % geomapData.length]?.value || 50) / 100;
            return (
              <div
                key={index}
                className="rounded"
                style={{
                  background: `linear-gradient(45deg, ${geomapPrimaryColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}, ${geomapSecondaryColor})`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Heat scale */}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 p-2 rounded text-white text-xs">
        <div className="flex items-center gap-1">
          <span>Low</span>
          <div className="w-8 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
          <span>High</span>
        </div>
      </div>
    </div>
  );

  switch (geomapStyle) {
    case 'choropleth':
      return renderChoroplethMap();
    case 'bubble-map':
      return renderBubbleMap();
    case 'heat-intensity':
      return renderHeatIntensityMap();
    default:
      return renderDefaultGeomap();
  }
}
