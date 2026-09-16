'use client';

import React, { useState, useEffect } from 'react';
import { useCivic } from '@/context/CivicContext';
import { PRE_INDEXED_CITIES, generateCityIntelligence } from '@/services/cityIntelligenceEngine';
import { CityProfile, UserRole } from '@/types';
import { 
  Building2, 
  MapPin, 
  Search, 
  TrendingUp, 
  ShieldAlert, 
  IndianRupee, 
  Users, 
  Layers, 
  CheckCircle2, 
  Activity, 
  BarChart3, 
  FileText, 
  ChevronRight, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ArrowRight, 
  Navigation, 
  Lock, 
  Sparkles, 
  Bell, 
  ExternalLink,
  ChevronDown,
  Award,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, loginUser, completeLocationSetup } = useCivic();

  // Search input in City Explorer
  const [explorerSearch, setExplorerSearch] = useState('');
  const [searchedCityPreview, setSearchedCityPreview] = useState<CityProfile | null>(null);

  // Hero direct Login/Register panel state (MahaDBT style)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('chief.officer@kalamb.gov.in');
  const [authPassword, setAuthPassword] = useState('••••••••••••');
  const [authName, setAuthName] = useState('Rajesh Patil');
  const [authOrg, setAuthOrg] = useState('Kalamb Nagar Parishad');
  const [authRole, setRole] = useState<UserRole>('Chief Officer');

  // Animated counters
  const [citiesCount, setCitiesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [budgetCount, setBudgetCount] = useState(0);
  const [citizensCount, setCitizensCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCitiesCount(500);
      setProjectsCount(10000);
      setBudgetCount(500);
      setCitizensCount(25);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Notice & Updates tab state
  const [activeNoticeTab, setActiveNoticeTab] = useState<'all' | 'announcements' | 'alerts'>('all');

  const notices = [
    {
      id: 1,
      category: 'announcements',
      date: '15 Sep 2026',
      title: 'Advisory on 15th Finance Commission Tied Grant Utilization for FY 2026-27',
      desc: 'All Nagar Parishads and Municipal Councils must upload GIS drainage master plans before Q3 capital disbursement.',
      badge: 'NEW',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 2,
      category: 'alerts',
      date: '14 Sep 2026',
      title: 'Pre-Monsoon Flood Hazard & Drainage Desilting Audit Directive',
      desc: 'High-risk low basin contours identified across Wardha, Yavatmal, and Vidarbha district ULBs require immediate desilting tenders.',
      badge: 'URGENT',
      badgeColor: 'bg-red-100 text-red-800'
    },
    {
      id: 3,
      category: 'announcements',
      date: '10 Sep 2026',
      title: 'State ULB Development Index (WDI) Baseline Report Released',
      desc: 'Comparative ranking methodology updated with sub-meter satellite infrastructure condition verification.',
      badge: 'REPORT',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 4,
      category: 'alerts',
      date: '08 Sep 2026',
      title: 'Smart Street Lighting LED Transition Mandate for Class B & C Councils',
      desc: 'Automated telemetry and dark spot mapping integration enabled on CivicMind AI GIS portal.',
      badge: 'CIRCULAR',
      badgeColor: 'bg-amber-100 text-amber-800'
    }
  ];

  const filteredNotices = notices.filter(n => {
    if (activeNoticeTab === 'all') return true;
    return n.category === activeNoticeTab;
  });

  const handleHeroAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name: authName,
      email: authEmail,
      organization: authOrg,
      role: authRole
    });
  };

  const handleUseCurrentLocation = () => {
    loginUser({
      name: 'Municipal Official',
      email: 'officer@ulb.gov.in',
      organization: 'Local Nagar Parishad',
      role: 'Chief Officer'
    });
  };

  const handleDirectCitySelect = (cityName: string) => {
    const matched = PRE_INDEXED_CITIES.find(c => c.cityName.toLowerCase() === cityName.toLowerCase());
    if (matched) {
      completeLocationSetup(matched);
    } else {
      const synthesized = generateCityIntelligence(cityName);
      completeLocationSetup(synthesized.profile);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* 1. TOP GOVERNMENT HEADER */}
      <div className="bg-[#0f172a] text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Government Portal Tag */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white">Government Technology Platform</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">Government of India / State Urban Local Bodies</span>
          </div>

          {/* Center: Mission */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <span className="text-blue-400 font-medium">AI-Powered Development Intelligence</span>
            <span className="text-slate-600">•</span>
            <span>Empowering Nagar Parishads & Councils</span>
          </div>

          {/* Right: Help Desk & Support Links */}
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#helpdesk" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Toll Free: 1800-120-8040</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href="#helpdesk" className="hover:text-white transition-colors">Help Desk</a>
            <span className="text-slate-700">|</span>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 font-mono">A+ A-</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo with Indian National Gov-Tech Styling */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-900 border border-blue-800 flex items-center justify-center text-white shadow-xs">
              <Building2 className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-blue-950 font-serif">
                  CivicMind
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase font-mono">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none">
                Development Intelligence Platform
              </p>
            </div>
          </div>

          {/* Nav Menu */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <a href="#hero" className="text-blue-700 hover:text-blue-900 transition-colors">Home</a>
            <a href="#explorer" className="hover:text-blue-700 transition-colors">Cities</a>
            <a href="#services" className="hover:text-blue-700 transition-colors">Solutions</a>
            <a href="#services" className="hover:text-blue-700 transition-colors">Departments</a>
            <a href="#notices" className="hover:text-blue-700 transition-colors">Resources</a>
            <a href="#success" className="hover:text-blue-700 transition-colors">Case Studies</a>
            <a href="#helpdesk" className="hover:text-blue-700 transition-colors">Help Desk</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 rounded-lg text-xs font-bold text-blue-900 hover:bg-blue-50 border border-blue-200 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 shadow-xs transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Register</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION WITH DIRECT LOGIN / REGISTER PANEL (MahaDBT Style) */}
      <section id="hero" className="relative bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white py-12 lg:py-16 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 7 Columns: Headline, Mission & Interactive Visualizer */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-700 text-xs font-semibold text-blue-200">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ministry of Housing & Urban Affairs Aligned</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                AI-Powered Development Intelligence Platform for <span className="text-blue-300 underline decoration-emerald-400 decoration-4 underline-offset-4">Small Cities</span>
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Helping Nagar Parishads and Municipal Councils make smarter infrastructure, budget and development decisions through automated GIS analytics and citizen impact modeling.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setCurrentView('location-setup')}
                  className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('explorer');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-blue-300" />
                  <span>Explore Any City</span>
                </button>
              </div>

              {/* Interactive City Intelligence Illustration Card */}
              <div className="pt-4">
                <div className="rounded-2xl bg-slate-900/90 border border-blue-800/60 p-4 shadow-xl space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="font-bold text-blue-200 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      Live Municipal Intelligence Telemetry
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Kalamb Nagar Parishad (MH)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block font-medium">Road Quality Index</span>
                      <strong className="text-sm font-bold text-white">74 / 100</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block font-medium">Wards Mapped</span>
                      <strong className="text-sm font-bold text-blue-300">17 Wards</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block font-medium">Development Score</span>
                      <strong className="text-sm font-bold text-emerald-400">78 / 100</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      <span className="text-[10px] text-slate-400 block font-medium">#1 AI Priority</span>
                      <strong className="text-xs font-bold text-amber-300">Drainage Upgrade</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Direct LOGIN / REGISTER Panel (Exactly like MahaDBT) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-7 text-slate-900 space-y-5">
                {/* Header */}
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-blue-950">
                      Municipal Officer Portal
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Direct ULB Authentication & Setup
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>

                {/* Login / Register Tab Switcher */}
                <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      authMode === 'login' 
                        ? 'bg-blue-800 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    User Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      authMode === 'register' 
                        ? 'bg-blue-800 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    New Registration
                  </button>
                </div>

                {/* Direct Form */}
                <form onSubmit={handleHeroAuthSubmit} className="space-y-3.5 text-xs">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Full Name of Officer
                      </label>
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="e.g. Rajesh Patil"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Official Email / Mobile No.
                    </label>
                    <input
                      type="text"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="chief.officer@kalamb.gov.in"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Municipality / Nagar Parishad Name
                    </label>
                    <input
                      type="text"
                      required
                      value={authOrg}
                      onChange={(e) => setAuthOrg(e.target.value)}
                      placeholder="e.g. Kalamb Nagar Parishad"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{authMode === 'login' ? 'Login & Continue' : 'Submit Registration'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                {/* Direct GPS / Current Location button */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-700" />
                    <span>Use Current Location</span>
                  </button>
                </div>

                {/* One-click Demo evaluation fast-track */}
                <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900 flex items-center justify-between">
                  <span>Fast Track Demo:</span>
                  <button
                    type="button"
                    onClick={() => {
                      loginUser({
                        name: 'Rajesh Patil',
                        email: 'chief.officer@kalamb.gov.in',
                        organization: 'Kalamb Nagar Parishad',
                        role: 'Chief Officer'
                      });
                    }}
                    className="font-bold underline text-blue-800 hover:text-blue-950"
                  >
                    Login as Chief Officer →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LIVE STATISTICS SECTION */}
      <section className="py-12 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-900">
                {citiesCount}+
              </span>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Cities Analyzed
              </h3>
              <p className="text-[11px] text-slate-500">Nagar Parishads & Panchayats</p>
            </div>

            {/* Stat 2 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700">
                {projectsCount.toLocaleString('en-IN')}+
              </span>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Projects Evaluated
              </h3>
              <p className="text-[11px] text-slate-500">MCDA Impact Scoring</p>
            </div>

            {/* Stat 3 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-900">
                ₹{budgetCount} Cr+
              </span>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Budget Optimized
              </h3>
              <p className="text-[11px] text-slate-500">15th Finance Commission Grants</p>
            </div>

            {/* Stat 4 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700">
                {citizensCount} Lakhs+
              </span>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Citizens Impacted
              </h3>
              <p className="text-[11px] text-slate-500">Direct Infrastructure Welfare</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOTICE & UPDATES (Exactly like MahaDBT Notice Board) */}
      <section id="notices" className="py-12 bg-slate-100/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  <Bell className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-950 uppercase tracking-wide">
                    Notice Board & Latest Circulars
                  </h2>
                  <p className="text-xs text-slate-500">
                    Official announcements, city reports, and infrastructure alerts
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex p-1 rounded-lg bg-slate-100 text-xs font-bold">
                <button
                  onClick={() => setActiveNoticeTab('all')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeNoticeTab === 'all' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  All Updates
                </button>
                <button
                  onClick={() => setActiveNoticeTab('announcements')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeNoticeTab === 'announcements' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Announcements
                </button>
                <button
                  onClick={() => setActiveNoticeTab('alerts')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeNoticeTab === 'alerts' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Hazard Alerts
                </button>
              </div>
            </div>

            {/* Scrollable Notice Stream */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 pr-2 space-y-2">
              {filteredNotices.map((notice) => (
                <div key={notice.id} className="pt-3 pb-2 flex items-start justify-between gap-4 hover:bg-slate-50 p-2 rounded-lg transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${notice.badgeColor}`}>
                        {notice.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {notice.date}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-blue-950 hover:text-blue-700 cursor-pointer">
                      {notice.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {notice.desc}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION (6 Large Clickable Cards) */}
      <section id="services" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider font-mono">
              Core Platform Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Integrated Municipal Development Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Engineered specifically to fulfill Urban Local Body administrative mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div 
              onClick={() => setCurrentView('auth')}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <BarChart3 className="w-5 h-5 text-blue-200" />
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-800 transition-colors">
                1. City Development Analysis
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computes ward-level development indexes, demographic heatmaps, and civic service deficiency scores for all 17+ wards.
              </p>
              <div className="pt-2 text-[11px] font-bold text-blue-800 flex items-center gap-1">
                <span>Access Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 2 */}
            <div 
              onClick={() => setCurrentView('auth')}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <IndianRupee className="w-5 h-5 text-emerald-200" />
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-800 transition-colors">
                2. Budget Planning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optimizes capital budget distribution across Roads, Drainage, Water Supply, and Sanitation to maximize citizen ROI.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <span>Access Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 3 */}
            <div 
              onClick={() => setCurrentView('auth')}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-600 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-red-800 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <ShieldAlert className="w-5 h-5 text-red-200" />
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-red-800 transition-colors">
                3. Infrastructure Risk Prediction
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Forecasts monsoon flood inundation, road rutting, and pipeline leaks weeks before failure occurs.
              </p>
              <div className="pt-2 text-[11px] font-bold text-red-700 flex items-center gap-1">
                <span>Access Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 4 */}
            <div 
              onClick={() => setCurrentView('auth')}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <MapPin className="w-5 h-5 text-blue-200" />
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-800 transition-colors">
                4. GIS Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-width OpenStreetMap spatial layers depicting ward boundaries, municipal assets, and real-time sensor points.
              </p>
              <div className="pt-2 text-[11px] font-bold text-blue-800 flex items-center gap-1">
                <span>Access Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 5 */}
            <div 
              onClick={() => setCurrentView('auth')}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-600 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Activity className="w-5 h-5 text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-slate-800 transition-colors">
                5. Project Monitoring
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Startup-grade Kanban & table pipelines tracking active tenders, contractor milestones, and site inspection logs.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-800 flex items-center gap-1">
                <span>Access Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 6 */}
            <div 
              onClick={() => setCurrentView('auth')}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <FileText className="w-5 h-5 text-emerald-200" />
              </div>
              <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-800 transition-colors">
                6. Development Dashboard
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates formal Council Resolution dossiers, multi-year masterplans (1-3-5 year), and printable municipal reports.
              </p>
              <div className="pt-2 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                <span>Access Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CITY EXPLORER */}
      <section id="explorer" className="py-16 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider font-mono">
              Spatial Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              City Explorer
            </h2>
            <p className="text-xs text-slate-500">
              Enter any Indian city or click a municipal profile below to launch intelligence.
            </p>
          </div>

          {/* Search Box */}
          <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-300 shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={explorerSearch}
                onChange={(e) => setExplorerSearch(e.target.value)}
                placeholder="Search City, Nagar Parishad, Nagar Panchayat (e.g. Kalamb, Yavatmal, Wardha, Pandharkawda)"
                className="w-full pl-12 pr-28 py-3 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <button
                onClick={() => {
                  if (explorerSearch.trim()) {
                    handleDirectCitySelect(explorerSearch.trim());
                  }
                }}
                className="absolute right-2 top-2 px-4 py-1.5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs"
              >
                Analyze
              </button>
            </div>

            {/* Quick Clickable Examples */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Quick Municipal Profiles:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: 'Kalamb', type: 'Nagar Parishad', dist: 'Yavatmal' },
                  { name: 'Yavatmal', type: 'Municipal Council', dist: 'Yavatmal' },
                  { name: 'Wardha', type: 'Municipal Council', dist: 'Wardha' },
                  { name: 'Pandharkawda', type: 'Nagar Parishad', dist: 'Yavatmal' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleDirectCitySelect(item.name)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-950 group-hover:text-blue-800">
                        {item.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-800 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[10px] text-slate-500 block">{item.type}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{item.dist} Dist.</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SUCCESS STORIES (Case Studies) */}
      <section id="success" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
              Proven Municipal Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Government Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Measurable development outcomes achieved across pilot Urban Local Bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Case 1: Yavatmal */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded">
                  Municipal Council
                </span>
                <span className="text-xs font-bold text-emerald-700">Verified Audit</span>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950">
                  Yavatmal Municipal Council
                </h3>
                <p className="text-xs text-slate-500">Class A Council • Maharashtra</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-center">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Development Score</span>
                  <strong className="text-base font-extrabold text-emerald-700">+18%</strong>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Budget Savings</span>
                  <strong className="text-base font-extrabold text-blue-900">₹1.2 Cr</strong>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pareto capital solver redirected 15th FC tied funds to clear chronic arterial freight road bottlenecks and desilt outfall culverts.
              </p>
            </div>

            {/* Case 2: Kalamb */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded">
                  Nagar Parishad
                </span>
                <span className="text-xs font-bold text-emerald-700">Pre-Monsoon Success</span>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950">
                  Kalamb Nagar Parishad
                </h3>
                <p className="text-xs text-slate-500">Class B Council • 17 Wards</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-center">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Flood Protection</span>
                  <strong className="text-base font-extrabold text-emerald-700">12,000</strong>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">DPR Sanction</span>
                  <strong className="text-base font-extrabold text-blue-900">48 Hours</strong>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated risk engine identified Ward 4 nullah backflow and sanctioned RCC box drain before heavy precipitation window.
              </p>
            </div>

            {/* Case 3: Jejuri */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded">
                  Pilgrim Council
                </span>
                <span className="text-xs font-bold text-emerald-700">Peak Transit</span>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950">
                  Jejuri Nagar Parishad
                </h3>
                <p className="text-xs text-slate-500">Pune District • Pilgrimage Hub</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-center">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Corridor Transit</span>
                  <strong className="text-base font-extrabold text-emerald-700">3x Faster</strong>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">CapEx Saved</span>
                  <strong className="text-base font-extrabold text-blue-900">₹85 Lakhs</strong>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yatra pilgrimage corridor storm drainage and mobile sanitation deployment optimized with zero public grievances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HELP DESK SECTION */}
      <section id="helpdesk" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
              Dedicated Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Municipal Help Desk & Official Assistance
            </h2>
            <p className="text-xs text-slate-400">
              Assisting Chief Officers, Town Planners, and Council Engineers across all working hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Help 1: Helpline */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase">Toll-Free Helpline</h4>
              <p className="text-base font-extrabold text-emerald-400">1800-120-8040</p>
              <p className="text-[11px] text-slate-400">Direct municipal inquiry line</p>
            </div>

            {/* Help 2: Email */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase">Official Email</h4>
              <p className="text-xs font-bold text-blue-300 truncate">support@civicmind.gov.in</p>
              <p className="text-[11px] text-slate-400">helpdesk@civicmind.ai</p>
            </div>

            {/* Help 3: Office Hours */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase">Office Working Hours</h4>
              <p className="text-xs font-bold text-white">09:30 AM – 06:00 PM IST</p>
              <p className="text-[11px] text-slate-400">Monday to Friday (Govt. Days)</p>
            </div>

            {/* Help 4: Live Chat */}
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase">Live Chat Desk</h4>
              <button
                onClick={() => setCurrentView('location-setup')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Start Officer Chat
              </button>
              <p className="text-[11px] text-slate-400">Instant AI Copilot resolution</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GOVERNMENT FOOTER */}
      <footer id="contact" className="py-10 bg-[#070b14] text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span className="font-extrabold text-white text-sm">CivicMind AI Platform</span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-slate-400">National Municipal Intelligence Initiative</span>
            </div>

            <div className="flex items-center gap-6 text-[11px]">
              <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Hyperlinking Policy</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} CivicMind AI Technologies. Developed for Urban Local Bodies of India.</p>
            <p>Designed in compliance with GIGW (Guidelines for Indian Government Websites).</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
