'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { Project, ProjectStatus } from '@/types';
import { 
  KanbanSquare, 
  Table as TableIcon, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  IndianRupee, 
  Search, 
  Filter, 
  Eye, 
  Wrench, 
  Camera, 
  X,
  FileText,
  UserCheck,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProjectMonitoring: React.FC = () => {
  const { projects, updateProjectStatus, updateProject, selectedProject, setSelectedProject } = useCivic();

  const [viewMode, setViewMode] = useState<'kanban' | 'table' | 'timeline'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [inspectionModalProject, setInspectionModalProject] = useState<Project | null>(selectedProject);

  const statuses: ProjectStatus[] = ['Planned', 'Approved', 'In Progress', 'Delayed', 'Completed'];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.wardName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || p.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    updateProjectStatus(projectId, newStatus);
    if (newStatus === 'Completed') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleSaveInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (inspectionModalProject) {
      updateProject(inspectionModalProject);
      setInspectionModalProject(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 mb-2">
            <KanbanSquare className="w-3.5 h-3.5" /> Module 6: Project Monitoring & Field Verification
          </div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white">
            Civic Infrastructure Works Tracker & Timeline
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tracking execution milestones, contractor deliverables, budget burn rate, and geo-tagged site inspections.
          </p>
        </div>

        {/* View Switcher: Kanban / Table / Timeline */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'kanban'
                ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <KanbanSquare className="w-3.5 h-3.5" /> Kanban Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" /> Tabular View
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Timeline (Gantt)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search tender title, contractor, or ward..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Drainage & Sewerage', 'Roads & Transport', 'Water Supply', 'Sanitation & SWM', 'Street Lighting & Energy'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDept === dept
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {statuses.map((status) => {
            const statusProjects = filteredProjects.filter((p) => p.status === status);

            const statusColors: Record<ProjectStatus, { header: string; badge: string }> = {
              'Planned': { header: 'border-slate-300 dark:border-slate-700', badge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' },
              'Approved': { header: 'border-blue-300 dark:border-blue-700', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
              'In Progress': { header: 'border-indigo-300 dark:border-indigo-700', badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' },
              'Delayed': { header: 'border-red-300 dark:border-red-700', badge: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' },
              'Completed': { header: 'border-emerald-300 dark:border-emerald-700', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
            };

            return (
              <div
                key={status}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-3 space-y-3 min-w-[250px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      {status}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColors[status].badge}`}>
                      {statusProjects.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 min-h-[400px]">
                  {statusProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow transition-all space-y-2"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400">
                          {proj.id} • W-{proj.wardId}
                        </span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          ₹{proj.budgetLakhs} L
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {proj.title}
                      </h4>

                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {proj.description}
                      </p>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>Progress</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{proj.completionPercentage}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              proj.status === 'Completed' ? 'bg-emerald-500' :
                              proj.status === 'Delayed' ? 'bg-red-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${proj.completionPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 truncate max-w-[120px]">
                          {proj.contractor.split(' ')[0]}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setInspectionModalProject(proj)}
                            title="Log Field Inspection & Geo-Tagged Photos"
                            className="p-1 rounded text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <Camera className="w-3.5 h-3.5" />
                          </button>
                          {/* Quick advance status dropdown */}
                          <select
                            value={proj.status}
                            onChange={(e) => handleStatusChange(proj.id, e.target.value as ProjectStatus)}
                            className="text-[9px] font-bold p-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                          >
                            {statuses.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: TABULAR VIEW */}
      {viewMode === 'table' && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Code & Project</th>
                  <th className="p-3.5">Ward</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Budget / Spent</th>
                  <th className="p-3.5">Contractor</th>
                  <th className="p-3.5">Timeline</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        {p.title}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{p.id}</span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      Ward {p.wardId}: {p.wardName.split(' ')[0]}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {p.department}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">₹{p.budgetLakhs} L</div>
                      <span className="text-[10px] text-slate-400">Spent: ₹{p.spentLakhs} L</span>
                    </td>
                    <td className="p-3.5 max-w-[140px] truncate">
                      {p.contractor}
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-[11px]">
                      {p.startDate} → {p.targetDate}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        p.status === 'Delayed' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                        p.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800'
                      }`}>
                        {p.status} ({p.completionPercentage}%)
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setInspectionModalProject(p)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: TIMELINE / GANTT VIEW */}
      {viewMode === 'timeline' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Municipal Milestone Delivery Timeline (FY 2026-27)
            </h3>
            <span className="text-xs text-slate-500">Q1 to Q4 Schedule</span>
          </div>

          <div className="space-y-4 pt-2">
            {filteredProjects.map((p) => (
              <div key={p.id} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-md">
                    {p.title}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Target: {p.targetDate} ({p.completionPercentage}% done)
                  </span>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                  <div
                    className={`h-full rounded-lg ${
                      p.status === 'Completed' ? 'bg-emerald-500' :
                      p.status === 'Delayed' ? 'bg-red-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.max(15, p.completionPercentage)}%` }}
                  />
                  <span className="absolute inset-0 flex items-center pl-2 text-[9px] font-bold text-white drop-shadow">
                    {p.status} • ₹{p.budgetLakhs}L
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Field Inspection & Verification Modal */}
      {inspectionModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Municipal Engineer Field Audit
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {inspectionModalProject.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Ward {inspectionModalProject.wardId}: {inspectionModalProject.wardName}
                </p>
              </div>
              <button
                onClick={() => setInspectionModalProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInspection} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Execution Status
                  </label>
                  <select
                    value={inspectionModalProject.status}
                    onChange={(e) =>
                      setInspectionModalProject({
                        ...inspectionModalProject,
                        status: e.target.value as ProjectStatus,
                        completionPercentage: e.target.value === 'Completed' ? 100 : inspectionModalProject.completionPercentage
                      })
                    }
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Progress Percentage ({inspectionModalProject.completionPercentage}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={inspectionModalProject.completionPercentage}
                    onChange={(e) =>
                      setInspectionModalProject({
                        ...inspectionModalProject,
                        completionPercentage: Number(e.target.value)
                      })
                    }
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Engineer Site Inspection Observations
                </label>
                <textarea
                  rows={3}
                  value={inspectionModalProject.inspectionNotes || ''}
                  onChange={(e) =>
                    setInspectionModalProject({
                      ...inspectionModalProject,
                      inspectionNotes: e.target.value,
                      lastInspected: new Date().toISOString().split('T')[0]
                    })
                  }
                  placeholder="Record compaction quality, rebar spacing, concrete cube test results..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
                  <Camera className="w-4 h-4" />
                  <span>Geo-Tagged Site Photo Verified: 20.4682°N, 78.3320°E</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  GPS Authenticated
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setInspectionModalProject(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
                >
                  Save Field Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
