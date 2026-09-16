'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  IndianRupee, 
  Layers, 
  CheckCircle2, 
  Activity, 
  BarChart3, 
  FileText, 
  ChevronRight, 
  Phone, 
  Mail, 
  Lock, 
  Sparkles, 
  Bell, 
  ExternalLink,
  ChevronDown,
  Award,
  AlertTriangle,
  ShieldCheck,
  Download,
  Compass,
  Play,
  Pause,
  Eye,
  Globe,
  Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView } = useCivic();

  // Accessibility State (Standard Government Portal Feature)
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0); // -1: small, 0: standard, 1: large
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'HI' | 'MR'>('EN');

  // Announcement Ticker Pause/Play State
  const [isTickerPaused, setIsTickerPaused] = useState<boolean>(false);

  // Announcement Tabs State
  const [activeNoticeTab, setActiveNoticeTab] = useState<'all' | 'circulars' | 'orders' | 'updates'>('all');

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Government Circulars & Notifications Data (Official Administrative Format)
  const officialNotices = [
    {
      id: 1,
      type: 'circulars',
      grNumber: 'GR-UDD/CM-AI/2026/CR-104/D-4',
      date: '16-09-2026',
      title: 'Mandatory Submission of AI-Verified Spatial Infrastructure Logs for 15th FC Untied Grants',
      dept: 'Urban Development Department',
      isNew: true,
      fileSize: '1.8 MB PDF'
    },
    {
      id: 2,
      type: 'orders',
      grNumber: 'GO-DMA/TECH/DESILT/2026/892',
      date: '14-09-2026',
      title: 'Pre-Monsoon Flood Vulnerability Assessment & Automated Drain Desilting Priorities for Class B & C Councils',
      dept: 'Directorate of Municipal Administration',
      isNew: true,
      fileSize: '2.4 MB PDF'
    },
    {
      id: 3,
      type: 'updates',
      grNumber: 'SYS-NOTIF/CIVICMIND/V4-2/DEPLOY',
      date: '11-09-2026',
      title: 'Release of Standardized Ward Development Index (WDI) Baseline Evaluation Protocol for Urban Local Bodies',
      dept: 'National Urban Informatics Center',
      isNew: false,
      fileSize: '3.1 MB PDF'
    },
    {
      id: 4,
      type: 'circulars',
      grNumber: 'CIR-MoHUA/SBM-U2/SWM-GIS/78',
      date: '08-09-2026',
      title: 'Directives on Geo-Spatial Solid Waste Route Optimization & Trommel Plant Capital Budgeting',
      dept: 'Ministry of Housing & Urban Affairs Aligned',
      isNew: false,
      fileSize: '950 KB PDF'
    },
    {
      id: 5,
      type: 'orders',
      grNumber: 'GO-FIN/LOCAL-BODIES/AUDIT/2026',
      date: '02-09-2026',
      title: 'Guidelines on Algorithmic Capital Prioritization & Multi-Horizon Infrastructure Roadmaps for Nagar Parishads',
      dept: 'Finance & Municipal Audit Wing',
      isNew: false,
      fileSize: '4.2 MB PDF'
    }
  ];

  const filteredNotices = officialNotices.filter(item => {
    if (activeNoticeTab === 'all') return true;
    return item.type === activeNoticeTab;
  });

  // Official Government Quick Access Services
  const quickAccessServices = [
    {
      id: 'SRV-01',
      title: 'Development Planning',
      titleLocal: 'नगर विकास नियोजन',
      dept: 'Town Planning & Architecture',
      desc: 'Formulate statutory master development programs, Ward Development Index (WDI) matrices, and scientific gap analyses.',
      icon: Layers,
      eligibility: 'All Nagar Parishads & Councils'
    },
    {
      id: 'SRV-02',
      title: 'Infrastructure Monitoring',
      titleLocal: 'पायाभूत सुविधा देखरेख',
      dept: 'Public Works & Roads',
      desc: 'Assess pavement distress (PDI), culvert drainage flows, and drinking water network pressure through continuous telemetry.',
      icon: Activity,
      eligibility: 'Municipal Engineering Cells'
    },
    {
      id: 'SRV-03',
      title: 'Budget Intelligence',
      titleLocal: 'अर्थसंकल्प ऑप्टिमायझेशन',
      dept: 'Municipal Finance & Accounts',
      desc: 'Automate 15th Finance Commission Tied/Untied allocations, AMRUT 2.0 co-financing, and statutory capital work reserves.',
      icon: IndianRupee,
      eligibility: 'Chief Officers & Accountants'
    },
    {
      id: 'SRV-04',
      title: 'Project Tracking',
      titleLocal: 'प्रकल्प प्रगती नियंत्रण',
      dept: 'Project Execution & Monitoring',
      desc: 'Verify milestone-based physical progress, contractor fund drawdowns, and geo-tagged site verification before tranche disbursements.',
      icon: CheckCircle2,
      eligibility: 'DPC & Municipal Monitors'
    },
    {
      id: 'SRV-05',
      title: 'GIS Analytics',
      titleLocal: 'जीआयएस विश्लेषण',
      dept: 'Spatial Mapping & Remote Sensing',
      desc: 'High-resolution cadastral overlays, elevation runoff models, flood hazard zoning, and dark-spot streetlight surveys.',
      icon: Compass,
      eligibility: 'GIS Nodal Officers'
    },
    {
      id: 'SRV-06',
      title: 'Reports & Insights',
      titleLocal: 'अधिकृत अहवाल व निष्कर्ष',
      dept: 'Administration & Governance',
      desc: 'Generate formal bilingual gazette-ready Annual Development Plans, Council Resolutions, and Citizen Welfare Impact Dossiers.',
      icon: FileText,
      eligibility: 'General Body & Collectorates'
    }
  ];

  // Official FAQs
  const officialFaqs = [
    {
      id: 1,
      question: 'What is the CivicMind AI National Urban Local Bodies Platform?',
      answer: 'CivicMind AI is an official government-grade development intelligence platform developed to empower Nagar Parishads, Nagar Panchayats, Municipal Councils, and District Administrations. It replaces manual, intuition-driven infrastructure sanctioning with automated spatial analytics, multi-criteria project ranking, and 15th Finance Commission budget allocation models.'
    },
    {
      id: 2,
      question: 'How does an Urban Local Body (ULB) access localized city intelligence?',
      answer: 'To preserve official data governance and prevent unauthorized static data access, no specific city data is rendered publicly on the homepage. Municipal Officers, Engineers, and Administrators must securely authenticate via the Official Portal Login. Following authentication, the officer selects their municipality or uses device GPS to synthesize a fully customized, real-time spatial profile.'
    },
    {
      id: 3,
      question: 'How are 15th Finance Commission and State Grants integrated into the Budget Module?',
      answer: 'The platform codifies statutory guidelines for 15th Finance Commission Tied (Drinking Water, Sanitation, Rainwater Harvesting) and Untied capital grants, alongside state-sponsored infrastructure programs. It automatically flags grant expiration deadlines, prevents fund lapsing, and models citizen return on investment (ROI).'
    },
    {
      id: 4,
      question: 'Is extensive GIS ground surveying required before an Urban Local Body can utilize the platform?',
      answer: 'No. The platform utilizes foundational OpenStreetMap cadastral layers, remote-sensing digital elevation models (DEM), and public administrative telemetry. Municipal engineering teams can immediately generate baseline risk predictions and subsequently refine ward data through geo-tagged site updates.'
    }
  ];

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white antialiased ${isHighContrast ? 'contrast-125 bg-white' : ''}`}>
      
      {/* ========================================================================= */}
      {/* 1. TOP GOVERNMENT HEADER (National / State Portal Style)                   */}
      {/* ========================================================================= */}
      <div className="bg-[#0b1f3a] text-slate-200 border-b border-[#173359] text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: National Emblem Placeholder & Government Attribution */}
          <div className="flex items-center gap-3">
            {/* Ashoka Stambh / Emblem Placeholder */}
            <div className="flex items-center gap-2 pr-3 border-r border-slate-700/80">
              <div className="w-6 h-7 flex flex-col items-center justify-center text-[8px] font-black text-amber-300 font-serif border border-amber-300/40 rounded-xs bg-amber-400/10 px-1 text-center leading-tight shadow-2xs">
                <span>GOI</span>
              </div>
              <div className="leading-tight">
                <span className="block text-[11px] font-bold text-white tracking-wide">भारत सरकार | GOVERNMENT OF INDIA</span>
                <span className="block text-[9.5px] text-slate-400">Ministry of Housing & Urban Affairs / Urban Development Directorate</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>National Urban Informatics Initiative • Official Portal</span>
            </div>
          </div>

          {/* Right: Accessibility Tools, Language Selector, Helpdesk & Contact */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            {/* Font Size Scaling Controls */}
            <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 rounded px-1.5 py-0.5 text-slate-300 font-mono text-[10px]">
              <button 
                onClick={() => setFontSizeOffset(-1)} 
                title="Decrease Font Size" 
                className={`px-1 hover:text-white ${fontSizeOffset === -1 ? 'text-amber-400 font-bold' : ''}`}
              >
                A-
              </button>
              <span className="text-slate-600">|</span>
              <button 
                onClick={() => setFontSizeOffset(0)} 
                title="Standard Font Size" 
                className={`px-1 hover:text-white ${fontSizeOffset === 0 ? 'text-amber-400 font-bold' : ''}`}
              >
                A
              </button>
              <span className="text-slate-600">|</span>
              <button 
                onClick={() => setFontSizeOffset(1)} 
                title="Increase Font Size" 
                className={`px-1 hover:text-white ${fontSizeOffset === 1 ? 'text-amber-400 font-bold' : ''}`}
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              className="hidden sm:flex items-center gap-1 text-[10px] text-slate-300 hover:text-white px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800/80"
              title="Toggle High Contrast Display"
            >
              <Eye className="w-3 h-3 text-amber-400" />
              <span>{isHighContrast ? 'Normal' : 'Contrast'}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1 border-l border-slate-700 pl-3">
              <Globe className="w-3 h-3 text-blue-300" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as 'EN' | 'HI' | 'MR')}
                className="bg-transparent text-slate-200 hover:text-white text-[10px] font-semibold cursor-pointer focus:outline-none"
              >
                <option value="EN" className="bg-slate-900 text-white">English</option>
                <option value="HI" className="bg-slate-900 text-white">हिन्दी (Hindi)</option>
                <option value="MR" className="bg-slate-900 text-white">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Helpdesk Direct Dial */}
            <a 
              href="#helpdesk" 
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white border-l border-slate-700 pl-3 font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Toll Free: 1800-120-8040</span>
            </a>

            {/* Contact Link */}
            <a 
              href="#contact" 
              className="text-slate-300 hover:text-white font-medium pl-2 border-l border-slate-700 hidden sm:inline"
            >
              Contact Us
            </a>
          </div>

        </div>
      </div>

      {/* Official Indian Tricolor Subtle Strip (Saffron, White, Green) */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      {/* ========================================================================= */}
      {/* 2. OFFICIAL LOGO HEADER & MAIN NAVIGATION BAR                             */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Official Title */}
          <div className="flex items-center gap-3.5">
            {/* Government Seal Crest */}
            <div className="w-12 h-12 rounded-lg bg-[#0b2545] border-2 border-[#134074] flex flex-col items-center justify-center text-white shadow-xs shrink-0">
              <Building2 className="w-6 h-6 text-amber-300" />
              <span className="text-[7px] font-mono tracking-tighter text-blue-200">ULB-GOV</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-[#0b2545] font-serif">
                  CivicMind <span className="text-blue-700">AI</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase font-mono tracking-wide">
                  Official Portal
                </span>
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-tight">
                शहरी स्थानिक स्वराज्य संस्था विकास बुद्धिमत्ता राष्ट्रीय प्रणाली
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                National Development Intelligence Platform for Urban Local Bodies
              </p>
            </div>
          </div>

          {/* Right Header Badges: GIGW Compliance & Security */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="block text-[10px] font-bold text-slate-800 leading-none">STQC / GIGW 3.0</span>
                <span className="text-[9px] text-slate-500">Certified Compliant</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-left">
              <Award className="w-4 h-4 text-blue-700" />
              <div>
                <span className="block text-[10px] font-bold text-slate-800 leading-none">15th Finance Comm.</span>
                <span className="text-[9px] text-slate-500">Tied/Untied Grant Aligned</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Main Navigation Strip with Prominent Login/Register */}
      <nav className="sticky top-0 z-40 bg-[#11244e] text-white border-b-2 border-amber-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          
          {/* Menu Items */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-bold tracking-wide uppercase whitespace-nowrap">
            <a href="#hero" className="px-3 py-1.5 rounded text-white bg-blue-900/80 hover:bg-blue-800 transition-colors">
              Home
            </a>
            <a href="#about" className="px-3 py-1.5 rounded text-slate-200 hover:text-white hover:bg-blue-900/60 transition-colors">
              About Platform
            </a>
            <a href="#services" className="px-3 py-1.5 rounded text-slate-200 hover:text-white hover:bg-blue-900/60 transition-colors">
              Departments
            </a>
            <a href="#resources" className="px-3 py-1.5 rounded text-slate-200 hover:text-white hover:bg-blue-900/60 transition-colors">
              Resources
            </a>
            <a href="#reports" className="px-3 py-1.5 rounded text-slate-200 hover:text-white hover:bg-blue-900/60 transition-colors">
              Reports
            </a>
            <a href="#helpdesk" className="px-3 py-1.5 rounded text-slate-200 hover:text-white hover:bg-blue-900/60 transition-colors">
              Helpdesk
            </a>
            <a href="#contact" className="px-3 py-1.5 rounded text-slate-200 hover:text-white hover:bg-blue-900/60 transition-colors">
              Contact Us
            </a>
          </div>

          {/* Prominent Government Login & Register Buttons */}
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              onClick={() => setCurrentView('auth')}
              className="px-3.5 py-1.5 rounded-md text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400 shadow-xs transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setCurrentView('auth')}
              className="px-3.5 py-1.5 rounded-md text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 border border-amber-300 shadow-xs transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
              <span>Register</span>
            </button>
          </div>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. IMPORTANT ANNOUNCEMENTS TICKER (Scrolling Notice Board)               */}
      {/* ========================================================================= */}
      <div className="bg-amber-50 border-b border-amber-200 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          
          {/* Ticker Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase shrink-0 shadow-2xs">
            <Bell className="w-3 h-3 animate-bounce" />
            <span>Latest Updates</span>
          </div>

          {/* Marquee Content */}
          <div className="overflow-hidden whitespace-nowrap relative flex-1 text-slate-800 font-medium">
            <div className={`inline-block ${isTickerPaused ? '' : 'animate-marquee'} hover:[animation-play-state:paused]`}>
              <span className="mx-4 font-bold text-blue-900">
                [GR-104]: All Urban Local Bodies must submit AI-verified spatial infrastructure logs prior to 15th FC Q3 release.
              </span>
              <span className="text-slate-400">|</span>
              <span className="mx-4 font-bold text-red-700">
                [URGENT]: Monsoon flood vulnerability and drainage desilting audit directives issued for all Class B & C Municipal Councils.
              </span>
              <span className="text-slate-400">|</span>
              <span className="mx-4 font-bold text-slate-800">
                [DMA-SYS]: Standardized Ward Development Index (WDI) Baseline Evaluation Protocol released for Municipal Corporations and Councils.
              </span>
            </div>
          </div>

          {/* Ticker Control Button */}
          <button
            onClick={() => setIsTickerPaused(!isTickerPaused)}
            className="p-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 shrink-0"
            title={isTickerPaused ? 'Play Notice Ticker' : 'Pause Notice Ticker'}
          >
            {isTickerPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN BANNER (Large Professional Government Banner)                    */}
      {/* ========================================================================= */}
      <section id="hero" className="relative bg-gradient-to-r from-[#0b2545] via-[#11244e] to-[#134074] text-white py-12 lg:py-16 border-b-4 border-amber-500 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 8 Columns: Official National Banner Copy */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Official Classification Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-900/90 border border-blue-600 text-xs font-semibold text-amber-300">
                <Building2 className="w-3.5 h-3.5" />
                <span>Urban Local Bodies (ULB) Governance & Spatial Intelligence Initiative</span>
              </div>

              {/* Official Headline (Strictly as specified) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-serif">
                AI-Powered Development Intelligence Platform
              </h1>

              {/* Subheadline (Strictly as specified) */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-sans">
                Supporting data-driven planning, infrastructure development, budget optimization, and governance for local government bodies.
              </p>

              {/* Official Government Action Buttons (NO startup wording) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-6 py-3 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs tracking-wider uppercase shadow-md transition-all flex items-center gap-2 border border-amber-300"
                >
                  <Lock className="w-4 h-4 text-slate-950" />
                  <span>Login</span>
                </button>

                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase border border-white/30 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Register</span>
                </button>

                <a
                  href="#services"
                  className="px-5 py-3 rounded-md bg-transparent hover:bg-blue-900/60 text-blue-200 hover:text-white font-semibold text-xs border border-blue-400/40 transition-all flex items-center gap-1.5"
                >
                  <span>Explore Services</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Official Statistics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-blue-800/80 text-xs">
                <div className="p-2.5 rounded bg-blue-950/70 border border-blue-800/60">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">ULBs Covered</span>
                  <strong className="text-base font-black text-amber-300 font-mono">4,800+</strong>
                  <span className="block text-[9px] text-slate-400">Parishads & Councils</span>
                </div>
                <div className="p-2.5 rounded bg-blue-950/70 border border-blue-800/60">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Grant Framework</span>
                  <strong className="text-base font-black text-emerald-400 font-mono">15th FC</strong>
                  <span className="block text-[9px] text-slate-400">Tied/Untied Optimized</span>
                </div>
                <div className="p-2.5 rounded bg-blue-950/70 border border-blue-800/60">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Ward Boundary GIS</span>
                  <strong className="text-base font-black text-blue-300 font-mono">100%</strong>
                  <span className="block text-[9px] text-slate-400">OpenStreetMap Aligned</span>
                </div>
                <div className="p-2.5 rounded bg-blue-950/70 border border-blue-800/60">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Prioritization</span>
                  <strong className="text-base font-black text-white font-mono">Algorithmic</strong>
                  <span className="block text-[9px] text-slate-400">Zero-Biased Scoring</span>
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Official Officer Single Sign-On Access Card */}
            <div className="lg:col-span-4">
              <div className="bg-white text-slate-900 rounded-lg border-2 border-slate-300 shadow-xl overflow-hidden">
                
                {/* Card Top Title Banner */}
                <div className="bg-[#0b2545] text-white p-4 border-b-2 border-amber-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-300" />
                      <h2 className="text-sm font-bold uppercase tracking-wider font-serif">ULB Officer Portal</h2>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono">
                      Secure SSO
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Official single sign-on for Municipal Commissioners, Chief Officers & Engineers
                  </p>
                </div>

                {/* Card Content & Action */}
                <div className="p-5 space-y-4 text-xs">
                  <div className="space-y-2">
                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Authorized Roles</span>
                      <ul className="text-[11px] text-slate-700 space-y-1 font-medium">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Chief Officers & Municipal Commissioners</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Town Planning & Engineering Section Heads</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>District Planning Committee (DPC) Monitors</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                      <strong>Note:</strong> Location context and spatial infrastructure maps are dynamically mapped after authorized login.
                    </div>
                  </div>

                  {/* Primary Login Button */}
                  <button
                    onClick={() => setCurrentView('auth')}
                    className="w-full py-2.5 rounded bg-[#0b2545] hover:bg-[#11244e] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 border border-[#134074]"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Access Municipal Portal</span>
                  </button>

                  <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-slate-200">
                    New Municipal Body?{' '}
                    <button
                      onClick={() => setCurrentView('auth')}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      Register Urban Local Body
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IMPORTANT ANNOUNCEMENTS & OFFICIAL CIRCULARS TABBED BOARD             */}
      {/* ========================================================================= */}
      <section id="notices" className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b-2 border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Departmental Communications</span>
              </div>
              <h2 className="text-2xl font-black text-[#0b2545] tracking-tight font-serif">
                Important Announcements & Government Orders
              </h2>
              <p className="text-xs text-slate-600">
                Official circulars, administrative resolutions, and system directives for Urban Local Bodies.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-md border border-slate-300 text-xs font-semibold">
              <button
                onClick={() => setActiveNoticeTab('all')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeNoticeTab === 'all' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                All Notices
              </button>
              <button
                onClick={() => setActiveNoticeTab('circulars')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeNoticeTab === 'circulars' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Circulars
              </button>
              <button
                onClick={() => setActiveNoticeTab('orders')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeNoticeTab === 'orders' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Govt Orders
              </button>
              <button
                onClick={() => setActiveNoticeTab('updates')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeNoticeTab === 'updates' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Platform Updates
              </button>
            </div>
          </div>

          {/* Official Government Table */}
          <div className="overflow-x-auto rounded border border-slate-300 shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b2545] text-white font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 border-b border-slate-700 w-28">Date</th>
                  <th className="py-3 px-4 border-b border-slate-700 w-44">Reference Number</th>
                  <th className="py-3 px-4 border-b border-slate-700">Subject / Directive Title</th>
                  <th className="py-3 px-4 border-b border-slate-700 w-52">Issuing Authority</th>
                  <th className="py-3 px-4 border-b border-slate-700 text-center w-32">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredNotices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {notice.date}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-900 whitespace-nowrap">
                      {notice.grNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        {notice.isNew && (
                          <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-black uppercase font-mono shrink-0">
                            NEW
                          </span>
                        )}
                        <span>{notice.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {notice.dept}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={() => setCurrentView('auth')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-blue-900 border border-slate-300 font-semibold text-[11px] transition-colors"
                      >
                        <Download className="w-3 h-3 text-red-600" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. QUICK ACCESS SERVICES (Government Service Modules)                    */}
      {/* ========================================================================= */}
      <section id="services" className="py-14 bg-[#f1f5f9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block font-mono">
              Urban Local Body Administration Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] font-serif">
              Quick Access Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Integrated municipal intelligence modules engineered to fulfill statutory governance mandates for Nagar Parishads and Municipal Councils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccessServices.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div 
                  key={srv.id} 
                  className="bg-white rounded-lg border border-slate-300 shadow-2xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded bg-[#0b2545] text-amber-300 flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {srv.id}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#0b2545] font-serif">
                        {srv.title}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-500">
                        {srv.titleLocal} • {srv.dept}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">
                      Eligibility: {srv.eligibility}
                    </span>
                    <button
                      onClick={() => setCurrentView('auth')}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-800 hover:text-blue-950 transition-colors"
                    >
                      <span>Access Service</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PLATFORM OBJECTIVES (Clean Information Cards)                         */}
      {/* ========================================================================= */}
      <section id="about" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block font-mono">
              National Mandate & Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] font-serif">
              Platform Objectives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Transforming municipal administration across small and mid-sized cities through verifiable data and predictive intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Better Governance */}
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded bg-blue-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-sm font-bold text-[#0b2545] font-serif">
                Better Governance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Establishes an auditable, transparent municipal decision-making framework conforming strictly to statutory state municipal frameworks.
              </p>
            </div>

            {/* 2. Infrastructure Planning */}
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded bg-blue-900 text-white flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-sm font-bold text-[#0b2545] font-serif">
                Infrastructure Planning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Replaces discretionary project sanctioning with algorithmic need analysis, contour-level drainage mapping, and pavement life-cycle forecasting.
              </p>
            </div>

            {/* 3. Public Resource Optimization */}
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded bg-blue-900 text-white flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-sm font-bold text-[#0b2545] font-serif">
                Public Resource Optimization
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prevents grant lapsing by aligning 15th Finance Commission Tied/Untied grants and AMRUT 2.0 funds with maximum citizen impact projects.
              </p>
            </div>

            {/* 4. Data Driven Decision Making */}
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded bg-blue-900 text-white flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-sm font-bold text-[#0b2545] font-serif">
                Data-Driven Decision Making
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equips Chief Officers, Municipal Engineers, and General Body Committees with live spatial models and demographic projections.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. KEY PLATFORM FEATURES (Government Service Presentation)               */}
      {/* ========================================================================= */}
      <section className="py-14 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block font-mono">
              Core Technical Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] font-serif">
              Key Platform Features
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Standardized government services engineered for spatial accuracy, fiscal discipline, and citizen welfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-blue-700" />
                <h3 className="font-serif text-base">AI Development Planning</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Synthesizes ward demographics, road hierarchies, water networks, and drainage slopes into comprehensive 1-Year, 3-Year, and 5-Year Capital Investment Masterplans.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h3 className="font-serif text-base">Infrastructure Risk Assessment</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated multi-hazard risk engine identifying monsoon stormwater overflow zones, drinking water transmission pressure drop, and dark-spot road corridors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif text-base">Budget Allocation Intelligence</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates optimal capital outlay percentages across Drainage, Roads, Water Supply, and SWM to maximize citizen impact per rupee expended.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif text-base">Project Prioritization</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-Criteria Decision Analysis (MCDA) ranking public works proposals based on severity, population density, disaster vulnerability, and cost effectiveness.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Layers className="w-4 h-4 text-blue-700" />
                <h3 className="font-serif text-base">Ward Development Analytics</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computes standardized 6-pillar Ward Development Index (WDI) scores from 0-100 for every municipal ward, identifying backward sectors requiring intervention.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Compass className="w-4 h-4 text-purple-700" />
                <h3 className="font-serif text-base">GIS-Based Monitoring</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interactive spatial visualization layers for OpenStreetMap road alignments, terrain elevation contours, pipeline routes, and ward boundaries.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DASHBOARD PREVIEW (Generic Blueprint Preview - NO CITY NAMES/DATA)      */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block font-mono">
              Standardized Interface Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] font-serif">
              Dashboard Preview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Generic platform blueprint. All municipal telemetry, ward evaluations, and GIS layers are generated dynamically following authorized officer authentication.
            </p>
          </div>

          {/* Generic Blueprint Container */}
          <div className="rounded-lg border-2 border-slate-300 bg-[#f8fafc] shadow-sm overflow-hidden">
            
            {/* Top Blueprint Bar */}
            <div className="bg-[#0b2545] text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-slate-300 font-bold pl-2 border-l border-slate-700">
                  PLATFORM TEMPLATE • LOCATION CONTEXT: [SELECTED MUNICIPALITY]
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-800">
                Awaiting Officer Login
              </span>
            </div>

            {/* Blueprint Body */}
            <div className="p-6 space-y-6">
              
              {/* Header Meta Placeholders */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded bg-white border border-slate-300">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Active Municipal Profile</span>
                  <div className="text-lg font-black text-slate-900 font-serif">
                    [Selected Municipality / Urban Local Body]
                  </div>
                  <p className="text-xs text-slate-500">
                    District: [District Administration] • State: [State Urban Development Department]
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded bg-slate-100 border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Composite WDI Score</span>
                    <span className="text-base font-black text-blue-900 font-mono">[Evaluated on Login]</span>
                  </div>
                  <div className="p-3 rounded bg-slate-100 border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Annual Allocation</span>
                    <span className="text-base font-black text-emerald-800 font-mono">[15th FC Grants]</span>
                  </div>
                </div>
              </div>

              {/* 4 Generic Telemetry Blueprint Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                
                <div className="p-4 rounded bg-white border border-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 font-bold">
                    <span>Drainage Vulnerability</span>
                    <Activity className="w-4 h-4 text-blue-700" />
                  </div>
                  <div className="text-base font-black text-slate-800 font-mono">[Calculated Index]</div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-700 w-2/3" />
                  </div>
                  <p className="text-[10px] text-slate-500">Synthesized via Digital Elevation Model</p>
                </div>

                <div className="p-4 rounded bg-white border border-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 font-bold">
                    <span>Road Pavement Distress</span>
                    <Building2 className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-base font-black text-slate-800 font-mono">[PDI Assessment]</div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-1/2" />
                  </div>
                  <p className="text-[10px] text-slate-500">Commercial spine defect classification</p>
                </div>

                <div className="p-4 rounded bg-white border border-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 font-bold">
                    <span>Water Network Coverage</span>
                    <Compass className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-base font-black text-slate-800 font-mono">[Pipeline Coverage]</div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 w-3/4" />
                  </div>
                  <p className="text-[10px] text-slate-500">Per-capita supply compliance metric</p>
                </div>

                <div className="p-4 rounded bg-white border border-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 font-bold">
                    <span>Prioritized Capital Works</span>
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-base font-black text-slate-800 font-mono">[Ranked Works List]</div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 w-4/5" />
                  </div>
                  <p className="text-[10px] text-slate-500">MCDA Multi-Criteria Prioritization</p>
                </div>

              </div>

              {/* Watermark Banner */}
              <div className="p-4 rounded bg-blue-50 border border-blue-200 text-center space-y-2">
                <span className="text-xs font-bold text-blue-950 block">
                  GENERIC ULB EVALUATION BLUEPRINT • OFFICER AUTHENTICATION REQUIRED FOR LOCALIZED TELEMETRY
                </span>
                <p className="text-[11px] text-blue-800 max-w-xl mx-auto">
                  Municipalities do not display preloaded public data. Authenticate to initialize dynamic location discovery (GPS or Municipality search) and generate real-time spatial intelligence.
                </p>
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-5 py-2 rounded bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Login to Initialize Location</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. PLATFORM BENEFITS (Nagar Parishads, Panchayats, Councils, Districts) */}
      {/* ========================================================================= */}
      <section className="py-14 bg-[#f1f5f9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block font-mono">
              Administrative Beneficiaries
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] font-serif">
              Platform Benefits Across ULB Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Customized administrative outcomes aligned with tier-specific municipal staffing and statutory responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            {/* 1. Nagar Parishads */}
            <div className="bg-white rounded-lg border border-slate-300 p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#0b2545] text-amber-300 flex items-center justify-center font-bold">
                NP
              </div>
              <h3 className="text-base font-bold text-[#0b2545] font-serif">
                Nagar Parishads
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">Class A & B Municipal Councils</span>
              <ul className="space-y-2 text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Automated 15th FC tied and untied grant compliance auditing.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pre-monsoon drainage desilting prioritization preventing market inundation.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Standardized gazette-ready Annual Development Plan (ADP) documents.</span>
                </li>
              </ul>
            </div>

            {/* 2. Nagar Panchayats */}
            <div className="bg-white rounded-lg border border-slate-300 p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#0b2545] text-amber-300 flex items-center justify-center font-bold">
                NPT
              </div>
              <h3 className="text-base font-bold text-[#0b2545] font-serif">
                Nagar Panchayats
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">Transitional Rural-Urban Centers</span>
              <ul className="space-y-2 text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Overcomes limited engineering staff with automated civil cost estimation.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Baseline water supply equity mapping across elevated peripheral wards.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Rapid tender DPR drafting aligned with district schedule of rates.</span>
                </li>
              </ul>
            </div>

            {/* 3. Municipal Councils */}
            <div className="bg-white rounded-lg border border-slate-300 p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#0b2545] text-amber-300 flex items-center justify-center font-bold">
                MC
              </div>
              <h3 className="text-base font-bold text-[#0b2545] font-serif">
                Municipal Councils
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">Class C Councils & Townships</span>
              <ul className="space-y-2 text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Objective MCDA multi-criteria project ranking reducing council disputes.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Solid waste route optimization and legacy dump reclamation tracking.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>CC road vs bitumen durability simulations for transit corridors.</span>
                </li>
              </ul>
            </div>

            {/* 4. District Administrations */}
            <div className="bg-white rounded-lg border border-slate-300 p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#0b2545] text-amber-300 flex items-center justify-center font-bold">
                DPC
              </div>
              <h3 className="text-base font-bold text-[#0b2545] font-serif">
                District Administrations
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">Collectorates & Planning Committees</span>
              <ul className="space-y-2 text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Unified district multi-tenant dashboard benchmarking all regional ULBs.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real-time monitoring of fund utilization certificates and project tranches.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>District disaster mitigation fund allocation based on terrain runoff audits.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. REPORTS & RESOURCES (Government Style Section)                       */}
      {/* ========================================================================= */}
      <section id="reports" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block font-mono">
              Knowledge Repository
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] font-serif">
              Reports, Guidelines & Policy Documents
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Download official publications, statutory guidelines, technical manuals, and standard operating procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            
            {/* Category 1: Latest Reports */}
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold border-b border-slate-200 pb-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span className="uppercase tracking-wider font-mono text-[11px]">Latest Reports</span>
              </div>
              <ul className="space-y-2.5">
                <li className="p-2.5 rounded bg-white border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="text-[10px] text-slate-500 font-mono block">DOC-REP-2026-01</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-bold text-slate-900 hover:text-blue-700 block mt-0.5">
                    State ULB Infrastructure Composite Baseline Report 2026
                  </a>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block">PDF • 4.8 MB</span>
                </li>
                <li className="p-2.5 rounded bg-white border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="text-[10px] text-slate-500 font-mono block">DOC-REP-2026-02</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-bold text-slate-900 hover:text-blue-700 block mt-0.5">
                    Municipal Drainage Runoff & Desilting Audit Findings
                  </a>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block">PDF • 2.6 MB</span>
                </li>
              </ul>
            </div>

            {/* Category 2: Guidelines & Policies */}
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold border-b border-slate-200 pb-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="uppercase tracking-wider font-mono text-[11px]">Guidelines & Policies</span>
              </div>
              <ul className="space-y-2.5">
                <li className="p-2.5 rounded bg-white border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="text-[10px] text-slate-500 font-mono block">SOP-15FC-SPATIAL</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-bold text-slate-900 hover:text-blue-700 block mt-0.5">
                    SOP for 15th FC Spatial Verification & Project Tagging
                  </a>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block">PDF • 1.9 MB</span>
                </li>
                <li className="p-2.5 rounded bg-white border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="text-[10px] text-slate-500 font-mono block">POL-GIS-CADASTRAL</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-bold text-slate-900 hover:text-blue-700 block mt-0.5">
                    National GIS Ward Boundary Vectorization Norms
                  </a>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block">PDF • 3.2 MB</span>
                </li>
              </ul>
            </div>

            {/* Category 3: User Manuals & Training */}
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold border-b border-slate-200 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="uppercase tracking-wider font-mono text-[11px]">User Manuals & Training</span>
              </div>
              <ul className="space-y-2.5">
                <li className="p-2.5 rounded bg-white border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="text-[10px] text-slate-500 font-mono block">MAN-OFFICER-V4</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-bold text-slate-900 hover:text-blue-700 block mt-0.5">
                    Municipal Chief Officer & Engineer Operational Handbook
                  </a>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block">PDF • 6.4 MB</span>
                </li>
                <li className="p-2.5 rounded bg-white border border-slate-200 hover:border-blue-400 transition-colors">
                  <span className="text-[10px] text-slate-500 font-mono block">TRAIN-MCDA-TOOL</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-bold text-slate-900 hover:text-blue-700 block mt-0.5">
                    MCDA Public Works Scoring Methodology Training Guide
                  </a>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block">PDF • 1.4 MB</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. HELPDESK & SUPPORT DIRECTORY                                         */}
      {/* ========================================================================= */}
      <section id="helpdesk" className="py-14 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 6 Columns: Official Helpdesk Directory */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-widest block font-mono">
                  Assistance & Escalations
                </span>
                <h2 className="text-2xl font-black text-[#0b2545] font-serif">
                  Helpdesk & Support Center
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Dedicated municipal support desk assisting Urban Local Bodies with system operations, data ingestion, and technical verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Phone className="w-4 h-4" />
                    <span>Toll-Free Helpline</span>
                  </div>
                  <strong className="text-base font-black text-slate-900 font-mono block">
                    1800-120-8040
                  </strong>
                  <span className="text-[10px] text-slate-500 block">
                    Mon - Sat: 9:30 AM to 6:00 PM (Working Days)
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-300 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <Mail className="w-4 h-4" />
                    <span>Official Email Support</span>
                  </div>
                  <strong className="text-xs font-black text-slate-900 font-mono block">
                    helpdesk-civicmind@nic.in
                  </strong>
                  <span className="text-[10px] text-slate-500 block">
                    Response time: 24 - 48 business hours
                  </span>
                </div>

              </div>

              {/* Physical Address */}
              <div className="p-4 rounded-lg bg-white border border-slate-300 shadow-2xs text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#0b2545] font-bold">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>National Project Directorate</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Directorate of Urban Local Bodies, 4th Floor, Urban Development Bhawan, Civil Administrative Enclave.
                </p>
              </div>
            </div>

            {/* Right 6 Columns: Frequently Asked Questions (Accordion) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-lg font-bold text-[#0b2545] font-serif">
                  Frequently Asked Questions (FAQs)
                </h3>
                <p className="text-xs text-slate-500">
                  Clarifications on ULB onboarding, data governance, and grant computation.
                </p>
              </div>

              <div className="space-y-3">
                {officialFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id} 
                      className="rounded border border-slate-300 bg-white overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full text-left p-3.5 flex items-center justify-between gap-3 text-xs font-bold text-[#0b2545] hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. OFFICIAL GOVERNMENT FOOTER                                           */}
      {/* ========================================================================= */}
      <footer id="contact" className="bg-[#0b1f3a] text-slate-300 text-xs border-t-4 border-amber-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-800">
            
            {/* Col 1: Portal Identity */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-blue-900 border border-blue-700 flex items-center justify-center text-amber-300">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-base font-bold text-white font-serif">CivicMind AI</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Official National Development Intelligence Platform for Urban Local Bodies (ULBs). Empowering Nagar Parishads, Nagar Panchayats, and Municipal Councils with automated GIS infrastructure planning, risk assessment, and budget optimization.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono block">
                Quick Navigation
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Platform</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services Directory</a></li>
                <li><a href="#reports" className="hover:text-white transition-colors">Circulars & Reports</a></li>
                <li><a href="#helpdesk" className="hover:text-white transition-colors">Help Desk</a></li>
              </ul>
            </div>

            {/* Col 3: Government Portals */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono block">
                National Portals
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>India.gov.in</span><ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://mohua.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>MoHUA Portal</span><ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>Digital India</span><ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li><a href="https://pmay-urban.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>PMAY-Urban</span><ExternalLink className="w-2.5 h-2.5" /></a></li>
              </ul>
            </div>

            {/* Col 4: Statutory Compliance */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono block">
                Statutory Policies
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li><a href="#contact" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Accessibility Statement</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Hyperlinking Policy</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Attribution & GIGW Standards Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10.5px] text-slate-400">
            <div className="space-y-1 text-center md:text-left">
              <p>
                Website designed, developed, hosted and maintained by the <strong>National Urban Informatics Initiative / CivicMind AI Platform</strong>.
              </p>
              <p>
                Contents owned and maintained by Urban Development Department, Government of India / State Governments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center md:text-right shrink-0">
              <span className="font-mono">Last Updated: 16-Sep-2026</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                GIGW 3.0 & W3C WAI-AA
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
