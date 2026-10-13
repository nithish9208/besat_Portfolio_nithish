import React, { useState } from 'react';
import { 
  CloudRain, 
  Building2, 
  GraduationCap, 
  Play, 
  ArrowRight, 
  Code2, 
  Database, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sliders 
} from 'lucide-react';
import { ProjectId } from '../types/portfolio';
import { PROJECTS_METADATA } from '../data/projectsData';

interface ProjectsIndexProps {
  onSelectProject: (projectId: ProjectId) => void;
  onLaunchSimulator: (projectId: ProjectId) => void;
}

export const ProjectsIndex: React.FC<ProjectsIndexProps> = ({
  onSelectProject,
  onLaunchSimulator
}) => {
  const [filter, setFilter] = useState<'all' | 'supply-chain' | 'urban' | 'edtech'>('all');

  const projects = Object.values(PROJECTS_METADATA);

  const filtered = projects.filter(p => {
    if (filter === 'supply-chain') return p.id === 'monsoon';
    if (filter === 'urban') return p.id === 'urban';
    if (filter === 'edtech') return p.id === 'career';
    return true;
  });

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'monsoon': return CloudRain;
      case 'urban': return Building2;
      case 'career': return GraduationCap;
      default: return Database;
    }
  };

  const getAccentColor = (id: string) => {
    switch (id) {
      case 'monsoon': return 'cyan';
      case 'urban': return 'blue';
      case 'career': return 'purple';
      default: return 'cyan';
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
          Portfolio Projects & Simulation Lab
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
          Projects & Interactive Simulations
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Three complete analytical case studies paired with deterministic simulation engines. Inspect the business problem, review SQL queries & Python code, or stress-test assumptions live.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Projects (3)' },
          { id: 'supply-chain', label: 'Agricultural Supply Chain' },
          { id: 'urban', label: 'Urban Analytics' },
          { id: 'edtech', label: 'Workforce & Career Analytics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              filter === tab.id
                ? 'bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {filtered.map(project => {
          const Icon = getProjectIcon(project.id);
          const accent = getAccentColor(project.id);

          return (
            <div 
              key={project.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl transition-all space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Interactive Simulator Active
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-cyan-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {project.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-cyan-300 mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    {project.businessProblem}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map(t => (
                      <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Action Card */}
                <div className="lg:w-72 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3 shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Simulation Capabilities
                  </span>
                  <div className="text-xs text-slate-300 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Dynamic multi-slider inputs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Instant baseline vs scenario comparison</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>One-click CSV scenario export</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => onLaunchSimulator(project.id as ProjectId)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-md transition-all active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Launch Simulator
                    </button>
                    <button
                      onClick={() => onSelectProject(project.id as ProjectId)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
                    >
                      Case Study & Code
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Data & Findings Preview Strip */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                  <span className="text-[11px] font-semibold text-emerald-400 block mb-1">Key Empirical Finding:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {project.keyFindings[0]}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                  <span className="text-[11px] font-semibold text-amber-400 block mb-1">Scope & Analytical Boundary:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {project.limitations[0]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
