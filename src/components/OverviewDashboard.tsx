import React from 'react';
import { 
  Play, 
  ArrowRight, 
  Download, 
  Mail, 
  Database, 
  FileSpreadsheet, 
  Terminal, 
  BarChart2, 
  CheckCircle2, 
  CloudRain, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  ChevronRight,
  ExternalLink,
  Sliders,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { NavTab, ProjectId } from '../types/portfolio';
import { RESUME_PROFILE, EXPERIENCES, SKILL_CATEGORIES } from '../data/resumeData';
import { PROJECTS_METADATA } from '../data/projectsData';

interface OverviewDashboardProps {
  onNavigate: (tab: NavTab) => void;
  onSelectProject: (projectId: ProjectId) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onSelectProject
}) => {
  const p1 = PROJECTS_METADATA.monsoon;
  const p2 = PROJECTS_METADATA.urban;
  const p3 = PROJECTS_METADATA.career;

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        {/* Subtle accent glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Turning Data into Decisions
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {RESUME_PROFILE.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              {RESUME_PROFILE.title}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {RESUME_PROFILE.summary}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectProject('monsoon')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-white border border-slate-700 font-semibold text-xs tracking-wide transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
              Run Simulations
            </button>

            <a
              href={RESUME_PROFILE.resumeFileUrl}
              download="Nithishkumar_K_Data_Analyst_Resume.pdf"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-750 font-semibold text-xs tracking-wide transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Download Resume
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white border border-slate-800 font-medium text-xs tracking-wide transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* 2. EXECUTIVE KPI CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Featured Projects
          </span>
          <div className="text-3xl font-extrabold text-white tracking-tight">3</div>
          <p className="text-[11px] text-slate-400">Detailed analytics case studies with SQL & Python</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            Live Simulators
          </span>
          <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">3</div>
          <p className="text-[11px] text-slate-400">Deterministic interactive scenario calculation engines</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            Internship Cleaning
          </span>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">5,000+</div>
          <p className="text-[11px] text-slate-400">Records validated via Pandas & NumPy pipelines</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Core Stack
          </span>
          <div className="text-3xl font-extrabold text-purple-400 tracking-tight">SQL + BI</div>
          <p className="text-[11px] text-slate-400">Excel MIS, Power BI DAX, Python Automation</p>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS & INTERACTIVE SIMULATION MODULES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Featured Analytics Projects & Simulation Modules
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any project to explore the business problem, inspect SQL/Python workflows, or launch the interactive simulator.
            </p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start"
          >
            View Full Repository Breakdown →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project 1: Monsoon */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <CloudRain className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Live Simulator Ready
                </span>
              </div>

              <div>
                <span className="text-[11px] text-cyan-400 font-mono font-medium">{p1.category}</span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                  {p1.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {p1.businessProblem}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Key Metrics Analyzed
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Mandi Modal Price (₹/kg)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Precipitation Anomaly (%)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Supply Risk Score
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => onSelectProject('monsoon')}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all text-center"
              >
                Launch Simulator
              </button>
              <button
                onClick={() => onSelectProject('monsoon')}
                className="py-2 px-3 text-xs font-medium text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-all"
                title="View Case Study Details"
              >
                Details
              </button>
            </div>
          </div>

          {/* Project 2: Urban */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Live Simulator Ready
                </span>
              </div>

              <div>
                <span className="text-[11px] text-blue-400 font-mono font-medium">{p2.category}</span>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mt-0.5">
                  {p2.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {p2.businessProblem}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Key Metrics Analyzed
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Built-Up Expansion (km²)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Per Capita GSDP (₹)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Growth Imbalance (GII)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => onSelectProject('urban')}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-all text-center"
              >
                Launch Simulator
              </button>
              <button
                onClick={() => onSelectProject('urban')}
                className="py-2 px-3 text-xs font-medium text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-all"
                title="View Case Study Details"
              >
                Details
              </button>
            </div>
          </div>

          {/* Project 3: Career */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Live Simulator Ready
                </span>
              </div>

              <div>
                <span className="text-[11px] text-purple-400 font-mono font-medium">{p3.category}</span>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mt-0.5">
                  {p3.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {p3.businessProblem}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Key Metrics Analyzed
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Career-Fit Score (%)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    Skill Gap Differential
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    District Hiring Intensity
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => onSelectProject('career')}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all text-center"
              >
                Launch Simulator
              </button>
              <button
                onClick={() => onSelectProject('career')}
                className="py-2 px-3 text-xs font-medium text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-all"
                title="View Case Study Details"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL SKILLS VISUALIZATION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Technical Core & Tool Proficiency
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Structured analytical capabilities validated through production internship and certifications.
            </p>
          </div>
          <button
            onClick={() => onNavigate('skills')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start"
          >
            Explore Complete Skills Matrix →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  {cat.iconName === 'Database' && <Database className="w-4 h-4" />}
                  {cat.iconName === 'FileSpreadsheet' && <FileSpreadsheet className="w-4 h-4" />}
                  {cat.iconName === 'Terminal' && <Terminal className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{cat.category}</h3>
                  <p className="text-[11px] text-slate-400">{cat.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {cat.skills.slice(0, 3).map((sk, j) => (
                  <div key={j} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{sk.name}</span>
                      <span className="text-cyan-400 font-mono">{sk.levelPct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${sk.levelPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 block">{sk.keyUses}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROFESSIONAL EXPERIENCE HIGHLIGHT */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Verified Internship
              </span>
              <span className="text-xs text-slate-400 font-mono">Feb 2026 – June 2026</span>
            </div>
            <h3 className="text-xl font-bold text-white">Data Analyst Intern</h3>
            <p className="text-sm text-cyan-400 font-medium">BDreamz Global Solutions Pvt Ltd • Chennai, India</p>
          </div>

          <button
            onClick={() => onNavigate('experience')}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all self-start sm:self-auto"
          >
            Deep Dive Experience →
          </button>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EXPERIENCES[0].metrics.map((m, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xl font-extrabold text-white">{m.value}</span>
              <span className="text-xs font-semibold text-cyan-400 block mt-0.5">{m.label}</span>
              <p className="text-[10px] text-slate-400 mt-1">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Bullets */}
        <div className="space-y-2 pt-2">
          {EXPERIENCES[0].bulletPoints.map((bp, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{bp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT SUMMARY BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Let's Discuss Analytics, MIS, or Data Roles</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Currently available for full-time Data Analyst and Operations Analytics opportunities in Chennai and remote.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2 font-mono">
            <span>Email: {RESUME_PROFILE.email}</span>
            <span>Phone: {RESUME_PROFILE.phone}</span>
            <span>Location: {RESUME_PROFILE.location}</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-3 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg transition-all whitespace-nowrap self-start sm:self-auto"
        >
          Send Message or Inquire →
        </button>
      </section>
    </div>
  );
};
