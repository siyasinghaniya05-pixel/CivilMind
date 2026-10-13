'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { UserRole } from '@/types';
import { 
  Building2, 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Mail, 
  User, 
  AlertCircle,
  KeyRound,
  RefreshCw,
  Search,
  CheckCircle2,
  FileCheck2,
  Cpu,
  BadgeCheck,
  Shield,
  Smartphone,
  ChevronRight,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AuthPage: React.FC = () => {
  const { loginUser, setCurrentView } = useCivic();

  const [isRegister, setIsRegister] = useState(false);
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [name, setName] = useState('Officer Rajesh Patil');
  const [email, setEmail] = useState('r.patil.co@ulb.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [otpVal, setOtpVal] = useState('849201');
  const [organization, setOrganization] = useState('Brihanmumbai Municipal Corporation (BMC - Zone 1)');
  const [role, setRole] = useState<UserRole>('Chief Officer');
  const [captchaInput, setCaptchaInput] = useState('7K9P2');
  const [captchaCode, setCaptchaCode] = useState('7K9P2');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const roles: { value: UserRole; label: string; marathi: string }[] = [
    { value: 'Chief Officer', label: 'Chief Officer (मुख्याधिकारी / Additional Commissioner)', marathi: 'मुख्याधिकारी' },
    { value: 'Administrator', label: 'Municipal Commissioner / Chief Executive Officer (CEO)', marathi: 'महानगरपालिका आयुक्त' },
    { value: 'Engineer', label: 'City Engineer / Superintending Engineer (नगर अभियंता)', marathi: 'नगर अभियंता' },
    { value: 'Planner', label: 'Town Planner / GIS Spatial Officer (नगर रचनाकार)', marathi: 'नगर रचनाकार' },
    { value: 'Municipal Officer', label: 'ULB Nodal Security & AMRUT Officer', marathi: 'नोडल अधिकारी' },
  ];

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput(result);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSsoClick = (ssoType: string) => {
    setIsLoading(true);
    showToast(`Redirecting to Sovereign ${ssoType} OAuth Gateway...`);
    setTimeout(() => {
      setIsLoading(false);
      loginUser({
        name: 'Shri Rajeshwar Rao, IAS',
        email: 'r.rao.ias@gov.in',
        organization: organization,
        role: 'Chief Officer'
      });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      showToast('Captcha verification failed. Please try again.');
      refreshCaptcha();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser({
        name: name || 'Municipal Official',
        email: email || 'officer@ulb.gov.in',
        organization: organization || 'Brihanmumbai Municipal Corporation',
        role: role
      });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }, 800);
  };

  const handleQuickDemo = (demoRole: UserRole, demoName: string, demoOrg: string, demoEmail: string) => {
    setRole(demoRole);
    setName(demoName);
    setOrganization(demoOrg);
    setEmail(demoEmail);
    showToast(`Quick Access: Loaded ${demoRole} profile`);
    loginUser({
      name: demoName,
      email: demoEmail,
      organization: demoOrg,
      role: demoRole
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between antialiased selection:bg-[#145DA0] selection:text-white">
      {/* 1. TOP SOVEREIGN HEADER STRIP */}
      <header className="w-full">
        {/* Tricolor Micro-Accent Hairline */}
        <div className="h-1 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]" />
          <div className="bg-[#FFFFFF]" />
          <div className="bg-[#138808]" />
        </div>

        {/* Official Governance Rim */}
        <div className="bg-[#102A43] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-[#243B53]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-wide">भारत सरकार | GOVERNMENT OF INDIA</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 hidden sm:inline">Ministry of Housing & Urban Affairs (MoHUA)</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-amber-400 font-semibold hidden md:inline">● SSL TLS 1.3 CERTIFIED</span>
              <span className="text-emerald-400 font-bold">NIC MEITY-WEST-1</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. SPLIT-SCREEN AUTHENTICATION CONSOLE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center">
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col lg:flex-row">
          
          {/* ========================================================================= */}
          {/* LEFT PANEL: Deep Sovereign Cadastral Vector Visual                        */}
          {/* ========================================================================= */}
          <div className="lg:w-1/2 relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0c2338] via-[#102A43] to-[#145DA0] text-white p-6 sm:p-10 lg:p-12">
            
            {/* Architectural Grid & Cadastral Vector Telemetry Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cadastral-grid" width="64" height="64" patternUnits="userSpaceOnUse">
                    <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-blue-200" />
                    <circle cx="0" cy="0" r="1.5" fill="currentColor" className="text-blue-200" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cadastral-grid)" />
                <path d="M 80,140 Q 240,60 480,180 T 820,120 L 780,480 Q 520,380 260,520 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6,4" className="text-cyan-300" opacity="0.4" />
                <path d="M 140,240 Q 320,180 540,290 T 720,440" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-300" opacity="0.35" />
              </svg>
            </div>

            {/* Glowing Coordinates Pin */}
            <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
              <div className="inline-flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>MUMBAI ZONE VII • 19.0760° N, 72.8777° E</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-300 text-xs font-mono bg-slate-900/40 px-2.5 py-1 rounded border border-white/10">
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                <span>GIS L-Band Synced</span>
              </div>
            </div>

            {/* Left Content Body */}
            <div className="relative z-10 flex flex-col gap-6 my-auto">
              
              {/* Sovereign Hierarchy Pill */}
              <div className="inline-flex items-center self-start gap-2 bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-cyan-400/30">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                <span>Secure Municipal Access Gateway • Govt of India</span>
              </div>

              {/* Brand & Mission Statement */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-white">CivicMind</span>
                  <span className="bg-[#145DA0] text-cyan-200 text-xs font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-cyan-400/30">
                    ULB-AI v4.8
                  </span>
                </div>
                <div className="text-sm font-semibold text-cyan-200">
                  नगर स्थानिक स्वराज्य संस्था निर्णय बुद्धिमत्ता प्रणाली
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Empowering Urban Decision Intelligence Across 24+ Municipal Corporations & Councils
                </h1>
                <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                  Predict infrastructure bottlenecks, simulate monsoon inundation risks, optimize AMRUT 2.0 & SBM 2.0 capital expenditure, and streamline ward-level engineering workflows.
                </p>
              </div>

              {/* High-Density Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex flex-col gap-1">
                  <span className="text-xs font-bold text-cyan-300">Predictive Hydrology</span>
                  <p className="text-[11px] text-slate-200 leading-snug">
                    Pre-monsoon stormwater culvert telemetry & inundation risk maps.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex flex-col gap-1">
                  <span className="text-xs font-bold text-amber-300">Fiscal & DPR Auditing</span>
                  <p className="text-[11px] text-slate-200 leading-snug">
                    CPHEEO guideline checks & automated 15th FC grant reconciliation.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex flex-col gap-1">
                  <span className="text-xs font-bold text-emerald-300">Sovereign Integrity</span>
                  <p className="text-[11px] text-slate-200 leading-snug">
                    100% MeitY cloud hosting with DSC token e-Sign authentication.
                  </p>
                </div>
              </div>

              {/* Municipal Commissioner Testimonial */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1">
                  <p className="italic text-slate-200 leading-relaxed">
                    “CivicMind reduced our pre-monsoon desilting verification cycle from 6 weeks to 48 hours, eliminating ward discrepancies across 24 administrative circles.”
                  </p>
                  <div className="font-semibold text-cyan-200 text-[11px]">
                    Municipal Commissioner (IAS) • Brihanmumbai Municipal Corporation (BMC)
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Compliance & Security Assurance Strip */}
            <div className="relative z-10 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> MeitY Empanelled Cloud
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" /> CERT-In Level 3
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-400" /> GIGW 3.0 / WCAG 2.1 AA
                </span>
              </div>
              <div className="font-mono text-[10px] text-slate-400">
                SHA-256: 8F2A-94B1-CIVIC
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: Officer Authentication Console                                */}
          {/* ========================================================================= */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center bg-slate-50/50 dark:bg-slate-900/50 p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-lg space-y-5">
              
              {/* Return to Portal Button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentView('landing')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-blue-600" />
                  <span>Return to Public Portal</span>
                </button>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>LIVE GATEWAY</span>
                </div>
              </div>

              {/* Hierarchy Switcher Toggle */}
              <div className="bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl flex items-center text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    !isRegister
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Officer Portal Sign In (अधिकारी प्रवेश)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    isRegister
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>New ULB Registration</span>
                </button>
              </div>

              {/* Fast-Track Sovereign SSO Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSsoClick('Parichay / MeriPehchaan')}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Parichay / MeriPehchaan</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSsoClick('NIC DSC Token')}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>NIC DSC / e-Sign Token</span>
                </button>
              </div>

              {/* Institutional Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />
                <span className="absolute bg-slate-50 dark:bg-slate-900 px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Or Proceed with Official Credentials
                </span>
              </div>

              {/* Authentication Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Organization / ULB Selection */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <label>Urban Local Body (ULB) / Corporation</label>
                    <span className="text-[10px] font-mono text-slate-400">ULB Code Indexed</span>
                  </div>
                  <div className="relative flex items-center">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Brihanmumbai Municipal Corporation"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Administrative Role Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Designated Administrative Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name field if Register */}
                {isRegister && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Officer Full Name & Cadre
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Officer Rajesh Patil"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <label>Official Government Email ID</label>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <Shield className="w-3 h-3" /> Gov Domain Mandated
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="officer.name@ulb.gov.in"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Security Credential Mode Toggle */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <span>Credential Mode</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setAuthMode('password')}
                      className={`py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                        authMode === 'password'
                          ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-white font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Password Key</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('otp')}
                      className={`py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                        authMode === 'otp'
                          ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-white font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Aadhaar OTP</span>
                    </button>
                  </div>
                </div>

                {/* Password / OTP Input */}
                {authMode === 'password' ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <label>Officer Security Passkey</label>
                      <button type="button" className="text-[11px] text-blue-600 hover:underline">Forgot passkey?</button>
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <label>Enter Aadhaar-Linked OTP</label>
                      <span className="text-[10px] font-mono text-emerald-600">Valid: 03:00 min</span>
                    </div>
                    <div className="relative flex items-center">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                      <input
                        type="text"
                        maxLength={6}
                        value={otpVal}
                        onChange={(e) => setOtpVal(e.target.value)}
                        placeholder="6-Digit OTP"
                        className="w-full pl-9 pr-24 py-2 text-xs font-mono tracking-widest rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => showToast('OTP sent to Aadhaar-registered mobile number ending in 4108')}
                        className="absolute right-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* Distortion Security CAPTCHA */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <label>Anti-Automation CAPTCHA</label>
                    <span className="text-[10px] text-slate-400">Case-Insensitive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-mono font-black text-sm tracking-widest select-none line-through">
                      {captchaCode}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                      title="New CAPTCHA"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="text"
                      required
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter CAPTCHA"
                      className="flex-1 px-3 py-1.5 text-xs font-mono uppercase rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-75 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Validating Official Credentials...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isRegister ? 'Submit ULB Registration' : 'Authenticate & Enter Gateway'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick Evaluation Profiles */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">
                  Evaluation Fast-Track Role Profiles
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Chief Officer', 'Chief Officer R. Patil', 'Brihanmumbai Municipal Corporation', 'co@ulb.gov.in')}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Chief Officer</span>
                    <span className="text-[10px] text-slate-500">Executive ULB Head</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Administrator', 'Shri Rajeshwar Rao, IAS', 'Brihanmumbai Municipal Corporation', 'mc.ias@ulb.gov.in')}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Commissioner (IAS)</span>
                    <span className="text-[10px] text-slate-500">ULB Principal Head</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Engineer', 'City Engineer S. Kulkarni', 'Pune Municipal Corporation', 'engineer@ulb.gov.in')}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">City Engineer</span>
                    <span className="text-[10px] text-slate-500">AMRUT / PWD Cell</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Planner', 'Town Planner M. Deshmukh', 'Thane Municipal Corporation', 'planner@ulb.gov.in')}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Town Planner</span>
                    <span className="text-[10px] text-slate-500">GIS & DP Section</span>
                  </button>
                </div>
              </div>

              {/* Statutory Legal Warning Notice */}
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  <strong>Statutory Notice:</strong> Unauthorized access to sovereign municipal systems is strictly punishable under Sections 43 & 66 of the Information Technology Act, 2000.
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800">
        <p className="font-semibold text-slate-600 dark:text-slate-400">
          CivicMind Municipal Intelligence Gateway • National Urban Digital Mission (NUDM) Architecture
        </p>
        <p className="text-[11px] mt-0.5">
          Standardized under MeitY GIGW 3.0 Guidelines & Official Secrets Protocol.
        </p>
      </footer>

      {/* Floating Notification Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102A43] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-cyan-400/30 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
