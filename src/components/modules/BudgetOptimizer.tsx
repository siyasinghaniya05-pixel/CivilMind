'use client';

import React, { useState, useMemo } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Calculator, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Lock, 
  History,
  TrendingDown,
  TrendingUp,
  Droplets,
  Layers,
  ArrowRight,
  Sliders,
  Scale
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import confetti from 'canvas-confetti';

interface DepartmentSector {
  id: string;
  name: string;
  marathiName: string;
  color: string;
  description: string;
  sanctionedPct: number;
  weight: number;
  minPct: number;
  maxPct: number;
  committedFloorPct: number;
  spentPct: number;
  tags: string[];
}

export const BudgetOptimizer: React.FC = () => {
  const { currentCity, setActiveTab } = useCivic();

  // Total municipal capital budget pool in ₹ Crore
  // For large ULBs (e.g. BMC) it can scale up to ₹59,954 Cr; for municipal councils it scales to city budget
  const isMetropolitan = (currentCity?.totalPopulation || 60000) > 500000;
  const baseBudgetCr = isMetropolitan ? 59954.75 : 14.50;

  const [totalCapExPool, setTotalCapExPool] = useState<number>(baseBudgetCr);
  const [scenarioName, setScenarioName] = useState<string>('Pre-Monsoon Flood & Water Resilience Scenario v3 (FY27 Q1)');
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lockStatusText, setLockStatusText] = useState<string>('Save & Lock Scenario (NIC Ledger Encrypted)');
  const [showExportToast, setShowExportToast] = useState<boolean>(false);

  // 6 Municipal Engineering Directorates
  const [sectors, setSectors] = useState<DepartmentSector[]>([
    {
      id: 'roads',
      name: 'Roads & Traffic Engineering',
      marathiName: 'रस्ते आणि वाहतूक',
      color: '#00457d',
      description: 'Coastal Road extensions, link road connectivity, and CC road concretization.',
      sanctionedPct: 24.7,
      weight: 23.5,
      minPct: 18.0,
      maxPct: 28.0,
      committedFloorPct: 18.5,
      spentPct: 31.4,
      tags: ['148 DPR Active Sites', 'State Infra Loan Tied', 'Sec 73 Sanction Req']
    },
    {
      id: 'water',
      name: 'Water Supply & Treatment',
      marathiName: 'पाणीपुरवठा व प्रक्रिया',
      color: '#006780',
      description: 'STP Desalination plants, 24x7 pressurized DMA network & reservoir balancing.',
      sanctionedPct: 17.1,
      weight: 18.8,
      minPct: 14.0,
      maxPct: 24.0,
      committedFloorPct: 13.5,
      spentPct: 38.2,
      tags: ['AMRUT 2.0 Tied', '24x7 Pressurization Target', 'High-Yield Wards']
    },
    {
      id: 'drainage',
      name: 'Stormwater Drainage & Sewerage',
      marathiName: 'पर्जन्य जलवाहिन्या व मलनिस्सारण',
      color: '#004e3c',
      description: 'Stormwater pumping stations, nallah widening, river dredging, and flood outfall gates.',
      sanctionedPct: 10.8,
      weight: 12.5,
      minPct: 8.0,
      maxPct: 16.0,
      committedFloorPct: 8.5,
      spentPct: 44.0,
      tags: ['Monsoon Emergency Cap', 'River Dredging Outfalls', 'NDMA Flood Mitigation']
    },
    {
      id: 'swm',
      name: 'Sanitation & Solid Waste Management',
      marathiName: 'स्वच्छता आणि घनकचरा',
      color: '#f59e0b',
      description: 'Bioremediation processing, Waste-to-Energy plants, and decentralized composting.',
      sanctionedPct: 10.2,
      weight: 9.8,
      minPct: 7.0,
      maxPct: 14.0,
      committedFloorPct: 8.0,
      spentPct: 34.5,
      tags: ['SBM 2.0 Grant', 'Biomethanation Plants', 'Transfer Depots']
    },
    {
      id: 'energy',
      name: 'Street Lighting & Municipal Energy',
      marathiName: 'विद्युत आणि ऊर्जा',
      color: '#8b5cf6',
      description: 'Smart LED retrofitting, public EV fast-charging hubs, and rooftop solar arrays.',
      sanctionedPct: 4.1,
      weight: 4.5,
      minPct: 2.0,
      maxPct: 8.0,
      committedFloorPct: 3.2,
      spentPct: 36.3,
      tags: ['SCADA Smart Feeder', 'ESCO Energy Model', 'Municipal Sub-Stations']
    },
    {
      id: 'amenities',
      name: 'Urban Amenities, Health & Parks',
      marathiName: 'नागरी सुविधा, आरोग्य व उद्याने',
      color: '#06b6d4',
      description: 'Tertiary municipal hospital upgrades, maternal clinics, and public green parks.',
      sanctionedPct: 7.0,
      weight: 6.8,
      minPct: 4.0,
      maxPct: 10.0,
      committedFloorPct: 5.5,
      spentPct: 42.4,
      tags: ['15th FC Health Grant', 'Urban Forestry Belts', 'Civic Gardens']
    }
  ]);

  // Administrative / Others constant percentage for balance
  const othersPct = 24.1;

  // Compute total simulated weight across 6 sectors
  const currentTotalWeight = useMemo(() => {
    return Number(sectors.reduce((acc, s) => acc + s.weight, 0).toFixed(1));
  }, [sectors]);

  // Baseline target weight across the 6 sectors
  const targetWeight = 75.9; // 100% - othersPct
  const deltaWeight = Number((currentTotalWeight - targetWeight).toFixed(1));
  const deltaCr = Number(((deltaWeight / 100) * totalCapExPool).toFixed(2));

  // Sector slider change handler
  const handleSliderChange = (id: string, newWeight: number) => {
    if (isLocked) return;
    setSectors(prev => prev.map(s => s.id === id ? { ...s, weight: Number(newWeight.toFixed(1)) } : s));
  };

  // Reset to Baseline
  const handleResetBaseline = () => {
    setIsLocked(false);
    setSectors(prev => prev.map(s => ({ ...s, weight: s.sanctionedPct })));
  };

  // Reset to AI Optimal Model
  const handleResetOptimal = () => {
    setIsLocked(false);
    setSectors([
      { ...sectors[0], weight: 23.5 },
      { ...sectors[1], weight: 18.8 },
      { ...sectors[2], weight: 12.5 },
      { ...sectors[3], weight: 9.8 },
      { ...sectors[4], weight: 4.5 },
      { ...sectors[5], weight: 6.8 },
    ]);
  };

  // Lock scenario
  const handleSaveAndLock = () => {
    setLockStatusText('Writing to NIC Sovereign Ledger...');
    setTimeout(() => {
      setIsLocked(true);
      setLockStatusText('Scenario Locked & Anchored (#0x92FB)');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  const handleExportPdf = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3500);
    window.print();
  };

  // Pie chart datasets
  const baselinePieData = useMemo(() => {
    return [
      ...sectors.map(s => ({
        name: s.name,
        value: Number(((s.sanctionedPct / 100) * totalCapExPool).toFixed(2)),
        pct: s.sanctionedPct,
        color: s.color
      })),
      {
        name: 'Administrative / Reserves',
        value: Number(((othersPct / 100) * totalCapExPool).toFixed(2)),
        pct: othersPct,
        color: '#c1c7d2'
      }
    ];
  }, [sectors, totalCapExPool]);

  const simulatedPieData = useMemo(() => {
    return [
      ...sectors.map(s => ({
        name: s.name,
        value: Number(((s.weight / 100) * totalCapExPool).toFixed(2)),
        pct: s.weight,
        color: s.color
      })),
      {
        name: 'Administrative / Reserves',
        value: Number(((othersPct / 100) * totalCapExPool).toFixed(2)),
        pct: othersPct,
        color: '#c1c7d2'
      }
    ];
  }, [sectors, totalCapExPool]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102A43] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Standing Committee Docket Generated</p>
            <p className="text-slate-300">NIC ledger formatted for General Body approval.</p>
          </div>
        </div>
      )}

      {/* TOP CONTROL & AUDIT STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-1 gap-2 text-slate-500 dark:text-slate-400 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Municipal Finance</span>
          <span className="text-slate-300 dark:text-slate-600 font-mono">/</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Capital Budgeting (CapEx)</span>
          <span className="text-slate-300 dark:text-slate-600 font-mono">/</span>
          <span className="text-blue-700 dark:text-blue-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            AI Scenario Simulation Engine v4.2
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] self-start md:self-auto">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> AUDIT LOCK: SEC-73 MMC ACT
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">NIC FISCAL TELEMETRY LIVE</span>
        </div>
      </div>

      {/* TITLE BAR & EXECUTIVE ACTION STRIP */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-baseline gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-blue-900 dark:text-white tracking-tight">
              Municipal Budget Allocation & AI Scenario Engine
            </h1>
            <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded font-mono text-xs font-bold uppercase">
              {currentCity?.cityName ? `${currentCity.cityName.slice(0, 3).toUpperCase()} FY 2026-27` : 'BMC FY 2026-27'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            भांडवली खर्च वाटप आणि कृत्रिम बुद्धिमत्ता परिदृश्य विश्लेषण • Dynamic fiscal rebalancing across municipal departments with predictive outcome simulation.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleResetBaseline}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            type="button"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>Load Baseline</span>
          </button>
          <button 
            onClick={handleResetOptimal}
            className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs border border-blue-200 dark:border-blue-900"
            type="button"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Apply AI Optimal Model</span>
          </button>
          <button 
            onClick={() => setActiveTab('wow-simulator')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            type="button"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Live Interactive Sliders</span>
          </button>
        </div>
      </div>

      {/* LIVE CAPEX FISCAL METER BAR */}
      <div className="w-full bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total CapEx Outlay</span>
              <span className="text-2xl font-black text-blue-900 dark:text-white">
                ₹{totalCapExPool.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">Cr</span>
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reallocatable Free Float</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                ₹{(totalCapExPool * 0.107).toFixed(2)} <span className="text-xs font-normal text-slate-400">Cr</span>
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scenario Net Variance</span>
              <span className={`text-2xl font-black ${
                Math.abs(deltaWeight) < 0.2 ? 'text-blue-600 dark:text-blue-400' :
                deltaCr > 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}>
                {deltaCr > 0 ? `+₹${deltaCr} Cr` : deltaCr < 0 ? `-₹${Math.abs(deltaCr)} Cr` : '₹0.00 Cr'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
              Math.abs(deltaWeight) < 0.2 
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                : deltaCr > 0
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300'
                : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300'
            }`}>
              <Scale className="w-3.5 h-3.5" />
              <span>
                {Math.abs(deltaWeight) < 0.2 
                  ? 'Balanced Envelope (100% Adherence)' 
                  : deltaCr > 0 
                  ? `Deficit Overhang (+${deltaWeight}%)` 
                  : `Unallocated Buffer (${deltaWeight}%)`}
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              DELTA TOLERANCE: ±0.2%
            </div>
          </div>
        </div>

        {/* Envelope Composition Progress Strip */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner">
            {sectors.map((s) => (
              <div 
                key={s.id}
                className="h-full transition-all duration-300"
                style={{ width: `${s.weight}%`, backgroundColor: s.color }}
                title={`${s.name}: ${s.weight}%`}
              />
            ))}
            <div 
              className="h-full bg-slate-400 dark:bg-slate-600 transition-all duration-300" 
              style={{ width: `${othersPct}%` }}
              title={`Administrative / Others: ${othersPct}%`}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between text-slate-500 font-mono text-[11px]">
            <span>Equilibrium CapEx: ₹{totalCapExPool.toLocaleString('en-IN')} Cr</span>
            <span>Committed Floor Reserve: 100% Statutory Compliant</span>
          </div>
        </div>
      </div>

      {/* 2-COLUMN SPLIT CONSOLE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* ==================== LEFT COLUMN: DEPARTMENT OUTLAY REBALANCING (7 COLS) ==================== */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Departmental Outlay Rebalancing
                </h2>
                <span className="text-xs text-slate-500">
                  Adjust CapEx weights across municipal engineering directorates with committed floor protection.
                </span>
              </div>
            </div>
            <span className="font-mono text-xs bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg font-bold border border-slate-200 dark:border-slate-700">
              ACTIVE POOL: 6 SECTORS
            </span>
          </div>

          {/* Department Cards */}
          <div className="flex flex-col gap-3">
            {sectors.map((sector) => {
              const allocatedCr = Number(((sector.weight / 100) * totalCapExPool).toFixed(2));
              const baselineCr = Number(((sector.sanctionedPct / 100) * totalCapExPool).toFixed(2));
              const diffCr = Number((allocatedCr - baselineCr).toFixed(2));

              return (
                <article 
                  key={sector.id} 
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: sector.color }} />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{sector.name}</h3>
                        <span className="text-xs text-slate-400 font-medium">({sector.marathiName})</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sector.description}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-blue-900 dark:text-white">
                        ₹{allocatedCr.toLocaleString('en-IN', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">Cr</span>
                      </div>
                      <div className={`font-mono text-xs font-semibold ${diffCr > 0 ? 'text-emerald-600' : diffCr < 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                        {diffCr > 0 ? `+₹${diffCr} Cr (+${(sector.weight - sector.sanctionedPct).toFixed(1)}%)` : diffCr < 0 ? `-₹${Math.abs(diffCr)} Cr (${(sector.weight - sector.sanctionedPct).toFixed(1)}%)` : 'Baseline Parity'}
                      </div>
                    </div>
                  </div>

                  {/* Slider with Min/Max and Committed Floor */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Sanctioned: {sector.sanctionedPct}% (₹{baselineCr} Cr)</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">Simulated Weight: {sector.weight}%</span>
                    </div>

                    <input 
                      type="range"
                      min={sector.minPct}
                      max={sector.maxPct}
                      step={0.1}
                      disabled={isLocked}
                      value={sector.weight}
                      onChange={(e) => handleSliderChange(sector.id, parseFloat(e.target.value))}
                      className="w-full h-2 rounded-lg cursor-pointer bg-slate-100 dark:bg-slate-800 appearance-none accent-blue-600"
                    />

                    <div className="flex justify-between font-mono text-[10px] text-slate-400 pt-0.5">
                      <span>Floor: {sector.committedFloorPct}%</span>
                      <span>Committed Floor Protected</span>
                      <span>Cap: {sector.maxPct}%</span>
                    </div>
                  </div>

                  {/* 4-Metric CapEx Ledger Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl text-left border border-slate-100 dark:border-slate-800">
                    <div className="p-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Sanctioned</span>
                      <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">₹{baselineCr} Cr</span>
                    </div>
                    <div className="p-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Booked/Spent</span>
                      <span className="font-mono text-xs font-semibold text-teal-600 dark:text-teal-400">{sector.spentPct}%</span>
                    </div>
                    <div className="p-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Committed Floor</span>
                      <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">{sector.committedFloorPct}%</span>
                    </div>
                    <div className="p-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Free Float Cap</span>
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{(allocatedCr * 0.18).toFixed(1)} Cr
                      </span>
                    </div>
                  </div>

                  {/* Institutional Compliance Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {sector.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Statutory Constraint Banner */}
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl flex items-start gap-3 border border-blue-200 dark:border-blue-900 text-xs">
            <ShieldCheck className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-blue-900 dark:text-blue-300">Statutory Restriction (MMC Act Sec 73 & 80A)</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Contractually committed allocations across ongoing work orders cannot be trimmed without formal Standing Committee cancellation and contractor indemnification. Only unallocated free float is subject to real-time administrative swap.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== RIGHT COLUMN: AI PREDICTOR & WHAT-IF DOSSIER (5 COLS) ==================== */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          {/* Card 1: Dual Composition Donut Visualization */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  CapEx Portfolio Composition
                </h2>
                <p className="text-xs text-slate-400">Sanctioned Baseline vs. AI Optimal Simulation</p>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300">
                94.8% ML Confidence
              </span>
            </div>

            {/* Dual Donut Comparison */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Baseline</span>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={baselinePieData}
                        innerRadius={36}
                        outerRadius={52}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {baselinePieData.map((entry, index) => (
                          <Cell key={`baseline-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`₹${val} Cr`, 'Allocated']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400">Current Sanctioned</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase block mb-1">AI Optimal</span>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={simulatedPieData}
                        innerRadius={36}
                        outerRadius={52}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {simulatedPieData.map((entry, index) => (
                          <Cell key={`sim-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`₹${val} Cr`, 'Simulated']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-600">Max Resilience</span>
              </div>
            </div>

            {/* AI Executive Rationale */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-blue-900 dark:text-blue-300">LLaMA-Civic Recommendation Rationale</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  "Shifting funds into Stormwater Drainage & Outfalls pre-empts critical monsoon choke points, averting estimated major damages in commercial downtime and rail halt delays across high-risk ward enclaves."
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Projected Governance Impact Deltas */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Projected Governance Impact Deltas
                </h2>
                <p className="text-xs text-slate-400">Simulated outcomes based on FY27 CapEx shift</p>
              </div>
              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                MoHUA MPI Synced
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Metric 1 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Overall Infrastructure Risk Index</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded text-[11px]">
                    -38.1% Vulnerability
                  </span>
                </div>
                <div className="flex items-baseline gap-2 font-mono text-xs">
                  <span className="text-slate-400 line-through">42 / 100</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-bold text-emerald-600 text-sm">26 / 100</span>
                  <span className="text-slate-400">(High Resilience Zone)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '26%' }} />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Incremental Citizens Protected</span>
                  <span className="font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded text-[11px]">
                    +37.8% Coverage
                  </span>
                </div>
                <div className="flex items-baseline gap-2 font-mono text-xs">
                  <span className="text-slate-400 line-through">64.2%</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-bold text-blue-600 text-sm">88.5%</span>
                  <span className="text-slate-400">Direct Reach</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '88.5%' }} />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Grievance Redressal SLA Performance</span>
                  <span className="font-bold text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded text-[11px]">
                    +18.4% Faster SLA
                  </span>
                </div>
                <div className="flex items-baseline gap-2 font-mono text-xs">
                  <span className="text-slate-400 line-through">31.4 hrs</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-bold text-teal-600 text-sm">19.2 hrs</span>
                  <span className="text-slate-400">(Helpline 1916 Avg)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: '74%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Scenario Management & Standing Committee Docket */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Standing Committee Docket & Scenario Lock
              </h2>
              <span className="font-mono text-[10px] text-slate-400">NIC-LEDGER #BMC-782</span>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Scenario Handle</label>
              <input 
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 pb-1 border-b border-slate-200 dark:border-slate-700">
                <span>Compliance Verification</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Passed
                </span>
              </div>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span><strong>Contract Feasibility:</strong> 0 breach risks on ongoing committed work.</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span><strong>15th FC Tied Ratios:</strong> Complete adherence to statutory funding ratio.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button 
                onClick={handleSaveAndLock}
                disabled={isLocked}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isLocked 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-blue-700 hover:bg-blue-800 text-white'
                }`}
                type="button"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{lockStatusText}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleExportPdf}
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  type="button"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export Council PDF</span>
                </button>
                <button 
                  onClick={() => alert('Standing Committee DSC e-Sign initiated with Municipal Commissioner token.')}
                  className="py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-200 dark:border-emerald-800"
                  type="button"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DSC e-Sign Docket</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] pt-1">
              <span>Engine: LLaMA-Civic-70B</span>
              <span>Hash: #SHA-256-4BE9</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
