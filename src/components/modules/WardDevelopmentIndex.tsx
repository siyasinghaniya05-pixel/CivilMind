'use client';

import React, { useState, useMemo } from 'react';
import { useCivic } from '@/context/CivicContext';
import { WardData } from '@/types';
import { 
  MapPin, 
  Trophy, 
  AlertTriangle, 
  Search,
  X,
  ExternalLink,
  FileText,
  ShieldCheck,
  Scale,
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip,
  Legend
} from 'recharts';

export const WardDevelopmentIndex: React.FC = () => {
  const { wards, setActiveTab, setSelectedWard, currentCity } = useCivic();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRiskOnly, setFilterRiskOnly] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'all' | 'tier1' | 'tier2' | 'tier2.5' | 'tier3'>('all');
  const [activeWardModal, setActiveWardModal] = useState<WardData | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showExportToast, setShowExportToast] = useState(false);

  // Sorting
  const sortedWards = useMemo(() => {
    return [...wards].sort((a, b) => b.compositeScore - a.compositeScore);
  }, [wards]);

  const bestWard = sortedWards[0] || wards[0];
  const weakestWard = sortedWards[sortedWards.length - 1] || wards[wards.length - 1];

  // Head-to-Head selection states
  const [compareWard1Id, setCompareWard1Id] = useState<number>(bestWard?.id || 1);
  const [compareWard2Id, setCompareWard2Id] = useState<number>(weakestWard?.id || 2);
  const [isDossierCollapsed, setIsDossierCollapsed] = useState(false);

  const ward1 = useMemo(() => wards.find(w => w.id === compareWard1Id) || bestWard, [wards, compareWard1Id, bestWard]);
  const ward2 = useMemo(() => wards.find(w => w.id === compareWard2Id) || weakestWard, [wards, compareWard2Id, weakestWard]);

  // Filtering
  const filteredWards = sortedWards.filter((w) => {
    const matchesSearch = 
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.counselor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(w.number).includes(searchQuery);
    
    const matchesRisk = filterRiskOnly ? w.highRisk : true;

    let matchesTier = true;
    if (selectedTier === 'tier1') matchesTier = w.compositeScore >= 80;
    else if (selectedTier === 'tier2') matchesTier = w.compositeScore >= 70 && w.compositeScore < 80;
    else if (selectedTier === 'tier2.5') matchesTier = w.compositeScore >= 60 && w.compositeScore < 70;
    else if (selectedTier === 'tier3') matchesTier = w.compositeScore < 60;

    return matchesSearch && matchesRisk && matchesTier;
  });

  const getDualRadarData = (w1: WardData, w2: WardData) => [
    { subject: 'Roads', Ward1: w1.scores.roadQuality, Ward2: w2.scores.roadQuality, fullMark: 100 },
    { subject: 'Water', Ward1: w1.scores.waterSupply, Ward2: w2.scores.waterSupply, fullMark: 100 },
    { subject: 'Drainage', Ward1: w1.scores.drainage, Ward2: w2.scores.drainage, fullMark: 100 },
    { subject: 'Lighting', Ward1: w1.scores.streetLighting, Ward2: w2.scores.streetLighting, fullMark: 100 },
    { subject: 'Sanitation', Ward1: w1.scores.sanitation, Ward2: w2.scores.sanitation, fullMark: 100 },
    { subject: 'Complaints', Ward1: w1.scores.citizenComplaints, Ward2: w2.scores.citizenComplaints, fullMark: 100 },
  ];

  const getRadarData = (ward: WardData) => [
    { subject: 'Roads', score: ward.scores.roadQuality, fullMark: 100 },
    { subject: 'Water', score: ward.scores.waterSupply, fullMark: 100 },
    { subject: 'Drainage', score: ward.scores.drainage, fullMark: 100 },
    { subject: 'Lighting', score: ward.scores.streetLighting, fullMark: 100 },
    { subject: 'Sanitation', score: ward.scores.sanitation, fullMark: 100 },
    { subject: 'Complaints', score: ward.scores.citizenComplaints, fullMark: 100 },
  ];

  const handleExportPdf = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3500);
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102A43] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Generating Ward Report Card</p>
            <p className="text-slate-300">NIC telemetry ledger formatted for administrative review.</p>
          </div>
        </div>
      )}

      {/* TOP BREADCRUMB & AUDIT STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-1 gap-2 text-slate-500 dark:text-slate-400 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Municipal Administration</span>
          <span className="text-slate-300 dark:text-slate-600 font-mono">/</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Spatial Wards & Telemetry</span>
          <span className="text-slate-300 dark:text-slate-600 font-mono">/</span>
          <span className="text-blue-700 dark:text-blue-400 font-semibold">Ward Development Index (WDI) Ranking FY 2026-27</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] self-start md:self-auto">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> TELEMETRY SYNCED • LIVE
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">CPGRAMS & GIS LAYER v4.9</span>
        </div>
      </div>

      {/* TITLE BAR & EXECUTIVE ACTION STRIP */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-2">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ward Development Index (WDI) & Comparative Ranking
            </h1>
            <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded font-mono text-xs font-bold uppercase tracking-wider">
              {currentCity?.cityName ? `${currentCity.cityName.slice(0, 3).toUpperCase()}-WDI-2026` : 'ULB-MC-WDI-2026'}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            प्रभाग विकास निर्देशांक आणि तुलनात्मक मूल्यांकन <span className="text-slate-300 dark:text-slate-600 mx-1.5">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {wards.length} Administrative Wards • Evaluated across 6 Core Pillars • Live SCADA & CPGRAMS Synced
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button 
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs"
            type="button"
          >
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Export Report Card (PDF)</span>
          </button>
          
          <button 
            onClick={() => setShowAuditModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs"
            type="button"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>NIC Audit Ledger</span>
          </button>

          <button 
            onClick={() => setIsDossierCollapsed(!isDossierCollapsed)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm" 
            type="button"
          >
            <Scale className="w-4 h-4" />
            <span>{isDossierCollapsed ? 'Show Dual Dossier' : 'Compare Wards'}</span>
            <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center font-mono text-[10px] ml-0.5">2</span>
          </button>
        </div>
      </div>

      {/* COMPOSITE HEAT PERFORMANCE RIBBON */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Administrative Wards Composite Heat Ribbon
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              ({wards.length} Wards • Sorted by Rank)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
            <button 
              onClick={() => setSelectedTier(selectedTier === 'tier1' ? 'all' : 'tier1')}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all ${selectedTier === 'tier1' ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' : ''}`}
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
              <span className="text-slate-600 dark:text-slate-300">Tier 1 (&gt;80 Optimal)</span>
            </button>
            <button 
              onClick={() => setSelectedTier(selectedTier === 'tier2' ? 'all' : 'tier2')}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all ${selectedTier === 'tier2' ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950/40' : ''}`}
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-600" />
              <span className="text-slate-600 dark:text-slate-300">Tier 2 (70-79 Stable)</span>
            </button>
            <button 
              onClick={() => setSelectedTier(selectedTier === 'tier2.5' ? 'all' : 'tier2.5')}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all ${selectedTier === 'tier2.5' ? 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-950/40' : ''}`}
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-600" />
              <span className="text-slate-600 dark:text-slate-300">Tier 2.5 (60-69 Attention)</span>
            </button>
            <button 
              onClick={() => setSelectedTier(selectedTier === 'tier3' ? 'all' : 'tier3')}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all ${selectedTier === 'tier3' ? 'ring-2 ring-rose-500 bg-rose-50 dark:bg-rose-950/40' : ''}`}
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" />
              <span className="text-slate-600 dark:text-slate-300">Tier 3 (&lt;60 Priority)</span>
            </button>
          </div>
        </div>

        {/* MINI WARD RIBBON CELLS */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-18 gap-2 pt-1">
          {sortedWards.map((w) => {
            const isT1 = w.compositeScore >= 80;
            const isT2 = w.compositeScore >= 70 && w.compositeScore < 80;
            const isT25 = w.compositeScore >= 60 && w.compositeScore < 70;

            const bgClass = isT1 
              ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-600 hover:text-white'
              : isT2 
              ? 'bg-teal-500/15 text-teal-800 dark:text-teal-300 border-teal-500/30 hover:bg-teal-600 hover:text-white'
              : isT25
              ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 hover:bg-amber-600 hover:text-white'
              : 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30 hover:bg-rose-600 hover:text-white';

            const isSelectedForComparison = w.id === compareWard1Id || w.id === compareWard2Id;

            return (
              <div 
                key={w.id}
                onClick={() => {
                  setActiveWardModal(w);
                }}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all text-center relative group ${bgClass} ${isSelectedForComparison ? 'ring-2 ring-blue-600 shadow-md scale-105' : ''}`}
                title={`Ward ${w.number}: ${w.name} • Score: ${w.compositeScore} • Rank #${w.rank}`}
              >
                <span className="font-mono text-[10px] font-bold">W-{w.number}</span>
                <span className="text-sm font-black leading-tight my-0.5">{w.compositeScore}</span>
                <span className="text-[10px] font-medium opacity-80 group-hover:opacity-100">#{w.rank}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DUAL WARD COMPARATIVE DOSSIER (HEAD-TO-HEAD CONTRAST) */}
      {!isDossierCollapsed && (
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-3 gap-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Dual Ward Comparative Dossier
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Head-to-head civic telemetry contrast between two wards for priority capital budgeting and intervention planning
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold border border-slate-200 dark:border-slate-700">
                REF: WDI-CMP-{ward1.number}-{ward2.number}
              </span>
            </div>
          </div>

          {/* 3-COLUMN SPLIT: WARD 1 | RADAR & DELTA | WARD 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
            {/* LEFT CARD: WARD 1 */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                        WARD 1 FOCUS
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Rank #{ward1.rank}
                      </span>
                    </div>

                    <select
                      value={compareWard1Id}
                      onChange={(e) => setCompareWard1Id(Number(e.target.value))}
                      className="w-full text-base font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sortedWards.map(w => (
                        <option key={w.id} value={w.id}>
                          Ward {w.number}: {w.name} (Rank #{w.rank} - {w.compositeScore})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ward1.marathiName}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{ward1.compositeScore}</span>
                    <span className="block font-mono text-[10px] text-slate-400 uppercase">WDI SCORE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Population</span>
                    <span className="font-bold text-slate-900 dark:text-white">{ward1.population.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-400 block">{Math.round(ward1.population / (ward1.areaSqKm || 1))} / km²</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Allocated CapEx</span>
                    <span className="font-bold text-blue-700 dark:text-blue-400">₹{ward1.budgetAllocatedLakhs} L</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">{ward1.activeProjectsCount} Projects Active</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Citizen Grievances</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{ward1.unresolvedGrievances} Pending</span>
                    <span className="text-[10px] text-slate-400 block">{ward1.highRisk ? 'Escalated' : 'Within SLA'}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Risk Status</span>
                    <span className={`font-bold ${ward1.highRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {ward1.highRisk ? 'High-Risk Zone' : 'Standard Operations'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{ward1.scores.drainage < 60 ? 'Flood Watch' : 'Low Inundation'}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Counselor:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{ward1.counselor}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Contact:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{ward1.contact}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedWard(ward1);
                  setActiveTab('smart-map');
                }}
                className="w-full py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-blue-200 dark:border-blue-900"
              >
                <MapPin className="w-3.5 h-3.5" /> Locate Ward {ward1.number} on GIS Map
              </button>
            </div>

            {/* CENTER: COMPARATIVE RADAR & PILLAR DELTA */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-center pb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Pillar Telemetry Comparison
                  </span>
                  <p className="text-[11px] text-slate-400">Roads • Water • Drainage • Lighting • Sanitation • Complaints</p>
                </div>

                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={getDualRadarData(ward1, ward2)}>
                      <PolarGrid stroke="#94a3b8" strokeOpacity={0.4} />
                      <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                      <PolarRadiusAxis domain={[0, 100]} stroke="#cbd5e1" strokeOpacity={0.4} fontSize={10} />
                      <Radar
                        name={`Ward ${ward1.number}`}
                        dataKey="Ward1"
                        stroke="#2563eb"
                        fill="#3b82f6"
                        fillOpacity={0.35}
                      />
                      <Radar
                        name={`Ward ${ward2.number}`}
                        dataKey="Ward2"
                        stroke="#e11d48"
                        fill="#f43f5e"
                        fillOpacity={0.3}
                      />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Head-to-Head Score Difference */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>Score Delta:</span>
                  <span className={ward1.compositeScore >= ward2.compositeScore ? 'text-emerald-600' : 'text-rose-600'}>
                    {(ward1.compositeScore - ward2.compositeScore).toFixed(1)} pts
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT CARD: WARD 2 */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300">
                        WARD 2 FOCUS
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Rank #{ward2.rank}
                      </span>
                    </div>

                    <select
                      value={compareWard2Id}
                      onChange={(e) => setCompareWard2Id(Number(e.target.value))}
                      className="w-full text-base font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      {sortedWards.map(w => (
                        <option key={w.id} value={w.id}>
                          Ward {w.number}: {w.name} (Rank #{w.rank} - {w.compositeScore})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ward2.marathiName}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-3xl font-black text-rose-600 dark:text-rose-400">{ward2.compositeScore}</span>
                    <span className="block font-mono text-[10px] text-slate-400 uppercase">WDI SCORE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Population</span>
                    <span className="font-bold text-slate-900 dark:text-white">{ward2.population.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-400 block">{Math.round(ward2.population / (ward2.areaSqKm || 1))} / km²</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Allocated CapEx</span>
                    <span className="font-bold text-rose-700 dark:text-rose-400">₹{ward2.budgetAllocatedLakhs} L</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">{ward2.activeProjectsCount} Projects Active</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Citizen Grievances</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{ward2.unresolvedGrievances} Pending</span>
                    <span className="text-[10px] text-slate-400 block">{ward2.highRisk ? 'Urgent Intervention' : 'Monitored'}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 block">Risk Status</span>
                    <span className={`font-bold ${ward2.highRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {ward2.highRisk ? 'High-Risk Zone' : 'Standard Operations'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{ward2.scores.drainage < 60 ? 'Flood Watch' : 'Stable'}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Counselor:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{ward2.counselor}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Contact:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{ward2.contact}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedWard(ward2);
                  setActiveTab('smart-map');
                }}
                className="w-full py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-rose-200 dark:border-rose-900"
              >
                <MapPin className="w-3.5 h-3.5" /> Locate Ward {ward2.number} on GIS Map
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search ward name, number, or counselor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filterRiskOnly}
              onChange={(e) => setFilterRiskOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            Show High-Risk Wards Only ({wards.filter(w => w.highRisk).length})
          </label>
        </div>
      </div>

      {/* WARDS GRID ROSTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWards.map((w) => {
          const isTop = w.compositeScore >= 75;
          const isMid = w.compositeScore >= 60 && w.compositeScore < 75;

          return (
            <div
              key={w.id}
              onClick={() => setActiveWardModal(w)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 shadow-xs hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Rank #{w.rank}
                    </span>
                    {w.highRisk && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                        Critical Watch
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                    Ward {w.number}: {w.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {w.counselor} • {w.marathiName}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`text-2xl font-black ${
                    isTop ? 'text-emerald-600 dark:text-emerald-400' :
                    isMid ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {w.compositeScore}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 block">/ 100</span>
                </div>
              </div>

              {/* Progress bars for 3 representative pillars */}
              <div className="mt-4 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Road Quality</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{w.scores.roadQuality}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${w.scores.roadQuality}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Water Supply</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{w.scores.waterSupply}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${w.scores.waterSupply}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Drainage & Flood Safety</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{w.scores.drainage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${w.scores.drainage}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Pop: {w.population.toLocaleString('en-IN')}</span>
                <span>CapEx: <strong>₹{w.budgetAllocatedLakhs}L</strong></span>
                <span className="font-bold text-blue-600 flex items-center gap-0.5">
                  Inspect <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* NIC AUDIT LEDGER MODAL */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    National Informatics Centre (NIC) Audit Ledger
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">CERT-In Compliance & Standard Telemetry Log</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAuditModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ledger ID:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">NIC-MH-WDI-2026-9812A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Timestamp:</span>
                  <span>{new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hash Signature:</span>
                  <span className="text-blue-600">e9c20a4...b18972f (SHA-256)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Wards Verified:</span>
                  <span className="text-emerald-600 font-bold">{wards.length} of {wards.length} Active</span>
                </div>
              </div>

              <p className="leading-relaxed">
                All Ward Development Index calculation weightages conform to Ministry of Housing and Urban Affairs (MoHUA) Municipal Performance Index guidelines and are backed by GIS geofenced sensor and CPGRAMS telemetry feeds.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90"
              >
                Close Audit Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WARD DRILL-DOWN RADAR MODAL */}
      {activeWardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                    Rank #{activeWardModal.rank} of {wards.length}
                  </span>
                  {activeWardModal.highRisk && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      High-Risk Zone
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Ward {activeWardModal.number}: {activeWardModal.name} ({activeWardModal.marathiName})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Counselor: {activeWardModal.counselor} • {activeWardModal.contact}
                </p>
              </div>

              <button
                onClick={() => setActiveWardModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Radar Chart & Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={getRadarData(activeWardModal)}>
                    <PolarGrid stroke="#94a3b8" />
                    <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="#cbd5e1" fontSize={10} />
                    <Radar
                      name="Ward Score"
                      dataKey="score"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.4}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Composite Index</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{activeWardModal.compositeScore}</span>
                    <span className="text-xs text-slate-500">/ 100 benchmark</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Population</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeWardModal.population.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Allocated CapEx</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{activeWardModal.budgetAllocatedLakhs} Lakhs</span>
                  </div>
                </div>

                {activeWardModal.riskFactors.length > 0 && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs">
                    <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">Identified Risk Factors:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-rose-700 dark:text-rose-300 text-[11px]">
                      {activeWardModal.riskFactors.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setSelectedWard(activeWardModal);
                  setActiveWardModal(null);
                  setActiveTab('smart-map');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" /> Locate Ward on GIS Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
