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
  Milestone,
  Sliders,
  RotateCcw,
  Building2,
  Calendar,
  Activity,
  AlertTriangle,
  Compass
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const DynamicLeafletMap = dynamic(
  () => import('./map/LeafletMapInner').then((mod) => mod.LeafletMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-2xl bg-zinc-100 flex flex-col items-center justify-center text-zinc-400 gap-2">
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
    setActiveTab, 
    setIsCityModalOpen,
    setCurrentView
  } = useCivic();

  // Interactive Budget Simulator Input state (Default ₹5 Crore as requested)
  const [simulatorBudgetCr, setSimulatorBudgetCr] = useState<number>(5.0);

  // Dynamic calculations for Budget Simulator based on selected budget
  const budgetAllocation = useMemo(() => {
    return [
      { 
        department: 'Drainage & Flood Defense', 
        percentage: 35, 
        amountCr: Number((simulatorBudgetCr * 0.35).toFixed(2)), 
        color: '#2563eb',
        impact: 'Halts monsoon waterlogging for 18,200 residents'
      },
      { 
        department: 'Roads & Transportation', 
        percentage: 30, 
        amountCr: Number((simulatorBudgetCr * 0.30).toFixed(2)), 
        color: '#0284c7',
        impact: 'Re-surfaces 4.8 km of critical arterial market corridors'
      },
      { 
        department: 'Water Supply & Pipelines', 
        percentage: 20, 
        amountCr: Number((simulatorBudgetCr * 0.20).toFixed(2)), 
        color: '#0d9488',
        impact: 'Stabilizes pressure for elevated residential pockets'
      },
      { 
        department: 'Sanitation & SWM', 
        percentage: 15, 
        amountCr: Number((simulatorBudgetCr * 0.15).toFixed(2)), 
        color: '#10b981',
        impact: 'Expands wet & dry waste segregation trommels'
      }
    ];
  }, [simulatorBudgetCr]);

  // Dynamic AI insights tailored to the city
  const aiInsights = useMemo(() => {
    return [
      {
        id: 1,
        title: 'Ward 4 shows the highest infrastructure risk.',
        detail: `Critical storm drain backflow detected in low-lying basins. Remediation desilting is advised before heavy rainfall.`,
        impact: '12,000 citizens benefited',
        badge: 'High Priority',
        badgeColor: 'bg-red-50 text-red-700 border-red-200/60',
        action: 'View Risk Zone'
      },
      {
        id: 2,
        title: 'Drainage improvements could benefit approximately 12,000 citizens.',
        detail: `Sanctioning ₹1.2 Cr RCC box drain along the primary stormwater outfall halts chronic waterlogging across Ward 4 and Ward 5.`,
        impact: '₹1,000 per beneficiary',
        badge: 'Maximum Impact',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
        action: 'Inspect Drainage Tender'
      },
      {
        id: 3,
        title: 'Road maintenance should be prioritized before the monsoon season.',
        detail: `Pavement Distress Index (PDI) dropped on the main commercial market route. Immediate bitumen sealing prevents heavy transit delays.`,
        impact: '34,000 daily commuters',
        badge: 'Seasonal Window',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        action: 'Review Road Projects'
      }
    ];
  }, [currentCity]);

  // Priority Projects (exact requirements: #1 Drainage Upgrade, #2 Road Rehabilitation, #3 Water Supply Expansion)
  const priorityProjects = [
    {
      rank: '#1',
      title: 'Drainage Upgrade',
      ward: 'Ward 4',
      impactScore: 95,
      cost: '₹1.20 Cr',
      citizens: '12,000 citizens',
      status: 'High Urgency',
      tagColor: 'bg-red-50 text-red-700 border-red-200/60'
    },
    {
      rank: '#2',
      title: 'Road Rehabilitation',
      ward: 'Ward 2',
      impactScore: 89,
      cost: '₹95 Lakhs',
      citizens: '34,000 citizens',
      status: 'Transit Corridor',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200/60'
    },
    {
      rank: '#3',
      title: 'Water Supply Expansion',
      ward: 'Ward 6',
      impactScore: 84,
      cost: '₹65 Lakhs',
      citizens: '12,500 citizens',
      status: 'Pressure Stabilizer',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
    }
  ];

  // Top 3 Development Challenges
  const topChallenges = [
    {
      num: '1',
      title: 'Drainage Issues',
      desc: 'Low-lying sectors and silt choked culverts causing severe storm runoff stagnation during monsoon surges.',
      severity: 'Critical'
    },
    {
      num: '2',
      title: 'Road Deterioration',
      desc: 'High pavement distress and pothole index along heavy freight commercial spines connecting to district highway.',
      severity: 'High'
    },
    {
      num: '3',
      title: 'Water Supply Gaps',
      desc: 'Uneven pressure distribution and aging trunk transmission lines in elevated residential neighborhoods.',
      severity: 'Moderate'
    }
  ];

  if (!currentCity) {
    return (
      <div className="min-h-[55vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-zinc-200/80 shadow-xs max-w-lg mx-auto my-12 space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <MapPin className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-zinc-950">Select Your Municipality</h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md">
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
    <div className="space-y-10 pb-16">
      {/* 1. HEADER SECTION & AI WELCOME MESSAGE */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Selected Location</span>
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950">
                {currentCity.cityName}, {currentCity.state}
              </h1>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                {currentCity.ulbType}
              </span>
            </div>

            {/* AI Welcome Message requested by user */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-700 leading-relaxed max-w-2xl flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p>
                <strong className="text-zinc-950">Welcome to CivicMind AI.</strong> Based on <strong className="text-blue-600">{currentCity.cityName}</strong>'s infrastructure profile, we have identified the following development priorities.
              </p>
            </div>
          </div>

          {/* City Change Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('location-setup')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Switch City</span>
            </button>
          </div>
        </div>

        {/* 4 Core Metric Cards (Development Score, Infrastructure Health, Budget Efficiency, Risk Score) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* 1. City Development Score */}
          <div className="modern-card p-5 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                City Development Score
              </span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-zinc-950">{currentCity.developmentScore}</span>
              <span className="text-xs text-zinc-400">/100</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${currentCity.developmentScore}%` }} />
            </div>
            <p className="text-xs text-zinc-500">+4.2% lift vs last quarter</p>
          </div>

          {/* 2. Infrastructure Health Score */}
          <div className="modern-card p-5 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Infrastructure Health Score
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-zinc-950">{currentCity.cityHealthScore}</span>
              <span className="text-xs text-zinc-400">/100</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${currentCity.cityHealthScore}%` }} />
            </div>
            <p className="text-xs text-emerald-600 font-medium">Stable civic assets</p>
          </div>

          {/* 3. Budget Efficiency Score */}
          <div className="modern-card p-5 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Budget Efficiency Score
              </span>
              <IndianRupee className="w-4 h-4 text-zinc-700" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-zinc-950">{currentCity.budgetEfficiencyScore}%</span>
              <span className="text-xs text-emerald-600 font-semibold">Optimal</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-900 rounded-full" style={{ width: `${currentCity.budgetEfficiencyScore}%` }} />
            </div>
            <p className="text-xs text-zinc-500">₹{currentCity.totalBudgetCr.toFixed(1)} Cr total budget</p>
          </div>

          {/* 4. Risk Score */}
          <div className="modern-card p-5 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Risk Score
              </span>
              <ShieldAlert className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-red-600">{currentCity.infrastructureRiskScore}%</span>
              <span className="text-xs text-zinc-400 font-medium">Hazard Index</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: `${currentCity.infrastructureRiskScore}%` }} />
            </div>
            <p className="text-xs text-zinc-500">3 areas flagged for maintenance</p>
          </div>
        </div>
      </section>

      {/* 2. CITY OVERVIEW SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-zinc-700" />
            <h2 className="text-base font-bold text-zinc-950">
              City Overview & Profile
            </h2>
          </div>
          <span className="text-xs text-zinc-400">District: {currentCity.district}</span>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
            <span className="text-[11px] text-zinc-400 block font-medium uppercase">Population</span>
            <span className="text-xl font-extrabold text-zinc-950">
              {currentCity.totalPopulation.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
            <span className="text-[11px] text-zinc-400 block font-medium uppercase">Total Area</span>
            <span className="text-xl font-extrabold text-zinc-950">
              {currentCity.areaSqKm} sq. km
            </span>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
            <span className="text-[11px] text-zinc-400 block font-medium uppercase">Number of Wards</span>
            <span className="text-xl font-extrabold text-zinc-950">
              {currentCity.totalWards} Wards
            </span>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
            <span className="text-[11px] text-zinc-400 block font-medium uppercase">Infrastructure Summary</span>
            <span className="text-xs font-semibold text-zinc-900 mt-1 block">
              18.4 km Roads • 12 WTP Tanks • 920 LEDs
            </span>
          </div>
        </div>

        {/* Top 3 Development Challenges */}
        <div className="modern-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Top 3 Development Challenges for {currentCity.cityName}
            </h3>
            <span className="text-[10px] text-zinc-400">Algorithmic diagnostic</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {topChallenges.map((challenge) => (
              <div key={challenge.num} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-[10px]">
                    {challenge.num}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    challenge.severity === 'Critical' 
                      ? 'bg-red-50 text-red-700 border border-red-200/60' 
                      : challenge.severity === 'High'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  }`}>
                    {challenge.severity}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-zinc-950">{challenge.title}</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI INSIGHTS SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-zinc-950">
              AI Insights & Action Briefs
            </h2>
          </div>
          <span className="text-xs text-zinc-400">Dynamic location synthesis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className="modern-card p-5 flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${insight.badgeColor}`}>
                    {insight.badge}
                  </span>
                  <span className="text-[11px] text-zinc-400">{insight.impact}</span>
                </div>

                <h3 className="text-sm font-semibold text-zinc-950 leading-snug">
                  "{insight.title}"
                </h3>

                <p className="text-xs text-zinc-500 leading-relaxed">
                  {insight.detail}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('risks')}
                className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>{insight.action}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE MAP SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-700" />
            <h2 className="text-base font-bold text-zinc-950">
              Interactive City Map – {currentCity.cityName}
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Ward Boundaries
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Risk Zones
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" /> Projects
            </span>
          </div>
        </div>

        <div className="w-full h-[460px] rounded-2xl overflow-hidden border border-zinc-200 shadow-2xs">
          <DynamicLeafletMap
            centerLat={currentCity.lat}
            centerLng={currentCity.lng}
            wards={wards}
            projects={projects}
            risks={risks}
            heatmapMode="none"
            activeLayers={{
              development: true,
              risk: true,
              budget: true,
              infrastructure: true,
              facilities: false
            }}
          />
        </div>
      </section>

      {/* 5. PRIORITY PROJECTS SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-zinc-950">
              Top Development Priorities
            </h2>
          </div>
          <span className="text-xs text-zinc-400">Ranked by citizen impact ROI</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {priorityProjects.map((item) => (
            <div
              key={item.rank}
              className="modern-card p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 font-mono">
                  {item.rank}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Location: <strong className="text-zinc-800">{item.ward}</strong>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-100 text-center">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Impact</span>
                  <strong className="text-xs font-bold text-emerald-600">{item.impactScore}/100</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Cost</span>
                  <strong className="text-xs font-bold text-zinc-900">{item.cost}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Beneficiaries</span>
                  <strong className="text-xs font-bold text-zinc-900">{item.citizens}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DYNAMIC BUDGET SIMULATOR SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-zinc-950">
              AI Budget Simulator
            </h2>
          </div>
          <span className="text-xs text-zinc-400">Dynamic Capital Optimization</span>
        </div>

        <div className="modern-card p-6 space-y-6">
          {/* User Enters Available Budget */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-blue-600" />
                <span>Enter Available Budget (Crores)</span>
              </label>
              <p className="text-[11px] text-zinc-500">
                Adjust capital outlay to see AI automatic percentage allocation for {currentCity.cityName}.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[2, 5, 10, 20].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSimulatorBudgetCr(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border ${
                      simulatorBudgetCr === preset
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    ₹{preset}Cr
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-zinc-900">₹</span>
                <input
                  type="number"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={simulatorBudgetCr}
                  onChange={(e) => setSimulatorBudgetCr(Number(e.target.value) || 1)}
                  className="w-20 px-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-zinc-300 bg-white text-zinc-900 text-right"
                />
                <span className="text-xs text-zinc-500">Cr</span>
              </div>
            </div>
          </div>

          {/* AI Automatically Suggests: Roads, Drainage, Water Supply, Sanitation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Donut chart */}
            <div className="lg:col-span-5 h-56 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="percentage"
                  >
                    {budgetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                    formatter={(val: any, name: any) => [`${val}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-zinc-950">₹{simulatorBudgetCr} Cr</span>
                <span className="text-[10px] text-zinc-400 uppercase font-medium">100% Allocated</span>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="lg:col-span-7 space-y-3.5">
              {budgetAllocation.map((item) => (
                <div key={item.department} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-zinc-800">{item.department}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-zinc-500">₹{item.amountCr} Cr</span>
                      <span className="font-bold text-zinc-950 bg-zinc-100 px-1.5 py-0.5 rounded text-[11px]">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                  </div>
                  <p className="text-[10px] text-zinc-400">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
