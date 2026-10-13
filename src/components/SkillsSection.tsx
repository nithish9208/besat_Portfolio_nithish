import React, { useState } from 'react';
import { 
  Database, 
  FileSpreadsheet, 
  Terminal, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/resumeData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = SKILL_CATEGORIES.filter(cat => {
    if (activeCategory !== 'all' && cat.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
          Technical Capabilities
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
          Skills & Analytical Toolset
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Verified proficiency across relational database querying, Python data cleaning pipelines, advanced spreadsheet MIS modeling, and Power BI DAX dashboards.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-white font-semibold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Competencies
          </button>
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.category
                  ? 'bg-cyan-500 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search specific skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat, idx) => {
          const displayedSkills = cat.skills.filter(sk => 
            sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sk.keyUses.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (displayedSkills.length === 0) return null;

          return (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {cat.iconName === 'Database' && <Database className="w-5 h-5" />}
                  {cat.iconName === 'FileSpreadsheet' && <FileSpreadsheet className="w-5 h-5" />}
                  {cat.iconName === 'Terminal' && <Terminal className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{cat.category}</h3>
                  <p className="text-[11px] text-slate-400">{cat.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {displayedSkills.map((sk, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{sk.name}</span>
                      <span className="font-mono text-cyan-400 font-semibold">{sk.levelPct}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${sk.levelPct}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Source: {sk.experience}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-900">
                      <strong className="text-slate-400">Application:</strong> {sk.keyUses}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Workflow Architecture Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          End-to-End Analytical Pipeline Architecture
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          How my technical skillsets integrate seamlessly across the end-to-end analytics lifecycle:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Phase 1</span>
            <h4 className="text-xs font-bold text-white">1. Extraction & Querying</h4>
            <p className="text-[11px] text-slate-400">
              SQL / MySQL: Structured CTEs, inner/left joins, date aggregations, and windowing to extract clean transactional extracts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Phase 2</span>
            <h4 className="text-xs font-bold text-white">2. Cleaning & Validation</h4>
            <p className="text-[11px] text-slate-400">
              Python, Pandas & NumPy: Null imputation, schema typing, outlier clipping, and vector assertions on 5,000+ record datasets.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Phase 3</span>
            <h4 className="text-xs font-bold text-white">3. Modeling & Automation</h4>
            <p className="text-[11px] text-slate-400">
              Advanced Excel & Macros: XLOOKUP, dynamic arrays, automated daily/monthly MIS templates, and SLA tracking dashboards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Phase 4</span>
            <h4 className="text-xs font-bold text-white">4. BI & Executive Action</h4>
            <p className="text-[11px] text-slate-400">
              Power BI & DAX: Star-schema relationship modeling, time-intelligence DAX measures, and responsive stakeholder KPI cards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
