'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Settings, 
  Building2, 
  Users, 
  IndianRupee, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2, 
  RotateCcw,
  Edit2,
  Trash2,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminPanel: React.FC = () => {
  const { 
    stats, 
    wards, 
    projects, 
    departmentBudgets, 
    updateDepartmentBudget, 
    resetToDefaults 
  } = useCivic();

  const [activeAdminTab, setActiveAdminTab] = useState<'wards' | 'departments' | 'budgets' | 'users' | 'assets'>('wards');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Mock User Roles
  const usersList = [
    { name: 'Smt. Ananya Patil, IAS', role: 'Chief Officer', dept: 'General Administration', email: 'co.kalamb@maharashtra.gov.in', status: 'Active' },
    { name: 'Shri. V. K. Joshi', role: 'Municipal Engineer', dept: 'Public Works & Roads', email: 'me.kalamb@maharashtra.gov.in', status: 'Active' },
    { name: 'Dr. Suresh Waghmare', role: 'Health Officer', dept: 'Sanitation & SWM', email: 'health.kalamb@maharashtra.gov.in', status: 'Active' },
    { name: 'Shri. Sachin Deshmukh', role: 'Water Supply In-charge', dept: 'Water Works', email: 'water.kalamb@maharashtra.gov.in', status: 'Active' },
    { name: 'District Planning Officer', role: 'District Administration', dept: 'Collectorate Yavatmal', email: 'dpo.yavatmal@nic.in', status: 'Viewer' },
  ];

  // Mock Infrastructure Assets
  const assetsList = [
    { name: 'Central Elevated Storage Reservoir (ESR)', type: 'Water Supply', ward: 'Ward 1', capacity: '12.5 Lakh Litres', condition: 'Good' },
    { name: 'Indira Nagar Flood Pumping Station', type: 'Drainage', ward: 'Ward 4', capacity: '35 HP Diesel Pumps', condition: 'Moderate' },
    { name: 'APMC Market Main Asphalt Corridor', type: 'Roads', ward: 'Ward 2', capacity: '1.4 km CC Paved', condition: 'Under Overhaul' },
    { name: 'Yavatmal Bypass Material Recovery Facility', type: 'Solid Waste', ward: 'Ward 17', capacity: '5 TPD Trommel', condition: 'Commissioning' },
    { name: 'Sub-Jail Feeder CCMS Panel', type: 'Electrical', ward: 'Ward 10', capacity: '45 Streetlights', condition: 'Operational' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 mb-2">
            <Settings className="w-3.5 h-3.5" /> Module 10: Municipal Administration Panel
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            System Configuration & Local Government Registry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage Wards, Departmental Allocations, Officer Credentials, Asset Inventories, and Master Schemes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetToDefaults();
              showNotification('Default municipal dataset restored successfully');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Data
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'wards', label: 'Wards Registry (17)', icon: MapPin },
          { id: 'departments', label: 'Departmental Budgets', icon: IndianRupee },
          { id: 'budgets', label: 'Finance Commission Schemes', icon: Database },
          { id: 'users', label: 'Officer Roles & Permissions', icon: Users },
          { id: 'assets', label: 'Infrastructure Assets', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeAdminTab === tab.id
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: WARDS REGISTRY */}
      {activeAdminTab === 'wards' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Kalamb Nagar Parishad Wards Registry
            </h2>
            <span className="text-xs text-slate-500 font-semibold">17 Recognized Wards</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold uppercase text-[10px] text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="p-3">Ward #</th>
                  <th className="p-3">Ward Name (English / Marathi)</th>
                  <th className="p-3">Elected Counselor</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Population</th>
                  <th className="p-3">Allocated CapEx</th>
                  <th className="p-3">WDI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {wards.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">Ward {w.number}</td>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      {w.name} ({w.marathiName})
                    </td>
                    <td className="p-3">{w.counselor}</td>
                    <td className="p-3 font-mono text-[11px]">{w.contact}</td>
                    <td className="p-3">{w.population.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-bold text-blue-700 dark:text-blue-400">₹{w.budgetAllocatedLakhs} L</td>
                    <td className="p-3 font-black text-emerald-600">{w.compositeScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DEPARTMENT BUDGETS */}
      {activeAdminTab === 'departments' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Infrastructure Department Budget Caps (FY 2026-27)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentBudgets.map((dept) => (
              <div
                key={dept.department}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{dept.department}</span>
                  <span className="text-xs font-black text-blue-700 dark:text-blue-400">₹{dept.allocatedLakhs} Lakhs</span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Expended:</span>
                    <strong className="text-slate-800 dark:text-slate-200">₹{dept.spentLakhs} L</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Committed:</span>
                    <strong className="text-slate-800 dark:text-slate-200">₹{dept.committedLakhs} L</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Projects:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{dept.projectCount} Works</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={dept.allocatedLakhs}
                    id={`input-${dept.department}`}
                    className="w-24 p-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById(`input-${dept.department}`) as HTMLInputElement;
                      if (input) {
                        updateDepartmentBudget(dept.department, Number(input.value));
                        showNotification(`Updated ${dept.department} budget to ₹${input.value} Lakhs`);
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-bold rounded bg-blue-700 text-white hover:bg-blue-800"
                  >
                    Save Cap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BUDGETS & STATUTORY GRANTS */}
      {activeAdminTab === 'budgets' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            State & Central Municipal Grant Windows
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
              <span className="font-bold text-blue-900 dark:text-blue-300 block">15th Finance Commission Tied Grants</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Earmarked exclusively for Drinking Water, Rainwater Harvesting, and Sanitation/SWM.
              </p>
              <div className="pt-2 border-t border-blue-200/60 flex justify-between font-bold">
                <span>Sanctioned: ₹3.80 Cr</span>
                <span className="text-emerald-700">Utilized: 82%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/40 dark:bg-teal-950/20 space-y-2">
              <span className="font-bold text-teal-900 dark:text-teal-300 block">15th Finance Commission Untied Grants</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Discretionary capital expenditure for roads, lighting, and civic municipal amenities.
              </p>
              <div className="pt-2 border-t border-teal-200/60 flex justify-between font-bold">
                <span>Sanctioned: ₹2.40 Cr</span>
                <span className="text-emerald-700">Utilized: 75%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2">
              <span className="font-bold text-indigo-900 dark:text-indigo-300 block">DPDC Special Grants (Yavatmal)</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                District Planning Committee grants under the District Guardian Minister quota.
              </p>
              <div className="pt-2 border-t border-indigo-200/60 flex justify-between font-bold">
                <span>Sanctioned: ₹1.65 Cr</span>
                <span className="text-emerald-700">Utilized: 60%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: USERS & ROLES */}
      {activeAdminTab === 'users' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Authorized Municipal Personnel
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold uppercase text-[10px] text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="p-3">Official Name</th>
                  <th className="p-3">Designated Role</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Government Email</th>
                  <th className="p-3">Access Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usersList.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="p-3 font-semibold text-blue-700 dark:text-blue-400">{u.role}</td>
                    <td className="p-3">{u.dept}</td>
                    <td className="p-3 font-mono text-[11px]">{u.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: INFRASTRUCTURE ASSETS */}
      {activeAdminTab === 'assets' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Critical Municipal Infrastructure Inventory
          </h2>

          <div className="space-y-3">
            {assetsList.map((a, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{a.name}</h4>
                  <p className="text-[11px] text-slate-500">{a.type} • {a.ward} • Spec: {a.capacity}</p>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {a.condition}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
