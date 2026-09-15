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
  Printer,
  Compass,
  Milestone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AnnualDevelopmentPlan: React.FC = () => {
  const { currentCity, setActiveTab } = useCivic();

  const [planHorizon, setPlanHorizon] = useState<'1yr' | '3yr' | '5yr'>('1yr');
  const [isExported, setIsExported] = useState(false);

  // 1-Year Plan (4 Quarters)
  const oneYearPlan = [
    {
      quarter: 'Q1 (April – June 2026)',
      theme: 'Pre-Monsoon Flood Defense & Drainage Desilting',
      budgetCr: Number((currentCity.totalBudgetCr * 0.28).toFixed(2)),
      milestones: [
        `Complete mechanized desilting of roadside stormwater nullahs across all ${currentCity.totalWards} wards`,
        'Commence high-priority low-lying basin RCC box drain excavation',
        'Deploy emergency diesel dewatering pumps at critical flood spots',
        'Clear silt bottlenecks at major highway culvert inlets',
      ],
      primaryDept: 'Drainage & Sewerage',
      status: 'In Progress (82% done)',
    },
    {
      quarter: 'Q2 (July – September 2026)',
      theme: 'Monsoon Hazard Response & Pothole Mitigation',
      budgetCr: Number((currentCity.totalBudgetCr * 0.16).toFixed(2)),
      milestones: [
        'Deploy 24x7 municipal emergency disaster response team',
        'Acoustic clamp reinforcement on stressed CI drinking water transmission lines',
        'Weekly chlorinated water quality testing across all municipal wards',
        'Rapid cold-mix pothole patchwork along arterial bus routes',
      ],
      primaryDept: 'Water Supply & Disaster Mgmt',
      status: 'Scheduled',
    },
    {
      quarter: 'Q3 (October – December 2026)',
      theme: 'Post-Monsoon Road Concretization & Pipeline Expansion',
      budgetCr: Number((currentCity.totalBudgetCr * 0.42).toFixed(2)),
      milestones: [
        'M35 grade CC road paving on main market commercial freight corridor',
        'Suburban bypass resurfacing and collapsed culvert reconstruction',
        'Lay underground sewage collector pipes in lowest WDI wards',
        'Extend DI feeder pipelines to eliminate tail-end water shortages',
      ],
      primaryDept: 'Roads & Transport',
      status: 'Tendering Stage',
    },
    {
      quarter: 'Q4 (January – March 2027)',
      theme: 'Smart Amenities, Solid Waste MRF & Energy Retrofit',
      budgetCr: Number((currentCity.totalBudgetCr * 0.14).toFixed(2)),
      milestones: [
        'Operationalize 5 TPD Solid Waste Material Recovery Facility (MRF)',
        'Retrofit remaining sodium vapor streetlights with smart CCMS LED fittings',
        'Inaugurate public botanical park and open-air gymnasium',
        '15th Finance Commission Utilization Certificate submission to District Collectorate',
      ],
      primaryDept: 'Sanitation, Energy & Parks',
      status: 'Planned',
    },
  ];

  // 3-Year Medium-Term Infrastructure Strategy (2026-2029)
  const threeYearPlan = [
    {
      year: 'Year 1 (FY 2026-27)',
      focus: 'Life-Safety & Disaster Resilience Core',
      budgetCr: Number(currentCity.totalBudgetCr.toFixed(2)),
      deliverables: [
        '100% elimination of chronic monsoon inundation in vulnerable wards',
        'Transition from asphalt to durable M35 CC roads on 8 km arterial network',
        'Achieve Swachh Survekshan ODF++ certification with MRF facility',
      ]
    },
    {
      year: 'Year 2 (FY 2027-28)',
      focus: 'Water Security & Universal Sewerage Network',
      budgetCr: Number((currentCity.totalBudgetCr * 1.15).toFixed(2)),
      deliverables: [
        'Underground sewerage network coverage expanded to 80% of households',
        'Construct new 10 MLD automated Water Treatment Plant & 3 ESR reservoirs',
        '24x7 smart water metering pilot for commercial and bulk consumers',
      ]
    },
    {
      year: 'Year 3 (FY 2028-29)',
      focus: 'Economic Mobility, Transit Terminals & Solarization',
      budgetCr: Number((currentCity.totalBudgetCr * 1.3).toFixed(2)),
      deliverables: [
        'Integrated Truck Terminus & Multimodal Logistic Logistics Park',
        '100% solarization of municipal water pumping stations and streetlights',
        'Urban riverfront / nullah bio-remediation green promenade',
      ]
    }
  ];

  // 5-Year Vision 2031 Master Plan
  const fiveYearPlan = [
    {
      pillar: 'Pillar 1: 100% Climate Resilient City',
      target: 'Zero flood inundation, 40% increased urban green tree canopy, stormwater percolation aquifers.',
      capex: `₹${(currentCity.totalBudgetCr * 1.8).toFixed(1)} Cr`
    },
    {
      pillar: 'Pillar 2: Circular Waste & Net-Zero Pumping',
      target: '100% waste segregation at source, zero-landfill composting, captive solar power for all ESR pumps.',
      capex: `₹${(currentCity.totalBudgetCr * 1.2).toFixed(1)} Cr`
    },
    {
      pillar: 'Pillar 3: Equitable Ward Development Index (>88/100)',
      target: 'Zero disparity between central and peripheral wards. 100% paved roads and piped drinking water.',
      capex: `₹${(currentCity.totalBudgetCr * 2.1).toFixed(1)} Cr`
    },
    {
      pillar: 'Pillar 4: Municipal Financial Self-Reliance',
      target: 'Credit rating upgrade to Investment Grade (A-), municipal green bond issuance, 95% property tax collection.',
      capex: `₹${(currentCity.totalBudgetCr * 0.9).toFixed(1)} Cr`
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
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-2">
            <CalendarRange className="w-3.5 h-3.5" /> Module 7 / WOW Feature #5: Annual Development Plan Agent
          </div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight">
            Multi-Horizon Capital Investment Roadmap: {currentCity.cityName}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Automatically synthesizes a 1-Year Tactical Plan, 3-Year Medium-Term Strategy, and 5-Year Master Vision aligned with 15th Finance Commission guidelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            {isExported ? 'Plan Exported to Council' : 'Export Official Master Plan'}
          </button>
        </div>
      </div>

      {/* Plan Horizon Switcher (1 Year / 3 Year / 5 Year) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
        <button
          onClick={() => setPlanHorizon('1yr')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            planHorizon === '1yr'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          1-Year Tactical Plan
        </button>
        <button
          onClick={() => setPlanHorizon('3yr')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            planHorizon === '3yr'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          3-Year Strategy
        </button>
        <button
          onClick={() => setPlanHorizon('5yr')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            planHorizon === '5yr'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          5-Year Master Vision
        </button>
      </div>

      {/* HORIZON 1: 1-YEAR PLAN */}
      {planHorizon === '1yr' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">1-Year Capital Budget</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">₹{currentCity.totalBudgetCr.toFixed(2)} Cr</p>
              <p className="text-[11px] text-emerald-600 font-medium">100% matched with tied/untied funds</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Scheduled Works</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">16 Works</p>
              <p className="text-[11px] text-slate-500">Across {currentCity.totalWards} wards</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Target WDI Uplift</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {(currentCity.developmentScore + 12.5).toFixed(1)} / 100
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">+12.5 pts projected lift</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">General Body Status</span>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">Approved</p>
              <p className="text-[11px] text-slate-500">Resolution Ready</p>
            </div>
          </div>

          <div className="space-y-4">
            {oneYearPlan.map((q, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
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
                        ₹{q.budgetCr} Cr
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      {q.status}
                    </span>
                  </div>
                </div>

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
        </div>
      )}

      {/* HORIZON 2: 3-YEAR MEDIUM-TERM STRATEGY */}
      {planHorizon === '3yr' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 text-xs space-y-1">
            <span className="font-bold text-indigo-950 dark:text-indigo-200 block text-sm">
              3-Year Medium-Term Infrastructure Strategy (2026–2029)
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Coordinated capital program scaling from emergency flood prevention to universal piped water and freight bypass rings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {threeYearPlan.map((yr) => (
              <div
                key={yr.year}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-bold text-xs text-blue-700 dark:text-blue-400">{yr.year}</span>
                  <span className="font-black text-sm text-slate-900 dark:text-white">₹{yr.budgetCr} Cr</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{yr.focus}</h4>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  {yr.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HORIZON 3: 5-YEAR MASTER VISION 2031 */}
      {planHorizon === '5yr' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-1">
            <span className="font-bold text-emerald-950 dark:text-emerald-200 block text-sm">
              5-Year Master Vision 2031: Sustainable & Climate-Resilient {currentCity.cityName}
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              Long-range urban transformation blueprint targeting zero carbon footprint, zero landfill, and universal equity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fiveYearPlan.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{p.pillar}</h4>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{p.capex}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.target}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Council Action Bar */}
      <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200">
            Adopted by General Body of {currentCity.cityName} {currentCity.ulbType}
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
            Formatted for submission to District Planning Committee (DPDC) and State Urban Development Directorate.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('report-generator')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4" />
          Print Council Resolution (ठराव)
        </button>
      </div>
    </div>
  );
};
