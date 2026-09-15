'use client';

import React from 'react';
import { useCivic, ActiveTab } from '@/context/CivicContext';
import { 
  LayoutGrid, 
  Sparkles, 
  AlertTriangle, 
  Kanban, 
  PieChart, 
  FileText, 
  Settings,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

interface SidebarItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, risks, currentCity } = useCivic();

  const criticalCount = risks.filter(r => r.severity === 'Critical').length;

  const navItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'insights', label: 'Insights', icon: Sparkles, badge: 'AI' },
    { id: 'risks', label: 'Risks', icon: AlertTriangle, badge: criticalCount > 0 ? `${criticalCount}` : undefined },
    { id: 'projects', label: 'Projects', icon: Kanban },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 bg-white min-h-[calc(100vh-3.5rem)] p-3 flex flex-col justify-between select-none">
      <div className="space-y-1">
        <p className="px-3 py-2 text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
          Workspace
        </p>

        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                    item.badge === 'AI' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                      : 'bg-red-50 text-red-700 border border-red-200/60'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle city status card */}
      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span>Active City</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs font-semibold text-zinc-900 truncate">
          {currentCity.cityName}
        </p>
        <p className="text-[10px] text-zinc-400">
          {currentCity.totalWards} Wards • FY 2026-27
        </p>
      </div>
    </aside>
  );
};
