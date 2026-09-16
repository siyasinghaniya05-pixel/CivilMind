'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { UserRole } from '@/types';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { loginUser, setCurrentView } = useCivic();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Rajesh Patil');
  const [email, setEmail] = useState('chief.officer@kalamb.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [organization, setOrganization] = useState('Kalamb Nagar Parishad');
  const [role, setRole] = useState<UserRole>('Chief Officer');

  const roles: UserRole[] = [
    'Chief Officer',
    'Municipal Officer',
    'Planner',
    'Engineer',
    'Administrator'
  ];

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
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-zinc-950">CivicMind AI</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-lg p-6 sm:p-8 space-y-6">
          {/* Header & Mode Switcher */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
              {isRegister ? 'Create an Account' : 'Welcome to CivicMind AI'}
            </h2>
            <p className="text-xs text-zinc-500">
              {isRegister 
                ? 'Register your municipal organization for development intelligence' 
                : 'Sign in to access your city dashboard and decision models'}
            </p>
          </div>

          {/* Toggle pill */}
          <div className="flex p-1 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                !isRegister ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-500 hover:text-zinc-950'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                isRegister ? 'bg-white text-zinc-950 shadow-2xs' : 'text-zinc-500 hover:text-zinc-950'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Name Field (shown on register or editable) */}
            {isRegister && (
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-700">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Patil"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-700">Official Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chief.officer@kalamb.gov.in"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-700">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-700">Municipality / Organization</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Kalamb Nagar Parishad"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-700">Role Designation</label>
              <div className="relative">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isRegister ? 'Complete Registration' : 'Sign In to Platform'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-4 border-t border-zinc-100 space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block text-center">
              Or Fast-Track With Demo Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Chief Officer', 'Rajesh Patil', 'Kalamb Nagar Parishad')}
                className="p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-left transition-colors"
              >
                <span className="text-[11px] font-bold text-zinc-900 block">Chief Officer</span>
                <span className="text-[10px] text-zinc-500">Kalamb Nagar Parishad</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Engineer', 'Anil Deshmukh', 'Yavatmal Municipal Council')}
                className="p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-left transition-colors"
              >
                <span className="text-[11px] font-bold text-zinc-900 block">Municipal Engineer</span>
                <span className="text-[10px] text-zinc-500">Yavatmal Council</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="text-center text-[11px] text-zinc-400">
        CivicMind AI Platform • Authorized municipal personnel access only
      </div>
    </div>
  );
};
