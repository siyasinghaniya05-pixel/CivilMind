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
    <div className="min-h-screen bg-[#F0F4F8] text-[#52606D] flex flex-col justify-between antialiased selection:bg-[#145DA0] selection:text-white">
      
      {/* Top Government Strip */}
      <div className="bg-[#102A43] text-[#D9E2EC] text-[12px] py-1.5 px-4 border-b border-[#243B53]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wide font-gov-label">भारत सरकार | GOVERNMENT OF INDIA</span>
            <span className="text-[#486581]">|</span>
            <span className="text-[#9FB3C8] hidden sm:inline">Ministry of Housing & Urban Affairs</span>
          </div>
          <span className="text-[10.5px] font-mono text-[#F0B429]">
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
      <div className="max-w-md w-full mx-auto px-4 pt-5 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#243B53] hover:text-[#145DA0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#145DA0]" />
          <span>Return to Official Portal</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#102A43] text-[#F0B429] flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="text-[15px] font-bold text-[#102A43]">CivicMind AI</span>
        </div>
      </div>

      {/* Main Official SSO Card */}
      <div className="max-w-md w-full mx-auto my-auto p-4">
        <div className="bg-white rounded-lg border border-[#CBD5E1] shadow-md overflow-hidden">
          
          {/* Card Title Banner */}
          <div className="bg-[#102A43] text-white p-4 border-b border-[#243B53]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#F0B429]" />
                <h2 className="text-[15px] font-bold tracking-wide font-gov-label">
                  {isRegister ? 'ULB Registration Gateway' : 'Officer Single Sign-On (SSO)'}
                </h2>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#16866B]/20 text-[#3EBD93] border border-[#16866B]/40 font-gov-label">
                Official
              </span>
            </div>
            <p className="text-[12px] text-[#BCCCDC] mt-1 font-normal">
              {isRegister 
                ? 'Register your municipal organization for development intelligence' 
                : 'Enter your official credentials to access municipal decision models'}
            </p>
          </div>

          {/* Toggle pill */}
          <div className="p-4 pb-0">
            <div className="flex p-1 rounded bg-[#F0F4F8] border border-[#CBD5E1] text-[13px] font-medium">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`flex-1 py-1.5 rounded transition-all ${
                  !isRegister ? 'bg-[#145DA0] text-white font-semibold shadow-2xs' : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                Official Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className={`flex-1 py-1.5 rounded transition-all ${
                  isRegister ? 'bg-[#145DA0] text-white font-semibold shadow-2xs' : 'text-[#243B53] hover:text-[#102A43]'
                }`}
              >
                Register Council / ULB
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-[13px]">
            
            {/* Full Name */}
            {isRegister && (
              <div className="space-y-1">
                <label className="block text-[12.5px] font-semibold text-[#1E3A5F] font-gov-label">Official Name & Designation</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#7B8794] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Officer Rajesh Patil"
                    className="w-full pl-9 pr-3 py-2 rounded border border-[#CBD5E1] bg-[#F8FAFC] text-[#102A43] text-[13px] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#145DA0]"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-[12.5px] font-semibold text-[#1E3A5F] font-gov-label">Official Government Email ID</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#7B8794] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@ulb.gov.in"
                  className="w-full pl-9 pr-3 py-2 rounded border border-[#CBD5E1] bg-[#F8FAFC] text-[#102A43] text-[13px] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#145DA0]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-[12.5px] font-semibold text-[#1E3A5F] font-gov-label">Password / Digital Token</label>
              <div className="relative">
                <KeyRound className="w-3.5 h-3.5 text-[#7B8794] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded border border-[#CBD5E1] bg-[#F8FAFC] text-[#102A43] text-[13px] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#145DA0]"
                />
              </div>
            </div>

            {/* Municipality / Organization */}
            <div className="space-y-1">
              <label className="block text-[12.5px] font-semibold text-[#1E3A5F] font-gov-label">Administrative Organization</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-[#7B8794] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Municipal Administration"
                  className="w-full pl-9 pr-3 py-2 rounded border border-[#CBD5E1] bg-[#F8FAFC] text-[#102A43] text-[13px] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#145DA0]"
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="space-y-1">
              <label className="block text-[12.5px] font-semibold text-[#1E3A5F] font-gov-label">Officer Designation</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded border border-[#CBD5E1] bg-[#F8FAFC] text-[#102A43] text-[13px] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#145DA0] font-medium cursor-pointer"
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
              <label className="block text-[12.5px] font-semibold text-[#1E3A5F] font-gov-label">Security Verification Code</label>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded bg-[#E2E8F0] border border-[#CBD5E1] text-[#102A43] font-mono font-bold tracking-widest text-[14px] select-none line-through">
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-2 rounded bg-[#F0F4F8] hover:bg-[#D9E2EC] text-[#243B53] border border-[#CBD5E1]"
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
                  className="flex-1 px-3 py-2 rounded border border-[#CBD5E1] bg-[#F8FAFC] text-[#102A43] font-mono uppercase text-[13px] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#145DA0]"
                />
              </div>
            </div>

            {/* Submit Button (15px, 600 weight, #145DA0) */}
            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#145DA0] hover:bg-[#0E4477] text-white font-semibold text-[15px] shadow-xs transition-colors flex items-center justify-center gap-2 border border-[#145DA0] mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>{isRegister ? 'Submit ULB Registration' : 'Authenticate & Continue'}</span>
            </button>

            {/* Note */}
            <div className="p-2.5 rounded bg-[#F0F4F8] border border-[#CBD5E1] text-[12px] text-[#52606D] leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#145DA0] shrink-0 mt-0.5" />
              <span>
                Following successful authentication, you will be prompted to select your municipality or use GPS location.
              </span>
            </div>

            {/* Quick Demo Access Buttons */}
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <span className="text-[11px] font-semibold text-[#7B8794] uppercase block text-center font-gov-label">
                Quick Access Profiles (Evaluation Mode)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Chief Officer', 'Chief Officer', 'Municipal Administration')}
                  className="p-2 rounded bg-[#F8FAFC] hover:bg-[#F0F4F8] text-left border border-[#CBD5E1] transition-colors"
                >
                  <span className="text-[12.5px] font-semibold text-[#102A43] block leading-tight">Chief Officer</span>
                  <span className="text-[10px] text-[#7B8794]">Executive ULB Head</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Engineer', 'City Engineer', 'Public Works Dept')}
                  className="p-2 rounded bg-[#F8FAFC] hover:bg-[#F0F4F8] text-left border border-[#CBD5E1] transition-colors"
                >
                  <span className="text-[12.5px] font-semibold text-[#102A43] block leading-tight">City Engineer</span>
                  <span className="text-[10px] text-[#7B8794]">Engineering Cell</span>
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="py-4 text-center text-[11px] text-[#7B8794]">
        <p>National Urban Informatics Initiative • Ministry of Housing & Urban Affairs Aligned</p>
        <p className="mt-0.5">Protected under the Information Technology Act & Official Secrets Norms.</p>
      </div>

    </div>
  );
};
