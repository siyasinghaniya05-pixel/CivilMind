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
  MapPin
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
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

export const DashboardOverview: React.FC = () => {
  const { stats, wards, projects, risks, departmentBudgets, aiRecommendations, setActiveTab, setSelectedProject } = useCivic();

  const criticalRisks = risks.filter(r => r.severity === 'Critical');
  const delayedProjects = projects.filter(p => p.status === 'Delayed');
  const inProgressProjects = projects.filter(p => p.status === 'In Progress');

  // Chart data for department budget allocations vs spent
  const deptChartData = departmentBudgets.map(d => ({
    name: d.department.split('&')[0].trim(),
    Allocated: d.allocatedLakhs,
    Spent: d.spentLakhs,
  }));

  // Top 5 and bottom 3 wards for comparison
  const sortedWards = [...wards].sort((a, b) => b.compositeScore - a.compositeScore);
  const bestWard = sortedWards[0];
  const weakestWard = sortedWards[sortedWards.length - 1];

  const wardBarData = sortedWards.slice(0, 8).map(w => ({
    name: `W-${w.number}`,
    score: w.compositeScore,
    fullName: w.name,
  }));

  const COLORS = ['#2563eb', '#0284c7', '#0d9488', '#16a34a', '#eab308', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Top Banner: Local Government Context & AI Summary */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              CivicMind AI Intelligence Brief • FY 2026-27
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              {stats.cityName} Nagar Parishad Executive Overview
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Data-driven capital expenditure, infrastructure risk mitigation, and citizen impact intelligence across all {stats.totalWards} municipal wards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('wow-build-next')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-xs shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              What Should We Build Next?
            </button>
            <button
              onClick={() => setActiveTab('wow-simulator')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur transition-all"
            >
              <Sliders className="w-4 h-4" />
              Budget Simulator
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 6 Key Executive Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        {/* Total Budget */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Budget</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            ₹{stats.totalBudgetCr.toFixed(2)} Cr
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <span>₹{stats.spentBudgetCr.toFixed(2)} Cr spent ({Math.round((stats.spentBudgetCr / stats.totalBudgetCr) * 100)}%)</span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Projects</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            {stats.activeProjectsCount}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span>{inProgressProjects.length} executing • {delayedProjects.length} delayed</span>
          </div>
        </div>

        {/* High-Risk Zones */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-red-300 transition-colors"
             onClick={() => setActiveTab('risk-prediction')}>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">High-Risk Zones</span>
            <div className="p-1.5 rounded-lg bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-red-600 dark:text-red-400">
            {stats.highRiskZonesCount} Wards
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-red-600 font-medium">
            <span>{criticalRisks.length} critical alerts</span>
          </div>
        </div>

        {/* Ward Dev Score (WDI) */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
             onClick={() => setActiveTab('ward-index')}>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Avg Ward WDI</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            {stats.averageWdiScore}
            <span className="text-xs font-normal text-slate-500">/100</span>
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <span>+4.2 pts vs last FY</span>
          </div>
        </div>

        {/* Pending Grievances / Issues */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Pending Issues</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">
            {stats.pendingIssuesCount}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span>{stats.resolvedGrievancesLastMonth} resolved this mo.</span>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-emerald-300 transition-colors"
             onClick={() => setActiveTab('ai-recommendations')}>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">AI Proposals</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {aiRecommendations.length} Ready
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-teal-600 font-medium">
            <span>₹3.69 Cr optimized</span>
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner (if any) */}
      {criticalRisks.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-300 shrink-0">
              <AlertOctagon className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-red-800 dark:text-red-200 uppercase tracking-wider">
                Urgent Municipal Infrastructure Warning
              </p>
              <p className="text-xs text-red-700 dark:text-red-300">
                {criticalRisks[0].title} in {criticalRisks[0].wardName}. Probability: {criticalRisks[0].probabilityPercentage}% failure in {criticalRisks[0].predictedFailureDays} days.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('risk-prediction')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shrink-0 shadow-sm"
          >
            Review Remediation Plan
          </button>
        </div>
      )}

      {/* Middle Grid: Department Spend & Ward Development Index Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Department Budget Allocation & Spend (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Departmental Budget Allocation vs Spent (₹ Lakhs)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Expenditure pace across major civic infrastructure sectors
              </p>
            </div>
            <button
              onClick={() => setActiveTab('budget-optimizer')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1"
            >
              Optimize Funds <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '8px', 
                    color: '#fff', 
                    fontSize: '12px',
                    border: 'none' 
                  }}
                  formatter={(value: any) => [`₹${value} Lakhs`, '']}
                />
                <Bar dataKey="Allocated" fill="#93c5fd" radius={[4, 4, 0, 0]} name="Allocated (₹L)" />
                <Bar dataKey="Spent" fill="#1d4ed8" radius={[4, 4, 0, 0]} name="Actual Spent (₹L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Committed Funds</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">₹2.77 Cr</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Unspent Balance</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">₹2.65 Cr</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">15th FC Tied Compliance</p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">84.2%</p>
            </div>
          </div>
        </div>

        {/* Right Column: Ward Development Index Highlights (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Ward Development Index (WDI)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                0-100 composite score based on 6 core municipal parameters
              </p>
            </div>
            <button
              onClick={() => setActiveTab('ward-index')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1"
            >
              All 17 Wards <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weakest vs Best Spotlight Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Best Ward */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                  Top Ward (Rank 1)
                </span>
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">
                  {bestWard.compositeScore}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Ward {bestWard.number}: {bestWard.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                Counselor: {bestWard.counselor.split(' ')[1]}
              </p>
            </div>

            {/* Weakest Ward */}
            <div className="p-3.5 rounded-xl bg-red-50/60 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-red-700 dark:text-red-300 uppercase">
                  Weakest (Rank 17)
                </span>
                <span className="text-xs font-black text-red-700 dark:text-red-400">
                  {weakestWard.compositeScore}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Ward {weakestWard.number}: {weakestWard.name}
              </p>
              <p className="text-[10px] text-red-600 dark:text-red-400 mt-1 font-medium">
                Needs Immediate Drainage & Roads
              </p>
            </div>
          </div>

          {/* Mini Bar Comparison */}
          <div className="space-y-2 pt-1">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Top 5 vs Bottom 3 Ward Score Spread:
            </p>
            <div className="space-y-1.5">
              {[bestWard, sortedWards[1], sortedWards[2], sortedWards[sortedWards.length - 2], weakestWard].map((w) => (
                <div key={w.id} className="flex items-center gap-2 text-xs">
                  <span className="w-16 truncate font-medium text-slate-600 dark:text-slate-400">
                    W-{w.number} {w.name.split(' ')[0]}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        w.compositeScore >= 75 ? 'bg-emerald-500' :
                        w.compositeScore >= 60 ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${w.compositeScore}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                    {w.compositeScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top AI Recommendations & Priority Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Project Recommendations Engine Preview (6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Top AI Project Recommendations
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('ai-recommendations')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {aiRecommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                        Rank #{rec.priorityRank}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                        Impact: {rec.impactScore}/100
                      </span>
                      <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                        ₹{rec.recommendedBudgetLakhs} Lakhs
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">
                      {rec.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {rec.justification}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span>Beneficiaries: <strong className="text-slate-800 dark:text-slate-200">{rec.populationBenefited.toLocaleString('en-IN')}</strong></span>
                  <span>Risk Abatement: <strong className="text-emerald-600">{rec.floodOrRiskReduction}%</strong></span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{rec.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Priority Works & Monitoring Status (6 cols) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Active Priority Projects Monitoring
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('project-monitoring')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1"
            >
              Full Tracker <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  setSelectedProject(proj);
                  setActiveTab('project-monitoring');
                }}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[280px]">
                    {proj.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' :
                    proj.status === 'Delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{proj.wardName} • ₹{proj.budgetLakhs} Lakhs</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{proj.completionPercentage}%</span>
                </div>

                <div className="mt-1.5 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      proj.status === 'Completed' ? 'bg-emerald-500' :
                      proj.status === 'Delayed' ? 'bg-red-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${proj.completionPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-blue-900 dark:text-blue-200 font-medium">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Explore all works geo-tagged on GIS Smart City Map</span>
            </div>
            <button
              onClick={() => setActiveTab('smart-map')}
              className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1 hover:underline"
            >
              Open Map <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
