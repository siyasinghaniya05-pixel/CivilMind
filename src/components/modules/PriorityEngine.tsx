'use client';

import React, { useState, useMemo } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  ArrowUpNarrowWide, 
  Sliders, 
  Sparkles, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Download, 
  Info,
  Layers,
  IndianRupee,
  FileCheck2,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PriorityEngine: React.FC = () => {
  const { projects, updateProjectStatus, setActiveTab } = useCivic();

  // Multi-criteria weights (sum to 100)
  const [weights, setWeights] = useState({
    population: 25,
    riskLevel: 25,
    condition: 20,
    complaints: 15,
    strategic: 15,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sanctionedId, setSanctionedId] = useState<string | null>(null);

  // Recalculate priority scores dynamically based on weights
  const prioritizedProjects = useMemo(() => {
    return projects
      .filter(p => selectedCategory === 'All' || p.department === selectedCategory)
      .map(p => {
        // Normalize condition rating (Very Poor = 100, Poor = 80, Moderate = 60, Fair = 40, Good = 20)
        const conditionScoreMap: Record<string, number> = {
          'Very Poor': 100,
          'Poor': 80,
          'Moderate': 60,
          'Fair': 40,
          'Good': 20,
        };
        const conditionVal = conditionScoreMap[p.conditionRating] || 50;

        // Normalize population (log scaled or ratio against 35,000)
        const popVal = Math.min(100, Math.round((p.populationBenefited / 35000) * 100));

        // Normalize complaints (cap at 60)
        const complaintVal = Math.min(100, Math.round((p.complaintCount / 50) * 100));

        const compositeImpact = Math.round(
          (popVal * weights.population +
           p.riskScore * weights.riskLevel +
           conditionVal * weights.condition +
           complaintVal * weights.complaints +
           p.strategicScore * weights.strategic) / 100
        );

        let priorityRankText: 'Critical' | 'High' | 'Medium' | 'Low' = 'Medium';
        if (compositeImpact >= 90) priorityRankText = 'Critical';
        else if (compositeImpact >= 80) priorityRankText = 'High';
        else if (compositeImpact >= 65) priorityRankText = 'Medium';
        else priorityRankText = 'Low';

        return {
          ...p,
          dynamicImpactScore: compositeImpact,
          priorityCategory: priorityRankText,
        };
      })
      .sort((a, b) => b.dynamicImpactScore - a.dynamicImpactScore);
  }, [projects, weights, selectedCategory]);

  const handleSanction = (id: string, title: string) => {
    updateProjectStatus(id, 'Approved');
    setSanctionedId(id);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setSanctionedId(null), 3000);
  };

  const resetWeights = () => {
    setWeights({
      population: 25,
      riskLevel: 25,
      condition: 20,
      complaints: 15,
      strategic: 15,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 mb-2">
            <ArrowUpNarrowWide className="w-3.5 h-3.5" /> Module 1: AI Development Priority Engine
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Municipal Project Prioritization & Capital Sanctions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data-backed ranking algorithm answering: <em>"Which municipal work should receive funding first to deliver maximum public welfare?"</em>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('wow-adp')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
          >
            <FileCheck2 className="w-4 h-4" />
            Generate Council Agenda
          </button>
        </div>
      </div>

      {/* Interactive MCDA Weight Controllers */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Multi-Criteria Decision Analysis (MCDA) Scoring Weights
            </h2>
          </div>
          <button
            onClick={resetWeights}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="w-3 h-3" /> Reset to Recommended Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Population Affected */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Population Reach</span>
              <span className="text-blue-600 font-bold">{weights.population}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={weights.population}
              onChange={(e) => setWeights({ ...weights, population: Number(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Direct citizens benefited</p>
          </div>

          {/* Risk Level */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Risk & Hazard Level</span>
              <span className="text-red-600 font-bold">{weights.riskLevel}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={weights.riskLevel}
              onChange={(e) => setWeights({ ...weights, riskLevel: Number(e.target.value) })}
              className="w-full accent-red-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Flood, collapse & health threat</p>
          </div>

          {/* Infrastructure Condition */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Asset Degradation</span>
              <span className="text-amber-600 font-bold">{weights.condition}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={weights.condition}
              onChange={(e) => setWeights({ ...weights, condition: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Physical wear & tear rating</p>
          </div>

          {/* Citizen Complaints */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Citizen Complaints</span>
              <span className="text-indigo-600 font-bold">{weights.complaints}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={weights.complaints}
              onChange={(e) => setWeights({ ...weights, complaints: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Grievance portal complaints</p>
          </div>

          {/* Strategic Importance */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Strategic Priority</span>
              <span className="text-emerald-600 font-bold">{weights.strategic}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={weights.strategic}
              onChange={(e) => setWeights({ ...weights, strategic: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Economic & statutory importance</p>
          </div>
        </div>
      </div>

      {/* Filter and Top Recommendation Callout */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Drainage & Sewerage', 'Roads & Transport', 'Water Supply', 'Sanitation & SWM', 'Street Lighting & Energy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing {prioritizedProjects.length} proposals ranked by real-time impact
        </span>
      </div>

      {/* Prioritized Works List */}
      <div className="space-y-3">
        {prioritizedProjects.map((proj, idx) => {
          const rank = idx + 1;
          const isSanctioned = sanctionedId === proj.id || proj.status === 'Approved' || proj.status === 'In Progress';

          return (
            <div
              key={proj.id}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                rank === 1
                  ? 'border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      rank === 1 ? 'bg-emerald-600 text-white' :
                      rank <= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      Priority Rank #{rank}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      proj.priorityCategory === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      proj.priorityCategory === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {proj.priorityCategory} Priority
                    </span>

                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Ward {proj.wardId}: {proj.wardName}
                    </span>

                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                      {proj.department}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>AI Justification:</strong> {proj.aiJustification}</span>
                  </div>
                </div>

                {/* Right score & Action */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Impact Score</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {proj.dynamicImpactScore}
                        <span className="text-xs font-normal text-slate-400">/100</span>
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-end gap-3 text-xs text-slate-600 dark:text-slate-400">
                      <span>Budget: <strong className="text-slate-900 dark:text-white">₹{proj.recommendedBudgetLakhs} Lakhs</strong></span>
                      <span>Reach: <strong className="text-slate-900 dark:text-white">{proj.populationBenefited.toLocaleString('en-IN')}</strong></span>
                    </div>

                    <div className="mt-1 flex items-center justify-end gap-2 text-[11px] text-slate-500">
                      <span>Risk: {proj.riskScore}/100</span>
                      <span>•</span>
                      <span>Complaints: {proj.complaintCount}</span>
                      <span>•</span>
                      <span>Condition: {proj.conditionRating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {proj.status === 'Approved' || proj.status === 'In Progress' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Sanctioned ({proj.status})
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSanction(proj.id, proj.title)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                      >
                        Approve for DPR & Tender
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
