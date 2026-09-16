'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { WardData } from '@/types';
import { 
  MapPin, 
  Trophy, 
  AlertTriangle, 
  TrendingUp, 
  Phone, 
  Users, 
  IndianRupee, 
  Layers, 
  CheckCircle2, 
  Search,
  Filter,
  X,
  ExternalLink,
  Radar as RadarIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';

export const WardDevelopmentIndex: React.FC = () => {
  const { wards, setActiveTab, setSelectedWard, currentCity } = useCivic();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRiskOnly, setFilterRiskOnly] = useState(false);
  const [activeWardModal, setActiveWardModal] = useState<WardData | null>(null);

  const sortedWards = [...wards].sort((a, b) => b.compositeScore - a.compositeScore);
  const bestWard = sortedWards[0];
  const weakestWard = sortedWards[sortedWards.length - 1];

  const filteredWards = sortedWards.filter((w) => {
    const matchesSearch = 
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.counselor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(w.number).includes(searchQuery);
    const matchesRisk = filterRiskOnly ? w.highRisk : true;
    return matchesSearch && matchesRisk;
  });

  const getRadarData = (ward: WardData) => [
    { subject: 'Roads', score: ward.scores.roadQuality, fullMark: 100 },
    { subject: 'Water', score: ward.scores.waterSupply, fullMark: 100 },
    { subject: 'Drainage', score: ward.scores.drainage, fullMark: 100 },
    { subject: 'Lighting', score: ward.scores.streetLighting, fullMark: 100 },
    { subject: 'Sanitation', score: ward.scores.sanitation, fullMark: 100 },
    { subject: 'Complaints', score: ward.scores.citizenComplaints, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 mb-2">
            <MapPin className="w-3.5 h-3.5" /> Module 3: Ward Development Index (WDI)
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            0–100 Composite Ward Performance Benchmark
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Standardized evaluation across all wards of {currentCity?.cityName || 'Selected Municipality'} across 6 core municipal infrastructure pillars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('smart-map')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all"
          >
            <MapPin className="w-4 h-4" />
            View on GIS Map
          </button>
        </div>
      </div>

      {/* Best vs Weakest Ward Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Best Performing Ward */}
        <div 
          onClick={() => setActiveWardModal(bestWard)}
          className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/10 via-emerald-800/5 to-transparent border border-emerald-300 dark:border-emerald-800/80 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
                <Trophy className="w-3.5 h-3.5 text-amber-500" /> Best Performing Ward (Rank 1)
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Ward {bestWard.number}: {bestWard.name} ({bestWard.marathiName})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Counselor: {bestWard.counselor} • Pop: {bestWard.population.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {bestWard.compositeScore}
              </span>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">WDI Score</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60">
              <span className="text-slate-500 text-[10px] block">Road Quality</span>
              <span className="font-bold text-emerald-600">{bestWard.scores.roadQuality}/100</span>
            </div>
            <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60">
              <span className="text-slate-500 text-[10px] block">Water Supply</span>
              <span className="font-bold text-emerald-600">{bestWard.scores.waterSupply}/100</span>
            </div>
            <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60">
              <span className="text-slate-500 text-[10px] block">Drainage</span>
              <span className="font-bold text-emerald-600">{bestWard.scores.drainage}/100</span>
            </div>
          </div>
        </div>

        {/* Weakest Performing Ward */}
        <div 
          onClick={() => setActiveWardModal(weakestWard)}
          className="p-5 rounded-2xl bg-gradient-to-br from-red-900/10 via-red-800/5 to-transparent border border-red-300 dark:border-red-800/80 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Critical Intervention Needed (Rank 17)
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Ward {weakestWard.number}: {weakestWard.name} ({weakestWard.marathiName})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Counselor: {weakestWard.counselor} • Pop: {weakestWard.population.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-red-600 dark:text-red-400">
                {weakestWard.compositeScore}
              </span>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">WDI Score</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60">
              <span className="text-slate-500 text-[10px] block">Drainage</span>
              <span className="font-bold text-red-600">{weakestWard.scores.drainage}/100</span>
            </div>
            <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60">
              <span className="text-slate-500 text-[10px] block">Road Quality</span>
              <span className="font-bold text-red-600">{weakestWard.scores.roadQuality}/100</span>
            </div>
            <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/60">
              <span className="text-slate-500 text-[10px] block">Sanitation</span>
              <span className="font-bold text-red-600">{weakestWard.scores.sanitation}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search ward name, number, or counselor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* 17 Wards Grid Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWards.map((w) => {
          const isTop = w.compositeScore >= 75;
          const isMid = w.compositeScore >= 60 && w.compositeScore < 75;
          const isLow = w.compositeScore < 60;

          return (
            <div
              key={w.id}
              onClick={() => setActiveWardModal(w)}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 shadow-sm cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Rank #{w.rank}
                    </span>
                    {w.highRisk && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                        High Risk
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    Ward {w.number}: {w.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {w.counselor}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`text-xl font-black ${
                    isTop ? 'text-emerald-600 dark:text-emerald-400' :
                    isMid ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {w.compositeScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/100</span>
                </div>
              </div>

              {/* Progress bars for 6 parameters */}
              <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">Roads</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{w.scores.roadQuality}%</span>
                </div>
                <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${w.scores.roadQuality}%` }} />
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">Drainage</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{w.scores.drainage}%</span>
                </div>
                <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-sky-500" style={{ width: `${w.scores.drainage}%` }} />
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">Water Supply</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{w.scores.waterSupply}%</span>
                </div>
                <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-teal-500" style={{ width: `${w.scores.waterSupply}%` }} />
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span>Pop: {w.population.toLocaleString('en-IN')}</span>
                <span>Grievances: <strong className="text-red-500">{w.unresolvedGrievances}</strong></span>
                <span className="font-semibold text-blue-600 flex items-center gap-0.5">
                  Radar <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ward Drill-Down Modal with Radar Chart */}
      {activeWardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                    Rank #{activeWardModal.rank} of 17
                  </span>
                  {activeWardModal.highRisk && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
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
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs">
                    <span className="font-bold text-red-800 dark:text-red-300 block mb-1">Identified Risk Factors:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-red-700 dark:text-red-300 text-[11px]">
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
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
              >
                Locate Ward on GIS Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
