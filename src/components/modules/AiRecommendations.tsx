'use client';

import React from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  IndianRupee, 
  ArrowRight,
  Send,
  Droplets,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AiRecommendations: React.FC = () => {
  const { aiRecommendations, approveRecommendation, setActiveTab } = useCivic();

  const handleApprove = (id: string, title: string) => {
    approveRecommendation(id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Module 7: AI Project Recommendation Engine
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Contextual AI Capital Expenditure Briefs
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Synthesizing civic complaints, drainage elevation profiles, and population reach into ready-to-table administrative proposals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('wow-build-next')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Launch What To Build Next AI
          </button>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {aiRecommendations.map((rec) => {
          const isApproved = rec.status === 'Approved for DPR';

          return (
            <div
              key={rec.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/80 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-700 text-white">
                      Priority #{rec.priorityRank}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Ward {rec.wardId}: {rec.wardName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950">
                      {rec.category}
                    </span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                      {rec.urgency}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                    {rec.title}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-500 block">Recommended Outlay</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{rec.recommendedBudgetLakhs} Lakhs
                  </span>
                  <span className="text-xs text-emerald-600 font-bold block">
                    Impact Score: {rec.impactScore}/100
                  </span>
                </div>
              </div>

              {/* Justification Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Municipal Data Rationale:</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {rec.justification}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200">Return on Citizen Investment (ROI):</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {rec.roiCitizenImpact}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Key Impact Metric Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/60 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase block">Citizens Benefited</span>
                    <strong className="text-base text-slate-900 dark:text-white">
                      {rec.populationBenefited.toLocaleString('en-IN')} citizens
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase block">Hazard Reduction</span>
                    <strong className="text-base text-slate-900 dark:text-white">
                      {rec.floodOrRiskReduction}% reduction
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/60 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase block">Ward WDI Uplift</span>
                    <strong className="text-base text-slate-900 dark:text-white">
                      +{rec.qualityOfLifeLift} index points
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">
                  Status: <strong className={isApproved ? 'text-emerald-600' : 'text-amber-600'}>{rec.status}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('wow-calculator')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
                  >
                    Calculate Cost Per Citizen
                  </button>
                  {isApproved ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Approved for DPR Formulation
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprove(rec.id, rec.title)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-105"
                    >
                      Approve Recommendation for DPR
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
