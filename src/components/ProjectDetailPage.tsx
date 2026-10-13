import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Database, 
  Code2, 
  FileSpreadsheet, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  Table, 
  FileCode, 
  SlidersHorizontal 
} from 'lucide-react';
import { ProjectId, ProjectMetadata } from '../types/portfolio';
import { MonsoonSimulator } from './simulators/MonsoonSimulator';
import { UrbanSimulator } from './simulators/UrbanSimulator';
import { CareerSimulator } from './simulators/CareerSimulator';

interface ProjectDetailPageProps {
  project: ProjectMetadata;
  onBack: () => void;
  onOpenSimulator?: (id: ProjectId) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onOpenSimulator
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'sql' | 'python' | 'data'>('overview');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Projects & Overview
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('simulator')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg shadow-md transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch Live Interactive Simulator
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
            {project.category}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Case Study & Live Engine
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>
        <p className="text-base text-cyan-300 font-medium">
          {project.subtitle}
        </p>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map(tech => (
            <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'Problem & Findings', icon: BarChart3 },
          { id: 'simulator', label: 'Interactive Simulator', icon: SlidersHorizontal },
          { id: 'sql', label: 'SQL Analytical Queries', icon: Database },
          { id: 'python', label: 'Python / Pandas Workflow', icon: Code2 },
          { id: 'data', label: 'Data Dictionary & KPIs', icon: Table }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & CASE STUDY */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Business Problem & Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                The Business Problem
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.businessProblem}
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Project Objective & Analytics Scope
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.objective}
              </p>
            </div>
          </div>

          {/* Quick Interactive Simulator Teaser */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">Interactive Scenario Simulator Ready</h4>
              <p className="text-xs text-slate-300 mt-1">
                Recalculate dynamic KPIs, explore scenario comparisons, and export CSV outputs with local deterministic calculations.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-400 rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              Open Simulator Workspace →
            </button>
          </div>

          {/* Key Findings & Analytical Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Key Analytical Findings
              </h3>
              <ul className="space-y-2.5">
                {project.keyFindings.map((f, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Methodological Limitations & Constraints
              </h3>
              <ul className="space-y-2.5">
                {project.limitations.map((l, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Business & Operational Implications */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Operational & Business Implications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.businessImplications.map((imp, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <div className="font-semibold text-white mb-1.5">Actionable Insight #{i + 1}</div>
                  {imp}
                </div>
              ))}
            </div>
          </div>

          {/* Data Cleaning Process */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">
              Data Cleaning & Validation Pipeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.dataCleaningProcess.map((step, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {project.id === 'monsoon' && <MonsoonSimulator />}
          {project.id === 'urban' && <UrbanSimulator />}
          {project.id === 'career' && <CareerSimulator />}
        </div>
      )}

      {/* TAB 3: SQL QUERIES */}
      {activeTab === 'sql' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Production SQL Analytical Queries</h3>
            <p className="text-xs text-slate-400">
              Clean relational schema extractions, window aggregates, and CTE models written for MySQL / PostgreSQL databases.
            </p>
          </div>

          {project.sqlQueries.map((sql, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{sql.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{sql.description}</p>
                </div>
                <button
                  onClick={() => handleCopyCode(sql.code, `sql-${idx}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  {copiedCodeIndex === `sql-${idx}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-cyan-300 bg-slate-950 overflow-x-auto leading-relaxed">
                <code>{sql.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: PYTHON WORKFLOWS */}
      {activeTab === 'python' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Python & Pandas Transformation Workflow</h3>
            <p className="text-xs text-slate-400">
              Vectorized array operations, outlier treatment, feature engineering, and statistical projection pipelines.
            </p>
          </div>

          {project.pythonWorkflows.map((py, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{py.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{py.description}</p>
                </div>
                <button
                  onClick={() => handleCopyCode(py.code, `py-${idx}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  {copiedCodeIndex === `py-${idx}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Python</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-300 bg-slate-950 overflow-x-auto leading-relaxed">
                <code>{py.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: DATA DICTIONARY & KPIS */}
      {activeTab === 'data' && (
        <div className="space-y-8">
          {/* Data Dictionary Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Data Dictionary</h3>
                <p className="text-xs text-slate-400 mt-0.5">Schema attributes, column definitions, data types, and typical recorded units.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] bg-slate-950/40">
                    <th className="py-2.5 px-3">Column Name</th>
                    <th className="py-2.5 px-3">Data Type</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Sample Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {project.dataDictionary.map((col, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-medium text-cyan-300">{col.columnName}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{col.dataType}</td>
                      <td className="py-2.5 px-3 text-slate-300">{col.description}</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-300">{col.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KPI Formulas & Definitions */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">KPI Definitions & Mathematical Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.kpiDefinitions.map((kpi, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-300">{kpi.kpi}</h4>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-purple-300">
                    {kpi.formula}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {kpi.businessSignificance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
