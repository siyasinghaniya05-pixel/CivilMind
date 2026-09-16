'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Droplets, 
  Milestone, 
  Waves, 
  Recycle, 
  Lightbulb, 
  IndianRupee, 
  Users, 
  ShieldCheck, 
  FileCheck2, 
  RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WhatShouldWeBuildNext: React.FC = () => {
  const { addProject, setActiveTab, currentCity } = useCivic();

  const [step, setStep] = useState<number>(1);
  const [selectedObjective, setSelectedObjective] = useState<string>('drainage');
  const [selectedBudgetBand, setSelectedBudgetBand] = useState<string>('medium');
  const [selectedTargetZone, setSelectedTargetZone] = useState<string>('weakest');
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [sanctioned, setSanctioned] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsGenerated(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleSanctionNewTender = () => {
    addProject({
      title: 'Ward 4 Indira Nagar RCC Box Drain & Ralegaon Outfall Culvert',
      marathiTitle: 'प्रभाग ४ इंदिरा नगर मुख्य नाला आरसीसी बॉक्स ड्रेन बांधकाम',
      description: 'Construction of 1.8km RCC storm box drain with automated silt screen and reinforced culvert.',
      department: 'Drainage & Sewerage',
      wardId: 4,
      wardName: 'Indira Nagar',
      budgetLakhs: 125,
      spentLakhs: 0,
      status: 'Approved',
      startDate: '2026-10-01',
      targetDate: '2027-04-30',
      contractor: 'E-Tender to be invited',
      completionPercentage: 0,
      lat: 20.4682,
      lng: 78.3320,
      populationBenefited: 18200,
      costPerCitizen: 686,
      riskReductionPercentage: 74,
      priorityScore: 96,
      riskScore: 92,
      strategicScore: 94,
      impactScore: 95,
      conditionRating: 'Very Poor',
      complaintCount: 54,
      aiJustification: 'Generated via "What Should We Build Next?" AI wizard. Direct intervention for lowest WDI ward.',
      recommendedBudgetLakhs: 125,
    });
    setSanctioned(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> WOW Feature #1: "What Should We Build Next?" AI
          </div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight">
            Autonomous Municipal Tender & Intervention Advisor
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Input your current fiscal envelope and policy goal — our neural MCDA engine automatically synthesizes citizen complaints, flood models, and WDI disparity to specify your next best tender.
          </p>
        </div>

        <button
          onClick={() => {
            setStep(1);
            setIsGenerated(false);
            setSanctioned(false);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Start Over
        </button>
      </div>

      {!isGenerated ? (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 text-xs font-bold">
            <span className={step >= 1 ? 'text-emerald-600' : 'text-slate-400'}>1. Primary Objective</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 2 ? 'text-emerald-600' : 'text-slate-400'}>2. Budget Envelope</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 3 ? 'text-emerald-600' : 'text-slate-400'}>3. Target Ward Equity</span>
          </div>

          {/* STEP 1: Objective */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 1: What is the primary administrative priority for this quarter?
                </h3>
                <p className="text-xs text-slate-500">Select the municipal outcome you want to optimize for.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'drainage', title: 'Flood Mitigation & Storm Drainage', desc: 'Prevent monsoon water stagnation and vector epidemics', icon: Droplets },
                  { id: 'roads', title: 'Mobility & Arterial Pavement', desc: 'Eliminate potholes, upgrade commercial freight and bus routes', icon: Milestone },
                  { id: 'water', title: 'Water Security & Pipeline Equity', desc: 'Eliminate summer water tankers in tail-end wards', icon: Waves },
                  { id: 'sanitation', title: 'Swachh Survekshan ODF++ SWM', desc: 'Mechanized waste segregation and compost facility', icon: Recycle },
                  { id: 'lighting', title: 'Smart LED & Public Safety', desc: 'Cover dark crime-prone corridors and reduce power bills', icon: Lightbulb },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSel = selectedObjective === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedObjective(item.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSel
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500/30'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSel ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5"
                >
                  Continue to Budget <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Budget */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 2: What is the available budget allocation band?
                </h3>
                <p className="text-xs text-slate-500">Define the capital expenditure cap for this intervention.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'small', label: 'Micro CapEx (< ₹50 Lakhs)', desc: 'Quick-impact interventions like paver blocks, pipeline leak clamps, LED lights' },
                  { id: 'medium', label: 'Medium CapEx (₹50 Lakhs to ₹1.50 Crore)', desc: 'Full box drain channeling, CC road widening, ESR booster pumps' },
                  { id: 'large', label: 'Major CapEx (> ₹1.50 Crore)', desc: 'City-wide sewage treatment plant, comprehensive ring-road asphalt overlay' },
                ].map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBudgetBand(b.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedBudgetBand === b.id
                        ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{b.label}</span>
                      {selectedBudgetBand === b.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{b.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5"
                >
                  Continue to Ward Targeting <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Targeting */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 3: Equity & Spatial Targeting Focus
                </h3>
                <p className="text-xs text-slate-500">Choose how the project should be prioritized geographically.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'weakest', label: 'Underprivileged / Lowest WDI Wards (Wards 4, 3, 11)', desc: 'Prioritize equity to lift wards scoring below 60 on the Ward Development Index' },
                  { id: 'commercial', label: 'Commercial Economic Core (Bazar & Bus Stand)', desc: `Prioritize transit speeds, trade, and economic vibrancy for ${currentCity?.cityName || 'municipal'} town center` },
                  { id: 'citywide', label: 'City-Wide Saturation Benefit', desc: `Prioritize projects serving all ${currentCity?.totalPopulation?.toLocaleString('en-IN') || 'citizens'} (e.g. SCADA water automation)` },
                ].map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTargetZone(t.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTargetZone === t.id
                        ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{t.label}</span>
                      {selectedTargetZone === t.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{t.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Recommended Tender
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* OUTPUT VIEW: AI GENERATED TENDER BRIEF */
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Optimal Next Municipal Work Identified
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Ward 4 Indira Nagar RCC Box Drain & Outfall Culvert
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Target: Ward 4 (Indira Nagar) • Department: Drainage & Sewerage
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">Recommended CapEx</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                ₹1.25 Crore
              </span>
              <span className="text-xs font-bold text-blue-600 block">Impact Score: 96/100</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              AI Synthesized Decision Justification:
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ward 4 ranks lowest in composite index (49.6/100) across {currentCity?.cityName || 'the municipality'}. Over 54 citizen complaints were logged in the monsoon season. Due to the 2.8m elevation dip behind the local primary school, heavy rains trigger overflow that shuts school access and floods 3,200 plinths. Constructing this 1.8km RCC box drain directly utilizes 15th Finance Commission Tied Grants before expiry and solves the single highest disaster hazard in the city.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
              <span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase block">Citizens Benefited</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">18,200</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase block">Flood Risk Mitigation</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">74%</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
              <span className="text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase block">Cost Per Beneficiary</span>
              <span className="text-lg font-black text-purple-600 dark:text-purple-400">₹686</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setIsGenerated(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Edit Parameters
            </button>

            {sanctioned ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Sanctioned & Tender Added to Tracker
              </span>
            ) : (
              <button
                onClick={handleSanctionNewTender}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                Sanction Project Tender Now
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
