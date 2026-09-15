'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  CalendarRange, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Layers, 
  IndianRupee, 
  ShieldCheck, 
  Calendar,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AnnualDevelopmentPlan: React.FC = () => {
  const { stats, projects, departmentBudgets, setActiveTab } = useCivic();

  const [isExported, setIsExported] = useState(false);

  const quarters = [
    {
      quarter: 'Q1 (April – June 2026)',
      theme: 'Pre-Monsoon Flood Defense & Drainage Desilting',
      budgetCr: 2.80,
      milestones: [
        'Complete mechanized desilting of 14.2 km stormwater roadside gutters',
        'Commence Ward 4 Indira Nagar RCC box drain excavation',
        'Procure 3 high-capacity diesel dewatering pumps for flood spots',
        'Clean all culvert inlets crossing Ralegaon bypass road',
      ],
      primaryDept: 'Drainage & Sewerage',
      status: 'In Progress (82% done)',
    },
    {
      quarter: 'Q2 (July – September 2026)',
      theme: 'Monsoon Hazard Response & Water Quality Testing',
      budgetCr: 1.60,
      milestones: [
        'Deploy 24x7 municipal monsoon flood emergency response squad',
        'Reinforce Ward 9 Cast Iron water main with acoustic clamp',
        'Bi-weekly chlorinated drinking water sampling across 17 wards',
        'Emergency cold-mix pothole repair on arterial bus corridors',
      ],
      primaryDept: 'Water Supply & Disaster Mgmt',
      status: 'Scheduled',
    },
    {
      quarter: 'Q3 (October – December 2026)',
      theme: 'Post-Monsoon Road Concretization & Infrastructure Overhaul',
      budgetCr: 4.50,
      milestones: [
        'M35 grade CC paving on Main Bazar to Bus Stand corridor (1.4 km)',
        'Resurfacing and culvert reconstruction on Ward 17 MIDC bypass road',
        'Lay 1.6 km HDPE underground sewage lines in Ward 3 Ambedkar Nagar',
        'Commission 200mm DI K9 feeder pipeline in Ward 11 Sant Tukaram Ward',
      ],
      primaryDept: 'Roads & Transport',
      status: 'Tendering Stage',
    },
    {
      quarter: 'Q4 (January – March 2027)',
      theme: 'Smart Cities Amenities, Sanitation & Energy Efficiency',
      budgetCr: 1.10,
      milestones: [
        'Operationalize 5 TPD Solid Waste Material Recovery Facility (MRF)',
        'Retrofit remaining 400 LED streetlights with CCMS telemetry panels',
        'Inaugurate Chhatrapati Sambhaji Maharaj Park and open gymnasium',
        'Financial audit and 15th FC Utilization Certificate submission to Collectorate',
      ],
      primaryDept: 'Sanitation, Energy & Parks',
      status: 'Planned',
    },
  ];

  const handleExport = () => {
    setIsExported(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-2">
            <CalendarRange className="w-3.5 h-3.5" /> WOW Feature #5: Annual Development Plan (ADP) Generator
          </div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight">
            Comprehensive 4-Quarter Municipal Development Roadmap (FY 2026-27)
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Automatically organized into four execution quarters aligned with monsoons, agricultural seasons, and statutory grant utilization milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            {isExported ? 'Plan Exported to Council' : 'Export Master ADP'}
          </button>
        </div>
      </div>

      {/* Plan Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">Total Planned Outlay</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">₹10.00 Cr</p>
          <p className="text-[11px] text-emerald-600 font-medium">100% statutory fund matching</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">Scheduled Projects</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">16 Works</p>
          <p className="text-[11px] text-slate-500">Across all 17 municipal wards</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">Projected WDI Index</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">81.2 / 100</p>
          <p className="text-[11px] text-emerald-600 font-medium">+12.8 points uplift</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold">Council Sanction Status</span>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">Ready</p>
          <p className="text-[11px] text-slate-500">General Body Resolution Ready</p>
        </div>
      </div>

      {/* 4 Quarters Execution Roadmap */}
      <div className="space-y-4">
        {quarters.map((q, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500/80 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-700 text-white">
                    {q.quarter.split(' ')[0]}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {q.quarter.split('(')[1]?.replace(')', '')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {q.primaryDept}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {q.theme}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Quarterly Outlay</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    ₹{q.budgetCr.toFixed(2)} Cr
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {q.status}
                </span>
              </div>
            </div>

            {/* Milestones List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.milestones.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Council Table Resolution Actions */}
      <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200">
            Ready to Table Before Kalamb Nagar Parishad General Body
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
            Complies with Maharashtra Municipal Councils, Nagar Panchayats and Industrial Townships Act, 1965.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('report-generator')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4" />
          Print Statutory Agenda Note
        </button>
      </div>
    </div>
  );
};
