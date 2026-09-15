'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { WardData, Project, InfrastructureRisk } from '@/types';
import { Layers, AlertTriangle, Building2, Droplets, MapPin, IndianRupee, ShieldCheck } from 'lucide-react';

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

const createCustomSvgIcon = (color: string, iconType: 'project' | 'risk' | 'ward') => {
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
      ${iconType === 'project' ? '🏗️' : iconType === 'risk' ? '⚠️' : '🏛️'}
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-leaflet-pin',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

interface LeafletMapInnerProps {
  wards: WardData[];
  projects: Project[];
  risks: InfrastructureRisk[];
  activeLayers: {
    development: boolean;
    risk: boolean;
    budget: boolean;
    infrastructure: boolean;
  };
  selectedWard: WardData | null;
  selectedProject: Project | null;
}

export const LeafletMapInner: React.FC<LeafletMapInnerProps> = ({
  wards,
  projects,
  risks,
  activeLayers,
  selectedWard,
  selectedProject
}) => {
  const centerLat = selectedProject ? selectedProject.lat : selectedWard ? selectedWard.lat : 20.4735;
  const centerLng = selectedProject ? selectedProject.lng : selectedWard ? selectedWard.lng : 78.3375;

  // Mock linear infrastructure lines (Main Water Pipeline & Stormwater Nullah Route)
  const drainagePolyline: [number, number][] = [
    [20.4795, 78.3385],
    [20.4755, 78.3350],
    [20.4710, 78.3310],
    [20.4680, 78.3325],
    [20.4640, 78.3350],
  ];

  const waterPipelinePolyline: [number, number][] = [
    [20.4785, 78.3345], // Water Tower ESR
    [20.4745, 78.3390],
    [20.4695, 78.3440],
    [20.4655, 78.3370],
    [20.4620, 78.3460], // MIDC zone
  ];

  return (
    <div className="w-full h-[620px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner relative z-10">
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

        {/* Infrastructure Layer: Water Pipelines & Nullah Channels */}
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
                    <p className="text-[11px] text-slate-600 font-medium">{ward.marathiName}</p>
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

        {/* Ongoing Projects Layer (Budget & Projects) */}
        {activeLayers.budget &&
          projects.map((proj) => (
            <Marker
              key={`proj-${proj.id}`}
              position={[proj.lat, proj.lng]}
              icon={createCustomSvgIcon('#2563eb', 'project')}
            >
              <Popup>
                <div className="p-2.5 min-w-[240px] text-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                      {proj.status}
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      ₹{proj.budgetLakhs} Lakhs
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-1">{proj.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {proj.wardName} • {proj.department}
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Progress:</span>
                      <strong>{proj.completionPercentage}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contractor:</span>
                      <span className="text-[11px] truncate max-w-[140px]">{proj.contractor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Citizen Reach:</span>
                      <strong className="text-blue-700">{proj.populationBenefited.toLocaleString('en-IN')}</strong>
                    </div>
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
                <div className="p-2.5 min-w-[240px] text-slate-800">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-800 uppercase">
                    {risk.severity} Risk Warning
                  </span>
                  <h4 className="font-bold text-xs text-red-700 mt-1">{risk.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">{risk.locationDetails}</p>
                  <div className="mt-2 pt-1.5 border-t border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Failure Prob:</span>
                      <strong className="text-red-600">{risk.probabilityPercentage}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Predicted Timeline:</span>
                      <span className="text-amber-700 font-semibold">{risk.predictedFailureDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Affected Citizens:</span>
                      <strong>{risk.affectedPopulation.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};
