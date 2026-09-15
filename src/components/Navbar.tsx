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
  AlertTriangle,
  MapPin,
  Layers,
  Building
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenNewProjectModal: () => void }> = ({ onOpenNewProjectModal }) => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    setActiveTab, 
    currentCity, 
    setIsCityModalOpen, 
    risks,
    tenantLevel,
    setTenantLevel
  } = useCivic();

  const criticalRisksCount = risks.filter(r => r.severity === 'Critical').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm transition-colors">
      <div className="flex h-16 items-center justify-between px-3 lg:px-6 gap-2">
        {/* Left branding */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-emerald-600 text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-800 to-emerald-600 dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400 bg-clip-text text-transparent">
                CivicMind AI
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40">
                <ShieldCheck className="w-3 h-3" /> Pan-India SaaS
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Universal Development Intelligence for Indian Municipalities & Districts
            </p>
          </div>
        </div>

        {/* Center: Dynamic City Switcher & Multi-Tenant Level Pill */}
        <div className="flex items-center gap-2">
          {/* Active City Pill - Click to open City Selector Modal */}
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 border border-slate-200 dark:border-slate-700 transition-all text-left group"
          >
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="truncate max-w-[140px] sm:max-w-[220px]">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1">
                {currentCity.cityName} {currentCity.ulbType}
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {currentCity.district}, {currentCity.state} • {currentCity.totalPopulation.toLocaleString('en-IN')} Pop
              </p>
            </div>
          </button>

          {/* Multi-Tenant Level Switcher (Municipality / District / State) */}
          <div className="hidden xl:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] font-bold">
            <button
              onClick={() => {
                setTenantLevel('municipality');
                setActiveTab('overview');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                tenantLevel === 'municipality'
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Municipality
            </button>
            <button
              onClick={() => {
                setTenantLevel('district');
                setActiveTab('multi-tenant');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                tenantLevel === 'district'
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              District
            </button>
            <button
              onClick={() => {
                setTenantLevel('state');
                setActiveTab('multi-tenant');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                tenantLevel === 'state'
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              State
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick Create Project Tender */}
          <button
            onClick={onOpenNewProjectModal}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Tender</span>
          </button>

          {/* Quick AI Wizard Button */}
          <button
            onClick={() => setActiveTab('wow-build-next')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>What To Build Next?</span>
          </button>

          {/* Risk Alert Bell */}
          <button
            onClick={() => setActiveTab('risk-prediction')}
            title={`${criticalRisksCount} Critical Risks Detected`}
            className="relative p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {criticalRisksCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
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
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Officer Profile Badge */}
          <div className="hidden 2xl:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
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
