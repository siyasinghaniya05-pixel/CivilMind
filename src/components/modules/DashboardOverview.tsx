'use client';

import React from 'react';
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
  Waves
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
    departmentBudgets, 
    setActiveTab, 
    setIsCityModalOpen 
  } = useCivic();

  // Top priorities requested by user
  const topPriorities = [
    {
      rank: '#1',
      title: 'Drainage Upgrade',
      ward: 'Ward 4',
      impactScore: 95,
      budget: '₹1.2 Cr',
      citizens: '18,200',
      tag: 'Critical Priority',
      tagColor: 'bg-red-50 text-red-700 border-red-200/60'
    },
    {
      rank: '#2',
      title: 'Road Rehabilitation',
      ward: 'Ward 2',
      impactScore: 89,
      budget: '₹95 L',
      citizens: '34,000',
      tag: 'High Traffic Route',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200/60'
    },
    {
      rank: '#3',
      title: 'Water Supply Upgrade',
      ward: 'Ward 6',
      impactScore: 84,
      budget: '₹65 L',
      citizens: '12,500',
      tag: 'Feeder Pipeline',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
    }
  ];

  // AI Insights requested by user
  const aiInsights = [
    {
      id: 1,
      title: 'Drainage infrastructure requires immediate attention.',
      detail: 'Monsoon elevation modeling predicts backwater inundation in Ward 4 and 5 low basins if outfall culvert desilting is delayed.',
      impact: '18,200 citizens affected',
      badge: 'High Impact',
      action: 'View Drainage Tender'
    },
    {
      id: 2,
      title: 'Ward 5 has the highest infrastructure risk.',
      detail: 'Composite failure probability of 84% detected due to simultaneous open drain silting and storm runoff convergence.',
      impact: '84% risk probability',
      badge: 'Urgent Remediation',
      action: 'Inspect Risk Map'
    },
    {
      id: 3,
      title: 'Road maintenance should be prioritized this quarter.',
      detail: 'Pavement Distress Index (PDI) dropped below 40 on arterial commercial routes, driving up commuter transit delay by 35%.',
      impact: '34,000 commuters',
      badge: 'Economic Spine',
      action: 'Review Road Budget'
    }
  ];

  // Modern donut chart data
  const donutData = [
    { name: 'Roads', value: 30, amount: '₹11.5 Cr', color: '#2563eb' },
    { name: 'Water', value: 25, amount: '₹9.6 Cr', color: '#0d9488' },
    { name: 'Drainage', value: 35, amount: '₹13.4 Cr', color: '#0284c7' },
    { name: 'Sanitation', value: 10, amount: '₹3.9 Cr', color: '#10b981' }
  ];

  // Kanban status grouping
  const kanbanColumns = [
    { 
      status: 'Planned', 
      count: projects.filter(p => p.status === 'Planned').length, 
      items: projects.filter(p => p.status === 'Planned').slice(0, 2) 
    },
    { 
      status: 'Active', 
      count: projects.filter(p => p.status === 'In Progress' || p.status === 'Approved').length, 
      items: projects.filter(p => p.status === 'In Progress' || p.status === 'Approved').slice(0, 3) 
    },
    { 
      status: 'Delayed', 
      count: projects.filter(p => p.status === 'Delayed').length, 
      items: projects.filter(p => p.status === 'Delayed').slice(0, 2) 
    },
    { 
      status: 'Completed', 
      count: projects.filter(p => p.status === 'Completed').length, 
      items: projects.filter(p => p.status === 'Completed').slice(0, 2) 
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. LARGE HERO SECTION */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-medium text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>AI-Powered Development Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
              {currentCity.cityName}, {currentCity.state}
            </h1>

            <p className="text-sm text-zinc-500 max-w-xl">
              Data-driven resource allocation, infrastructure hazard forecasting, and citizen impact modeling for municipal governance.
            </p>
          </div>

          {/* City Health Score Prominent Badge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 font-black text-xl">
              82
            </div>
            <div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                City Health Score
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold text-zinc-950">82/100</span>
                <span className="text-xs font-semibold text-emerald-600">+3.4 pts</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">Top 12% in state urban benchmark</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR LARGE METRIC CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Development Score */}
        <div className="modern-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Development Score</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-950">78</span>
            <span className="text-xs text-zinc-400">/100</span>
          </div>
          <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }} />
          </div>
          <p className="text-xs text-zinc-500">+4.2% lift vs last quarter</p>
        </div>

        {/* Infrastructure Risk */}
        <div className="modern-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Infrastructure Risk</span>
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">24%</span>
            <span className="text-xs text-zinc-400 font-medium">Low Risk</span>
          </div>
          <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }} />
          </div>
          <p className="text-xs text-zinc-500">3 areas flagged for maintenance</p>
        </div>

        {/* Budget Efficiency */}
        <div className="modern-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Budget Efficiency</span>
            <IndianRupee className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-950">91%</span>
            <span className="text-xs text-emerald-600 font-semibold">Optimal</span>
          </div>
          <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-900 rounded-full" style={{ width: '91%' }} />
          </div>
          <p className="text-xs text-zinc-500">₹18.4 Cr committed capital</p>
        </div>

        {/* Citizens Impacted */}
        <div className="modern-card p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Citizens Impacted</span>
            <Users className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-950">148,900</span>
          </div>
          <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '94%' }} />
          </div>
          <p className="text-xs text-zinc-500">94% municipal population coverage</p>
        </div>
      </section>

      {/* 3. SECOND SECTION: AI INSIGHTS PANEL (Linear / Perplexity style) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-zinc-950">
              AI Insights & Action Briefs
            </h2>
          </div>
          <span className="text-xs text-zinc-400">Updated in real-time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className="modern-card p-5 flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
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
                onClick={() => setActiveTab('overview')}
                className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>{insight.action}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THIRD SECTION: INTERACTIVE CITY MAP (Large Full-Width Clean Map) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-700" />
            <h2 className="text-base font-bold text-zinc-950">
              City Infrastructure & Risk Canvas
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Wards
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

      {/* 5. FOURTH SECTION: TOP DEVELOPMENT PRIORITIES */}
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
          {topPriorities.map((item) => (
            <div
              key={item.rank}
              className="modern-card p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 font-mono">
                  {item.rank}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                  {item.tag}
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
                  <span className="text-[10px] text-zinc-400 uppercase block">Budget</span>
                  <strong className="text-xs font-bold text-zinc-900">{item.budget}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">Reach</span>
                  <strong className="text-xs font-bold text-zinc-900">{item.citizens}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FIFTH SECTION: BUDGET SECTION (Modern Donut Chart & Allocation) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-zinc-700" />
            <h2 className="text-base font-bold text-zinc-950">
              Budget Allocation & Optimization
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            Total Outlay: ₹{currentCity.totalBudgetCr.toFixed(1)} Cr
          </span>
        </div>

        <div className="modern-card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Donut Chart (5 cols) */}
          <div className="lg:col-span-5 h-56 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                  formatter={(val: any, name: any) => [`${val}% (${donutData.find(d => d.name === name)?.amount})`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-zinc-950">100%</span>
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Allocated</span>
            </div>
          </div>

          {/* Allocation Progress Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {donutData.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-zinc-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">{item.amount}</span>
                    <span className="font-bold text-zinc-950 font-mono">{item.value}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SIXTH SECTION: STARTUP PROJECT TRACKER (Linear-Style Kanban) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-700" />
            <h2 className="text-base font-bold text-zinc-950">
              Project Execution Tracker
            </h2>
          </div>
          <span className="text-xs text-zinc-400">Linear-style pipeline</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => (
            <div key={col.status} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60">
                <span className="text-xs font-bold text-zinc-800">{col.status}</span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white text-zinc-600 border border-zinc-200">
                  {col.count}
                </span>
              </div>

              <div className="space-y-2.5">
                {col.items.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-lg bg-white border border-zinc-200 shadow-2xs hover:border-zinc-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-zinc-400 font-mono">{proj.id}</span>
                      <span className="font-bold text-zinc-900">₹{proj.budgetLakhs}L</span>
                    </div>

                    <h4 className="text-xs font-semibold text-zinc-900 line-clamp-2">
                      {proj.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-100">
                      <span>{proj.wardName}</span>
                      <span className="font-semibold text-blue-600">{proj.completionPercentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
