'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCivic } from '@/context/CivicContext';
import { 
  Map as MapIcon, 
  Layers, 
  AlertTriangle, 
  Droplets, 
  Building2, 
  Sliders, 
  MapPin, 
  CheckCircle2, 
  Info,
  Maximize2
} from 'lucide-react';

// Dynamic import with SSR disabled to ensure safe client-side hydration for Leaflet
const DynamicLeafletMap = dynamic(
  () => import('./map/LeafletMapInner').then((mod) => mod.LeafletMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400 gap-2">
        <MapIcon className="w-8 h-8 animate-pulse text-blue-600" />
        <p className="text-xs font-semibold">Initializing OpenStreetMap GIS Engine...</p>
      </div>
    ),
  }
);

export const SmartCityMap: React.FC = () => {
  const { wards, projects, risks, selectedWard, selectedProject } = useCivic();

  const [activeLayers, setActiveLayers] = useState({
    development: true,
    risk: true,
    budget: true,
    infrastructure: true,
  });

  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <MapIcon className="w-3.5 h-3.5" /> Module 5: GIS Smart City Map
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Geographic Information System (GIS) Multi-Layer Spatial Map
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            OpenStreetMap geospatial visualization for Kalamb Nagar Parishad showing Wards, Drainage channels, Water trunk lines, and Geo-tagged tenders.
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> High Score (WDI &ge; 75)
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Active Works (₹ CapEx)
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical Inundation
          </span>
        </div>
      </div>

      {/* Layer Toggles & Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Map Layer Controls & Quick Inspector (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-blue-600" />
              GIS Map Layers
            </div>

            <div className="space-y-2">
              {/* Development Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  Development Layer
                </div>
                <input
                  type="checkbox"
                  checked={activeLayers.development}
                  onChange={() => toggleLayer('development')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
              </label>

              {/* Risk Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  Risk & Flood Layer
                </div>
                <input
                  type="checkbox"
                  checked={activeLayers.risk}
                  onChange={() => toggleLayer('risk')}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
              </label>

              {/* Budget Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  Budget & Works Layer
                </div>
                <input
                  type="checkbox"
                  checked={activeLayers.budget}
                  onChange={() => toggleLayer('budget')}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </label>

              {/* Infrastructure Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-teal-500" />
                  Utility Network Layer
                </div>
                <input
                  type="checkbox"
                  checked={activeLayers.infrastructure}
                  onChange={() => toggleLayer('infrastructure')}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
              <p>• Blue dashed: Ralegaon Nullah channel</p>
              <p>• Teal solid: Main DI Water Feeder</p>
              <p>• Click any marker to view tender details</p>
            </div>
          </div>

          {/* City Geographic Snapshot */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Spatial Coordinates
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Center Lat/Lng:</span>
                <span className="font-mono font-semibold">20.4735° N, 78.3375° E</span>
              </div>
              <div className="flex justify-between">
                <span>Total ULB Area:</span>
                <span className="font-semibold">14.8 sq km</span>
              </div>
              <div className="flex justify-between">
                <span>Elevation:</span>
                <span className="font-semibold">245m MSL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map Canvas (9 cols) */}
        <div className="lg:col-span-9">
          <DynamicLeafletMap
            wards={wards}
            projects={projects}
            risks={risks}
            activeLayers={activeLayers}
            selectedWard={selectedWard}
            selectedProject={selectedProject}
          />
        </div>
      </div>
    </div>
  );
};
