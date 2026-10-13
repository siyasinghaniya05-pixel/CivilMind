'use client';

import React, { useState, useMemo } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  IndianRupee, 
  Users, 
  MapPin, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Droplets, 
  Layers, 
  Sliders, 
  Building2, 
  Activity, 
  AlertTriangle, 
  Compass,
  FileText,
  ShieldCheck,
  Radio,
  FileCheck2,
  Download,
  Fingerprint,
  PhoneCall,
  Flame,
  Truck
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import confetti from 'canvas-confetti';

const DynamicLeafletMap = dynamic(
  () => import('./map/LeafletMapInner').then((mod) => mod.LeafletMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400 gap-2">
        <Sparkles className="w-5 h-5 animate-pulse text-blue-600" />
        <p className="text-xs font-medium">Loading interactive city spatial canvas...</p>
      </div>
    ),
  }
);

export const DashboardOverview: React.FC = () => {
  const { 
    currentCity, 
    wards, 
    projects, 
    risks,
    stats,
    heatmapMode,
    setActiveTab, 
    setCurrentView,
    setSelectedWard
  } = useCivic();

  // State for interactive features
  const [activeWardFilter, setActiveWardFilter] = useState<'all' | 'risk'>('all');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [signedActionIds, setSignedActionIds] = useState<string[]>([]);

  const handleActionSign = (actionId: string, title: string) => {
    setSignedActionIds(prev => [...prev, actionId]);
    setToastMessage(`E-Sign DSC authorized for: ${title}`);
    setShowToast(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleBroadcastOrder = () => {
    setToastMessage('Pre-Monsoon Level 2 Red Alert broadcasted to all 24 Ward Officers!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Filtered wards for the spatial matrix
  const matrixWards = useMemo(() => {
    if (activeWardFilter === 'risk') {
      return wards.filter(w => w.highRisk || w.compositeScore < 70);
    }
    return wards.slice(0, 6);
  }, [wards, activeWardFilter]);

  if (!currentCity) {
    return (
      <div className="min-h-[55vh] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-lg mx-auto my-12 space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
          <MapPin className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">Select Your Municipality</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            CivicMind AI generates infrastructure intelligence dynamically for any selected city or town. Please choose your location to initialize your dashboard.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('location-setup')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Select Location</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102A43] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Executive Command Action</p>
            <p className="text-slate-300">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP EXECUTIVE HEADER & REAL-TIME BROADCAST RIBBON                      */}
      {/* ========================================================================= */}
      <section className="flex flex-col gap-4 pt-1">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-blue-700 text-white px-2 py-0.5 rounded font-mono uppercase tracking-wider font-bold">
                {currentCity.cityName.slice(0, 3).toUpperCase()} Apex Command
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                दैनिक आयुक्त आढावा (Municipal Commissioner's Daily Review)
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="font-mono text-slate-500">FY 2026-27 | Q1 (Apr-Jun)</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Telemetry Synchronized: 06:00 IST Cycle
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ULB Executive Intelligence Brief
              </h1>
              <span className="text-base font-semibold text-blue-600">
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jurisdiction: <strong className="text-slate-800 dark:text-slate-200">{currentCity.cityName} Municipal Corp ({currentCity.totalWards} Wards)</strong> | Protocol: <span className="text-rose-600 font-bold uppercase font-mono">Pre-Monsoon Level 2 Red Alert Active</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors shadow-xs"
              type="button"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Generate PDF Brief</span>
            </button>
            <button 
              onClick={handleBroadcastOrder}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors shadow-xs"
              type="button"
            >
              <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>Broadcast Ward Order</span>
            </button>
            <button 
              onClick={() => setActiveTab('budget-optimizer')}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              type="button"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch AI Simulation</span>
            </button>
          </div>
        </div>

        {/* AI Copilot Morning Synopsis */}
        <div className="relative bg-gradient-to-r from-blue-900/10 via-slate-50 to-blue-900/10 dark:from-blue-950/40 dark:via-slate-900 dark:to-blue-950/40 p-5 rounded-2xl shadow-xs border border-blue-200/60 dark:border-blue-900/60 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-blue-900 dark:text-blue-300">
                    AI Copilot Morning Synopsis
                  </span>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[11px] font-bold rounded-md">
                    Immediate Attention: High-Risk Drainage Wards
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">Confidence: 98.4%</span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-rose-600">Drain Desilting Deficit:</strong> Stormwater culvert de-silting in low-lying Ward 4 & Ward 3 channels is 18.4% behind pre-monsoon milestone schedule. Rainfall modeling forecasts 82% waterlogging severity under 60mm/hr precipitation event.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-emerald-600">GIS Revenue Variance:</strong> Q1 Property Tax collected stands at <strong className="font-mono font-bold">₹{stats.spentBudgetCr.toFixed(2)} Cr</strong> (92.4% of prorated target). Satellite change detection discovered unassessed commercial built-up floor area across modern commercial corridors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-teal-600">SBM Telematics:</strong> Solid Waste GPS route adherence verified at <strong className="font-mono font-bold">94.1%</strong> across municipal compactors; localized overflow flagged at primary transit transfer depots.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('ai-recommendations')}
              className="px-3 py-1.5 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors shrink-0 shadow-xs"
            >
              Open Full AI Synthesis Log →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EXECUTIVE 5-COLUMN KPI MATRIX                                          */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Own-Source Revenue */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">कर वसुली (Revenue)</span>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Own-Source Revenue</h3>
            </div>
            <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <IndianRupee className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">₹{stats.allocatedBudgetCr.toFixed(2)}</span>
              <span className="text-xs font-semibold text-slate-400">Cr</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-slate-500">
              <span>Target: ₹{currentCity.totalBudgetCr.toFixed(2)} Cr</span>
              <span className="font-bold text-emerald-600">(91.6%)</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12.3% YoY
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              On Track
            </span>
          </div>
        </div>

        {/* Card 2: Solid Waste Daily Processing */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">स्वच्छता (SBM 2.0)</span>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Solid Waste Daily Processing</h3>
            </div>
            <span className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">184.2</span>
              <span className="text-xs font-semibold text-slate-400">MT/Day</span>
            </div>
            <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <span>D2D: <strong>96.8%</strong></span>
              <span>•</span>
              <span>Wet Seg: <strong>88.2%</strong></span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-teal-600 font-bold flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> MRF Facilities Live
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Optimal
            </span>
          </div>
        </div>

        {/* Card 3: AMRUT 2.0 & Capital Works */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">पायाभूत कामे (Eng Works)</span>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">AMRUT 2.0 & Capital Works</h3>
            </div>
            <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">₹{stats.spentBudgetCr.toFixed(2)}</span>
              <span className="text-xs font-semibold text-slate-400">Cr</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-slate-500">
              <span>{projects.length} Active DPRs</span>
              <span>•</span>
              <span className="font-bold text-blue-600">64.2% Progress</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-amber-600 font-semibold flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" /> 2 Road Works Monitored
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Active
            </span>
          </div>
        </div>

        {/* Card 4: Citizen Grievances */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">नागरी तक्रारी (1916 Helpline)</span>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Citizen Grievances</h3>
            </div>
            <span className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              <PhoneCall className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">118</span>
              <span className="text-xs font-semibold text-slate-400">Open</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <span>SLA 48h: <strong>93.4%</strong></span>
              <span>•</span>
              <span className="text-rose-600 font-bold">14 Breaches</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Avg: 31.4 hrs</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              Action Req
            </span>
          </div>
        </div>

        {/* Card 5: Flood Preparedness */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">मान्सून सज्जता (Monsoon Index)</span>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">Flood Preparedness</h3>
            </div>
            <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
              <Droplets className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">78.5%</span>
              <span className="text-xs font-semibold text-slate-400">Ready</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <span>Silt Lift: 48k MT</span>
              <span>•</span>
              <span className="text-rose-600 font-bold">3 Choke Points</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500 font-semibold text-[11px]">Telemetry Active</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
              Critical Watch
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DUAL-COLUMN WORKSPACE: LEFT 8 COLS & RIGHT 4 COLS                       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: 8 Columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Module 1: Ward Performance & Spatial Vulnerability Matrix */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Ward Performance & Spatial Vulnerability Matrix
                  </h2>
                  <p className="text-xs text-slate-500">
                    प्रभाग कार्यक्षमता व जोखीम निर्देशांक — Real-time telemetry across municipal enclaves
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <button 
                  onClick={() => setActiveWardFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${activeWardFilter === 'all' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                  type="button"
                >
                  All Wards ({wards.length})
                </button>
                <button 
                  onClick={() => setActiveWardFilter('risk')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${activeWardFilter === 'risk' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-600 hover:bg-rose-50'}`}
                  type="button"
                >
                  At Risk ({wards.filter(w => w.highRisk).length})
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Ward & Jurisdiction</th>
                    <th className="py-3 px-3">Population</th>
                    <th className="py-3 px-3">WDI Score</th>
                    <th className="py-3 px-3">Grievance SLA</th>
                    <th className="py-3 px-3">Desilting</th>
                    <th className="py-3 px-3">Vulnerability</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {matrixWards.map((w) => {
                    const isRisk = w.highRisk || w.compositeScore < 70;
                    return (
                      <tr 
                        key={w.id} 
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${isRisk ? 'bg-rose-50/40 dark:bg-rose-950/20' : ''}`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300">
                              W-{w.number}
                            </span>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">{w.name}</div>
                              <div className="text-[11px] text-slate-400">{w.marathiName} • {w.counselor}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-700 dark:text-slate-300">
                          {w.population.toLocaleString('en-IN')}
                        </td>

                        <td className="py-3.5 px-3 font-mono font-bold text-blue-700 dark:text-blue-400">
                          {w.compositeScore} / 100
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-emerald-600">{100 - (w.unresolvedGrievances * 4)}%</span>
                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="bg-emerald-500 h-full rounded-full" 
                                style={{ width: `${Math.max(20, 100 - (w.unresolvedGrievances * 4))}%` }} 
                              />
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                          <span className="font-bold">{w.scores.drainage}%</span>
                          <span className="text-[10px] text-slate-400 block">{w.scores.drainage < 60 ? 'Choked Choke Point' : 'Safe Outfall'}</span>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            isRisk 
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isRisk ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                            {isRisk ? 'High Risk' : 'Optimal'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedWard(w);
                              setActiveTab('ward-index');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold transition-colors"
                          >
                            Dossier
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Displaying priority wards. Real-time SCADA & CPGRAMS telemetry synchronized.</span>
              <button 
                onClick={() => setActiveTab('ward-index')}
                className="text-blue-700 dark:text-blue-400 font-bold hover:underline"
              >
                View Full Ward Registry (WDI) →
              </button>
            </div>
          </div>

          {/* Module 2: Interactive City Spatial Canvas */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Spatial Intelligence & Ward Infrastructure GIS Canvas
                  </h2>
                  <p className="text-xs text-slate-500">
                    Geolocated wards, capital projects, and high-risk flood zones in {currentCity.cityName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('smart-map')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 font-bold text-xs transition-colors"
              >
                Full GIS Mode →
              </button>
            </div>

            <div className="h-[380px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <DynamicLeafletMap
                centerLat={currentCity?.lat || 20.4735}
                centerLng={currentCity?.lng || 78.3375}
                wards={wards}
                projects={projects}
                risks={risks}
                heatmapMode={heatmapMode}
                activeLayers={{
                  development: true,
                  risk: true,
                  budget: true,
                  infrastructure: true,
                  facilities: true,
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Columns */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Module 3: Commissioner Action Queue (Pending E-Sign) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-rose-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Commissioner Action Queue</h3>
                  <p className="text-[11px] text-slate-400">तातडीची स्वाक्षरी व मंजुरी (Pending DSC E-Sign)</p>
                </div>
              </div>
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                {3 - signedActionIds.length}
              </span>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white">CRITICAL / IMMEDIATE</span>
                  <span className="font-mono text-slate-400">E-Office #8824</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  Emergency Culvert Re-clearing Work Order
                </p>
                <p className="text-[11px] text-slate-500">
                  Ward 4 Bottleneck. Sanction: <strong className="font-mono text-slate-800 dark:text-slate-200">₹42.80 Lakhs</strong> under Disaster Management contingency powers.
                </p>
                <div className="pt-1">
                  {signedActionIds.includes('act-1') ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> DSC Signed & Issued
                    </span>
                  ) : (
                    <button
                      onClick={() => handleActionSign('act-1', 'Emergency Culvert Re-clearing Work Order')}
                      className="w-full py-1.5 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Fingerprint className="w-3.5 h-3.5" /> Authorize E-Sign (DSC)
                    </button>
                  )}
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    CAPEX VARIANCE
                  </span>
                  <span className="font-mono text-slate-400">TAX-REV-901</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  Commercial Tech Park Floor Area Escrow
                </p>
                <p className="text-[11px] text-slate-500">
                  Unassessed capital value surcharge of <strong className="font-mono text-slate-800 dark:text-slate-200">₹14.60 Cr</strong> ready for recovery order.
                </p>
                <div className="pt-1">
                  {signedActionIds.includes('act-2') ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Recovery Order Issued
                    </span>
                  ) : (
                    <button
                      onClick={() => handleActionSign('act-2', 'Commercial Tech Park Recovery Order')}
                      className="w-full py-1.5 px-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Review & Approve Recovery
                    </button>
                  )}
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    CPGRAMS PMO VIP
                  </span>
                  <span className="font-mono text-rose-600 font-bold">6h Timer</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  Water Contamination Grievance Escalation
                </p>
                <p className="text-[11px] text-slate-500">
                  Cross-contamination report in elevated residential sector requires Executive Engineer inspection affidavit.
                </p>
                <div className="pt-1">
                  {signedActionIds.includes('act-3') ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Engineer Dispatched
                    </span>
                  ) : (
                    <button
                      onClick={() => handleActionSign('act-3', 'Water Contamination Inspection')}
                      className="w-full py-1.5 px-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Dispatch Executive Engineer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Module 4: Citizen Grievance Pulse (NLP Categorization) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Citizen Grievance Pulse</h3>
                  <p className="text-[11px] text-slate-400">AI NLP Categorization (1916 / WhatsApp Bot)</p>
                </div>
              </div>
              <span className="font-mono text-xs text-slate-500 font-semibold">Today: 118 Open</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Category 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">खड्डे दुरुस्ती (Potholes & Roads)</span>
                  <span className="font-mono font-bold text-blue-600">34% (40)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '34%' }} />
                </div>
              </div>

              {/* Category 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">कचरा उचलणे (Garbage Inundation)</span>
                  <span className="font-mono font-bold text-teal-600">28% (33)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              {/* Category 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">कमी दाबाने पाणी (Water Supply Gaps)</span>
                  <span className="font-mono font-bold text-amber-600">22% (26)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '22%' }} />
                </div>
              </div>

              {/* Category 4 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">रस्ते दिवे बंद (Streetlights Out)</span>
                  <span className="font-mono font-bold text-slate-500">16% (19)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: '16%' }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Average Redressal Cycle</span>
                <span className="font-bold text-blue-700 dark:text-blue-400 text-sm">31.4 Hours</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Citizen SLA Target</span>
                <span className="font-bold text-emerald-600 text-sm">48.0 Hours</span>
              </div>
            </div>
          </div>

          {/* Module 5: Administrative Executive Tooling */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>प्रशासन गतिशीलता साधने (Executive Tooling)</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => handleActionSign('circ-1', 'Circular Issued')}
                className="p-3 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-left transition-colors flex flex-col gap-1 border border-slate-100 dark:border-slate-800"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-900 dark:text-white leading-tight">परिपत्रक जारी करा</span>
                <span className="text-[10px] text-slate-400">Issue Circular</span>
              </button>

              <button 
                onClick={() => setActiveTab('wow-adp')}
                className="p-3 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-left transition-colors flex flex-col gap-1 border border-slate-100 dark:border-slate-800"
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-900 dark:text-white leading-tight">स्थायी समिती</span>
                <span className="text-[10px] text-slate-400">Summon Committee</span>
              </button>

              <button 
                onClick={() => setActiveTab('smart-map')}
                className="p-3 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-left transition-colors flex flex-col gap-1 border border-slate-100 dark:border-slate-800"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-slate-900 dark:text-white leading-tight">GIS भू-माहिती शोध</span>
                <span className="text-[10px] text-slate-400">Spatial Query</span>
              </button>

              <button 
                onClick={() => window.print()}
                className="p-3 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-left transition-colors flex flex-col gap-1 border border-slate-100 dark:border-slate-800"
              >
                <Download className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-slate-900 dark:text-white leading-tight">शासन अहवाल</span>
                <span className="text-[10px] text-slate-400">State MoHUA Export</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>DSC Token: <strong className="text-emerald-600">NIC-eSign ACTIVE</strong></span>
              <span>Security Pin: Valid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
