'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { DepartmentType, ProjectStatus } from '@/types';
import { X, PlusCircle, Building2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const { wards, addProject } = useCivic();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<DepartmentType>('Drainage & Sewerage');
  const [wardId, setWardId] = useState<number>(4);
  const [budgetLakhs, setBudgetLakhs] = useState<number>(65);
  const [contractor, setContractor] = useState('E-Tender Pending');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedWard = wards.find(w => w.id === wardId) || wards[0];
    const populationBenefited = Math.round(selectedWard.population * 0.85);

    addProject({
      title,
      description: description || `Municipal infrastructure work in Ward ${wardId} (${selectedWard.name}).`,
      department,
      wardId,
      wardName: selectedWard.name,
      budgetLakhs,
      spentLakhs: 0,
      status: 'Approved' as ProjectStatus,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: '2027-03-31',
      contractor,
      completionPercentage: 0,
      lat: selectedWard.lat + 0.001,
      lng: selectedWard.lng + 0.001,
      populationBenefited,
      costPerCitizen: Math.round((budgetLakhs * 100000) / populationBenefited),
      riskReductionPercentage: 65,
      priorityScore: 88,
      riskScore: 78,
      strategicScore: 85,
      impactScore: 86,
      conditionRating: 'Poor',
      complaintCount: 18,
      aiJustification: 'Added by Chief Officer via Quick Project Tender creation.',
      recommendedBudgetLakhs: budgetLakhs,
    });

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });

    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Administrative Sanction
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              Create New Municipal Tender
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Project / Tender Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ward 4 Secondary Nullah Lining & RCC Slabs"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as DepartmentType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Drainage & Sewerage">Drainage & Sewerage</option>
                <option value="Roads & Transport">Roads & Transport</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Sanitation & SWM">Sanitation & SWM</option>
                <option value="Street Lighting & Energy">Street Lighting & Energy</option>
                <option value="Urban Amenities & Parks">Urban Amenities & Parks</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Ward
              </label>
              <select
                value={wardId}
                onChange={(e) => setWardId(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {wards.map((w) => (
                  <option key={w.id} value={w.id}>
                    Ward {w.number}: {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Budget Outlay (₹ Lakhs)
              </label>
              <input
                type="number"
                required
                min="5"
                max="1000"
                value={budgetLakhs}
                onChange={(e) => setBudgetLakhs(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contractor / Agency
              </label>
              <input
                type="text"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                placeholder="e.g. M/s Vidarbha Infratech"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Scope of Work & Specification Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide technical scope, material grade, and execution specifications..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
            >
              Issue Administrative Sanction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
