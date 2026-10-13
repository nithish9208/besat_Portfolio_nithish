import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  FileSpreadsheet, 
  Database, 
  BarChart, 
  TrendingUp, 
  Clock, 
  ShieldCheck,
  Download
} from 'lucide-react';
import { EXPERIENCES, RESUME_PROFILE } from '../data/resumeData';

export const ExperienceSection: React.FC = () => {
  const exp = EXPERIENCES[0];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
          Professional Work History
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
          Experience & Operational Track Record
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Internship experience in enterprise data extraction, recurring MIS reporting, Python data validation, and Power BI dashboards.
        </p>
      </div>

      {/* Main Experience Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                Internship Experience
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {exp.period}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {exp.location}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">{exp.role}</h2>
            <p className="text-base font-semibold text-cyan-300 mt-0.5">{exp.company}</p>
          </div>

          <a
            href={RESUME_PROFILE.resumeFileUrl}
            download="Nithishkumar_K_Data_Analyst_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            Resume PDF
          </a>
        </div>

        {/* 4 Quantitative Result Highlights */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Key Contributions & Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exp.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-2xl font-black text-white">{m.value}</span>
                <span className="text-xs font-bold text-cyan-400 block">{m.label}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Responsibilities List */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Detailed Responsibilities & Workflow Accomplishments
          </h3>
          <div className="space-y-3">
            {exp.bulletPoints.map((bp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{bp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Deployed in Role */}
        <div className="pt-4 border-t border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Technologies Applied in Production
          </h3>
          <div className="flex flex-wrap gap-2">
            {exp.skills.map(sk => (
              <span key={sk} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 font-mono">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Deep-Dive Case Study: Recurring MIS Reporting & Validation Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Operational MIS Reporting Standardization
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Constructed modular Excel workbooks incorporating dynamic XLOOKUP matrices, multi-tiered INDEX-MATCH logic, and automated pivot tables. Standardized disparate manual branch inputs into uniform operational decks, saving team hours each reporting cycle.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <span className="text-cyan-400 text-[11px] block font-sans font-semibold">Standard MIS Features:</span>
            <div className="text-slate-400">• Automated variance calculations (Actual vs Projected Target)</div>
            <div className="text-slate-400">• Conditional formatting heatmaps for operational bottleneck alerts</div>
            <div className="text-slate-400">• Standardized monthly summary cards for leadership review</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Python Data Quality & Validation Engine
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Engineered batch Python scripts utilizing Pandas and NumPy to audit raw transactional inputs. Automated anomaly filters flagged missing operational timestamps, negative volume quantities, and duplicate transaction IDs before warehouse staging.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <span className="text-cyan-400 text-[11px] block font-sans font-semibold">Validation Pipeline:</span>
            <div className="text-slate-400">• Deduplication check across composite keys</div>
            <div className="text-slate-400">• Null value treatment (forward-fill vs median imputation)</div>
            <div className="text-slate-400">• Automated audit log generation with error counts</div>
          </div>
        </div>
      </div>
    </div>
  );
};
