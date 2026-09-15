'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Users, 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2,
  HelpCircle,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CitizenImpactCalculator: React.FC = () => {
  const { wards, setActiveTab } = useCivic();

  const [selectedWardId, setSelectedWardId] = useState<number>(4);
  const [costLakhs, setCostLakhs] = useState<number>(85);
  const [interventionType, setInterventionType] = useState<string>('drainage');
  const [projectTitle, setProjectTitle] = useState<string>('Underground Stormwater Drain & RCC Slabs');
  const [generatedNote, setGeneratedNote] = useState<boolean>(false);

  const ward = wards.find(w => w.id === selectedWardId) || wards[0];

  // Calculators
  const directBeneficiaries = Math.round(
    interventionType === 'drainage' ? ward.population * 0.95 :
    interventionType === 'water' ? ward.population * 0.88 :
    interventionType === 'road' ? ward.population * 1.4 : // includes transit
    interventionType === 'lighting' ? ward.population * 0.75 :
    ward.population * 0.65
  );

  const indirectBeneficiaries = Math.round(directBeneficiaries * 0.45);
  const totalBenefited = directBeneficiaries + indirectBeneficiaries;
  const costPerBeneficiary = Math.round((costLakhs * 100000) / (totalBenefited || 1));
  const qualityOfLifeLift = Math.min(36, Math.round((costLakhs / 80) * 22));

  const handleGenerateNote = () => {
    setGeneratedNote(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-200 border border-teal-400/30 mb-2">
            <Users className="w-3.5 h-3.5" /> WOW Feature #4: Citizen Impact Calculator
          </div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight">
            Per-Capita Public Welfare & Beneficiary Estimator
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Accurately quantify direct household beneficiaries, indirect commercial beneficiaries, and per-capita capital expenditure for any proposed municipal works tender.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('priority-engine')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
        >
          Check Priority Engine
        </button>
      </div>

      {/* Main Grid: Inputs vs Real-Time Welfare Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameters (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Proposed Intervention Parameters
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Title / Description
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Municipal Ward
                </label>
                <select
                  value={selectedWardId}
                  onChange={(e) => setSelectedWardId(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  {wards.map((w) => (
                    <option key={w.id} value={w.id}>
                      Ward {w.number}: {w.name} (Pop: {w.population.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Intervention Sector
                </label>
                <select
                  value={interventionType}
                  onChange={(e) => setInterventionType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="drainage">Drainage & Flood Control</option>
                  <option value="roads">Road Concretization & Footpaths</option>
                  <option value="water">Piped Water & Storage Tank</option>
                  <option value="sanitation">Solid Waste Facility</option>
                  <option value="lighting">Smart LED & High-Mast</option>
                  <option value="amenities">Public Park & Open Gym</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Estimated Project Cost: <strong className="text-blue-600 font-bold">₹{costLakhs} Lakhs</strong>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">₹{(costLakhs * 100000).toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={costLakhs}
                onChange={(e) => setCostLakhs(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹10 Lakhs</span>
                <span>Slide to adjust proposed tender amount</span>
                <span>₹2.50 Crore</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGenerateNote}
                className="w-full py-2.5 rounded-xl font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Administrative Justification Note
              </button>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Citizen Welfare Outputs (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Calculated Citizen Welfare Metrics
          </h2>

          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Total Beneficiaries */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
              <span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase block">
                Total Citizen Beneficiaries
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                {totalBenefited.toLocaleString('en-IN')}
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {directBeneficiaries.toLocaleString('en-IN')} direct + {indirectBeneficiaries.toLocaleString('en-IN')} transit
              </p>
            </div>

            {/* Cost Per Citizen */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase block">
                Cost Per Citizen Benefited
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                ₹{costPerBeneficiary}
              </span>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                Exceptional Public Return
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            {/* QoL Lift */}
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
              <span className="text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase block">
                Ward WDI Uplift
              </span>
              <span className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
                +{qualityOfLifeLift} pts
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Ward {ward.number} ({ward.compositeScore} → {Math.min(95, ward.compositeScore + qualityOfLifeLift)})
              </p>
            </div>

            {/* Public Payback Period */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase block">
                Economic Breakeven
              </span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
                18 Months
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Via damage mitigation savings
              </p>
            </div>
          </div>

          {/* Generated Council Justification Note */}
          {generatedNote && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Administrative Note for Chief Officer Approval:</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                "Sanction of <strong>₹{costLakhs} Lakhs</strong> for <strong>{projectTitle}</strong> in Ward {ward.number} ({ward.name}) will directly improve living conditions for <strong>{totalBenefited.toLocaleString('en-IN')} citizens</strong> at an ultra-lean capital expenditure of <strong>₹{costPerBeneficiary} per citizen</strong>. This work raises Ward {ward.number}'s Ward Development Index by <strong>+{qualityOfLifeLift} points</strong> and resolves chronic civic distress."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
