'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  IndianRupee, 
  PieChart as PieIcon, 
  Layers, 
  Info, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis,
  AreaChart,
  Area 
} from 'recharts';

export const BudgetOptimizer: React.FC = () => {
  const { totalBudgetOptimizationCr, setTotalBudgetOptimizationCr, setActiveTab } = useCivic();

  // Allocation percentages across 5 departments for the optimal model
  const [allocationShares, setAllocationShares] = useState({
    drainage: 32, // ₹3.2 Cr
    roads: 28,     // ₹2.8 Cr
    water: 22,     // ₹2.2 Cr
    sanitation: 10,// ₹1.0 Cr
    energy: 8,     // ₹0.8 Cr
  });

  const totalPool = totalBudgetOptimizationCr; // In Crores

  const drainageAmt = ((allocationShares.drainage / 100) * totalPool).toFixed(2);
  const roadsAmt = ((allocationShares.roads / 100) * totalPool).toFixed(2);
  const waterAmt = ((allocationShares.water / 100) * totalPool).toFixed(2);
  const sanitationAmt = ((allocationShares.sanitation / 100) * totalPool).toFixed(2);
  const energyAmt = ((allocationShares.energy / 100) * totalPool).toFixed(2);

  // Projected outcomes calculated from pool & shares
  const projectedCitizensServed = Math.round(58420 * Math.min(1.0, (totalPool / 10) * 0.92));
  const avgWdiLift = (12.8 * (totalPool / 10)).toFixed(1);
  const costPerCitizen = Math.round((totalPool * 10000000) / projectedCitizensServed);
  const floodRiskMitigation = Math.min(88, Math.round(74 * (allocationShares.drainage / 32))).toFixed(0);

  const pieData = [
    { name: 'Drainage & Sewerage', value: Number(drainageAmt), color: '#0284c7', pct: allocationShares.drainage },
    { name: 'Roads & Mobility', value: Number(roadsAmt), color: '#2563eb', pct: allocationShares.roads },
    { name: 'Water Supply', value: Number(waterAmt), color: '#0d9488', pct: allocationShares.water },
    { name: 'Sanitation & SWM', value: Number(sanitationAmt), color: '#16a34a', pct: allocationShares.sanitation },
    { name: 'Streetlights & Energy', value: Number(energyAmt), color: '#eab308', pct: allocationShares.energy },
  ];

  // Multi-year forecast projection data
  const forecastData = [
    { year: '2024 (Baseline)', wdi: 64.2, citizens: 34000, grievances: 420 },
    { year: '2025 (Current)', wdi: 68.4, citizens: 41200, grievances: 318 },
    { year: '2026 (Optimized)', wdi: Number((68.4 + Number(avgWdiLift)).toFixed(1)), citizens: projectedCitizensServed, grievances: 180 },
    { year: '2027 (Projected)', wdi: 85.0, citizens: 56000, grievances: 110 },
  ];

  const resetToAiOptimal = () => {
    setTotalBudgetOptimizationCr(10.0);
    setAllocationShares({
      drainage: 32,
      roads: 28,
      water: 22,
      sanitation: 10,
      energy: 8,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <Calculator className="w-3.5 h-3.5" /> Module 2: Budget Optimization Engine
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Capital Outlay & Department Allocation Solver
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Answering the core municipal challenge: <strong className="text-slate-800 dark:text-slate-200">"If the municipality has ₹10 Crore, how should it be distributed for maximum citizen benefit?"</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToAiOptimal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset AI Optimal
          </button>
          <button
            onClick={() => setActiveTab('wow-simulator')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all"
          >
            Open Live Simulator <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Budget Pool Slider */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Available Municipal Capital Fund
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl lg:text-4xl font-black">₹{totalPool.toFixed(2)} Crore</span>
              <span className="text-xs text-blue-200 font-medium">({(totalPool * 100).toFixed(0)} Lakhs)</span>
            </div>
          </div>
          <div className="text-xs text-blue-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur">
            Combines 15th FC Grants + DPDC + Nagarothan Scheme
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-blue-200">
            <span>₹5.0 Cr (Tight Budget)</span>
            <span className="font-bold text-white">Slide to simulate different fund allocations</span>
            <span>₹20.0 Cr (Expanded CapEx)</span>
          </div>
          <input
            type="range"
            min="5.0"
            max="20.0"
            step="0.5"
            value={totalPool}
            onChange={(e) => setTotalBudgetOptimizationCr(Number(e.target.value))}
            className="w-full h-2.5 bg-blue-950/80 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>
      </div>

      {/* Projected Outcomes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Citizens Benefited</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {projectedCitizensServed.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            {Math.round((projectedCitizensServed / 58420) * 100)}% of Kalamb population
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ward Dev Score (WDI) Lift</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            +{avgWdiLift} pts
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            From 68.4 → {(68.4 + Number(avgWdiLift)).toFixed(1)}/100
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cost Per Citizen</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            ₹{costPerCitizen}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Ultra-efficient public ROI
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monsoon Flood Mitigation</div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {floodRiskMitigation}%
          </div>
          <p className="text-[11px] text-emerald-600 mt-0.5">
            Protects Ward 4 & Ward 3 basins
          </p>
        </div>
      </div>

      {/* Main Breakdown: Interactive Pie Chart + Department Allocations Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Allocation Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-blue-600" />
            Optimized Budget Distribution
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            AI-modeled Pareto distribution balancing life-critical drainage against economic connectivity.
          </p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any, name: any) => [`₹${val} Cr (${pieData.find(p => p.name === name)?.pct}%)`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{d.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">{d.pct}%</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{d.value} Cr</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Department Allocation & AI Justification (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            AI Departmental Rationale & Key Interventions
          </h2>

          <div className="space-y-3">
            {/* Drainage */}
            <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-900 dark:text-sky-300">
                  1. Drainage & Flood Prevention (32% • ₹{drainageAmt} Cr)
                </span>
                <span className="text-[11px] font-extrabold text-sky-700 dark:text-sky-400">High Urgency</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Construct Ward 4 Indira Nagar RCC box drain, desilt Ralegaon nullah, and lay Ward 3 underground sewage trunk. Eliminates 74% monsoon waterlogging incidents.
              </p>
            </div>

            {/* Roads */}
            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                  2. Roads & Mobility Corridors (28% • ₹{roadsAmt} Cr)
                </span>
                <span className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400">Economic Spine</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Cement concretization of Main Bazar to Bus Stand, and heavy vehicle overlay on Ward 17 MIDC bypass road. Increases commercial freight speeds by 35%.
              </p>
            </div>

            {/* Water */}
            <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-900 dark:text-teal-300">
                  3. Water Supply & Security (22% • ₹{waterAmt} Cr)
                </span>
                <span className="text-[11px] font-extrabold text-teal-700 dark:text-teal-400">Equity Target</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Feeder line in Ward 11 Sant Tukaram Ward to end summer water tankers, repair Shastri Nagar CI transmission line, and expand SCADA automation to all 5 ESRs.
              </p>
            </div>

            {/* Sanitation & Lighting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  4. Sanitation & Waste (10% • ₹{sanitationAmt} Cr)
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Commissioning 5 TPD MRF sorting shed & trommel screens to maintain ODF++ status.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20">
                <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  5. Smart Lighting (8% • ₹{energyAmt} Cr)
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Complete remaining 400 LED retrofits and install dark-spot high-mast lights in Ward 11.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Year Impact Forecast Chart */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Impact Trajectory Forecast (2024–2027)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Projected civic development score progression and public grievance reduction under optimized spending
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWdi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[50, 100]} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="wdi" stroke="#10b981" fillOpacity={1} fill="url(#colorWdi)" name="Ward Dev Index (WDI)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
