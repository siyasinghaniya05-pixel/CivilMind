'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Compass,
  AlertTriangle,
  Award,
  ChevronLeft,
  Quote,
  Flame,
  Check,
  Cpu,
  Radio,
  Eye
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView } = useCivic();

  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Live interactive preview tab state
  const [activePreviewTab, setActivePreviewTab] = useState<'map' | 'ai' | 'budget'>('map');

  // Stats counter simulation
  const [citiesCount, setCitiesCount] = useState(0);
  const [citizensCount, setCitizensCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [budgetCount, setBudgetCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCitiesCount(100);
      setCitizensCount(10);
      setProjectsCount(500);
      setBudgetCount(500);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      name: 'Rajesh Patil',
      role: 'Chief Officer',
      org: 'Kalamb Nagar Parishad',
      avatar: 'RP',
      color: 'from-blue-600 to-indigo-600',
      text: 'CivicMind AI eliminated 3 months of committee debates. Within 48 hours of feeding our ward data, we had an objective, consensus-backed priority list for our ₹12 Cr 15th FC capital funds.',
      highlight: '3 months of debates eliminated in 48 hours'
    },
    {
      name: 'Dr. Sunita Kulkarni',
      role: 'Urban Planner & Advisor',
      org: 'State Municipal Administration Bureau',
      avatar: 'SK',
      color: 'from-purple-600 to-pink-600',
      text: 'The predictive risk engine forecasted monsoon backwater flooding in low-lying wards before it hit the news. The GIS resolution maps give municipal engineers iron-clad data to justify sanctions.',
      highlight: 'Forecasted flood events before news coverage'
    },
    {
      name: 'Anil Deshmukh',
      role: 'Municipal Engineer',
      org: 'Yavatmal Municipal Council',
      avatar: 'AD',
      color: 'from-emerald-600 to-teal-600',
      text: 'The Budget Simulator lets us test different capital allocation scenarios live in front of the council. It transformed public spending into a measurable science of citizen welfare.',
      highlight: 'Transformed spending into measurable science'
    }
  ];

  return (
    <div className="min-h-screen bg-[#060813] text-zinc-100 antialiased overflow-x-hidden selection:bg-blue-500 selection:text-white font-sans relative">
      {/* BACKGROUND MESH GRADIENTS & FLOATING GLOW BLOBS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Blob 1: Blue/Cyan Top Left */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-transparent blur-[140px] animate-pulse" />
        
        {/* Blob 2: Purple/Pink Center Right */}
        <div className="absolute top-[20%] -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/25 via-pink-600/20 to-transparent blur-[150px] animate-pulse [animation-delay:3s]" />
        
        {/* Blob 3: Orange/Yellow Bottom Left */}
        <div className="absolute top-[60%] -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-orange-600/15 via-purple-600/15 to-transparent blur-[140px]" />
        
        {/* Blob 4: Cyan/Emerald Deep Bottom */}
        <div className="absolute -bottom-20 right-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-cyan-500/20 via-blue-600/20 to-transparent blur-[160px]" />

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-[#060813]/70 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo with Gradient Accent */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#090d1f] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                CivicMind
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono uppercase tracking-wider">
                AI
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#preview" className="hover:text-cyan-400 transition-colors">Live Preview</a>
            <a href="#why" className="hover:text-cyan-400 transition-colors">Why CivicMind</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-cyan-400 transition-colors">Impact Stats</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">AI Features</a>
            <a href="#testimonials" className="hover:text-cyan-400 transition-colors">Testimonials</a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setCurrentView('auth')}
              className="relative group p-[1.5px] rounded-xl overflow-hidden shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/30 transition-shadow"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 rounded-xl transition-all duration-300 group-hover:scale-105" />
              <span className="relative block px-5 py-2 rounded-[11px] bg-[#090d1f] group-hover:bg-transparent text-white font-semibold text-sm transition-colors">
                Get Started
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1: FULL-SCREEN HERO */}
      <section className="relative z-10 min-h-[calc(100vh-4.5rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Futuristic Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md shadow-inner text-xs font-medium text-cyan-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>Next-Gen Development Intelligence for Indian Urban Local Bodies</span>
          </motion.div>

          {/* Headline with Glowing Gradient */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]"
          >
            Build Smarter Cities <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              with AI
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            AI-powered development intelligence helping municipalities make better decisions, optimize budgets, and improve citizen impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => setCurrentView('auth')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('preview');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-base border border-white/15 backdrop-blur-xl hover:border-white/30 transition-all flex items-center justify-center gap-2.5"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Watch Demo</span>
            </button>
          </motion.div>
        </div>

        {/* HERO CITY VISUALIZATION WITH 4 FLOATING ANIMATED CARDS */}
        <div className="w-full max-w-6xl mx-auto mt-16 relative">
          {/* Main Visualizer Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/15 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 shadow-[0_25px_80px_-15px_rgba(37,99,235,0.3)]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 px-3 border-b border-white/10 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-[11px] text-zinc-400">civicmind.ai/smart-city-canvas</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-[11px]">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                <span>Live Spatial Mesh: Active</span>
              </div>
            </div>

            {/* Futuristic 2.5D City Visualization Canvas */}
            <div className="relative h-[380px] sm:h-[480px] rounded-2xl bg-[#090e24] overflow-hidden border border-white/10 p-6 flex flex-col justify-between">
              {/* Isometric glowing grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf615_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Glowing Nodes & City Hubs */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      Arterial Road Network
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      PDI: 78
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '78%' }} />
                  </div>
                  <p className="text-[11px] text-zinc-400">18.4 km monitored via smart telemetry</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      Drainage Basin Hydrodynamics
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Outfall Cleared
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '92%' }} />
                  </div>
                  <p className="text-[11px] text-zinc-400">Stormwater flood gates calibrated</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      Water Distribution Telemetry
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      98.2 PSI
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: '88%' }} />
                  </div>
                  <p className="text-[11px] text-zinc-400">Feeder line pressure stabilized</p>
                </div>
              </div>

              {/* Central Map Illustration with Glowing Connection Vectors */}
              <div className="relative z-10 flex-1 my-4 rounded-xl bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-zinc-950/50 border border-white/10 flex items-center justify-center p-6 text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-0.5 mx-auto shadow-2xl shadow-cyan-500/30 flex items-center justify-center">
                    <div className="w-full h-full bg-[#060813] rounded-[14px] flex items-center justify-center">
                      <Globe2 className="w-8 h-8 text-cyan-300 animate-spin [animation-duration:20s]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Integrated City Intelligence Grid
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Real-time synthesis across 4,500+ Indian urban local bodies combining OpenStreetMap vectors, census cohorts, and municipal grants.
                  </p>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
                <span className="text-zinc-300">Selected Hub: <strong>Kalamb Nagar Parishad</strong> (Dist. Yavatmal)</span>
                <span className="text-cyan-400 font-mono">Development Health: 82/100 • Low Risk</span>
              </div>
            </div>
          </motion.div>

          {/* 4 FLOATING ANIMATED CARDS (Requested explicitly) */}
          {/* 1. Road Risk Detected */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -left-4 sm:-left-8 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#0e122b]/90 backdrop-blur-xl border border-red-500/40 shadow-2xl shadow-red-500/20 max-w-[220px]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase block">Hazard Alert</span>
                <h4 className="text-xs font-bold text-white">Road Risk Detected</h4>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Ward 4 main market corridor pothole index 84%</p>
          </motion.div>

          {/* 2. Budget Optimized */}
          <motion.div 
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -top-6 -right-4 sm:-right-8 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#0e122b]/90 backdrop-blur-xl border border-emerald-500/40 shadow-2xl shadow-emerald-500/20 max-w-[230px]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Pareto Solved</span>
                <h4 className="text-xs font-bold text-white">Budget Optimized</h4>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">₹5 Cr allocated across 4 vital sectors with +9.4 pt lift</p>
          </motion.div>

          {/* 3. Development Score +12% */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-8 -left-2 sm:left-6 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#0e122b]/90 backdrop-blur-xl border border-blue-500/40 shadow-2xl shadow-blue-500/20 max-w-[210px]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block">Annual Growth</span>
                <h4 className="text-xs font-bold text-white">Score +12%</h4>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Leading state urban development index</p>
          </motion.div>

          {/* 4. 18,000 Citizens Benefited */}
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute -bottom-8 -right-2 sm:right-6 z-20 p-3.5 sm:p-4 rounded-2xl bg-[#0e122b]/90 backdrop-blur-xl border border-purple-500/40 shadow-2xl shadow-purple-500/20 max-w-[230px]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">Direct Welfare</span>
                <h4 className="text-xs font-bold text-white">18,000 Citizens</h4>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Protected from chronic monsoon flooding</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: LIVE CITY PREVIEW (Glassmorphic Mock Dashboard) */}
      <section id="preview" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Live Product Experience
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Instant Intelligence at Your Fingertips
            </h2>
            <p className="text-sm text-zinc-400">
              Explore the exact dashboard interface municipal officers and engineers interact with daily.
            </p>
          </div>

          {/* Glassmorphism Mockup Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.25)] space-y-6">
            {/* Header / Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-cyan-300 font-bold">
                  KM
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Kalamb Nagar Parishad
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Live Telemetry
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">Dist. Yavatmal, Maharashtra • 17 Wards Mapped</p>
                </div>
              </div>

              {/* View Selector Tabs */}
              <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setActivePreviewTab('map')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activePreviewTab === 'map' ? 'bg-blue-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Interactive Map
                </button>
                <button
                  onClick={() => setActivePreviewTab('ai')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activePreviewTab === 'ai' ? 'bg-purple-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  AI Recommendations
                </button>
                <button
                  onClick={() => setActivePreviewTab('budget')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activePreviewTab === 'budget' ? 'bg-cyan-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Budget Insights
                </button>
              </div>
            </div>

            {/* Dynamic Tab Body */}
            {activePreviewTab === 'map' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Visual Spatial Map Canvas */}
                <div className="lg:col-span-8 h-80 rounded-2xl bg-[#090d22] border border-white/10 p-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f620_1px,transparent_1px)] [background-size:24px_24px]" />
                  
                  {/* Ward Pins */}
                  <div className="relative z-10 grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <strong className="text-white">Ward 4</strong>
                        <span className="text-red-400 font-bold">Risk 84%</span>
                      </div>
                      <p className="text-[10px] text-zinc-300">Outfall culvert desilting needed</p>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/40 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <strong className="text-white">Ward 2</strong>
                        <span className="text-blue-400 font-bold">Active PRJ</span>
                      </div>
                      <p className="text-[10px] text-zinc-300">Market Road CC paving 65%</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <strong className="text-white">Ward 6</strong>
                        <span className="text-emerald-400 font-bold">Stable</span>
                      </div>
                      <p className="text-[10px] text-zinc-300">Feeder line pressure normal</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      Centroid: 20.4735° N, 78.3375° E
                    </span>
                    <span className="text-cyan-300 font-mono">Resolution: 1:5,000 ULB GIS</span>
                  </div>
                </div>

                {/* Side Scores */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs text-zinc-400 uppercase font-medium">City Health Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">82</span>
                      <span className="text-sm text-emerald-400 font-semibold">+3.4 pts</span>
                    </div>
                    <p className="text-xs text-zinc-400">Ranked in top 12% among Class B councils</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs text-zinc-400 uppercase font-medium">Citizen Reach</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-cyan-300">58,420</span>
                    </div>
                    <p className="text-xs text-zinc-400">100% municipal territory indexed</p>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'ai' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    #1 Priority
                  </span>
                  <h4 className="text-base font-bold text-white">Drainage Upgrade – Ward 4</h4>
                  <p className="text-xs text-zinc-400">Impact Score: 95/100 • Cost: ₹1.20 Cr</p>
                  <p className="text-xs text-zinc-300">Halts monsoon backwater stagnation for 12,000 residents before heavy precipitation.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    #2 Priority
                  </span>
                  <h4 className="text-base font-bold text-white">Road Rehabilitation – Ward 2</h4>
                  <p className="text-xs text-zinc-400">Impact Score: 89/100 • Cost: ₹95 Lakhs</p>
                  <p className="text-xs text-zinc-300">Paves 2.4 km of critical market commercial artery carrying 34,000 daily commuters.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    #3 Priority
                  </span>
                  <h4 className="text-base font-bold text-white">Water Supply Expansion – Ward 6</h4>
                  <p className="text-xs text-zinc-400">Impact Score: 84/100 • Cost: ₹65 Lakhs</p>
                  <p className="text-xs text-zinc-300">Extends feeder pipelines to balance distribution pressure for elevated households.</p>
                </div>
              </div>
            )}

            {activePreviewTab === 'budget' && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1">
                  <span className="text-xs text-blue-300 font-semibold block">Drainage & Stormwater</span>
                  <strong className="text-2xl font-bold text-white">35%</strong>
                  <p className="text-xs text-zinc-400">₹1.75 Cr allocation</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1">
                  <span className="text-xs text-purple-300 font-semibold block">Roads & Transport</span>
                  <strong className="text-2xl font-bold text-white">30%</strong>
                  <p className="text-xs text-zinc-400">₹1.50 Cr allocation</p>
                </div>
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
                  <span className="text-xs text-cyan-300 font-semibold block">Water Supply</span>
                  <strong className="text-2xl font-bold text-white">20%</strong>
                  <p className="text-xs text-zinc-400">₹1.00 Cr allocation</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <span className="text-xs text-emerald-300 font-semibold block">Sanitation & SWM</span>
                  <strong className="text-2xl font-bold text-white">15%</strong>
                  <p className="text-xs text-zinc-400">₹0.75 Cr allocation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CIVICMIND (4 Colorful Cards with Glow) */}
      <section id="why" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
              The CivicMind Advantage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Why Forward-Thinking ULBs Choose CivicMind
            </h2>
            <p className="text-sm text-zinc-400">
              Four transformative pillars replacing political intuition with verifiable spatial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Infrastructure Intelligence */}
            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-500/30 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Infrastructure Intelligence</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Holistic asset diagnostics covering asphalt wear, drainage siltation, WTP reservoir levels, and street lighting coverage.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <span>Explore Intelligence</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Budget Optimization */}
            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 hover:border-pink-400 hover:shadow-[0_0_35px_rgba(236,72,153,0.3)] transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-pink-300 group-hover:scale-110 transition-transform">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Budget Optimization</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dynamic Pareto algorithms maximize citizen welfare per rupee of 15th Finance Commission and state grant capital.
              </p>
              <div className="pt-2 text-[11px] font-mono text-pink-400 flex items-center gap-1">
                <span>Simulate Outlays</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Risk Prediction */}
            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-orange-900/30 to-red-900/20 border border-orange-500/30 hover:border-red-400 hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/30 border border-orange-400/50 flex items-center justify-center text-orange-300 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Risk Prediction</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hydrodynamic modeling and road degradation sensors pinpoint acute hazards weeks before disaster response is required.
              </p>
              <div className="pt-2 text-[11px] font-mono text-orange-400 flex items-center gap-1">
                <span>View Risk Models</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Development Planning */}
            <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Development Planning</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Algorithmic project rankings (#1 Drainage, #2 Roads, #3 Water) ready for immediate Council Resolution sanction.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span>Generate Masterplan</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS (5-Step Timeline with Animated Connectors) */}
      <section id="how-it-works" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Seamless Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              From Raw Geography to Prioritized Impact
            </h2>
            <p className="text-sm text-zinc-400">
              5 systematic stages engineered for Chief Officers, Planners, and Council Engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4 relative group hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 font-extrabold text-sm flex items-center justify-center">
                01
              </div>
              <h4 className="text-base font-bold text-white">Select Location</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Choose any Indian Nagar Parishad, Nagar Panchayat, or Municipal Council by name or GPS.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4 relative group hover:border-purple-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400 font-extrabold text-sm flex items-center justify-center">
                02
              </div>
              <h4 className="text-base font-bold text-white">AI Analyzes Data</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ingests OpenStreetMap vectors, topography elevation, satellite imagery, and citizen grievances.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4 relative group hover:border-cyan-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 font-extrabold text-sm flex items-center justify-center">
                03
              </div>
              <h4 className="text-base font-bold text-white">Generate Insights</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Detects urgent hazard zones, ward disparity gaps, and composite Development Health scores.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4 relative group hover:border-emerald-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-sm flex items-center justify-center">
                04
              </div>
              <h4 className="text-base font-bold text-white">Prioritize Development</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Produces Multi-Criteria Decision Analysis (MCDA) tender briefs ranked by citizen impact ROI.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4 relative group hover:border-pink-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/40 text-pink-400 font-extrabold text-sm flex items-center justify-center">
                05
              </div>
              <h4 className="text-base font-bold text-white">Track Impact</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Monitors physical progress, expenditure milestones, and direct citizen quality-of-life gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CITY STATS (Animated Counters) */}
      <section id="stats" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* 100+ Cities */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {citiesCount}+
              </span>
              <h4 className="text-sm font-bold text-white">Cities Analyzed</h4>
              <p className="text-xs text-zinc-400">Across statutory Indian ULBs</p>
            </div>

            {/* 10M+ Citizens */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                {citizensCount}M+
              </span>
              <h4 className="text-sm font-bold text-white">Citizens Impacted</h4>
              <p className="text-xs text-zinc-400">Direct civic welfare coverage</p>
            </div>

            {/* 500+ Projects */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {projectsCount}+
              </span>
              <h4 className="text-sm font-bold text-white">Projects Prioritized</h4>
              <p className="text-xs text-zinc-400">High-ROI tender masterplans</p>
            </div>

            {/* ₹500Cr+ Budget */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                ₹{budgetCount}Cr+
              </span>
              <h4 className="text-sm font-bold text-white">Budget Optimized</h4>
              <p className="text-xs text-zinc-400">15th FC & state tied grants</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: AI FEATURES (Futuristic Floating Cards with Glow) */}
      <section id="features" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Core Technologies
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Enterprise AI Engines Built for Urban Governance
            </h2>
            <p className="text-sm text-zinc-400">
              State-of-the-art computational intelligence purpose-built for city planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Budget Planner</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dynamically solves multi-sector capital allocation between Drainage, Roads, Water, and Sanitation based on available budget.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Infrastructure Risk Engine</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Neural risk assessment predicting drainage chokes, structural pavement fatigue, and water pipeline pressure loss.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Development Score</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Synthesizes a standardized 0-100 composite municipal index reflecting equity, civic services, and capital asset condition.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Project Prioritization</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Multi-Criteria Decision Analysis (MCDA) ranks tenders by affected population density, cost-benefit ratio, and urgency.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">GIS Intelligence</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Interactive OpenStreetMap spatial canvas displaying boundary polygons, physical assets, hazard zones, and active tenders.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Predictive Analytics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Autonomous AI copilot that synthesizes instant answers for capital questions like "How should ₹10 Cr be allocated?".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS (Modern Glass Carousel) */}
      <section id="testimonials" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400 font-mono">
              Validated in Governance
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Trusted by Decision Makers
            </h2>
            <p className="text-sm text-zinc-400">
              Hear from Chief Officers, Urban Planners, and Engineers using CivicMind AI.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 shadow-2xl space-y-6">
            <Quote className="w-10 h-10 text-cyan-400/40" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg sm:text-2xl font-medium text-zinc-100 leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonials[activeTestimonial].color} flex items-center justify-center text-white font-bold text-base shadow-md`}>
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].org}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    {testimonials[activeTestimonial].highlight}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA (Vibrant Gradient Canvas) */}
      <section className="py-28 relative z-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 sm:p-16 relative overflow-hidden bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-cyan-900/60 border border-white/20 backdrop-blur-2xl text-center space-y-8 shadow-[0_25px_80px_rgba(37,99,235,0.3)]">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/30 blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-pink-500/30 blur-[100px]" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              Ready for Pilot Deployment
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Start Building Better Cities Today
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed">
              Empower your council with automated spatial intelligence, audit-proof budget optimization, and AI hazard forecasting.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('auth')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-zinc-950 font-bold text-base shadow-xl hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </button>

            <button
              onClick={() => setCurrentView('location-setup')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all"
            >
              Explore Any City Now
            </button>
          </div>

          <div className="relative z-10 flex items-center justify-center gap-6 text-xs text-zinc-300 pt-2 font-mono">
            <span>✓ Zero Setup Fees</span>
            <span>✓ Instant GIS Detection</span>
            <span>✓ 15th FC Audit Aligned</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 relative z-10 border-t border-white/10 bg-[#03050c] text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-white">CivicMind AI</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Next-Generation Government-Tech</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security & Audits</a>
            <a href="mailto:contact@civicmind.ai" className="hover:text-white transition-colors">contact@civicmind.ai</a>
          </div>

          <p className="text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} CivicMind AI Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
