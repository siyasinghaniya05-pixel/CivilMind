'use client';

import React from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Building2, 
  Sun, 
  Moon, 
  Bell, 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  ChevronDown,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenNewProjectModal: () => void }> = ({ onOpenNewProjectModal }) => {
  const { isDarkMode, toggleDarkMode, setActiveTab, stats, risks } = useCivic();

  const criticalRisksCount = risks.filter(r => r.severity === 'Critical').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm transition-colors">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-emerald-600 text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-800 to-emerald-600 dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400 bg-clip-text text-transparent">
                CivicMind AI
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40">
                <ShieldCheck className="w-3 h-3" /> Gov Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              AI-Powered Development Intelligence for Municipal Councils & Nagar Parishads
            </p>
          </div>
        </div>

        {/* Center: Municipal Jurisdiction Switcher */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              {stats.cityName} Nagar Parishad
              <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                ({stats.district}, {stats.state})
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Pop: {stats.totalPopulation.toLocaleString('en-IN')} | {stats.totalWards} Wards | FY 2026-27
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Create Project Tender */}
          <button
            onClick={onOpenNewProjectModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Project</span>
          </button>

          {/* Quick AI Wizard Button */}
          <button
            onClick={() => setActiveTab('wow-build-next')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">What To Build Next?</span>
          </button>

          {/* Risk Alert Bell */}
          <button
            onClick={() => setActiveTab('risk-prediction')}
            title={`${criticalRisksCount} Critical Infrastructure Risks Detected`}
            className="relative p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {criticalRisksCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                {criticalRisksCount}
              </span>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Theme"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* Officer Profile Badge */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow">
              CO
            </div>
            <div className="text-left text-xs leading-tight">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Smt. Ananya Patil</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Chief Officer (Class I)</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
