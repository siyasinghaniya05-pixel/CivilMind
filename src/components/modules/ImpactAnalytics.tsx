'use client';

import React from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  BarChart3, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Award, 
  HeartHandshake,
  PieChart as PieIcon,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend,
  AreaChart,
  Area 
} from 'recharts';

export const ImpactAnalytics: React.FC = () => {
  const { stats, projects, wards } = useCivic();

  // Aggregate stats
  const totalBeneficiaries = projects.reduce((acc, p) => acc + p.populationBenefited, 0);
  const totalSpentLakhs = projects.reduce((acc, p) => acc + p.spentLakhs, 0);
  const avgCostPerCitizen = Math.round((totalSpentLakhs * 100000) / (totalBeneficiaries || 1));
  const avgRiskMitigation = Math.round(
    projects.reduce((acc, p) => acc + p.riskReductionPercentage, 0) / (projects.length || 1)
  );

  // Sector ROI Data
  const sectorRoiData = [
    { sector: 'Drainage', costPerPerson: 420, benefitIndex: 94, riskDrop: 74 },
    { sector: 'Roads', costPerPerson: 510, benefitIndex: 88, riskDrop: 64 },
    { sector: 'Water', costPerPerson: 380, benefitIndex: 91, riskDrop: 70 },
    { sector: 'Sanitation', costPerPerson: 160, benefitIndex: 86, riskDrop: 75 },
    { sector: 'Lighting', costPerPerson: 95, benefitIndex: 80, riskDrop: 65 },
  ];

  // Disparity Reduction Data (Before vs After CapEx WDI)
  const disparityData = [
    { ward: 'Ward 4 (Indira)', before: 49.6, after: 78.4 },
    { ward: 'Ward 3 (Ambedkar)', before: 52.8, after: 80.2 },
    { ward: 'Ward 11 (Tukaram)', before: 57.3, after: 79.5 },
    { ward: 'Ward 17 (Vasant)', before: 59.8, after: 81.0 },
    { ward: 'Ward 1 (Shivaji)', before: 78.5, after: 89.0 },
    { ward: 'Ward 2 (Tilak)', before: 84.2, after: 92.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Module 8: Development Impact Analytics
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Macro Municipal Impact & Citizen Welfare Metrics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Validating the core value proposition: <em>"Making every rupee of public money create maximum public impact."</em>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            Public Funds Efficiency: 94.6%
          </div>
        </div>
      </div>

      {/* 4 Core Pillars from Prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Population Benefited */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Population Benefited</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalPopulation.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% saturation across all 17 wards</span>
          </div>
        </div>

        {/* 2. Cost Per Citizen */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Cost Per Citizen</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{avgCostPerCitizen}
          </p>
          <p className="text-xs text-slate-500">
            Vs state ULB benchmark of ₹1,420
          </p>
        </div>

        {/* 3. Risk Reduction */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Risk Reduction</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {avgRiskMitigation}%
          </p>
          <p className="text-xs text-slate-500">
            Monsoon flooding & sanitation risks curtailed
          </p>
        </div>

        {/* 4. Development Score Improvement */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">WDI Improvement</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">
            +14.8 pts
          </p>
          <p className="text-xs text-emerald-600 font-semibold">
            Disparity Gini coefficient fell by 38%
          </p>
        </div>
      </div>

      {/* Deep Dive Charts: Disparity Reduction & Cost-Per-Citizen ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Disparity Reduction Bar Chart (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ward Development Lift (Pre vs Post CapEx Optimization)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notice the massive catch-up gains in previously neglected Wards 4, 3, and 11
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disparityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="ward" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="before" fill="#94a3b8" name="Baseline Score" radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" fill="#10b981" name="Post-Intervention Score" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Cost Effectiveness (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Public ROI by Sector
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unit cost per citizen benefited vs disaster mitigation rate
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {sectorRoiData.map((item) => (
              <div
                key={item.sector}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{item.sector}</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">₹{item.costPerPerson} / citizen</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Benefit Index: <strong className="text-emerald-600">{item.benefitIndex}/100</strong></span>
                  <span>Risk Abatement: <strong className="text-slate-800 dark:text-slate-200">{item.riskDrop}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
