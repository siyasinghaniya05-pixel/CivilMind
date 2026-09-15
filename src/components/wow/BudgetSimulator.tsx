'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  TrendingUp, 
  IndianRupee, 
  Users, 
  CheckCircle2, 
  AlertTriangle,
  Droplets,
  Milestone,
  Waves,
  Recycle,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BudgetSimulator: React.FC = () => {
  const { totalBudgetOptimizationCr, setTotalBudgetOptimizationCr, setActiveTab } = useCivic();

  const totalPool = totalBudgetOptimizationCr; // ₹ Cr

  // Departmental allocation sliders in ₹ Lakhs (total = totalPool * 100)
  const [drainageLakhs, setDrainageLakhs] = useState<number>(320);
  const [roadsLakhs, setRoadsLakhs] = useState<number>(280);
  const [waterLakhs, setWaterLakhs] = useState<number>(220);
  const [sanitationLakhs, setSanitationLakhs] = useState<number>(100);
  const [lightingLakhs, setLightingLakhs] = useState<number>(80);

  const totalAllocated = drainageLakhs + roadsLakhs + waterLakhs + sanitationLakhs + lightingLakhs;
  const budgetCapLakhs = Math.round(totalPool * 100);
  const remainingLakhs = budgetCapLakhs - totalAllocated;

  // Real-time projected impacts
  const projectedWdi = Math.min(
    96,
    Math.round(62 + (drainageLakhs * 0.04) + (roadsLakhs * 0.035) + (waterLakhs * 0.03) + (sanitationLakhs * 0.02) + (lightingLakhs * 0.015))
  );

  const floodMitigationPct = Math.min(95, Math.round((drainageLakhs / 350) * 85));
  const roadQualityLiftPct = Math.min(90, Math.round((roadsLakhs / 300) * 80));
  const waterSecurityPct = Math.min(92, Math.round((waterLakhs / 250) * 88));
  const citizenSatisfaction = Math.min(98, Math.round((projectedWdi * 0.95) + 3));

  const handleApply = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    setActiveTab('budget-optimizer');
  };

  const handleReset = () => {
    setDrainageLakhs(320);
    setRoadsLakhs(280);
    setWaterLakhs(220);
    setSanitationLakhs(100);
    setLightingLakhs(80);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-2">
            <Sliders className="w-3.5 h-3.5" /> WOW Feature #2: Dynamic Budget Simulator
          </div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight">
            Interactive Capital Fund Reallocation Simulator
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Slide fund allocations across sectors in real time to immediately visualize projected improvements in Ward Development Index, Flood Risk, and Citizen Satisfaction.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Default Baseline
        </button>
      </div>

      {/* Real-time Budget Status Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 font-semibold uppercase">Total Outlay Cap</span>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            ₹{(totalAllocated / 100).toFixed(2)} Cr / ₹{totalPool.toFixed(2)} Cr
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Allocation Saturation</span>
            <span className={remainingLakhs < 0 ? 'text-red-600 font-bold' : 'text-emerald-600 font-bold'}>
              {remainingLakhs >= 0 ? `₹${remainingLakhs} L unallocated` : `Exceeded by ₹${Math.abs(remainingLakhs)} L!`}
            </span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                remainingLakhs < 0 ? 'bg-red-600' : 'bg-gradient-to-r from-blue-600 to-emerald-500'
              }`}
              style={{ width: `${Math.min(100, (totalAllocated / budgetCapLakhs) * 100)}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleApply}
          disabled={remainingLakhs < 0}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            remainingLakhs < 0
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:scale-105'
          }`}
        >
          Apply Allocation to Plan
        </button>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sliders Panel (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Sector Reallocation Controls
          </h2>

          {/* Drainage Slider */}
          <div className="space-y-2 p-3.5 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/60">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Drainage & Flood Mitigation</span>
              </div>
              <span className="font-black text-sky-700 dark:text-sky-400 text-sm">₹{drainageLakhs} Lakhs</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={drainageLakhs}
              onChange={(e) => setDrainageLakhs(Number(e.target.value))}
              className="w-full h-2 bg-sky-200 dark:bg-sky-900 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Min: ₹50L</span>
              <span>Monsoon box drains & nullah desilting</span>
              <span>Max: ₹5.00 Cr</span>
            </div>
          </div>

          {/* Roads Slider */}
          <div className="space-y-2 p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/60">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Milestone className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Roads & Arterial Corridors</span>
              </div>
              <span className="font-black text-blue-700 dark:text-blue-400 text-sm">₹{roadsLakhs} Lakhs</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={roadsLakhs}
              onChange={(e) => setRoadsLakhs(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Min: ₹50L</span>
              <span>Cement concrete paving & industrial bypass</span>
              <span>Max: ₹5.00 Cr</span>
            </div>
          </div>

          {/* Water Supply Slider */}
          <div className="space-y-2 p-3.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/60">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Water Supply & Pipelines</span>
              </div>
              <span className="font-black text-teal-700 dark:text-teal-400 text-sm">₹{waterLakhs} Lakhs</span>
            </div>
            <input
              type="range"
              min="50"
              max="400"
              step="10"
              value={waterLakhs}
              onChange={(e) => setWaterLakhs(Number(e.target.value))}
              className="w-full h-2 bg-teal-200 dark:bg-teal-900 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Min: ₹50L</span>
              <span>Feeder lines & elevated tank telemetry</span>
              <span>Max: ₹4.00 Cr</span>
            </div>
          </div>

          {/* Sanitation & SWM */}
          <div className="space-y-2 p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/60">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Recycle className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Solid Waste Management</span>
              </div>
              <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">₹{sanitationLakhs} Lakhs</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={sanitationLakhs}
              onChange={(e) => setSanitationLakhs(Number(e.target.value))}
              className="w-full h-2 bg-emerald-200 dark:bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Streetlighting */}
          <div className="space-y-2 p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Smart Streetlighting</span>
              </div>
              <span className="font-black text-amber-700 dark:text-amber-400 text-sm">₹{lightingLakhs} Lakhs</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={lightingLakhs}
              onChange={(e) => setLightingLakhs(Number(e.target.value))}
              className="w-full h-2 bg-amber-200 dark:bg-amber-900 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>
        </div>

        {/* Right: Real-Time Dynamic Impact Meters (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Live Simulated Outcomes
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Projected metrics based on municipal response curves
            </p>
          </div>

          {/* Big Score: Projected WDI */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              Projected Ward Development Index (WDI)
            </span>
            <div className="text-4xl font-black text-emerald-700 dark:text-emerald-400">
              {projectedWdi}
              <span className="text-sm font-normal text-slate-400"> / 100</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold">
              +{(projectedWdi - 68.4).toFixed(1)} points vs current baseline (68.4)
            </p>
          </div>

          {/* Sub-Meters */}
          <div className="space-y-4 text-xs">
            {/* Citizen Satisfaction */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Citizen Satisfaction Index</span>
                <span className="font-bold text-slate-900 dark:text-white">{citizenSatisfaction}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${citizenSatisfaction}%` }} />
              </div>
            </div>

            {/* Flood Inundation Drop */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Flood Inundation Elimination</span>
                <span className="font-bold text-sky-600">{floodMitigationPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${floodMitigationPct}%` }} />
              </div>
            </div>

            {/* Road Smoothness Index */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Road Quality Index</span>
                <span className="font-bold text-indigo-600">{roadQualityLiftPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${roadQualityLiftPct}%` }} />
              </div>
            </div>

            {/* Water Supply Reliability */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Piped Water Reliability</span>
                <span className="font-bold text-teal-600">{waterSecurityPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${waterSecurityPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
