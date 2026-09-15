'use client';

import React from 'react';
import { useCivic, ActiveTab } from '@/context/CivicContext';
import { 
  LayoutDashboard, 
  ArrowUpNarrowWide, 
  Calculator, 
  MapPin, 
  AlertTriangle, 
  Map, 
  KanbanSquare, 
  Sparkles, 
  BarChart3, 
  FileText, 
  Settings, 
  Bot, 
  Sliders, 
  Boxes, 
  Users, 
  CalendarRange
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, risks, aiRecommendations } = useCivic();

  const criticalRisks = risks.filter(r => r.severity === 'Critical').length;
  const pendingRecs = aiRecommendations.filter(r => r.status === 'Pending Council Review').length;

  const sections: { title: string; items: NavItem[] }[] = [
    {
      title: 'COMMAND CENTER',
      items: [
        { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'ai-agents-hub', label: '5 AI Agents Hub', badge: 'Active', badgeColor: 'bg-emerald-500 text-white', icon: Bot },
      ]
    },
    {
      title: 'INTELLIGENCE ENGINES',
      items: [
        { id: 'priority-engine', label: '1. Priority Engine', badge: 'MCDA', badgeColor: 'bg-blue-600 text-white', icon: ArrowUpNarrowWide },
        { id: 'budget-optimizer', label: '2. Budget Optimizer', icon: Calculator },
        { id: 'ward-index', label: '3. Ward Index (WDI)', badge: '17 Wards', badgeColor: 'bg-indigo-600 text-white', icon: MapPin },
        { id: 'risk-prediction', label: '4. Risk Prediction', badge: criticalRisks > 0 ? `${criticalRisks} Alert` : undefined, badgeColor: 'bg-red-600 text-white', icon: AlertTriangle },
        { id: 'smart-map', label: '5. GIS Smart City Map', badge: 'OSM', badgeColor: 'bg-emerald-600 text-white', icon: Map },
      ]
    },
    {
      title: 'EXECUTION & IMPACT',
      items: [
        { id: 'project-monitoring', label: '6. Project Monitoring', icon: KanbanSquare },
        { id: 'ai-recommendations', label: '7. AI Recommendations', badge: pendingRecs > 0 ? `${pendingRecs}` : undefined, badgeColor: 'bg-amber-600 text-white', icon: Sparkles },
        { id: 'impact-analytics', label: '8. Impact Analytics', icon: BarChart3 },
        { id: 'report-generator', label: '9. Report Generator', icon: FileText },
        { id: 'admin-panel', label: '10. Admin Panel', icon: Settings },
      ]
    },
    {
      title: 'WOW INNOVATIONS',
      items: [
        { id: 'wow-build-next', label: 'What To Build Next? AI', badge: 'AI Wizard', badgeColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white', icon: Sparkles },
        { id: 'wow-simulator', label: 'Budget Simulator', icon: Sliders },
        { id: 'wow-digital-twin', label: 'Digital Twin View', icon: Boxes },
        { id: 'wow-calculator', label: 'Citizen Impact Calc', icon: Users },
        { id: 'wow-adp', label: 'Annual Dev Plan (ADP)', icon: CalendarRange },
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur min-h-[calc(100vh-4rem)] p-3 flex flex-col justify-between overflow-y-auto">
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-700 text-white shadow-sm shadow-blue-500/20 dark:bg-blue-600'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Nagar Parishad Badge */}
      <div className="mt-8 p-3 rounded-xl bg-gradient-to-br from-blue-900/10 via-slate-900/5 to-emerald-900/10 dark:from-blue-950/40 dark:to-emerald-950/40 border border-blue-200/40 dark:border-blue-900/40">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
            Govt. of Maharashtra
          </span>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
          Urban Development Dept. • Pilot ULB Code: MH-YTL-KLM
        </p>
      </div>
    </aside>
  );
};
