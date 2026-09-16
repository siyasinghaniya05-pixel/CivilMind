'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Calendar,
  Share2,
  FileSpreadsheet
} from 'lucide-react';

export const ReportGenerator: React.FC = () => {
  const { stats, wards, projects, departmentBudgets, aiRecommendations, currentCity } = useCivic();

  const [reportType, setReportType] = useState<'development' | 'budget' | 'ward' | 'resolution'>('development');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Non-printable Control Header */}
      <div className="no-print p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <FileText className="w-3.5 h-3.5" /> Module 9: Municipal Report Generator
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Official Council Resolutions & Statutory Dossier Generator
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Produce one-click PDF & printable reports formatted to Maharashtra Municipal Councils Act standards.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Report Type Selector (no-print) */}
      <div className="no-print flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        {[
          { id: 'development', label: '1. Annual Development Comprehensive Report' },
          { id: 'budget', label: '2. Budget Allocation & 15th FC Audit Statement' },
          { id: 'ward', label: '3. Ward Development Index (WDI) Scorecard' },
          { id: 'resolution', label: '4. Council General Body Sanction Resolution (ठराव)' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setReportType(t.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              reportType === t.id
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Official Government Printable Document Canvas */}
      <div className="bg-white text-slate-900 dark:bg-white dark:text-slate-900 p-8 lg:p-12 rounded-2xl border border-slate-300 shadow-xl max-w-4xl mx-auto space-y-8 font-serif print:shadow-none print:border-none print:p-0">
        {/* Official Header */}
        <div className="text-center border-b-2 border-slate-800 pb-6 space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-slate-800 mb-1 font-sans font-black text-xs">
            शासन
          </div>
          <h2 className="text-xl font-black tracking-wide uppercase">
            {currentCity?.cityName || 'स्थानिक स्वराज्य संस्था'} {currentCity?.ulbType || 'नगर परिषद'}
          </h2>
          <h3 className="text-base font-bold tracking-tight uppercase font-sans text-slate-800">
            {(currentCity?.ulbType || 'MUNICIPAL COUNCIL').toUpperCase()} {(currentCity?.cityName || 'SELECTED MUNICIPALITY').toUpperCase()}, DISTRICT {(currentCity?.district || 'DISTRICT ULB').toUpperCase()}
          </h3>
          <p className="text-xs font-sans text-slate-600">
            Urban Development Department • 15th Finance Commission Statutory Cycle (FY 2026-27)
          </p>
          <div className="flex justify-between items-center text-[10px] font-sans text-slate-500 pt-2 px-2">
            <span>Ref No: ULB/UDD/CIVICMIND/2026/089</span>
            <span>Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        {/* REPORT CONTENT 1: ANNUAL DEVELOPMENT REPORT */}
        {reportType === 'development' && (
          <div className="space-y-6 text-xs leading-relaxed font-sans">
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <h4 className="font-bold text-sm uppercase text-slate-900">
                Subject: Comprehensive Annual Municipal Development Plan (ADP) & Priority Sanction
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Approved by Chief Officer for submission to District Collector & District Planning Committee (DPDC).
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center border border-slate-200 p-3 rounded-lg">
              <div>
                <span className="text-[10px] text-slate-500 block">Total Population</span>
                <strong className="text-sm">{stats.totalPopulation.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Municipal Wards</span>
                <strong className="text-sm">{stats.totalWards} Wards</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Capital Outlay</span>
                <strong className="text-sm">₹{stats.totalBudgetCr.toFixed(2)} Cr</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Average WDI</span>
                <strong className="text-sm text-emerald-700">{stats.averageWdiScore}/100</strong>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                1. Executive Summary & Problem Diagnostic
              </h5>
              <p className="text-slate-700">
                {currentCity?.cityName || 'The Municipal Council'} has completed a spatial development audit leveraging CivicMind AI intelligence. The analysis revealed that despite having allocated ₹{stats.allocatedBudgetCr.toFixed(2)} Cr across active infrastructure schemes, chronic storm runoff in low-lying sectors and drainage silting pose public health and economic risks. The Council has prioritized capital works toward drainage stabilization and arterial road surfacing.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                2. Top Priority Infrastructure Works (AI MCDA Ranked)
              </h5>
              <table className="w-full text-left text-[11px] border border-slate-200">
                <thead className="bg-slate-100 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Rank</th>
                    <th className="p-2">Work Description</th>
                    <th className="p-2">Ward</th>
                    <th className="p-2">Cost (₹ Lakhs)</th>
                    <th className="p-2">Beneficiaries</th>
                    <th className="p-2">Impact Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {projects.slice(0, 5).map((p, idx) => (
                    <tr key={p.id}>
                      <td className="p-2 font-bold">#{idx + 1}</td>
                      <td className="p-2 font-semibold">{p.title}</td>
                      <td className="p-2">Ward {p.wardId}</td>
                      <td className="p-2 font-bold">₹{p.budgetLakhs} L</td>
                      <td className="p-2">{p.populationBenefited.toLocaleString('en-IN')}</td>
                      <td className="p-2 text-emerald-700 font-bold">{p.impactScore}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORT CONTENT 2: BUDGET ALLOCATION & 15th FC AUDIT */}
        {reportType === 'budget' && (
          <div className="space-y-6 text-xs leading-relaxed font-sans">
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <h4 className="font-bold text-sm uppercase text-slate-900">
                Subject: Sector-Wise Capital Budget Distribution & 15th FC Grants Statement
              </h4>
            </div>

            <table className="w-full text-left text-[11px] border border-slate-200">
              <thead className="bg-slate-100 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Infrastructure Department</th>
                  <th className="p-2.5">Allocated (₹ L)</th>
                  <th className="p-2.5">Spent (₹ L)</th>
                  <th className="p-2.5">Committed (₹ L)</th>
                  <th className="p-2.5">Projects</th>
                  <th className="p-2.5">Burn Rate %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {departmentBudgets.map((d) => (
                  <tr key={d.department}>
                    <td className="p-2.5 font-bold">{d.department}</td>
                    <td className="p-2.5 font-semibold">₹{d.allocatedLakhs} L</td>
                    <td className="p-2.5">₹{d.spentLakhs} L</td>
                    <td className="p-2.5">₹{d.committedLakhs} L</td>
                    <td className="p-2.5">{d.projectCount}</td>
                    <td className="p-2.5 font-bold text-blue-800">
                      {Math.round((d.spentLakhs / d.allocatedLakhs) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* REPORT CONTENT 3: WARD DEVELOPMENT INDEX SCORECARD */}
        {reportType === 'ward' && (
          <div className="space-y-6 text-xs leading-relaxed font-sans">
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <h4 className="font-bold text-sm uppercase text-slate-900">
                Ward Development Index (WDI) - 17 Wards Ranking Sheet
              </h4>
            </div>

            <table className="w-full text-left text-[10px] border border-slate-200">
              <thead className="bg-slate-100 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Ward Name</th>
                  <th className="p-2">Counselor</th>
                  <th className="p-2">Roads</th>
                  <th className="p-2">Water</th>
                  <th className="p-2">Drainage</th>
                  <th className="p-2">Lighting</th>
                  <th className="p-2">Sanitation</th>
                  <th className="p-2">WDI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {wards.map((w) => (
                  <tr key={w.id}>
                    <td className="p-2 font-bold">#{w.rank}</td>
                    <td className="p-2 font-semibold">Ward {w.number}: {w.name}</td>
                    <td className="p-2">{w.counselor}</td>
                    <td className="p-2">{w.scores.roadQuality}</td>
                    <td className="p-2">{w.scores.waterSupply}</td>
                    <td className="p-2">{w.scores.drainage}</td>
                    <td className="p-2">{w.scores.streetLighting}</td>
                    <td className="p-2">{w.scores.sanitation}</td>
                    <td className="p-2 font-bold text-emerald-800">{w.compositeScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* REPORT CONTENT 4: COUNCIL RESOLUTION (ठराव) */}
        {reportType === 'resolution' && (
          <div className="space-y-6 text-xs leading-relaxed font-sans">
            <div className="p-4 bg-slate-100 rounded-lg border border-slate-300 text-center">
              <h4 className="text-sm font-black uppercase text-slate-900">
                ठराव क्र. ४२/२०२६ (Council General Body Resolution)
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                विशेष सर्वसाधारण सभा • विषय क्र. ३: प्रभाग ४ इंदिरा नगर मुख्य नाला बांधकाम प्रशासकीय मान्यता
              </p>
            </div>

            <div className="space-y-3 text-slate-800">
              <p>
                <strong>प्रस्ताव:</strong> कलंब नगर परिषद कार्यक्षेत्रातील प्रभाग क्र. ४ (इंदिरा नगर) मध्ये पावसाळ्यात होणाऱ्या अतिवृष्टीमुळे पाण्याचा निचरा न झाल्याने नागरिकांचे मोठ्या प्रमाणात नुकसान होते. सिल्विकमाइंड ए.आय. (CivicMind AI) प्रणालीद्वारे तयार करण्यात आलेल्या तांत्रिक मूल्यांकन अहवालानुसार सदर प्रकल्पाची तातडीने अंमलबजावणी करणे आवश्यक आहे.
              </p>
              <p>
                <strong>ठराव:</strong> सर्वानुमते असा ठराव मंजूर करण्यात येत आहे की, प्रभाग क्र. ४ येथील मुख्य नाला आर.सी.सी. बॉक्स ड्रेन बांधकामासाठी १५ व्या वित्त आयोगाच्या बद्ध अनुदानातून (15th FC Tied Grants) रु. १,२५,००,०००/- (अक्षरी रु. एक कोटी पंचवीस लाख फक्त) रकमेस प्रशासकीय व तांत्रिक मान्यता प्रदान करण्यात येत आहे. मुख्याधिकारी व नगर अभियंता यांनी तात्काळ ई-निविदा प्रक्रिया सुरू करावी.
              </p>
              <p className="text-right pt-4">
                <strong>सूचक:</strong> श्री. रमेशराव पाटील (नगरसेवक) &nbsp;&nbsp;|&nbsp;&nbsp; <strong>अनुमोदक:</strong> सौ. वंदना देशमुख (नगरसेविका)
              </p>
            </div>
          </div>
        )}

        {/* Signatures Footer */}
        <div className="pt-12 border-t-2 border-slate-300 grid grid-cols-3 gap-8 text-center text-xs font-sans">
          <div>
            <div className="h-12 flex items-end justify-center">
              <span className="italic font-serif text-slate-400 font-bold">Sd/-</span>
            </div>
            <div className="border-t border-slate-400 pt-1">
              <p className="font-bold text-slate-900">Shri. V. K. Joshi</p>
              <p className="text-[10px] text-slate-500">Municipal Engineer</p>
              <p className="text-[9px] text-slate-400">{currentCity?.cityName || 'Municipal Council'}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-end">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-[9px] font-bold text-slate-400 uppercase text-center p-1">
              Official Council Seal
            </div>
          </div>

          <div>
            <div className="h-12 flex items-end justify-center">
              <span className="italic font-serif text-slate-400 font-bold">Sd/-</span>
            </div>
            <div className="border-t border-slate-400 pt-1">
              <p className="font-bold text-slate-900">Smt. Ananya Patil, IAS</p>
              <p className="text-[10px] text-slate-500">Chief Officer (Class I)</p>
              <p className="text-[9px] text-slate-400">{currentCity?.cityName || 'Municipal Council'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
