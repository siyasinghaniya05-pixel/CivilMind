'use client';

import React, { useState, useMemo } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  ArrowUpNarrowWide, 
  Sliders, 
  Sparkles, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Download, 
  Layers, 
  IndianRupee, 
  FileCheck2, 
  TrendingUp, 
  RotateCcw,
  Search,
  MapPin,
  FileText,
  Filter,
  Activity,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';

export const PriorityEngine: React.FC = () => {
  const { projects, updateProjectStatus, setActiveTab, setSelectedWard, wards } = useCivic();

  // 4 Core MCDA Normative Weights (sum to 100)
  const [wRisk, setWRisk] = useState<number>(35);
  const [wNeed, setWNeed] = useState<number>(25);
  const [wStrategy, setWStrategy] = useState<number>(20);
  const [wYield, setWYield] = useState<number>(20);

  const totalWeight = wRisk + wNeed + wStrategy + wYield;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<'score' | 'outlay' | 'bcr'>('score');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '1');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Reset weights to MoHUA Standard
  const handleResetWeights = () => {
    setWRisk(35);
    setWNeed(25);
    setWStrategy(20);
    setWYield(20);
  };

  // Recalculate priority scores dynamically based on the 4 MCDA dimensions
  const prioritizedProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesSearch = 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.wardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.department.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesDept = true;
        if (selectedDept !== 'All') {
          if (selectedDept === 'SWD') matchesDept = p.department.includes('Drainage') || p.department.includes('Sewerage');
          else if (selectedDept === 'WSSD') matchesDept = p.department.includes('Water');
          else if (selectedDept === 'RTE') matchesDept = p.department.includes('Roads') || p.department.includes('Transport');
          else if (selectedDept === 'SWM') matchesDept = p.department.includes('Sanitation');
          else if (selectedDept === 'PHO') matchesDept = p.department.includes('Amenities') || p.department.includes('Parks');
        }

        return matchesSearch && matchesDept;
      })
      .map((p, idx) => {
        // Multi-dimensional scoring mapping
        const rScore = p.riskScore || 75; // Risk & Vulnerability (0-100)
        const nScore = Math.min(100, Math.round((p.populationBenefited / 32000) * 100)); // Citizen Need & Equity (0-100)
        const sScore = p.strategicScore || 70; // Strategic Alignment (0-100)
        const yScore = Math.min(100, Math.round(55 + (p.budgetLakhs % 40))); // Economic Yield (0-100)

        // Composite MCDA Score normalized by sum of weights
        const composite = Math.round(
          ((rScore * wRisk) + (nScore * wNeed) + (sScore * wStrategy) + (yScore * wYield)) / (totalWeight || 100)
        );

        // Simulated Benefit-Cost Ratio (BCR)
        const bcr = (1.8 + ((composite / 100) * 2.2)).toFixed(1);

        // MCDA Breakdown percentages for stacked progress bar
        const rPct = Math.round(((rScore * wRisk) / ((composite * totalWeight) || 1)) * 100);
        const nPct = Math.round(((nScore * wNeed) / ((composite * totalWeight) || 1)) * 100);
        const sPct = Math.round(((sScore * wStrategy) / ((composite * totalWeight) || 1)) * 100);
        const yPct = Math.max(5, 100 - rPct - nPct - sPct);

        let priorityLevel: 'Critical' | 'High' | 'Medium' = 'Medium';
        if (composite >= 88) priorityLevel = 'Critical';
        else if (composite >= 78) priorityLevel = 'High';

        // DPR reference code
        const dprCode = `DPR-${p.department.slice(0, 3).toUpperCase()}-${String(p.id).padStart(2, '0')}`;

        return {
          ...p,
          dprCode,
          composite,
          priorityLevel,
          bcr: `${bcr}x`,
          scoresBreakdown: { rScore, nScore, sScore, yScore },
          percentages: { rPct, nPct, sPct, yPct },
          outlayCr: (p.budgetLakhs / 100).toFixed(2),
          fundingSource: idx % 2 === 0 ? 'AMRUT 2.0 (60%)' : 'BMC Revenue Fund'
        };
      })
      .sort((a, b) => {
        if (selectedSort === 'outlay') return Number(b.outlayCr) - Number(a.outlayCr);
        if (selectedSort === 'bcr') return parseFloat(b.bcr) - parseFloat(a.bcr);
        return b.composite - a.composite;
      });
  }, [projects, searchQuery, selectedDept, selectedSort, wRisk, wNeed, wStrategy, wYield, totalWeight]);

  const activeProject = useMemo(() => {
    return prioritizedProjects.find(p => p.id === selectedProjectId) || prioritizedProjects[0] || projects[0];
  }, [prioritizedProjects, selectedProjectId, projects]);

  const handleApprove = (projId: string, title: string) => {
    updateProjectStatus(projId, 'Approved');
    setToastMessage(`Project "${title}" approved for Standing Committee sanction!`);
    setShowToast(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setShowToast(false), 3500);
  };

  const getDossierRadarData = (proj: any) => [
    { subject: 'Risk Reduction', score: proj?.scoresBreakdown?.rScore || 80, fullMark: 100 },
    { subject: 'Citizen Reach', score: proj?.scoresBreakdown?.nScore || 75, fullMark: 100 },
    { subject: 'Master Plan', score: proj?.scoresBreakdown?.sScore || 85, fullMark: 100 },
    { subject: 'Economic Yield', score: proj?.scoresBreakdown?.yScore || 70, fullMark: 100 },
    { subject: 'Readiness', score: 85, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102A43] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Sanction Approved</p>
            <p className="text-slate-300">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* TOP BREADCRUMB & AUDIT STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-1 gap-2 text-slate-500 dark:text-slate-400 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Municipal Projects</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Capital Works & DPRs</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-700 dark:text-blue-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            AI Prioritization Engine
          </span>
          <span className="text-slate-300 dark:text-slate-600 mx-1">•</span>
          <span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
            MCDA Algorithm v4.8
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] self-start md:self-auto">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE ULB CONSENSUS
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">NIC LEDGER v2.1</span>
        </div>
      </div>

      {/* TITLE BAR & ACTION CLUSTER */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-blue-900 dark:text-white tracking-tight">
              Development Project Prioritization & Composite Ranking
            </h1>
            <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase">
              MCDA v4.8
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            विकास प्रकल्प प्राधान्यक्रम आणि बहु-निकष क्रमवारी • Multi-Criteria Decision Analysis (MCDA) Scoring Engine evaluated on live ward telemetry.
          </p>
        </div>

        {/* Action Cluster */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            type="button"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Matrix (PDF/XLS)</span>
          </button>
          <button 
            onClick={() => setActiveTab('budget-optimizer')}
            className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs border border-blue-200 dark:border-blue-900"
            type="button"
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulate Allocation</span>
          </button>
          <button 
            onClick={() => setActiveTab('wow-adp')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            type="button"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Council Agenda</span>
          </button>
        </div>
      </div>

      {/* INSTITUTIONAL STATUS STRIP */}
      <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500 font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-slate-700 dark:text-slate-300 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Cycle: FY 2026-27 AMRUT 2.0 / 15th FC / State Infra Pool</span>
        </div>
        <div className="flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>{prioritizedProjects.length} Active DPR Candidates Evaluated</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>NIC Encrypted Municipal Ledger v2.1</span>
        </div>
        <div className="flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Baseline DB: 2024 Spatial Census + GIS Ward Layer</span>
        </div>
      </div>

      {/* LIVE MCDA WEIGHT TUNING & CRITERIA RE-RANKING CONTROLS */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-3 gap-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Live Multi-Criteria Decision Analysis (MCDA) Weight Calibration
              </h2>
              <p className="text-xs text-slate-400">
                Adjust normative weights to dynamically recalculate priority indices across infrastructure candidate DPRs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
              totalWeight === 100 
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300' 
                : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${totalWeight === 100 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span>Sum: {totalWeight}% ({totalWeight === 100 ? 'Equilibrium' : 'Variance'})</span>
            </div>

            <button 
              onClick={handleResetWeights}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1"
              type="button"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to MoHUA Standard</span>
            </button>
          </div>
        </div>

        {/* 4 Core Dimensions Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* 1. Risk & Vulnerability */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  Risk & Vulnerability
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  {wRisk}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Monsoon flood inundation, structural fatigue, and public safety exposure.
              </p>
            </div>
            <div className="space-y-1">
              <input 
                type="range"
                min="10"
                max="60"
                value={wRisk}
                onChange={(e) => setWRisk(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg cursor-pointer bg-slate-200 dark:bg-slate-700 appearance-none accent-rose-600"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>Min 10%</span>
                <span>Current: {wRisk}%</span>
                <span>Max 60%</span>
              </div>
            </div>
          </div>

          {/* 2. Citizen Need & Equity */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  Citizen Need & Equity
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {wNeed}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Grievance portal volume, population density deficit, and equity access.
              </p>
            </div>
            <div className="space-y-1">
              <input 
                type="range"
                min="10"
                max="50"
                value={wNeed}
                onChange={(e) => setWNeed(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg cursor-pointer bg-slate-200 dark:bg-slate-700 appearance-none accent-blue-600"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>Min 10%</span>
                <span>Current: {wNeed}%</span>
                <span>Max 50%</span>
              </div>
            </div>
          </div>

          {/* 3. Strategic Alignment */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0" />
                  Strategic Alignment
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  {wStrategy}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                City Master Plan adherence, transit arterial integration, and statutory mandates.
              </p>
            </div>
            <div className="space-y-1">
              <input 
                type="range"
                min="5"
                max="40"
                value={wStrategy}
                onChange={(e) => setWStrategy(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg cursor-pointer bg-slate-200 dark:bg-slate-700 appearance-none accent-teal-600"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>Min 5%</span>
                <span>Current: {wStrategy}%</span>
                <span>Max 40%</span>
              </div>
            </div>
          </div>

          {/* 4. Economic Yield & BCR */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                  Economic Yield & BCR
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {wYield}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                OSR revenue appreciation, NRW leak reduction, and asset lifecycle maintenance.
              </p>
            </div>
            <div className="space-y-1">
              <input 
                type="range"
                min="5"
                max="40"
                value={wYield}
                onChange={(e) => setWYield(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg cursor-pointer bg-slate-200 dark:bg-slate-700 appearance-none accent-emerald-600"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span>Min 5%</span>
                <span>Current: {wYield}%</span>
                <span>Max 40%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER TOOLBAR */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search DPR title, Ward, or Work Ref..."
              className="w-full h-10 pl-9 pr-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Sort Dropdown */}
            <select 
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="h-10 px-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold focus:outline-none border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <option value="score">Sort: MCDA Score (High → Low)</option>
              <option value="outlay">Sort: Capital Outlay (High → Low)</option>
              <option value="bcr">Sort: Benefit-Cost Ratio (BCR)</option>
            </select>
          </div>
        </div>

        {/* Department Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {[
            { id: 'All', label: 'All Sectors' },
            { id: 'SWD', label: 'Stormwater & Drainage (SWD)' },
            { id: 'WSSD', label: 'Water Supply (WSSD)' },
            { id: 'RTE', label: 'Roads & Traffic (R&TE)' },
            { id: 'SWM', label: 'Solid Waste Management (SWM)' },
            { id: 'PHO', label: 'Public Health & Hospitals (PHO)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDept(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                selectedDept === tab.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* CORE 2-COLUMN WORKSPACE: DENSE RANKING TABLE (7 COLS) & DOSSIER (5 COLS) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: RANKING TABLE (7 COLS) */}
        <div className="xl:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Prioritized Candidate Pipeline</span>
              <span className="text-xs text-slate-400 font-mono">({prioritizedProjects.length} DPRs Ranked)</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" />Risk</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />Need</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500" />Plan</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Yield</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-3 w-14">Rank</th>
                  <th className="py-3 px-3">Project Title & Scope</th>
                  <th className="py-3 px-3 w-28">Ward</th>
                  <th className="py-3 px-3 w-28">Outlay</th>
                  <th className="py-3 px-3 w-20 text-center">Score</th>
                  <th className="py-3 px-3 w-32">MCDA Share</th>
                  <th className="py-3 px-3 w-16 text-center">BCR</th>
                  <th className="py-3 px-3 w-20 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {prioritizedProjects.map((proj, idx) => {
                  const rank = idx + 1;
                  const isSelected = proj.id === activeProject.id;

                  return (
                    <tr 
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-l-blue-600' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3 px-3 align-middle font-mono">
                        <span className={`font-bold ${rank === 1 ? 'text-rose-600 text-sm' : 'text-slate-700 dark:text-slate-300'}`}>
                          #{String(rank).padStart(2, '0')}
                        </span>
                        <span className="block text-[10px] text-slate-400">{proj.dprCode}</span>
                      </td>

                      <td className="py-3 px-3 align-middle">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{proj.title}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{proj.description}</div>
                      </td>

                      <td className="py-3 px-3 align-middle">
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">Ward {proj.wardId}</span>
                        <span className="text-[10px] text-slate-400">{proj.wardName}</span>
                      </td>

                      <td className="py-3 px-3 align-middle">
                        <div className="font-bold text-slate-900 dark:text-white">₹{proj.outlayCr} Cr</div>
                        <div className="text-[10px] text-emerald-600 font-mono">{proj.fundingSource}</div>
                      </td>

                      <td className="py-3 px-3 align-middle text-center">
                        <span className="text-base font-black text-blue-700 dark:text-blue-400 block">{proj.composite}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          proj.priorityLevel === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {proj.priorityLevel}
                        </span>
                      </td>

                      {/* Stacked MCDA Progress Bar */}
                      <td className="py-3 px-3 align-middle">
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex shadow-inner">
                          <div className="bg-rose-500 h-full" style={{ width: `${proj.percentages.rPct}%` }} title={`Risk: ${proj.percentages.rPct}%`} />
                          <div className="bg-blue-600 h-full" style={{ width: `${proj.percentages.nPct}%` }} title={`Need: ${proj.percentages.nPct}%`} />
                          <div className="bg-teal-500 h-full" style={{ width: `${proj.percentages.sPct}%` }} title={`Plan: ${proj.percentages.sPct}%`} />
                          <div className="bg-emerald-500 h-full" style={{ width: `${proj.percentages.yPct}%` }} title={`Yield: ${proj.percentages.yPct}%`} />
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-slate-400 mt-1">
                          <span>{proj.percentages.rPct}%R</span>
                          <span>{proj.percentages.nPct}%N</span>
                          <span>{proj.percentages.sPct}%S</span>
                          <span>{proj.percentages.yPct}%E</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 align-middle text-center font-mono font-bold text-emerald-600">
                        {proj.bcr}
                      </td>

                      <td className="py-3 px-3 align-middle text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectId(proj.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL: ACTIVE PROJECT EXECUTIVE DOSSIER (5 COLS) */}
        <div className="xl:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                  {activeProject.dprCode}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Ward {activeProject.wardId}: {activeProject.wardName}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 leading-tight">
                {activeProject.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{activeProject.description}</p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-3xl font-black text-blue-700 dark:text-blue-400">{activeProject.composite}</span>
              <span className="block font-mono text-[10px] text-slate-400 uppercase">MCDA SCORE</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Capital Outlay</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">₹{activeProject.outlayCr} Cr</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">{activeProject.fundingSource}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Citizens Protected</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {activeProject.populationBenefited.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 block">Direct beneficiary enclave</span>
            </div>
          </div>

          {/* 5-Axis Radar Breakdown */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-center pb-1">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">MCDA Criteria Balance Radar</span>
            </div>
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={getDossierRadarData(activeProject)}>
                  <PolarGrid stroke="#94a3b8" strokeOpacity={0.4} />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                  <PolarRadiusAxis domain={[0, 100]} stroke="#cbd5e1" strokeOpacity={0.4} fontSize={10} />
                  <Radar
                    name="Candidate Score"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => handleApprove(activeProject.id, activeProject.title)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve for Annual Development Plan (ADP)
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const targetWard = wards.find(w => w.id === activeProject.wardId);
                  if (targetWard) setSelectedWard(targetWard);
                  setActiveTab('smart-map');
                }}
                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Locate on GIS Map
              </button>
              <button
                onClick={() => setActiveTab('budget-optimizer')}
                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Activity className="w-3.5 h-3.5 text-teal-600" /> Simulate Impact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
