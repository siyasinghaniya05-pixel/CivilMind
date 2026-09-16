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
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'HI' | 'MR'>('EN');

  // Announcement Ticker Pause/Play State
  const [isTickerPaused, setIsTickerPaused] = useState<boolean>(false);

  // Announcement Tabs State
  const [activeNoticeTab, setActiveNoticeTab] = useState<'all' | 'circulars' | 'orders' | 'updates'>('all');

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  // Active Navigation Tab
  const [activeNav, setActiveNav] = useState<string>('hero');

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
    <div className={`min-h-screen bg-[#F8FAFC] text-[#52606D] flex flex-col antialiased selection:bg-[#145DA0] selection:text-white ${isHighContrast ? 'contrast-125 bg-white' : ''}`}>
      
      {/* ========================================================================= */}
      {/* 1. TOP GOVERNMENT HEADER (National / State Portal Style)                   */}
      {/* ========================================================================= */}
      <div className="bg-[#102A43] text-[#D9E2EC] border-b border-[#243B53] text-[12px] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: National Emblem & Government Attribution */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pr-3 border-r border-[#334E68]">
              <div className="w-6 h-7 flex flex-col items-center justify-center text-[8.5px] font-bold text-[#F0B429] font-gov-label border border-[#F0B429]/40 rounded-xs bg-[#F0B429]/10 px-1 text-center leading-tight">
                <span>GOI</span>
              </div>
              <div className="leading-tight">
                <span className="block text-[11px] font-semibold text-white tracking-wide font-gov-label">
                  भारत सरकार | GOVERNMENT OF INDIA
                </span>
                <span className="block text-[10px] text-[#9FB3C8]">
                  Ministry of Housing & Urban Affairs / Urban Development Directorate
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[11.5px] text-[#BCCCDC]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#16866B] animate-pulse" />
              <span className="font-gov-label text-[11px] text-[#D9E2EC]">
                National Urban Informatics Initiative • Official Platform
              </span>
            </div>
          </div>

          {/* Right: Accessibility Tools, Language Selector, Helpdesk & Contact */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11.5px]">
            
            {/* Font Size Scaling Controls */}
            <div className="flex items-center gap-1 bg-[#243B53]/80 border border-[#334E68] rounded px-1.5 py-0.5 text-[#D9E2EC] text-[10.5px]">
              <button 
                onClick={() => setFontSizeOffset(-1)} 
                title="Decrease Font Size" 
                className={`px-1 hover:text-white transition-colors ${fontSizeOffset === -1 ? 'text-[#F0B429] font-bold' : ''}`}
              >
                A-
              </button>
              <span className="text-[#486581]">|</span>
              <button 
                onClick={() => setFontSizeOffset(0)} 
                title="Standard Font Size" 
                className={`px-1 hover:text-white transition-colors ${fontSizeOffset === 0 ? 'text-[#F0B429] font-bold' : ''}`}
              >
                A
              </button>
              <span className="text-[#486581]">|</span>
              <button 
                onClick={() => setFontSizeOffset(1)} 
                title="Increase Font Size" 
                className={`px-1 hover:text-white transition-colors ${fontSizeOffset === 1 ? 'text-[#F0B429] font-bold' : ''}`}
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              className="hidden sm:flex items-center gap-1 text-[10.5px] text-[#D9E2EC] hover:text-white px-1.5 py-0.5 rounded border border-[#334E68] bg-[#243B53]/80 font-gov-label"
              title="Toggle High Contrast Display"
            >
              <Eye className="w-3 h-3 text-[#F0B429]" />
              <span>{isHighContrast ? 'Normal' : 'Contrast'}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1 border-l border-[#334E68] pl-3 font-gov-label">
              <Globe className="w-3 h-3 text-[#627D98]" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as 'EN' | 'HI' | 'MR')}
                className="bg-transparent text-[#D9E2EC] hover:text-white text-[11px] font-semibold cursor-pointer focus:outline-none"
              >
                <option value="EN" className="bg-[#102A43] text-white">English</option>
                <option value="HI" className="bg-[#102A43] text-white">हिन्दी (Hindi)</option>
                <option value="MR" className="bg-[#102A43] text-white">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Helpdesk Direct Dial */}
            <a 
              href="#helpdesk" 
              className="hidden md:flex items-center gap-1.5 text-[#D9E2EC] hover:text-white border-l border-[#334E68] pl-3 font-gov-label text-[11.5px]"
            >
              <Phone className="w-3 h-3 text-[#16866B]" />
              <span>Toll Free: 1800-120-8040</span>
            </a>

            {/* Contact Link */}
            <a 
              href="#contact" 
              className="text-[#D9E2EC] hover:text-white font-medium pl-2 border-l border-[#334E68] hidden sm:inline text-[11.5px]"
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
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Official Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-md bg-[#102A43] border border-[#243B53] flex flex-col items-center justify-center text-white shadow-xs shrink-0">
              <Building2 className="w-6 h-6 text-[#F0B429]" />
              <span className="text-[7px] font-gov-label font-bold tracking-tighter text-[#9FB3C8]">ULB-GOV</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#102A43]">
                  CivicMind <span className="text-[#145DA0]">AI</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F0F4F8] text-[#1E3A5F] border border-[#D9E2EC] uppercase font-gov-label tracking-wide">
                  Official Platform
                </span>
              </div>
              <p className="text-[12.5px] text-[#243B53] font-semibold leading-tight">
                शहरी स्थानिक स्वराज्य संस्था विकास बुद्धिमत्ता राष्ट्रीय प्रणाली
              </p>
              <p className="text-[11.5px] text-[#52606D] font-normal">
                National Development Intelligence Platform for Urban Local Bodies
              </p>
            </div>
          </div>

          {/* Right Header Badges: GIGW Compliance & Standards */}
          <div className="hidden lg:flex items-center gap-3.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-left">
              <ShieldCheck className="w-4 h-4 text-[#16866B]" />
              <div>
                <span className="block text-[10.5px] font-semibold text-[#1E3A5F] leading-none font-gov-label">
                  STQC / GIGW 3.0
                </span>
                <span className="text-[9.5px] text-[#7B8794]">Certified Compliant</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-left">
              <Award className="w-4 h-4 text-[#145DA0]" />
              <div>
                <span className="block text-[10.5px] font-semibold text-[#1E3A5F] leading-none font-gov-label">
                  15th Finance Comm.
                </span>
                <span className="text-[9.5px] text-[#7B8794]">Tied/Untied Aligned</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Main Navigation Strip with Prominent Login/Register */}
      <nav className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between">
          
          {/* Menu Items (Navbar text: 14–15px, 500 weight, #243B53; Active navigation: #145DA0, 600 weight with subtle bottom border) */}
          <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto text-[14.5px] font-medium text-[#243B53] whitespace-nowrap h-full">
            <a 
              href="#hero" 
              onClick={() => setActiveNav('hero')}
              className={`h-full flex items-center px-3 transition-colors ${
                activeNav === 'hero' 
                  ? 'text-[#145DA0] font-semibold border-b-2 border-[#145DA0]' 
                  : 'hover:text-[#145DA0]'
              }`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setActiveNav('about')}
              className={`h-full flex items-center px-3 transition-colors ${
                activeNav === 'about' 
                  ? 'text-[#145DA0] font-semibold border-b-2 border-[#145DA0]' 
                  : 'hover:text-[#145DA0]'
              }`}
            >
              About Platform
            </a>
            <a 
              href="#services" 
              onClick={() => setActiveNav('services')}
              className={`h-full flex items-center px-3 transition-colors ${
                activeNav === 'services' 
                  ? 'text-[#145DA0] font-semibold border-b-2 border-[#145DA0]' 
                  : 'hover:text-[#145DA0]'
              }`}
            >
              Departments
            </a>
            <a 
              href="#resources" 
              onClick={() => setActiveNav('resources')}
              className={`h-full flex items-center px-3 transition-colors ${
                activeNav === 'resources' 
                  ? 'text-[#145DA0] font-semibold border-b-2 border-[#145DA0]' 
                  : 'hover:text-[#145DA0]'
              }`}
            >
              Resources
            </a>
            <a 
              href="#reports" 
              onClick={() => setActiveNav('reports')}
              className={`h-full flex items-center px-3 transition-colors ${
                activeNav === 'reports' 
                  ? 'text-[#145DA0] font-semibold border-b-2 border-[#145DA0]' 
                  : 'hover:text-[#145DA0]'
              }`}
            >
              Reports
            </a>
            <a 
              href="#helpdesk" 
              onClick={() => setActiveNav('helpdesk')}
              className={`h-full flex items-center px-3 transition-colors ${
                activeNav === 'helpdesk' 
                  ? 'text-[#145DA0] font-semibold border-b-2 border-[#145DA0]' 
                  : 'hover:text-[#145DA0]'
              }`}
            >
              Helpdesk
            </a>
            <a 
              href="#contact" 
              onClick={() => setActiveNav('contact')}
              className={`h-full flex items-center px-3 transition-colors ${
                activeNav === 'contact' 
                  ? 'text-[#145DA0] font-semibold border-b-2 border-[#145DA0]' 
                  : 'hover:text-[#145DA0]'
              }`}
            >
              Contact Us
            </a>
          </div>

          {/* Prominent Government Login & Register Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 ml-4">
            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 rounded-md text-[15px] font-semibold text-[#145DA0] hover:bg-[#F0F4F8] border border-[#145DA0] transition-all flex items-center gap-1.5"
            >
              <Lock className="w-4 h-4 text-[#145DA0]" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setCurrentView('auth')}
              className="px-4 py-2 rounded-md text-[15px] font-semibold text-white bg-[#145DA0] hover:bg-[#0E4477] shadow-xs transition-all flex items-center gap-1.5 border border-[#145DA0]"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Register</span>
            </button>
          </div>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. IMPORTANT ANNOUNCEMENTS TICKER (Scrolling Notice Board)               */}
      {/* ========================================================================= */}
      <div className="bg-[#F0F4F8] border-b border-[#D9E2EC] text-[13px] py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          
          {/* Ticker Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C53030] text-white font-semibold text-[11px] uppercase tracking-wide font-gov-label shrink-0 shadow-2xs">
            <Bell className="w-3 h-3 animate-bounce" />
            <span>Latest Updates</span>
          </div>

          {/* Marquee Content */}
          <div className="overflow-hidden whitespace-nowrap relative flex-1 text-[#52606D] font-medium text-[13.5px]">
            <div className={`inline-block ${isTickerPaused ? '' : 'animate-marquee'} hover:[animation-play-state:paused]`}>
              <span className="mx-4 font-semibold text-[#102A43]">
                [GR-104]: All Urban Local Bodies must submit AI-verified spatial infrastructure logs prior to 15th FC Q3 release.
              </span>
              <span className="text-[#9FB3C8]">|</span>
              <span className="mx-4 font-semibold text-[#C53030]">
                [URGENT]: Monsoon flood vulnerability and drainage desilting audit directives issued for all Class B & C Municipal Councils.
              </span>
              <span className="text-[#9FB3C8]">|</span>
              <span className="mx-4 font-semibold text-[#243B53]">
                [DMA-SYS]: Standardized Ward Development Index (WDI) Baseline Evaluation Protocol released for Municipal Corporations and Councils.
              </span>
            </div>
          </div>

          {/* Ticker Control Button */}
          <button
            onClick={() => setIsTickerPaused(!isTickerPaused)}
            className="p-1 rounded bg-white hover:bg-[#D9E2EC] text-[#243B53] border border-[#CBD5E1] shrink-0 transition-colors"
            title={isTickerPaused ? 'Play Notice Ticker' : 'Pause Notice Ticker'}
          >
            {isTickerPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN BANNER (Large Professional Government Banner)                    */}
      {/* ========================================================================= */}
      <section id="hero" className="relative bg-gradient-to-b from-[#F0F4F8] via-[#F8FAFC] to-white border-b border-[#E2E8F0] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 8 Columns: Official National Banner Copy */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Official Classification Chip (Government Branding #1E3A5F) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EBF8FF] border border-[#BEE3F8] text-[12px] font-semibold text-[#1E3A5F] font-gov-label">
                <Building2 className="w-3.5 h-3.5 text-[#145DA0]" />
                <span>Urban Local Bodies (ULB) Governance & Spatial Intelligence Initiative</span>
              </div>

              {/* Official Headline (Strictly as specified, Dark Navy #102A43, 700 weight, visual hierarchy) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#102A43] leading-[1.18]">
                <span className="text-[#145DA0] font-bold">AI-Powered</span> <br />
                <span>Development Intelligence</span> <br />
                <span className="text-[#243B53]">Platform</span>
              </h1>

              {/* Subheadline (15–17px, 400–500 weight, #52606D) */}
              <p className="text-[16px] sm:text-[17px] text-[#52606D] font-normal leading-relaxed max-w-2xl">
                Supporting data-driven planning, infrastructure development, budget optimization, and governance for local government bodies.
              </p>

              {/* Official Government Action Buttons (Button Typography: 15px, 600 weight) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-6 py-3 rounded-md bg-[#145DA0] hover:bg-[#0E4477] text-white font-semibold text-[15px] shadow-xs transition-all flex items-center gap-2 border border-[#145DA0]"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Register</span>
                </button>

                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-6 py-3 rounded-md bg-white hover:bg-[#F0F4F8] text-[#145DA0] font-semibold text-[15px] border border-[#145DA0] transition-all flex items-center gap-2 shadow-2xs"
                >
                  <Lock className="w-4 h-4 text-[#145DA0]" />
                  <span>Login</span>
                </button>

                <a
                  href="#services"
                  className="px-5 py-3 rounded-md bg-transparent hover:bg-[#F0F4F8] text-[#243B53] font-medium text-[15px] border border-[#CBD5E1] transition-all flex items-center gap-1.5"
                >
                  <span>Explore Services</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#52606D]" />
                </a>
              </div>

              {/* Official Statistics Ribbon (Numbers: 28–36px, 700 weight, #102A43; Labels: 13–14px, 500 weight, #52606D) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-[#E2E8F0]">
                <div className="p-3 rounded bg-white border border-[#E2E8F0] shadow-2xs">
                  <span className="block text-[13px] text-[#52606D] font-medium">ULBs Covered</span>
                  <strong className="text-[30px] font-bold text-[#102A43] leading-tight block">4,800+</strong>
                  <span className="block text-[12px] text-[#7B8794]">Parishads & Councils</span>
                </div>
                <div className="p-3 rounded bg-white border border-[#E2E8F0] shadow-2xs">
                  <span className="block text-[13px] text-[#52606D] font-medium">Grant Framework</span>
                  <strong className="text-[30px] font-bold text-[#102A43] leading-tight block">15th FC</strong>
                  <span className="block text-[12px] text-[#7B8794]">Tied/Untied Optimized</span>
                </div>
                <div className="p-3 rounded bg-white border border-[#E2E8F0] shadow-2xs">
                  <span className="block text-[13px] text-[#52606D] font-medium">Ward Boundary GIS</span>
                  <strong className="text-[30px] font-bold text-[#102A43] leading-tight block">100%</strong>
                  <span className="block text-[12px] text-[#7B8794]">OpenStreetMap Aligned</span>
                </div>
                <div className="p-3 rounded bg-white border border-[#E2E8F0] shadow-2xs">
                  <span className="block text-[13px] text-[#52606D] font-medium">Prioritization</span>
                  <strong className="text-[26px] font-bold text-[#102A43] leading-tight block">Algorithmic</strong>
                  <span className="block text-[12px] text-[#7B8794]">Zero-Biased Scoring</span>
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Official Officer Single Sign-On Access Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg border border-[#CBD5E1] shadow-md overflow-hidden">
                
                {/* Card Top Title Banner */}
                <div className="bg-[#102A43] text-white p-4 border-b border-[#243B53]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#F0B429]" />
                      <h2 className="text-[15px] font-bold tracking-wide font-gov-label">ULB Officer Portal</h2>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#16866B]/20 text-[#3EBD93] border border-[#16866B]/40 font-gov-label">
                      Secure SSO
                    </span>
                  </div>
                  <p className="text-[12px] text-[#BCCCDC] mt-1 font-normal">
                    Official single sign-on for Municipal Commissioners, Chief Officers & Engineers
                  </p>
                </div>

                {/* Card Content & Action */}
                <div className="p-5 space-y-4">
                  <div className="space-y-2.5">
                    <div className="p-3 rounded bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#1E3A5F] uppercase block font-gov-label">
                        Authorized Roles
                      </span>
                      <ul className="text-[12.5px] text-[#52606D] space-y-1 font-medium">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16866B] shrink-0" />
                          <span>Chief Officers & Municipal Commissioners</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16866B] shrink-0" />
                          <span>Town Planning & Engineering Heads</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16866B] shrink-0" />
                          <span>District Planning Committee (DPC) Monitors</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-2.5 rounded bg-[#FEFCBF]/60 border border-[#FAF089] text-[#744210] text-[12px] leading-relaxed">
                      <strong className="font-semibold text-[#B7791F]">Notice:</strong> Location context and spatial infrastructure intelligence are synthesized dynamically upon authorized officer login.
                    </div>
                  </div>

                  {/* Primary Login Button (15px, 600 weight) */}
                  <button
                    onClick={() => setCurrentView('auth')}
                    className="w-full py-2.5 rounded bg-[#145DA0] hover:bg-[#0E4477] text-white font-semibold text-[15px] shadow-xs transition-colors flex items-center justify-center gap-2 border border-[#145DA0]"
                  >
                    <Lock className="w-4 h-4 text-white" />
                    <span>Access Municipal Portal</span>
                  </button>

                  <div className="pt-2 text-center text-[12px] text-[#7B8794] border-t border-[#E2E8F0]">
                    New Municipal Body?{' '}
                    <button
                      onClick={() => setCurrentView('auth')}
                      className="text-[#145DA0] font-semibold hover:underline"
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
      <section id="notices" className="py-14 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#E2E8F0]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-wider mb-1 font-gov-label">
                <FileText className="w-3.5 h-3.5 text-[#145DA0]" />
                <span>Departmental Communications</span>
              </div>
              <h2 className="text-[32px] sm:text-[36px] font-bold text-[#102A43] tracking-tight">
                Important Announcements & Government Orders
              </h2>
              <p className="text-[15px] text-[#52606D] font-normal">
                Official circulars, administrative resolutions, and system directives for Urban Local Bodies.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F0F4F8] rounded-md border border-[#CBD5E1] text-[13px] font-medium text-[#243B53]">
              <button
                onClick={() => setActiveNoticeTab('all')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeNoticeTab === 'all' ? 'bg-[#145DA0] text-white font-semibold shadow-xs' : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                All Notices
              </button>
              <button
                onClick={() => setActiveNoticeTab('circulars')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeNoticeTab === 'circulars' ? 'bg-[#145DA0] text-white font-semibold shadow-xs' : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                Circulars
              </button>
              <button
                onClick={() => setActiveNoticeTab('orders')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeNoticeTab === 'orders' ? 'bg-[#145DA0] text-white font-semibold shadow-xs' : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                Govt Orders
              </button>
              <button
                onClick={() => setActiveNoticeTab('updates')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeNoticeTab === 'updates' ? 'bg-[#145DA0] text-white font-semibold shadow-xs' : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                Platform Updates
              </button>
            </div>
          </div>

          {/* Official Government Table */}
          <div className="overflow-x-auto rounded border border-[#CBD5E1] shadow-2xs">
            <table className="w-full text-left">
              <thead className="bg-[#102A43] text-white font-semibold text-[12px] uppercase tracking-wider font-gov-label">
                <tr>
                  <th className="py-3 px-4 border-b border-[#243B53] w-28">Date</th>
                  <th className="py-3 px-4 border-b border-[#243B53] w-48">Reference Number</th>
                  <th className="py-3 px-4 border-b border-[#243B53]">Subject / Directive Title</th>
                  <th className="py-3 px-4 border-b border-[#243B53] w-56">Issuing Authority</th>
                  <th className="py-3 px-4 border-b border-[#243B53] text-center w-28">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] bg-white text-[14px]">
                {filteredNotices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#52606D] text-[13px] whitespace-nowrap">
                      {notice.date}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#1E3A5F] text-[13px] whitespace-nowrap">
                      {notice.grNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#102A43] leading-snug">
                      <div className="flex items-center gap-2">
                        {notice.isNew && (
                          <span className="px-1.5 py-0.2 rounded bg-[#C53030] text-white text-[9.5px] font-bold uppercase font-gov-label shrink-0">
                            NEW
                          </span>
                        )}
                        <span>{notice.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#52606D] text-[13px]">
                      {notice.dept}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button 
                        onClick={() => setCurrentView('auth')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F0F4F8] hover:bg-[#D9E2EC] text-[#145DA0] border border-[#CBD5E1] font-semibold text-[12px] transition-colors"
                      >
                        <Download className="w-3 h-3 text-[#C53030]" />
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
      <section id="services" className="py-16 bg-[#F0F4F8] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-widest block font-gov-label">
              Urban Local Body Administration Suite
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-bold text-[#102A43]">
              Quick Access Services
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#52606D] font-normal leading-relaxed">
              Integrated municipal intelligence modules engineered to fulfill statutory governance mandates for Nagar Parishads and Municipal Councils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccessServices.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div 
                  key={srv.id} 
                  className="bg-white rounded-lg border border-[#CBD5E1] shadow-2xs hover:border-[#145DA0]/60 transition-all p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded bg-[#102A43] text-white flex items-center justify-center">
                        <IconComp className="w-5 h-5 text-[#F0B429]" />
                      </div>
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#F0F4F8] text-[#1E3A5F] border border-[#CBD5E1]">
                        {srv.id}
                      </span>
                    </div>

                    <div>
                      {/* Card Title: 17px, 600 weight, #102A43 */}
                      <h3 className="text-[17px] font-semibold text-[#102A43]">
                        {srv.title}
                      </h3>
                      {/* Subheading: #243B53 */}
                      <p className="text-[12px] font-medium text-[#243B53] mt-0.5">
                        {srv.titleLocal} • {srv.dept}
                      </p>
                    </div>

                    {/* Card Description: 14px, 400 weight, #52606D */}
                    <p className="text-[14px] text-[#52606D] font-normal leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-[12px] text-[#7B8794] font-normal">
                      Eligibility: {srv.eligibility}
                    </span>
                    <button
                      onClick={() => setCurrentView('auth')}
                      className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#145DA0] hover:text-[#0E4477] transition-colors"
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
      <section id="about" className="py-16 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-widest block font-gov-label">
              National Mandate & Mission
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-bold text-[#102A43]">
              Platform Objectives
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#52606D] font-normal leading-relaxed">
              Transforming municipal administration across small and mid-sized cities through verifiable data and predictive intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Better Governance */}
            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#F0B429]" />
              </div>
              <h3 className="text-[20px] font-semibold text-[#243B53]">
                Better Governance
              </h3>
              <p className="text-[15px] text-[#52606D] font-normal leading-relaxed">
                Establishes an auditable, transparent municipal decision-making framework conforming strictly to statutory state municipal frameworks.
              </p>
            </div>

            {/* 2. Infrastructure Planning */}
            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#F0B429]" />
              </div>
              <h3 className="text-[20px] font-semibold text-[#243B53]">
                Infrastructure Planning
              </h3>
              <p className="text-[15px] text-[#52606D] font-normal leading-relaxed">
                Replaces discretionary project sanctioning with algorithmic need analysis, contour-level drainage mapping, and pavement life-cycle forecasting.
              </p>
            </div>

            {/* 3. Public Resource Optimization */}
            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-[#F0B429]" />
              </div>
              <h3 className="text-[20px] font-semibold text-[#243B53]">
                Public Resource Optimization
              </h3>
              <p className="text-[15px] text-[#52606D] font-normal leading-relaxed">
                Prevents grant lapsing by aligning 15th Finance Commission Tied/Untied grants and AMRUT 2.0 funds with maximum citizen impact projects.
              </p>
            </div>

            {/* 4. Data Driven Decision Making */}
            <div className="p-6 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#F0B429]" />
              </div>
              <h3 className="text-[20px] font-semibold text-[#243B53]">
                Data-Driven Decision Making
              </h3>
              <p className="text-[15px] text-[#52606D] font-normal leading-relaxed">
                Equips Chief Officers, Municipal Engineers, and General Body Committees with live spatial models and demographic projections.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. KEY PLATFORM FEATURES (Government Service Presentation)               */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-widest block font-gov-label">
              Core Technical Capabilities
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-bold text-[#102A43]">
              Key Platform Features
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#52606D] font-normal leading-relaxed">
              Standardized government services engineered for spatial accuracy, fiscal discipline, and citizen welfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#145DA0]" />
                <h3 className="text-[17px] font-semibold text-[#102A43]">AI Development Planning</h3>
              </div>
              <p className="text-[14px] text-[#52606D] font-normal leading-relaxed">
                Synthesizes ward demographics, road hierarchies, water networks, and drainage slopes into comprehensive 1-Year, 3-Year, and 5-Year Capital Investment Masterplans.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C53030]" />
                <h3 className="text-[17px] font-semibold text-[#102A43]">Infrastructure Risk Assessment</h3>
              </div>
              <p className="text-[14px] text-[#52606D] font-normal leading-relaxed">
                Automated multi-hazard risk engine identifying monsoon stormwater overflow zones, drinking water transmission pressure drop, and dark-spot road corridors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#16866B]" />
                <h3 className="text-[17px] font-semibold text-[#102A43]">Budget Allocation Intelligence</h3>
              </div>
              <p className="text-[14px] text-[#52606D] font-normal leading-relaxed">
                Calculates optimal capital outlay percentages across Drainage, Roads, Water Supply, and SWM to maximize citizen impact per rupee expended.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#B7791F]" />
                <h3 className="text-[17px] font-semibold text-[#102A43]">Project Prioritization</h3>
              </div>
              <p className="text-[14px] text-[#52606D] font-normal leading-relaxed">
                Multi-Criteria Decision Analysis (MCDA) ranking public works proposals based on severity, population density, disaster vulnerability, and cost effectiveness.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#145DA0]" />
                <h3 className="text-[17px] font-semibold text-[#102A43]">Ward Development Analytics</h3>
              </div>
              <p className="text-[14px] text-[#52606D] font-normal leading-relaxed">
                Computes standardized 6-pillar Ward Development Index (WDI) scores from 0-100 for every municipal ward, identifying backward sectors requiring intervention.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#167D9A]" />
                <h3 className="text-[17px] font-semibold text-[#102A43]">GIS-Based Monitoring</h3>
              </div>
              <p className="text-[14px] text-[#52606D] font-normal leading-relaxed">
                Interactive spatial visualization layers for OpenStreetMap road alignments, terrain elevation contours, pipeline routes, and ward boundaries.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DASHBOARD PREVIEW (Generic Blueprint Preview - NO CITY NAMES/DATA)      */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-widest block font-gov-label">
              Standardized Interface Architecture
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-bold text-[#102A43]">
              Dashboard Preview
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#52606D] font-normal leading-relaxed">
              Generic platform blueprint. All municipal telemetry, ward evaluations, and GIS layers are generated dynamically following authorized officer authentication.
            </p>
          </div>

          {/* Generic Blueprint Container */}
          <div className="rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] shadow-sm overflow-hidden">
            
            {/* Top Blueprint Bar */}
            <div className="bg-[#102A43] text-white px-4 py-3 flex items-center justify-between border-b border-[#243B53]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C53030]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F0B429]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16866B]" />
                </div>
                <span className="text-[12px] font-mono text-[#D9E2EC] font-semibold pl-2 border-l border-[#334E68]">
                  PLATFORM TEMPLATE • LOCATION CONTEXT: [SELECTED MUNICIPALITY]
                </span>
              </div>
              <span className="text-[10.5px] font-gov-label px-2 py-0.5 rounded bg-[#243B53] text-[#BCCCDC] border border-[#334E68]">
                Awaiting Officer Login
              </span>
            </div>

            {/* Blueprint Body */}
            <div className="p-6 space-y-6">
              
              {/* Header Meta Placeholders */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded bg-white border border-[#CBD5E1]">
                <div className="space-y-1">
                  <span className="text-[11px] text-[#7B8794] font-semibold uppercase block font-gov-label">
                    Active Municipal Profile
                  </span>
                  <div className="text-[20px] font-bold text-[#102A43]">
                    [Selected Municipality / Urban Local Body]
                  </div>
                  <p className="text-[13px] text-[#52606D]">
                    District: [District Administration] • State: [State Urban Development Department]
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded bg-[#F0F4F8] border border-[#CBD5E1] text-center">
                    <span className="text-[10.5px] text-[#52606D] font-semibold uppercase block font-gov-label">
                      Composite WDI Score
                    </span>
                    <span className="text-[17px] font-bold text-[#102A43] font-mono">[Evaluated on Login]</span>
                  </div>
                  <div className="p-3 rounded bg-[#F0F4F8] border border-[#CBD5E1] text-center">
                    <span className="text-[10.5px] text-[#52606D] font-semibold uppercase block font-gov-label">
                      Annual Allocation
                    </span>
                    <span className="text-[17px] font-bold text-[#16866B] font-mono">[15th FC Grants]</span>
                  </div>
                </div>
              </div>

              {/* 4 Generic Telemetry Blueprint Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 rounded bg-white border border-[#CBD5E1] space-y-2">
                  <div className="flex items-center justify-between text-[#243B53] font-semibold text-[13px]">
                    <span>Drainage Vulnerability</span>
                    <Activity className="w-4 h-4 text-[#145DA0]" />
                  </div>
                  <div className="text-[18px] font-bold text-[#102A43] font-mono">[Calculated Index]</div>
                  <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#145DA0] w-2/3" />
                  </div>
                  <p className="text-[11.5px] text-[#7B8794]">Synthesized via Digital Elevation Model</p>
                </div>

                <div className="p-4 rounded bg-white border border-[#CBD5E1] space-y-2">
                  <div className="flex items-center justify-between text-[#243B53] font-semibold text-[13px]">
                    <span>Road Pavement Distress</span>
                    <Building2 className="w-4 h-4 text-[#B7791F]" />
                  </div>
                  <div className="text-[18px] font-bold text-[#102A43] font-mono">[PDI Assessment]</div>
                  <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#B7791F] w-1/2" />
                  </div>
                  <p className="text-[11.5px] text-[#7B8794]">Commercial spine defect classification</p>
                </div>

                <div className="p-4 rounded bg-white border border-[#CBD5E1] space-y-2">
                  <div className="flex items-center justify-between text-[#243B53] font-semibold text-[13px]">
                    <span>Water Network Coverage</span>
                    <Compass className="w-4 h-4 text-[#16866B]" />
                  </div>
                  <div className="text-[18px] font-bold text-[#102A43] font-mono">[Pipeline Coverage]</div>
                  <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#16866B] w-3/4" />
                  </div>
                  <p className="text-[11.5px] text-[#7B8794]">Per-capita supply compliance metric</p>
                </div>

                <div className="p-4 rounded bg-white border border-[#CBD5E1] space-y-2">
                  <div className="flex items-center justify-between text-[#243B53] font-semibold text-[13px]">
                    <span>Prioritized Capital Works</span>
                    <FileText className="w-4 h-4 text-[#167D9A]" />
                  </div>
                  <div className="text-[18px] font-bold text-[#102A43] font-mono">[Ranked Works List]</div>
                  <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#167D9A] w-4/5" />
                  </div>
                  <p className="text-[11.5px] text-[#7B8794]">MCDA Multi-Criteria Prioritization</p>
                </div>

              </div>

              {/* Watermark Banner */}
              <div className="p-5 rounded bg-[#F0F4F8] border border-[#CBD5E1] text-center space-y-2">
                <span className="text-[13px] font-bold text-[#102A43] block font-gov-label">
                  GENERIC ULB EVALUATION BLUEPRINT • OFFICER AUTHENTICATION REQUIRED FOR LOCALIZED TELEMETRY
                </span>
                <p className="text-[13.5px] text-[#52606D] max-w-xl mx-auto font-normal">
                  Municipalities do not display preloaded public data. Authenticate to initialize dynamic location discovery (GPS or Municipality search) and generate real-time spatial intelligence.
                </p>
                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-5 py-2.5 rounded bg-[#145DA0] hover:bg-[#0E4477] text-white font-semibold text-[14px] shadow-xs transition-colors inline-flex items-center gap-1.5 border border-[#145DA0]"
                >
                  <Lock className="w-3.5 h-3.5 text-white" />
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
      <section className="py-16 bg-[#F0F4F8] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-widest block font-gov-label">
              Administrative Beneficiaries
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-bold text-[#102A43]">
              Platform Benefits Across ULB Tiers
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#52606D] font-normal leading-relaxed">
              Customized administrative outcomes aligned with tier-specific municipal staffing and statutory responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Nagar Parishads */}
            <div className="bg-white rounded-lg border border-[#CBD5E1] p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center font-bold font-gov-label">
                NP
              </div>
              <h3 className="text-[18px] font-bold text-[#102A43]">
                Nagar Parishads
              </h3>
              <span className="text-[12px] text-[#243B53] font-semibold block uppercase font-gov-label">
                Class A & B Municipal Councils
              </span>
              <ul className="space-y-2 text-[#52606D] text-[14px] pt-2 border-t border-[#E2E8F0] font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Automated 15th FC tied and untied grant compliance auditing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Pre-monsoon drainage desilting prioritization preventing market inundation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Standardized gazette-ready Annual Development Plan (ADP) documents.</span>
                </li>
              </ul>
            </div>

            {/* 2. Nagar Panchayats */}
            <div className="bg-white rounded-lg border border-[#CBD5E1] p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center font-bold font-gov-label">
                NPT
              </div>
              <h3 className="text-[18px] font-bold text-[#102A43]">
                Nagar Panchayats
              </h3>
              <span className="text-[12px] text-[#243B53] font-semibold block uppercase font-gov-label">
                Transitional Rural-Urban Centers
              </span>
              <ul className="space-y-2 text-[#52606D] text-[14px] pt-2 border-t border-[#E2E8F0] font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Overcomes limited engineering staff with automated civil cost estimation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Baseline water supply equity mapping across elevated peripheral wards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Rapid tender DPR drafting aligned with district schedule of rates.</span>
                </li>
              </ul>
            </div>

            {/* 3. Municipal Councils */}
            <div className="bg-white rounded-lg border border-[#CBD5E1] p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center font-bold font-gov-label">
                MC
              </div>
              <h3 className="text-[18px] font-bold text-[#102A43]">
                Municipal Councils
              </h3>
              <span className="text-[12px] text-[#243B53] font-semibold block uppercase font-gov-label">
                Class C Councils & Townships
              </span>
              <ul className="space-y-2 text-[#52606D] text-[14px] pt-2 border-t border-[#E2E8F0] font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Objective MCDA multi-criteria project ranking reducing council disputes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Solid waste route optimization and legacy dump reclamation tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>CC road vs bitumen durability simulations for transit corridors.</span>
                </li>
              </ul>
            </div>

            {/* 4. District Administrations */}
            <div className="bg-white rounded-lg border border-[#CBD5E1] p-6 space-y-3 shadow-2xs">
              <div className="w-9 h-9 rounded bg-[#102A43] text-white flex items-center justify-center font-bold font-gov-label">
                DPC
              </div>
              <h3 className="text-[18px] font-bold text-[#102A43]">
                District Administrations
              </h3>
              <span className="text-[12px] text-[#243B53] font-semibold block uppercase font-gov-label">
                Collectorates & Planning Committees
              </span>
              <ul className="space-y-2 text-[#52606D] text-[14px] pt-2 border-t border-[#E2E8F0] font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Unified district multi-tenant dashboard benchmarking all regional ULBs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
                  <span>Real-time monitoring of fund utilization certificates and project tranches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0 mt-0.5" />
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
      <section id="reports" className="py-16 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-widest block font-gov-label">
              Knowledge Repository
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-bold text-[#102A43]">
              Reports, Guidelines & Policy Documents
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#52606D] font-normal leading-relaxed">
              Download official publications, statutory guidelines, technical manuals, and standard operating procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Category 1: Latest Reports */}
            <div className="p-5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
              <div className="flex items-center gap-2 text-[#102A43] font-semibold border-b border-[#E2E8F0] pb-2">
                <FileText className="w-4 h-4 text-[#145DA0]" />
                <span className="uppercase tracking-wider font-gov-label text-[12px] text-[#1E3A5F]">Latest Reports</span>
              </div>
              <ul className="space-y-2.5 text-[14px]">
                <li className="p-3 rounded bg-white border border-[#E2E8F0] hover:border-[#145DA0] transition-colors">
                  <span className="text-[11px] text-[#7B8794] font-mono block">DOC-REP-2026-01</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-semibold text-[#102A43] hover:text-[#145DA0] block mt-0.5 leading-snug">
                    State ULB Infrastructure Composite Baseline Report 2026
                  </a>
                  <span className="text-[11px] text-[#7B8794] mt-1 inline-block">PDF • 4.8 MB</span>
                </li>
                <li className="p-3 rounded bg-white border border-[#E2E8F0] hover:border-[#145DA0] transition-colors">
                  <span className="text-[11px] text-[#7B8794] font-mono block">DOC-REP-2026-02</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-semibold text-[#102A43] hover:text-[#145DA0] block mt-0.5 leading-snug">
                    Municipal Drainage Runoff & Desilting Audit Findings
                  </a>
                  <span className="text-[11px] text-[#7B8794] mt-1 inline-block">PDF • 2.6 MB</span>
                </li>
              </ul>
            </div>

            {/* Category 2: Guidelines & Policies */}
            <div className="p-5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
              <div className="flex items-center gap-2 text-[#102A43] font-semibold border-b border-[#E2E8F0] pb-2">
                <Award className="w-4 h-4 text-[#B7791F]" />
                <span className="uppercase tracking-wider font-gov-label text-[12px] text-[#1E3A5F]">Guidelines & Policies</span>
              </div>
              <ul className="space-y-2.5 text-[14px]">
                <li className="p-3 rounded bg-white border border-[#E2E8F0] hover:border-[#145DA0] transition-colors">
                  <span className="text-[11px] text-[#7B8794] font-mono block">SOP-15FC-SPATIAL</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-semibold text-[#102A43] hover:text-[#145DA0] block mt-0.5 leading-snug">
                    SOP for 15th FC Spatial Verification & Project Tagging
                  </a>
                  <span className="text-[11px] text-[#7B8794] mt-1 inline-block">PDF • 1.9 MB</span>
                </li>
                <li className="p-3 rounded bg-white border border-[#E2E8F0] hover:border-[#145DA0] transition-colors">
                  <span className="text-[11px] text-[#7B8794] font-mono block">POL-GIS-CADASTRAL</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-semibold text-[#102A43] hover:text-[#145DA0] block mt-0.5 leading-snug">
                    National GIS Ward Boundary Vectorization Norms
                  </a>
                  <span className="text-[11px] text-[#7B8794] mt-1 inline-block">PDF • 3.2 MB</span>
                </li>
              </ul>
            </div>

            {/* Category 3: User Manuals & Training */}
            <div className="p-5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
              <div className="flex items-center gap-2 text-[#102A43] font-semibold border-b border-[#E2E8F0] pb-2">
                <ShieldCheck className="w-4 h-4 text-[#16866B]" />
                <span className="uppercase tracking-wider font-gov-label text-[12px] text-[#1E3A5F]">User Manuals & Training</span>
              </div>
              <ul className="space-y-2.5 text-[14px]">
                <li className="p-3 rounded bg-white border border-[#E2E8F0] hover:border-[#145DA0] transition-colors">
                  <span className="text-[11px] text-[#7B8794] font-mono block">MAN-OFFICER-V4</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-semibold text-[#102A43] hover:text-[#145DA0] block mt-0.5 leading-snug">
                    Municipal Chief Officer & Engineer Operational Handbook
                  </a>
                  <span className="text-[11px] text-[#7B8794] mt-1 inline-block">PDF • 6.4 MB</span>
                </li>
                <li className="p-3 rounded bg-white border border-[#E2E8F0] hover:border-[#145DA0] transition-colors">
                  <span className="text-[11px] text-[#7B8794] font-mono block">TRAIN-MCDA-TOOL</span>
                  <a href="#reports" onClick={() => setCurrentView('auth')} className="font-semibold text-[#102A43] hover:text-[#145DA0] block mt-0.5 leading-snug">
                    MCDA Public Works Scoring Methodology Training Guide
                  </a>
                  <span className="text-[11px] text-[#7B8794] mt-1 inline-block">PDF • 1.4 MB</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. HELPDESK & SUPPORT DIRECTORY                                         */}
      {/* ========================================================================= */}
      <section id="helpdesk" className="py-16 bg-[#F0F4F8] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left 6 Columns: Official Helpdesk Directory */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[12px] font-semibold text-[#1E3A5F] uppercase tracking-widest block font-gov-label">
                  Assistance & Escalations
                </span>
                <h2 className="text-[32px] font-bold text-[#102A43]">
                  Helpdesk & Support Center
                </h2>
                <p className="text-[15px] text-[#52606D] mt-1 font-normal">
                  Dedicated municipal support desk assisting Urban Local Bodies with system operations, data ingestion, and technical verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2 text-[#16866B] font-semibold text-[13px]">
                    <Phone className="w-4 h-4" />
                    <span>Toll-Free Helpline</span>
                  </div>
                  <strong className="text-[26px] font-bold text-[#102A43] font-mono block leading-tight">
                    1800-120-8040
                  </strong>
                  <span className="text-[12px] text-[#7B8794] block">
                    Mon - Sat: 9:30 AM to 6:00 PM (Working Days)
                  </span>
                </div>

                <div className="p-5 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2 text-[#145DA0] font-semibold text-[13px]">
                    <Mail className="w-4 h-4" />
                    <span>Official Email Support</span>
                  </div>
                  <strong className="text-[14px] font-bold text-[#102A43] font-mono block mt-1">
                    helpdesk-civicmind@nic.in
                  </strong>
                  <span className="text-[12px] text-[#7B8794] block mt-1">
                    Response time: 24 - 48 business hours
                  </span>
                </div>

              </div>

              {/* Physical Address */}
              <div className="p-5 rounded-lg bg-white border border-[#CBD5E1] shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-[#102A43] font-semibold text-[14px]">
                  <MapPin className="w-4 h-4 text-[#145DA0]" />
                  <span>National Project Directorate</span>
                </div>
                <p className="text-[14px] text-[#52606D] leading-relaxed font-normal">
                  Directorate of Urban Local Bodies, 4th Floor, Urban Development Bhawan, Civil Administrative Enclave.
                </p>
              </div>
            </div>

            {/* Right 6 Columns: Frequently Asked Questions (Accordion) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="border-b border-[#CBD5E1] pb-2">
                <h3 className="text-[20px] font-bold text-[#102A43]">
                  Frequently Asked Questions (FAQs)
                </h3>
                <p className="text-[13.5px] text-[#52606D]">
                  Clarifications on ULB onboarding, data governance, and grant computation.
                </p>
              </div>

              <div className="space-y-3">
                {officialFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id} 
                      className="rounded border border-[#CBD5E1] bg-white overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3 text-[15px] font-semibold text-[#102A43] hover:bg-[#F8FAFC] transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-[#52606D] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-[14px] text-[#52606D] leading-relaxed border-t border-[#E2E8F0] bg-[#F8FAFC]/50 font-normal">
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
      <footer id="contact" className="bg-[#102A43] text-[#D9E2EC] border-t-4 border-[#145DA0] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-[#243B53]">
            
            {/* Col 1: Portal Identity */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[#243B53] border border-[#334E68] flex items-center justify-center text-[#F0B429]">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-[18px] font-bold text-white">CivicMind AI</span>
              </div>
              <p className="text-[13px] text-[#9FB3C8] leading-relaxed font-normal">
                Official National Development Intelligence Platform for Urban Local Bodies (ULBs). Empowering Nagar Parishads, Nagar Panchayats, and Municipal Councils with automated GIS infrastructure planning, risk assessment, and budget optimization.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2.5">
              <span className="text-[12px] font-semibold text-white uppercase tracking-wider font-gov-label block">
                Quick Navigation
              </span>
              <ul className="space-y-1.5 text-[13.5px] text-[#BCCCDC]">
                <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Platform</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services Directory</a></li>
                <li><a href="#reports" className="hover:text-white transition-colors">Circulars & Reports</a></li>
                <li><a href="#helpdesk" className="hover:text-white transition-colors">Help Desk</a></li>
              </ul>
            </div>

            {/* Col 3: Government Portals */}
            <div className="space-y-2.5">
              <span className="text-[12px] font-semibold text-white uppercase tracking-wider font-gov-label block">
                National Portals
              </span>
              <ul className="space-y-1.5 text-[13.5px] text-[#BCCCDC]">
                <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>India.gov.in</span><ExternalLink className="w-3 h-3 text-[#627D98]" /></a></li>
                <li><a href="https://mohua.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>MoHUA Portal</span><ExternalLink className="w-3 h-3 text-[#627D98]" /></a></li>
                <li><a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>Digital India</span><ExternalLink className="w-3 h-3 text-[#627D98]" /></a></li>
                <li><a href="https://pmay-urban.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>PMAY-Urban</span><ExternalLink className="w-3 h-3 text-[#627D98]" /></a></li>
              </ul>
            </div>

            {/* Col 4: Statutory Compliance */}
            <div className="space-y-2.5">
              <span className="text-[12px] font-semibold text-white uppercase tracking-wider font-gov-label block">
                Statutory Policies
              </span>
              <ul className="space-y-1.5 text-[13.5px] text-[#BCCCDC]">
                <li><a href="#contact" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Accessibility Statement</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Hyperlinking Policy</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Attribution & GIGW Standards Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#9FB3C8]">
            <div className="space-y-1 text-center md:text-left">
              <p>
                Website designed, developed, hosted and maintained by the <strong>National Urban Informatics Initiative / CivicMind AI Platform</strong>.
              </p>
              <p>
                Contents owned and maintained by Urban Development Department, Government of India / State Governments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center md:text-right shrink-0">
              <span className="font-mono text-[11.5px]">Last Updated: 16-Sep-2026</span>
              <span className="hidden sm:inline text-[#486581]">|</span>
              <span className="px-2 py-0.5 rounded bg-[#243B53] text-[#D9E2EC] border border-[#334E68] text-[11px] font-gov-label">
                GIGW 3.0 & W3C WAI-AA
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
