'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  TrendingUp, 
  ShieldAlert, 
  IndianRupee, 
  Users, 
  Layers, 
  CheckCircle2, 
  Activity, 
  BarChart3, 
  Bot, 
  FileText, 
  ChevronRight, 
  Play, 
  Building2, 
  Zap,
  Globe2,
  Clock,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView } = useCivic();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-950 antialiased flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-zinc-950">CivicMind</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 font-mono">
                AI
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-zinc-950 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-950 transition-colors">How It Works</a>
            <a href="#solutions" className="hover:text-zinc-950 transition-colors">Solutions</a>
            <a href="#benefits" className="hover:text-zinc-950 transition-colors">Benefits</a>
            <a href="#contact" className="hover:text-zinc-950 transition-colors">Contact</a>
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs hover:shadow-sm transition-all"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-medium text-blue-800">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>SaaS Platform for Nagar Parishads & Municipal Councils</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.12]">
              AI-Powered Development Intelligence for <span className="text-blue-600">Small Cities</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              Helping Nagar Parishads and Municipal Councils make smarter development decisions through AI, GIS, and data-driven planning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('auth')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all"
              >
                <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Request Demo</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Zero Setup Cost
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Pan-India ULB Coverage
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Real-Time GIS Mapping
              </span>
            </div>
          </div>

          {/* HERO ILLUSTRATION: Modern City Visualization */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-2xl bg-zinc-950 p-2 sm:p-4 shadow-2xl border border-zinc-800">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/80 text-zinc-400 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-400">civicmind.ai/city/kalamb</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-medium text-zinc-300">Live Spatial Telemetry • Kalamb, Maharashtra</span>
                </div>
              </div>

              {/* Visualization Canvas Grid */}
              <div className="bg-zinc-900 rounded-xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 text-white">
                {/* Left: Interactive Map Mockup */}
                <div className="lg:col-span-7 bg-zinc-950/80 rounded-xl border border-zinc-800 p-4 space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-200 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      Ward Boundary & Risk Vectors
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-900/60 border border-blue-700 text-blue-300 text-[10px] font-mono">
                      17 Wards Mapped
                    </span>
                  </div>

                  {/* 2.5D City Spatial Grid Representation */}
                  <div className="h-56 rounded-lg bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800/70 p-4 flex flex-col justify-between relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                    {/* Ward nodes */}
                    <div className="relative z-10 grid grid-cols-3 gap-3">
                      <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-red-500/40 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-zinc-300">Ward 4</span>
                          <span className="text-red-400 font-semibold">Risk: 84%</span>
                        </div>
                        <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: '84%' }} />
                        </div>
                        <p className="text-[9px] text-zinc-400">Drainage Choke Point</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-blue-500/40 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-zinc-300">Ward 2</span>
                          <span className="text-blue-400 font-semibold">Active: PRJ-02</span>
                        </div>
                        <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '65%' }} />
                        </div>
                        <p className="text-[9px] text-zinc-400">CC Road Re-paving</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-emerald-500/40 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-zinc-300">Ward 6</span>
                          <span className="text-emerald-400 font-semibold">Stable: 92%</span>
                        </div>
                        <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                        </div>
                        <p className="text-[9px] text-zinc-400">Water Pipeline Done</p>
                      </div>
                    </div>

                    {/* Simulation Bottom Bar */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] pt-2 border-t border-zinc-800 text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        IoT Flow & Pressure Sensors: Active
                      </span>
                      <span className="text-zinc-400 font-mono">Center: 20.4735° N, 78.3375° E</span>
                    </div>
                  </div>

                  {/* Micro metric counters */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">Development</span>
                      <strong className="text-sm font-bold text-white">74/100</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">Budget Efficiency</span>
                      <strong className="text-sm font-bold text-emerald-400">89%</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">Population</span>
                      <strong className="text-sm font-bold text-blue-400">58,420</strong>
                    </div>
                  </div>
                </div>

                {/* Right: AI Insights Stream */}
                <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Autonomous AI Copilot Insights
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-red-400">High Risk Diagnostic</span>
                        <span className="text-zinc-500">Just Now</span>
                      </div>
                      <p className="font-medium text-zinc-200">
                        "Ward 4 shows highest infrastructure risk due to primary nullah silt build-up."
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        Sanctioning ₹1.2 Cr box drain protects 12,000 residents before monsoon.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-blue-400">Budget Recommendation</span>
                        <span className="text-zinc-500">2m ago</span>
                      </div>
                      <p className="font-medium text-zinc-200">
                        "Allocate 35% of ₹5 Crore capital funds to Drainage & Sewerage."
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        Pareto optimization yields +7.8 point lift in Quality-of-Life index.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-950/70 border border-zinc-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-emerald-400">Tender Priority</span>
                        <span className="text-zinc-500">5m ago</span>
                      </div>
                      <p className="font-medium text-zinc-200">
                        "Road rehabilitation along Ward 2 market spine ready for DPR approval."
                      </p>
                    </div>
                  </div>

                  {/* Action Launch */}
                  <button
                    onClick={() => setCurrentView('auth')}
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Inspect Full City Intelligence</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 1: HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 bg-zinc-50/50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Workflow</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              How CivicMind AI Works
            </h3>
            <p className="text-sm text-zinc-500">
              From raw municipal territory to actionable, prioritized public investment in 4 straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                01
              </div>
              <h4 className="text-base font-bold text-zinc-950">Select Location</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Choose any Indian Nagar Parishad, Nagar Panchayat, or Municipal Council by city name, PIN, or GPS coordinates.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">Step 1 • Spatial Hook</div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                02
              </div>
              <h4 className="text-base font-bold text-zinc-950">Analyze City Data</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Autonomous data ingestion correlates OpenStreetMap roads, drainage topology, citizen complaints, and demographic density.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">Step 2 • Data Ingestion</div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm">
                03
              </div>
              <h4 className="text-base font-bold text-zinc-950">Generate AI Insights</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Multi-criteria scoring synthesizes infrastructure risk hazards, ward development disparities, and financial efficiency.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">Step 3 • AI Synthesis</div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs hover:border-zinc-300 transition-all space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-sm">
                04
              </div>
              <h4 className="text-base font-bold text-zinc-950">Prioritize Development</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Outputs prioritized project tender lists, dynamic budget allocations, and Council resolution-ready dossiers.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">Step 4 • Citizen Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 2: FEATURES */}
      <section id="features" className="py-20 md:py-28 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Features</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Enterprise Intelligence Built for ULB Administrators
            </h3>
            <p className="text-sm text-zinc-500">
              Modern tools replacing archaic paper registers and political guesswork with objective data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 hover:border-zinc-300 transition-all">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-zinc-950">Infrastructure Intelligence</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Comprehensive health telemetry across roads, pipelines, drainage nullahs, and LED street lighting for every ward.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 hover:border-zinc-300 transition-all">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <IndianRupee className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-zinc-950">Budget Planning & Simulation</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Interactive simulator allocates municipal outlays (e.g. ₹5 Cr or ₹10 Cr) across departments to maximize citizen benefit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 hover:border-zinc-300 transition-all">
              <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-zinc-950">Predictive Risk Modeling</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Forecasts drainage overflows, pipeline bursts, and road rutting before they trigger public crises or flood events.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 hover:border-zinc-300 transition-all">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-zinc-950">Development Prioritization</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                MCDA ranking ranks projects (#1 Drainage, #2 Roads, #3 Water) by reach, urgency, and cost per citizen benefited.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 hover:border-zinc-300 transition-all md:col-span-2">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-zinc-950">Interactive GIS Smart City Canvas</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Full-width OpenStreetMap rendering showing ward polygon boundaries, risk zones, active project tenders, and physical municipal assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: BENEFITS */}
      <section id="benefits" className="py-20 md:py-28 bg-zinc-50/50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Benefits</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Making Every Rupee of Public Money Count
            </h3>
            <p className="text-sm text-zinc-500">
              Demonstrated impact for Municipal Councils, Nagar Parishads, and District Administrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 space-y-2">
              <span className="text-3xl font-extrabold text-blue-600">+35%</span>
              <h4 className="text-sm font-bold text-zinc-950">Better Resource Allocation</h4>
              <p className="text-xs text-zinc-500">
                Directs limited grants (15th FC, SBM, AMRUT) to the most underserved ward clusters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 space-y-2">
              <span className="text-3xl font-extrabold text-emerald-600">4x</span>
              <h4 className="text-sm font-bold text-zinc-950">Faster Decision Making</h4>
              <p className="text-xs text-zinc-500">
                Council resolutions and DPR pre-feasibility reports generated in seconds rather than months.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 space-y-2">
              <span className="text-3xl font-extrabold text-zinc-900">140k+</span>
              <h4 className="text-sm font-bold text-zinc-950">Higher Citizen Impact</h4>
              <p className="text-xs text-zinc-500">
                Maximizes citizen coverage and eliminates project overlap across neighboring wards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 space-y-2">
              <span className="text-3xl font-extrabold text-blue-600">100%</span>
              <h4 className="text-sm font-bold text-zinc-950">Data-Driven Governance</h4>
              <p className="text-xs text-zinc-500">
                Objective risk matrices and audit trails insulate municipal engineers from political pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 bg-zinc-950 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to upgrade your municipality with AI intelligence?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Join Nagar Parishads across India deploying CivicMind AI for evidence-based infrastructure planning.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('auth')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
            >
              Launch Pilot Account
            </button>
            <button
              onClick={() => setCurrentView('location-setup')}
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs border border-zinc-700 transition-all"
            >
              Explore Any City Now
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer id="contact" className="py-12 bg-white border-t border-zinc-200 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-zinc-950 text-sm">CivicMind AI</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Development intelligence platform for small municipalities, Nagar Parishads, and District Administrations.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Product</h5>
              <ul className="space-y-1.5">
                <li><a href="#features" className="hover:text-zinc-900">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-zinc-900">How It Works</a></li>
                <li><a href="#benefits" className="hover:text-zinc-900">Citizen Impact</a></li>
                <li><a href="#demo" onClick={() => setDemoModalOpen(true)} className="hover:text-zinc-900">Request Demo</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Solutions</h5>
              <ul className="space-y-1.5">
                <li><span>Nagar Parishads (Class A, B, C)</span></li>
                <li><span>Nagar Panchayats</span></li>
                <li><span>District Administrations</span></li>
                <li><span>Smart City SPVs</span></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Contact & Legal</h5>
              <ul className="space-y-1.5">
                <li><span>contact@civicmind.ai</span></li>
                <li><span>+91 22 4900 2800</span></li>
                <li><a href="#" className="hover:text-zinc-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-zinc-900">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
            <p>© {new Date().getFullYear()} CivicMind AI Technologies Inc. All rights reserved.</p>
            <p>Aligned with Digital India & MoHUA Smart Cities Mission standards.</p>
          </div>
        </div>
      </footer>

      {/* Quick Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-white" />
                </div>
                <h4 className="text-sm font-bold text-zinc-950">Request Pilot Demo</h4>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 text-xs font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-zinc-600">
              Experience CivicMind AI live with your municipality's real ward boundaries and infrastructure data.
            </p>
            <div className="space-y-2.5 text-xs">
              <input
                type="text"
                placeholder="Chief Officer or Municipal Engineer Name"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs"
                defaultValue="Chief Officer"
              />
              <input
                type="text"
                placeholder="Municipality Name (e.g. Kalamb Nagar Parishad)"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs"
                defaultValue="Kalamb Nagar Parishad"
              />
              <input
                type="email"
                placeholder="Official Email Address"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs"
                defaultValue="co@kalamb.gov.in"
              />
            </div>
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setDemoModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-zinc-600 text-xs hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDemoModalOpen(false);
                  setCurrentView('location-setup');
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700"
              >
                Instant Access Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
