'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { WardData, Project, InfrastructureRisk, HeatmapMode } from '@/types';

// Fix standard Leaflet default marker icons for Next.js
const defaultMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const createCustomSvgIcon = (color: string, iconType: 'project' | 'risk' | 'ward' | 'facility') => {
  const html = `
    <div style="
      background-color: ${color};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border: 2px solid white;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      font-size: 12px;
      font-weight: bold;
    ">
      ${iconType === 'project' ? '🏗️' : iconType === 'risk' ? '⚠️' : iconType === 'facility' ? '🏥' : '🏛️'}
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-leaflet-pin',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

// Map click handler for "Pick Location on Map"
function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

interface LeafletMapInnerProps {
  centerLat: number;
  centerLng: number;
  wards: WardData[];
  projects: Project[];
  risks: InfrastructureRisk[];
  heatmapMode: HeatmapMode;
  activeLayers: {
    development: boolean;
    risk: boolean;
    budget: boolean;
    infrastructure: boolean;
    facilities: boolean;
  };
  onMapLocationPick?: (lat: number, lng: number) => void;
  isPickingLocation?: boolean;
}

export const LeafletMapInner: React.FC<LeafletMapInnerProps> = ({
  centerLat,
  centerLng,
  wards,
  projects,
  risks,
  heatmapMode,
  activeLayers,
  onMapLocationPick,
  isPickingLocation
}) => {
  // Public facilities around center
  const facilities = [
    { name: 'Municipal Civil Hospital', type: 'Health', lat: centerLat + 0.003, lng: centerLng - 0.003 },
    { name: 'Central Bus Terminus (MSRTC)', type: 'Transport', lat: centerLat + 0.001, lng: centerLng - 0.004 },
    { name: 'Zilla Parishad High School', type: 'Education', lat: centerLat - 0.003, lng: centerLng + 0.002 },
    { name: 'APMC Grain Market Yard', type: 'Commerce', lat: centerLat - 0.004, lng: centerLng - 0.001 },
  ];

  // Utility lines
  const drainagePolyline: [number, number][] = [
    [centerLat + 0.008, centerLng + 0.006],
    [centerLat + 0.003, centerLng + 0.001],
    [centerLat - 0.002, centerLng - 0.004],
    [centerLat - 0.006, centerLng - 0.002],
    [centerLat - 0.009, centerLng + 0.001],
  ];

  const waterPipelinePolyline: [number, number][] = [
    [centerLat + 0.006, centerLng - 0.004], // Water Tower ESR
    [centerLat + 0.002, centerLng + 0.002],
    [centerLat - 0.003, centerLng + 0.007],
    [centerLat - 0.007, centerLng + 0.001],
    [centerLat - 0.010, centerLng + 0.009], // Industrial zone
  ];

  return (
    <div className={`w-full h-[640px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner relative z-10 ${
      isPickingLocation ? 'cursor-crosshair' : ''
    }`}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={onMapLocationPick} />

        {/* 1. FLOOD RISK HEATMAP */}
        {heatmapMode === 'flood' && (
          <>
            <Circle
              center={[centerLat - 0.003, centerLng - 0.003]}
              radius={550}
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.45, weight: 2 }}
            />
            <Circle
              center={[centerLat - 0.003, centerLng - 0.003]}
              radius={320}
              pathOptions={{ color: '#b91c1c', fillColor: '#b91c1c', fillOpacity: 0.65, weight: 2 }}
            />
            <Circle
              center={[centerLat + 0.004, centerLng + 0.002]}
              radius={400}
              pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.4, weight: 1.5 }}
            />
          </>
        )}

        {/* 2. ROAD DAMAGE HEATMAP */}
        {heatmapMode === 'roads' && (
          <>
            <Polyline
              positions={drainagePolyline}
              pathOptions={{ color: '#dc2626', weight: 8, opacity: 0.8 }}
            />
            <Circle
              center={[centerLat + 0.002, centerLng + 0.001]}
              radius={280}
              pathOptions={{ color: '#ea580c', fillColor: '#ea580c', fillOpacity: 0.5, weight: 2 }}
            />
            <Circle
              center={[centerLat - 0.008, centerLng + 0.006]}
              radius={350}
              pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.55, weight: 2 }}
            />
          </>
        )}

        {/* 3. INFRASTRUCTURE DEFICIENCY HEATMAP */}
        {heatmapMode === 'deficiency' && (
          <>
            <Circle
              center={[centerLat - 0.004, centerLng - 0.005]}
              radius={500}
              pathOptions={{ color: '#7c3aed', fillColor: '#8b5cf6', fillOpacity: 0.45, weight: 2 }}
            />
            <Circle
              center={[centerLat + 0.006, centerLng + 0.005]}
              radius={450}
              pathOptions={{ color: '#6d28d9', fillColor: '#7c3aed', fillOpacity: 0.4, weight: 2 }}
            />
          </>
        )}

        {/* 4. DEVELOPMENT PRIORITY HEATMAP */}
        {heatmapMode === 'priority' && (
          <>
            <Circle
              center={[centerLat - 0.002, centerLng - 0.002]}
              radius={600}
              pathOptions={{ color: '#059669', fillColor: '#10b981', fillOpacity: 0.45, weight: 2 }}
            />
            <Circle
              center={[centerLat + 0.003, centerLng - 0.002]}
              radius={380}
              pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.4, weight: 2 }}
            />
          </>
        )}

        {/* Utility Networks (Water & Drainage) */}
        {activeLayers.infrastructure && (
          <>
            <Polyline
              positions={drainagePolyline}
              pathOptions={{ color: '#0284c7', weight: 4, dashArray: '6, 6' }}
            />
            <Polyline
              positions={waterPipelinePolyline}
              pathOptions={{ color: '#0d9488', weight: 4 }}
            />
          </>
        )}

        {/* Public Facilities Layer */}
        {activeLayers.facilities &&
          facilities.map((f, idx) => (
            <Marker
              key={`fac-${idx}`}
              position={[f.lat, f.lng]}
              icon={createCustomSvgIcon('#6366f1', 'facility')}
            >
              <Popup>
                <div className="p-2 min-w-[180px] text-slate-800 text-xs">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase block">{f.type} Facility</span>
                  <h4 className="font-bold text-slate-900 mt-0.5">{f.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Key civic public hub</p>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Development & Wards Layer */}
        {activeLayers.development &&
          wards.map((ward) => (
            <React.Fragment key={`ward-${ward.id}`}>
              <Circle
                center={[ward.lat, ward.lng]}
                radius={240}
                pathOptions={{
                  color: ward.compositeScore >= 75 ? '#10b981' : ward.compositeScore >= 60 ? '#3b82f6' : '#ef4444',
                  fillColor: ward.compositeScore >= 75 ? '#10b981' : ward.compositeScore >= 60 ? '#3b82f6' : '#ef4444',
                  fillOpacity: 0.15,
                  weight: 1.5,
                }}
              />
              <Marker
                position={[ward.lat, ward.lng]}
                icon={createCustomSvgIcon(
                  ward.compositeScore >= 75 ? '#059669' : ward.compositeScore >= 60 ? '#2563eb' : '#dc2626',
                  'ward'
                )}
              >
                <Popup>
                  <div className="p-2 min-w-[200px] text-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Ward {ward.number} • Rank #{ward.rank}
                    </span>
                    <h4 className="font-bold text-sm text-blue-900 mt-0.5">{ward.name}</h4>
                    <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span>WDI Score:</span>
                      <strong className="text-emerald-700">{ward.compositeScore}/100</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-0.5">
                      <span>CapEx Budget:</span>
                      <strong>₹{ward.budgetAllocatedLakhs} L</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-0.5">
                      <span>Population:</span>
                      <span>{ward.population.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}

        {/* Ongoing Projects Layer */}
        {activeLayers.budget &&
          projects.map((proj) => (
            <Marker
              key={`proj-${proj.id}`}
              position={[proj.lat, proj.lng]}
              icon={createCustomSvgIcon('#2563eb', 'project')}
            >
              <Popup>
                <div className="p-2.5 min-w-[220px] text-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                      {proj.status}
                    </span>
                    <span className="text-xs font-black text-emerald-700">₹{proj.budgetLakhs} L</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mt-1">{proj.title}</h4>
                  <p className="text-[11px] text-slate-500">{proj.wardName} • {proj.department}</p>
                  <div className="mt-2 pt-1 border-t border-slate-100 flex justify-between font-bold">
                    <span>Progress: {proj.completionPercentage}%</span>
                    <span>Reach: {proj.populationBenefited.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* High Risk Hotspots Layer */}
        {activeLayers.risk &&
          risks.map((risk) => (
            <Marker
              key={`risk-${risk.id}`}
              position={[risk.lat, risk.lng]}
              icon={createCustomSvgIcon('#dc2626', 'risk')}
            >
              <Popup>
                <div className="p-2.5 min-w-[230px] text-slate-800 text-xs">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-800 uppercase">
                    {risk.severity} Hazard
                  </span>
                  <h4 className="font-bold text-red-700 mt-1">{risk.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">{risk.locationDetails}</p>
                  <div className="mt-2 pt-1 border-t border-slate-100 flex justify-between font-bold">
                    <span className="text-red-600">Failure Prob: {risk.probabilityPercentage}%</span>
                    <span>~{risk.predictedFailureDays} days</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};
