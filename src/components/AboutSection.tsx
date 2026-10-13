import React from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Download, 
  Mail, 
  FileCheck, 
  Target, 
  Cpu, 
  Code 
} from 'lucide-react';
import { RESUME_PROFILE, EDUCATION, CERTIFICATIONS } from '../data/resumeData';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
          Professional Background
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
          About Nithishkumar K
        </h1>
        <p className="text-sm text-cyan-400 font-medium mt-0.5">
          Data Analyst | Operations Analytics | MIS Reporting
        </p>
      </div>

      {/* Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Analytical Focus & Professional Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              I am a data-focused engineering graduate specializing in SQL-based extraction, Excel-driven operational MIS reporting, data cleaning, and Power BI business intelligence. My foundation is built on ensuring data integrity before producing downstream analytics.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              During my internship at <strong>BDreamz Global Solutions Pvt Ltd</strong>, I cleaned and validated over 5,000+ transactional records using Python (Pandas and NumPy), automated standard monthly and daily MIS reporting cycles, and developed interactive Power BI dashboards that enabled operations leads to make timely, evidence-backed decisions.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              I believe in deterministic calculations, structured process documentation, and clean visual storytelling. Rather than building static mockups, I construct interactive models that allow stakeholders to stress-test business assumptions.
            </p>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              <a
                href={RESUME_PROFILE.resumeFileUrl}
                download="Nithishkumar_K_Data_Analyst_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                Download Official Resume
              </a>
              <a
                href={`mailto:${RESUME_PROFILE.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-all"
              >
                <Mail className="w-4 h-4" />
                Direct Email Inquiries
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              Education
            </h2>
            {EDUCATION.map((edu, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{edu.score}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">{edu.institution}</p>
                <p className="text-[11px] text-slate-500">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Certifications & Competencies */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Technical Certifications
            </h2>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-bold text-white">{cert.name}</h3>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-800/30">
                      {cert.issuer}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsCovered.map(sk => (
                      <span key={sk} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Working Principles */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Core Competency Principles
            </h2>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Data Hygiene First:</strong> Rigorous validation against nulls, dupes, and outliers before modeling.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Reproducible Workflows:</strong> Clear SQL CTEs and documented Pandas transformation scripts.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Actionable Dashboards:</strong> KPIs that trigger operational decisions, not vanity visualizations.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
