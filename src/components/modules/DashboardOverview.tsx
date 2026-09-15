'use client';

import React from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  IndianRupee, 
  Layers, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertOctagon, 
  Building, 
  Users, 
  ChevronRight,
  ShieldAlert,
  Sliders,
  MapPin,
  HeartPulse,
  Activity,
  Award,
  Smile,
  ShieldCheck,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const DashboardOverview: React.FC = () => {
  const { 
    currentCity, 
    stats, 
    wards, 
    projects, 
    risks, 
    departmentBudgets, 
    aiRecommendations, 
    setActiveTab, 
    setSelectedProject,
    setIsCityModalOpen
  } = useCivic();

  const criticalRisks = risks.filter(r => r.severity === 'Critical');
  const delayedProjects = projects.filter(p => p.status === 'Delayed');
  const inProgressProjects = projects.filter(p => p.status === 'In Progress');

  // Chart data for department budget allocations vs spent
  const deptChartData = departmentBudgets.map(d => ({
    name: d.department.split('&')[0].trim(),
    Allocated: d.allocatedLakhs,
    Spent: d.spentLakhs,
  }));

  const sortedWards = [...wards].sort((a, b) => b.compositeScore - a.compositeScore);
  const bestWard = sortedWards[0] || wards[0];
  const weakestWard = sortedWards[sortedWards.length - 1] || wards[0];

  return (
    <div className="space-y-6">
      {/* Top Banner: Dynamic City Intelligence Brief */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 p-6 lg:p-8 text-white shadow-xl border border-blue-900/60">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                City Intelligence Profile • {currentCity.state}
              </span>
              <button
                onClick={() => setIsCityModalOpen(true)}
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                Change Location / City ⇄
              </button>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              {currentCity.cityName} {currentCity.ulbType}
              <span className="text-base font-normal text-slate-400 ml-2">
                ({currentCity.district}, {currentCity.state})
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Population: <strong>{currentCity.totalPopulation.toLocaleString('en-IN')}</strong> | Area: <strong>{currentCity.areaSqKm} sq km</strong> | Total Wards: <strong>{currentCity.totalWards}</strong> | FY Capital Outlay: <strong>₹{currentCity.totalBudgetCr.toFixed(2)} Cr</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('wow-build-next')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              What Should We Build Next?
            </button>
            <button
              onClick={() => setActiveTab('smart-map')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur transition-all"
            >
              <MapPin className="w-4 h-4" />
              GIS Risk Map
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 5 CORE DASHBOARD SCORES (Requested by User) */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            Core Urban Performance & Health Indicators
          </h2>
          <span className="text-[11px] text-slate-500">Benchmark Scale: 0 to 100</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* 1. City Health Score */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">City Health Score</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <HeartPulse className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl lg:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {currentCity.cityHealthScore}
              </span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${currentCity.cityHealthScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-500">Water, air & sanitation index</p>
          </div>

          {/* 2. Development Score */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 cursor-pointer hover:border-blue-400 transition-colors"
               onClick={() => setActiveTab('ward-index')}>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Development Score</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl lg:text-3xl font-black text-blue-600 dark:text-blue-400">
                {currentCity.developmentScore}
              </span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${currentCity.developmentScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-500">Composite WDI average</p>
          </div>

          {/* 3. Budget Efficiency Score */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 cursor-pointer hover:border-indigo-400 transition-colors"
               onClick={() => setActiveTab('budget-optimizer')}>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Budget Efficiency</span>
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl lg:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                {currentCity.budgetEfficiencyScore}
              </span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${currentCity.budgetEfficiencyScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-500">CapEx spend vs milestone pace</p>
          </div>

          {/* 4. Infrastructure Risk Score */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 cursor-pointer hover:border-red-400 transition-colors"
               onClick={() => setActiveTab('risk-prediction')}>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Infrastructure Risk</span>
              <div className="p-1.5 rounded-lg bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl lg:text-3xl font-black ${
                currentCity.infrastructureRiskScore > 70 ? 'text-red-600 dark:text-red-400' : 'text-amber-600'
              }`}>
                {currentCity.infrastructureRiskScore}
              </span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  currentCity.infrastructureRiskScore > 70 ? 'bg-red-600' : 'bg-amber-500'
                }`} 
                style={{ width: `${currentCity.infrastructureRiskScore}%` }} 
              />
            </div>
            <p className="text-[10px] text-slate-500">{criticalRisks.length} critical failure alerts</p>
          </div>

          {/* 5. Citizen Satisfaction Score */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Citizen Satisfaction</span>
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                <Smile className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl lg:text-3xl font-black text-teal-600 dark:text-teal-400">
                {currentCity.citizenSatisfactionScore}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${currentCity.citizenSatisfactionScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-500">Grievance resolution metric</p>
          </div>
        </div>
      </div>

      {/* AUTOMATIC LOCATION ANALYSIS SECTION (Requested by User) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Automated Location Analysis Report
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Diagnostic Synthesis for {currentCity.cityName} ({currentCity.ulbType})
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
            Real-Time Analysis Generated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* 1. Current Problems */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <span className="font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5 uppercase text-[11px]">
              <AlertCircleIcon className="w-4 h-4 text-red-600" />
              1. Current Problems Detected
            </span>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              {currentCity.currentProblems.map((p, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. High-Risk Areas */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase text-[11px]">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              2. High-Risk Vulnerability Areas
            </span>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              {currentCity.highRiskAreas.map((a, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Infrastructure Gaps */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <span className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5 uppercase text-[11px]">
              <Layers className="w-4 h-4 text-blue-600" />
              3. Critical Infrastructure Gaps
            </span>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              {currentCity.infrastructureGaps.map((g, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Budget Recommendations & 5. Top Priorities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Budget Recommendations (5 cols) */}
          <div className="lg:col-span-5 p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 dark:text-blue-300 uppercase text-[11px] flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-blue-600" />
                4. AI Recommended Budget Distribution
              </span>
              <span className="font-mono font-bold text-blue-700">₹{currentCity.totalBudgetCr.toFixed(2)} Cr Outlay</span>
            </div>

            <div className="space-y-2">
              {currentCity.budgetRecommendations.map((b) => (
                <div key={b.department} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{b.department}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {b.percentage}% (₹{b.amountCr} Cr)
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${b.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('budget-optimizer')}
              className="w-full py-2 text-xs font-bold rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-sm mt-2"
            >
              Simulate Alternative Allocations →
            </button>
          </div>

          {/* Top Development Priorities (7 cols) */}
          <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white uppercase text-[11px] flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                5. Top Ranked Development Priorities for {currentCity.cityName}
              </span>
              <button
                onClick={() => setActiveTab('priority-engine')}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                MCDA Engine →
              </button>
            </div>

            <div className="space-y-1.5">
              {currentCity.topDevelopmentPriorities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate max-w-md">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 shrink-0">
                    High ROI
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
