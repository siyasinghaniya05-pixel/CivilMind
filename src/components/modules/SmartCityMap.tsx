'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCivic } from '@/context/CivicContext';
import { HeatmapMode } from '@/types';
import { 
  Map as MapIcon, 
  Layers, 
  AlertTriangle, 
  Flame, 
  Waves, 
  ShieldAlert, 
  Sliders, 
  MapPin, 
  CheckCircle2, 
  Navigation,
  Sparkles,
  Crosshair
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DynamicLeafletMap = dynamic(
  () => import('./map/LeafletMapInner').then((mod) => mod.LeafletMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[640px] rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400 gap-2">
        <MapIcon className="w-8 h-8 animate-pulse text-blue-600" />
        <p className="text-xs font-semibold">Initializing OpenStreetMap GIS & AI Heatmap Engine...</p>
      </div>
    ),
  }
);

export const SmartCityMap: React.FC = () => {
  const { 
    currentCity, 
    wards, 
    projects, 
    risks, 
    heatmapMode, 
    setHeatmapMode,
    searchAndSetCity,
    setIsCityModalOpen 
  } = useCivic();

  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    development: true,
    risk: true,
    budget: true,
    infrastructure: true,
    facilities: true,
  });

  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMapLocationPick = (lat: number, lng: number) => {
    if (isPickingLocation) {
      setIsPickingLocation(false);
      searchAndSetCity(`Selected Territory (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`, { lat, lng });
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <MapIcon className="w-3.5 h-3.5" /> Module 5: OpenStreetMap GIS & AI Heatmaps
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Geospatial Multi-Layer Infrastructure & Risk Heatmaps
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real OpenStreetMap visualization for <strong className="text-slate-800 dark:text-slate-200">{currentCity.cityName} ({currentCity.district})</strong> with 4 specialized neural heatmaps.
          </p>
        </div>

        {/* Action button to switch town */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPickingLocation(!isPickingLocation)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isPickingLocation
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            {isPickingLocation ? 'Click Anywhere on Map to Analyze' : 'Pin on Map Mode'}
          </button>

          <button
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5" />
            Search Other City
          </button>
        </div>
      </div>

      {/* 4 AI HEATMAP SELECTOR BAR (Requested by User) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-500" />
            AI Predictive Heatmap Layers:
          </span>
          <span className="text-[11px] text-slate-500">Overlay dynamic hazard intensity contours</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'none', label: 'Standard Map', color: 'bg-slate-700', desc: 'Default OpenStreetMap' },
            { id: 'flood', label: 'Flood Risk Heatmap', color: 'bg-red-600', desc: 'Monsoon inundation contours' },
            { id: 'roads', label: 'Road Damage Heatmap', color: 'bg-amber-600', desc: 'Pavement distress & rutting' },
            { id: 'deficiency', label: 'Deficiency Heatmap', color: 'bg-purple-600', desc: 'Unserved drainage/water' },
            { id: 'priority', label: 'Priority Heatmap', color: 'bg-emerald-600', desc: 'Highest citizen ROI zones' },
          ].map((hm) => (
            <button
              key={hm.id}
              onClick={() => setHeatmapMode(hm.id as HeatmapMode)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                heatmapMode === hm.id
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{hm.label}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${hm.color}`} />
              </div>
              <p className="text-[10px] text-slate-500 truncate">{hm.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Layer Toggles & Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Map Layer Controls (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-blue-600" />
              GIS Feature Layers
            </div>

            <div className="space-y-2">
              {/* Development Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Wards & Scores
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.development}
                  onChange={() => toggleLayer('development')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
              </label>

              {/* Risk Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Risk Hotspots
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.risk}
                  onChange={() => toggleLayer('risk')}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
              </label>

              {/* Budget Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Ongoing Projects
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.budget}
                  onChange={() => toggleLayer('budget')}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </label>

              {/* Infrastructure Layer */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Water & Drainage Trunks
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.infrastructure}
                  onChange={() => toggleLayer('infrastructure')}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
              </label>

              {/* Public Facilities */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Public Facilities
                </span>
                <input
                  type="checkbox"
                  checked={activeLayers.facilities}
                  onChange={() => toggleLayer('facilities')}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Active City GIS Telemetry */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block text-[10px]">
              Spatial Coordinates
            </span>
            <div className="space-y-1 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Center Lat/Lng:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{currentCity.lat.toFixed(4)}°N, {currentCity.lng.toFixed(4)}°E</span>
              </div>
              <div className="flex justify-between">
                <span>Total Wards:</span>
                <strong>{currentCity.totalWards} Wards</strong>
              </div>
              <div className="flex justify-between">
                <span>Active Heatmap:</span>
                <strong className="text-blue-600 capitalize">{heatmapMode}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dynamic Leaflet Map Canvas (9 cols) */}
        <div className="lg:col-span-9">
          <DynamicLeafletMap
            centerLat={currentCity.lat}
            centerLng={currentCity.lng}
            wards={wards}
            projects={projects}
            risks={risks}
            heatmapMode={heatmapMode}
            activeLayers={activeLayers}
            onMapLocationPick={handleMapLocationPick}
            isPickingLocation={isPickingLocation}
          />
        </div>
      </div>
    </div>
  );
};
