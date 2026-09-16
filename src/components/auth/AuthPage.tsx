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
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  RefreshCw
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { loginUser, setCurrentView } = useCivic();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Officer Rajesh Patil');
  const [email, setEmail] = useState('officer@ulb.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [organization, setOrganization] = useState('Municipal Administration');
  const [role, setRole] = useState<UserRole>('Chief Officer');
  const [captchaInput, setCaptchaInput] = useState('7K9P2');
  const [captchaCode, setCaptchaCode] = useState('7K9P2');

  const roles: UserRole[] = [
    'Chief Officer',
    'Municipal Officer',
    'Planner',
    'Engineer',
    'Administrator'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name: name || 'Municipal Official',
      email: email || 'officer@ulb.gov.in',
      organization: organization || 'Local Municipal Council',
      role: role
    });
  };

  const handleQuickDemo = (demoRole: UserRole, demoName: string, demoOrg: string) => {
    loginUser({
      name: demoName,
      email: `${demoRole.toLowerCase().replace(/\s+/g, '.')}@ulb.gov.in`,
      organization: demoOrg,
      role: demoRole
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-between antialiased selection:bg-blue-900 selection:text-white">
      
      {/* Top Government Strip */}
      <div className="bg-[#0b1f3a] text-slate-200 text-xs py-1.5 px-4 border-b border-[#173359]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">भारत सरकार | GOVERNMENT OF INDIA</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 hidden sm:inline">Ministry of Housing & Urban Affairs</span>
          </div>
          <span className="text-[10px] font-mono text-amber-300">
            SECURE GOVERNMENT SSO GATEWAY (Parichay Standard)
          </span>
        </div>
      </div>

      {/* Tricolor Hairline */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      {/* Navigation Return */}
      <div className="max-w-md w-full mx-auto px-4 pt-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Official Portal</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#0b2545] text-amber-300 flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-black text-[#0b2545] font-serif">CivicMind AI</span>
        </div>
      </div>

      {/* Main Official SSO Card */}
      <div className="max-w-md w-full mx-auto my-auto p-4">
        <div className="bg-white rounded-lg border-2 border-slate-300 shadow-xl overflow-hidden">
          
          {/* Card Title Banner */}
          <div className="bg-[#0b2545] text-white p-4 border-b-2 border-amber-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-300" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-serif">
                  {isRegister ? 'ULB Registration Gateway' : 'Officer Single Sign-On (SSO)'}
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Official
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              {isRegister 
                ? 'Register your municipal organization for development intelligence' 
                : 'Enter your official credentials to access municipal decision models'}
            </p>
          </div>

          {/* Toggle pill */}
          <div className="p-4 pb-0">
            <div className="flex p-1 rounded bg-slate-100 border border-slate-300 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`flex-1 py-1.5 rounded transition-all ${
                  !isRegister ? 'bg-[#0b2545] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Official Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className={`flex-1 py-1.5 rounded transition-all ${
                  isRegister ? 'bg-[#0b2545] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register Council / ULB
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            
            {/* Full Name */}
            {isRegister && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Official Name & Designation</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Officer Rajesh Patil"
                    className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Official Government Email ID</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@ulb.gov.in"
                  className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Password / Digital Token</label>
              <div className="relative">
                <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>
            </div>

            {/* Municipality / Organization */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Administrative Organization</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Municipal Administration"
                  className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Officer Designation</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900 font-medium cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Captcha Box (Real Government Form Requirement) */}
            <div className="space-y-1 pt-1">
              <label className="block text-xs font-semibold text-slate-700">Security Verification Code</label>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded bg-slate-200 border border-slate-400 text-slate-800 font-mono font-black tracking-widest text-sm select-none line-through">
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
                  title="Generate new Captcha"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter Code"
                  className="flex-1 px-3 py-2 rounded border border-slate-300 bg-slate-50 text-slate-900 font-mono uppercase text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#0b2545] hover:bg-[#11244e] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 border border-[#134074] mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>{isRegister ? 'Submit ULB Registration' : 'Authenticate & Continue'}</span>
            </button>

            {/* Note */}
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
              <span>
                Following successful authentication, you will be prompted to select your municipality or use GPS location.
              </span>
            </div>

            {/* Demo Fast Login Buttons */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase block text-center">
                Quick Access Profiles (Evaluation Mode)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Chief Officer', 'Chief Officer', 'Municipal Administration')}
                  className="p-2 rounded bg-slate-50 hover:bg-slate-100 text-left border border-slate-200 transition-colors"
                >
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">Chief Officer</span>
                  <span className="text-[9px] text-slate-500">Executive ULB Head</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Engineer', 'City Engineer', 'Public Works Dept')}
                  className="p-2 rounded bg-slate-50 hover:bg-slate-100 text-left border border-slate-200 transition-colors"
                >
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">City Engineer</span>
                  <span className="text-[9px] text-slate-500">Engineering Cell</span>
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="py-4 text-center text-[10.5px] text-slate-500">
        <p>National Urban Informatics Initiative • Ministry of Housing & Urban Affairs Aligned</p>
        <p className="mt-0.5">Protected under the Information Technology Act & Official Secrets Norms.</p>
      </div>

    </div>
  );
};
