'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { PRE_INDEXED_CITIES } from '@/services/cityIntelligenceEngine';
import { 
  Building2, 
  Globe2, 
  TrendingUp, 
  IndianRupee, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Layers,
  MapPin,
  Building
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export const MultiTenantDashboard: React.FC = () => {
  const { tenantLevel, setTenantLevel, switchCity, setActiveTab } = useCivic();

  const [selectedDistrict, setSelectedDistrict] = useState('Yavatmal');

  // Multi-ULB comparative dataset
  const districtUlbs = [
    { name: 'Yavatmal Municipal Council', class: 'Class A (HQ)', pop: 148900, wdi: 72.8, budgetCr: 38.4, spentPct: 68, highRisks: 3, status: 'Performing' },
    { name: 'Kalamb Nagar Parishad', class: 'Class B', pop: 58420, wdi: 68.4, budgetCr: 12.5, spentPct: 52, highRisks: 4, status: 'Critical Interventions' },
    { name: 'Pandharkawda Nagar Parishad', class: 'Class C', pop: 34200, wdi: 62.0, budgetCr: 10.2, spentPct: 48, highRisks: 5, status: 'Vulnerable' },
    { name: 'Pusad Municipal Council', class: 'Class B', pop: 73500, wdi: 69.2, budgetCr: 16.8, spentPct: 60, highRisks: 3, status: 'Performing' },
    { name: 'Wani Municipal Council', class: 'Class B (Mining)', pop: 62800, wdi: 64.5, budgetCr: 14.2, spentPct: 55, highRisks: 4, status: 'Pollution Hazard' },
    { name: 'Umarkhed Nagar Parishad', class: 'Class C', pop: 47200, wdi: 60.5, budgetCr: 11.4, spentPct: 45, highRisks: 5, status: 'Water Deficit' },
  ];

  // State level comparison
  const stateComparisonData = PRE_INDEXED_CITIES.map(c => ({
    name: c.cityName,
    wdi: c.developmentScore,
    risk: c.infrastructureRiskScore,
    budget: c.totalBudgetCr,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 mb-2">
            <Globe2 className="w-3.5 h-3.5" /> Multi-Tenant Government Command Level
          </div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight">
            {tenantLevel === 'state' ? 'State Directorate of Municipal Administration' : 'District Collectorate Development Monitoring'}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Aggregated cross-ULB intelligence, capital grant burn rates, and comparative Ward Development Index benchmarking.
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-white/10 border border-white/20 text-xs font-bold">
          <button
            onClick={() => setTenantLevel('municipality')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white"
          >
            Municipality
          </button>
          <button
            onClick={() => setTenantLevel('district')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tenantLevel === 'district' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            District Collectorate
          </button>
          <button
            onClick={() => setTenantLevel('state')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tenantLevel === 'state' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            State Level
          </button>
        </div>
      </div>

      {/* District / State Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">Total Monitored ULBs</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {tenantLevel === 'state' ? '384 ULBs' : '6 Nagar Parishads'}
          </p>
          <p className="text-[11px] text-blue-600 font-medium">100% telemetry synced</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">Total Capital Grants</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {tenantLevel === 'state' ? '₹4,820 Cr' : '₹103.5 Cr'}
          </p>
          <p className="text-[11px] text-slate-500">15th FC + DPDC tied/untied</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">Average District WDI</span>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">66.2 / 100</p>
          <p className="text-[11px] text-emerald-600 font-semibold">+3.8 pts vs FY25</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">High Vulnerability Hotspots</span>
          <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">
            {tenantLevel === 'state' ? '142 Clusters' : '23 Clusters'}
          </p>
          <p className="text-[11px] text-red-600">Monsoon flood & water distress</p>
        </div>
      </div>

      {/* Cross-ULB Performance Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {tenantLevel === 'state' ? 'Pan-Maharashtra Municipal Council Ranking' : 'Yavatmal District Nagar Parishad Benchmark'}
            </h2>
            <p className="text-xs text-slate-500">
              Comparative development scoring, 15th FC grant burn rate, and disaster risk index
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">FY 2026-27 Active Cycle</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 font-bold uppercase text-[10px] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">ULB Name</th>
                <th className="p-3.5">Class</th>
                <th className="p-3.5">Population</th>
                <th className="p-3.5">WDI Score</th>
                <th className="p-3.5">Budget Outlay</th>
                <th className="p-3.5">Burn Rate</th>
                <th className="p-3.5">Risk Areas</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {districtUlbs.map((ulb, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    {ulb.name}
                  </td>
                  <td className="p-3.5">{ulb.class}</td>
                  <td className="p-3.5">{ulb.pop.toLocaleString('en-IN')}</td>
                  <td className="p-3.5">
                    <span className={`font-black ${
                      ulb.wdi >= 70 ? 'text-emerald-600' : ulb.wdi >= 64 ? 'text-blue-600' : 'text-amber-600'
                    }`}>
                      {ulb.wdi}/100
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">₹{ulb.budgetCr} Cr</td>
                  <td className="p-3.5">
                    <span className="font-semibold text-blue-700 dark:text-blue-400">{ulb.spentPct}%</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                      {ulb.highRisks} Hotspots
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        const matchedCity = PRE_INDEXED_CITIES.find(c => ulb.name.toLowerCase().includes(c.cityName.toLowerCase()));
                        if (matchedCity) {
                          switchCity(matchedCity);
                        }
                        setActiveTab('overview');
                      }}
                      className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300"
                    >
                      Audit ULB →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparative Cross-City WDI Bar Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          State-Wide Cross-City Development Score vs Risk Level
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="wdi" fill="#10b981" name="Ward Dev Index (WDI)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="risk" fill="#ef4444" name="Infrastructure Risk" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
