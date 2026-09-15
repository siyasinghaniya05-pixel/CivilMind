'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { InfrastructureRisk } from '@/types';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Droplets, 
  AlertOctagon, 
  Wrench, 
  FileWarning, 
  Send, 
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RiskPrediction: React.FC = () => {
  const { risks, setActiveTab } = useCivic();

  const [selectedType, setSelectedType] = useState<string>('all');
  const [actionedRisks, setActionedRisks] = useState<Record<string, string>>({});

  const handleDispatch = (id: string) => {
    setActionedRisks(prev => ({ ...prev, [id]: 'Inspection Team Dispatched' }));
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const filteredRisks = risks.filter(r => selectedType === 'all' || r.type === selectedType);

  const getRiskIcon = (type: InfrastructureRisk['type']) => {
    switch (type) {
      case 'flood_risk':
        return <Droplets className="w-5 h-5 text-sky-600" />;
      case 'drain_blockage':
        return <AlertOctagon className="w-5 h-5 text-amber-600" />;
      case 'water_leakage':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'road_deterioration':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'light_failure':
        return <AlertTriangle className="w-5 h-5 text-indigo-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Module 4: Infrastructure Risk Prediction
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            AI Preventive Failure & Early Disaster Warning
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Predictive machine learning models monitoring road rutting, drainage chokes, CI pipe bursts, and monsoon inundations before failure occurs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('smart-map')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
            View Risk Map Overlay
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-red-50/60 dark:bg-red-950/30 border border-red-200 dark:border-red-900 shadow-sm">
          <span className="text-xs text-red-700 dark:text-red-300 font-semibold">Critical Threats</span>
          <p className="text-2xl font-black text-red-700 dark:text-red-400 mt-1">
            {risks.filter(r => r.severity === 'Critical').length}
          </p>
          <p className="text-[11px] text-red-600 mt-0.5">Failure likely &lt; 14 days</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 shadow-sm">
          <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">High Probability</span>
          <p className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-1">
            {risks.filter(r => r.severity === 'High').length}
          </p>
          <p className="text-[11px] text-amber-600 mt-0.5">Sub-base / pipe fatigue</p>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 shadow-sm">
          <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold">Population at Risk</span>
          <p className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">
            24,400
          </p>
          <p className="text-[11px] text-blue-600 mt-0.5">Across 4 vulnerable wards</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 shadow-sm">
          <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">Remediation Cost</span>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
            ₹109.7 L
          </p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Saves ₹340L emergency costs</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Risks' },
          { id: 'flood_risk', label: 'Monsoon Flood Risk' },
          { id: 'drain_blockage', label: 'Drain Choking' },
          { id: 'water_leakage', label: 'Pipeline Rupture' },
          { id: 'road_deterioration', label: 'Road Pavement Wear' },
          { id: 'light_failure', label: 'Dark Corridors' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === tab.id
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Risk Cards List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const isCritical = risk.severity === 'Critical';
          const isActioned = actionedRisks[risk.id];

          return (
            <div
              key={risk.id}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                isCritical 
                  ? 'border-red-300 dark:border-red-800 shadow-md ring-1 ring-red-500/20' 
                  : 'border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                      {getRiskIcon(risk.type)}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      risk.severity === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      risk.severity === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {risk.severity} Severity
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Ward {risk.wardId}: {risk.wardName}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {risk.locationDetails}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {risk.title}
                  </h3>

                  {/* AI Diagnostic insight */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span><strong>AI Failure Diagnostics:</strong> {risk.aiDiagnostic}</span>
                    </p>
                    <p className="mt-2 text-slate-800 dark:text-slate-200 font-medium">
                      <strong>Recommended Preventive Action:</strong> {risk.recommendedAction}
                    </p>
                  </div>
                </div>

                {/* Right Action & Risk Probability */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-xs text-slate-500">Probability:</span>
                      <span className="text-2xl font-black text-red-600 dark:text-red-400">
                        {risk.probabilityPercentage}%
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-end gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Failure countdown: ~{risk.predictedFailureDays} days</span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1">
                      Estimated Remedy: <strong>₹{risk.estimatedRemedyCostLakhs} Lakhs</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isActioned ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {isActioned}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDispatch(risk.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        Dispatch Inspection
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
