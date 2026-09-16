'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Boxes, 
  Activity, 
  Droplets, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  Radio, 
  Gauge, 
  Layers, 
  Eye,
  Sparkles,
  Server
} from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const { wards, projects, risks, setActiveTab, setSelectedWard, currentCity } = useCivic();

  const [selectedAssetId, setSelectedAssetId] = useState<string>('esr-1');
  const [activeTelemetryFilter, setActiveTelemetryFilter] = useState<'all' | 'water' | 'drain' | 'power'>('all');

  // Digital Twin simulated nodes
  const digitalNodes = [
    {
      id: 'esr-1',
      name: 'Elevated Storage Reservoir #1 (Shivaji Nagar)',
      type: 'water',
      ward: 'Ward 1',
      status: 'Normal',
      telemetry: { pressure: '2.8 Bar', capacity: '88%', flowRate: '420 m³/hr', qualityPh: '7.2' },
      coordinates: { x: 30, y: 25 },
    },
    {
      id: 'drain-4',
      name: 'Ralegaon Drainage Outfall Trunk (Indira Nagar)',
      type: 'drain',
      ward: 'Ward 4',
      status: 'Warning',
      telemetry: { siltCapacity: '68% Full', flowVelocity: '0.4 m/s', sensorWaterLevel: '1.4m / 2.0m', overflowRisk: 'Critical' },
      coordinates: { x: 45, y: 70 },
    },
    {
      id: 'road-2',
      name: 'Main Bazar Arterial CC Road Corridor',
      type: 'road',
      ward: 'Ward 2',
      status: 'Good',
      telemetry: { pavementIndex: '88/100', trafficPcu: '1,420 PCU/hr', potholeCount: '0', roughnessIri: '2.1 m/km' },
      coordinates: { x: 50, y: 40 },
    },
    {
      id: 'road-17',
      name: 'MIDC Heavy Truck Bypass Corridor',
      type: 'road',
      ward: 'Ward 17',
      status: 'Critical',
      telemetry: { pavementIndex: '34/100', ruttingDepth: '18mm', structuralStress: 'High', deflection: '1.8mm' },
      coordinates: { x: 75, y: 80 },
    },
    {
      id: 'power-5',
      name: 'Central CCMS Streetlight Feeder #4',
      type: 'power',
      ward: 'Ward 5',
      status: 'Normal',
      telemetry: { voltage: '232 V', currentDraw: '48 A', uptimePercentage: '99.4%', activeLuminaires: '184 / 185' },
      coordinates: { x: 65, y: 35 },
    },
    {
      id: 'water-9',
      name: 'Shastri Nagar 300mm CI Feeder Transmission Node',
      type: 'water',
      ward: 'Ward 9',
      status: 'Warning',
      telemetry: { pressure: '1.6 Bar (Dropped)', acousticSensor: 'Leak Vibrations Logged', soilMoisture: 'High', flowLossEst: '18%' },
      coordinates: { x: 70, y: 55 },
    },
  ];

  const selectedNode = digitalNodes.find(n => n.id === selectedAssetId) || digitalNodes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 mb-2">
            <Boxes className="w-3.5 h-3.5" /> WOW Feature #3: Digital Twin View
          </div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight">
            2.5D City Asset Topology & Real-Time IoT Telemetry
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Virtual replica of {currentCity?.cityName || 'the municipality'}'s physical infrastructure assets — water reservoirs, drainage culverts, CC road stress, and automated CCMS streetlights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Digital Twin Synchronized
          </span>
        </div>
      </div>

      {/* Grid: 2.5D Visual Map Canvas & Asset Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Schematic Topology Canvas (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden min-h-[520px] flex flex-col justify-between">
          {/* Top Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>{currentCity?.cityName || 'Municipal'} Urban Spatial Grid Telemetry</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px]">
              {['all', 'water', 'drain', 'power'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveTelemetryFilter(f as any)}
                  className={`px-2.5 py-1 rounded-lg font-bold uppercase transition-all ${
                    activeTelemetryFilter === f
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Isometric Simulated Grid Visuals */}
          <div className="relative w-full h-[400px] my-auto">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

            {/* Pulsing Interconnecting Utility Network Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500/30 stroke-2 stroke-dasharray-4">
              <line x1="30%" y1="25%" x2="50%" y2="40%" />
              <line x1="50%" y1="40%" x2="65%" y2="35%" />
              <line x1="50%" y1="40%" x2="45%" y2="70%" stroke="#0284c7" strokeWidth="3" />
              <line x1="65%" y1="35%" x2="70%" y2="55%" stroke="#0d9488" strokeWidth="3" />
              <line x1="70%" y1="55%" x2="75%" y2="80%" stroke="#ef4444" strokeWidth="3" />
            </svg>

            {/* Interactive Assets / Nodes */}
            {digitalNodes
              .filter(n => activeTelemetryFilter === 'all' || n.type === activeTelemetryFilter)
              .map((node) => {
                const isSelected = selectedAssetId === node.id;
                const isCritical = node.status === 'Critical';
                const isWarning = node.status === 'Warning';

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedAssetId(node.id)}
                    style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    {/* Outer pulse */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all group-hover:scale-125 ${
                        isCritical
                          ? 'bg-red-500/20 border-red-500 text-red-400 animate-ping'
                          : isWarning
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      }`}
                    />

                    {/* Inner Core */}
                    <div
                      className={`absolute inset-1 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${
                        isCritical ? 'bg-red-600' : isWarning ? 'bg-amber-600' : 'bg-emerald-600'
                      } ${isSelected ? 'ring-4 ring-white' : ''}`}
                    >
                      {node.type === 'water' ? '💧' : node.type === 'drain' ? '🌊' : node.type === 'power' ? '⚡' : '🛣️'}
                    </div>

                    {/* Hover Label */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-slate-900/90 text-[10px] font-bold text-slate-200 border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {node.name}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Bottom Telemetry Ticker */}
          <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Live SCADA & Telemetry Frequency: 15 seconds</span>
            <span className="text-emerald-400 font-mono">Sensors: 48 Online • 0 Offline</span>
          </div>
        </div>

        {/* Right: Selected Node Telemetry Inspector (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Asset Sensor Telemetry
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {selectedNode.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedNode.ward}</p>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              selectedNode.status === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
              selectedNode.status === 'Warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
              'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            }`}>
              {selectedNode.status}
            </span>
          </div>

          {/* Live Sensor Gauges */}
          <div className="space-y-3 text-xs">
            {Object.entries(selectedNode.telemetry).map(([key, val]) => (
              <div
                key={key}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
              >
                <span className="text-slate-600 dark:text-slate-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Action Recommendation */}
          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-300 block">
              AI Preventive Maintenance Recommendation:
            </span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              {selectedNode.status === 'Critical'
                ? 'Immediate inspection required. Surface rutting exceeds safety thresholds for freight traffic.'
                : selectedNode.status === 'Warning'
                ? 'High probability of monsoon choking or pipe pressure loss. Dispatch maintenance crew for desilting / acoustic clamp check.'
                : 'Asset operating within CPHEEO standard operating parameters. Next scheduled audit: Q4.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('smart-map')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all"
          >
            Locate on OpenStreetMap GIS
          </button>
        </div>
      </div>
    </div>
  );
};
