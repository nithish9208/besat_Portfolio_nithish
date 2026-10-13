import React from 'react';
import { 
  BarChart3, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink,
  CheckCircle 
} from 'lucide-react';
import { RESUME_PROFILE } from '../data/resumeData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm">{RESUME_PROFILE.name}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Data Analyst specializing in SQL extraction, Python Pandas cleaning, Excel MIS automation, and Power BI dashboards.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Chennai, India • Open to Relocation
            </div>
          </div>

          {/* Col 2: Simulations */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Simulation Lab</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="text-slate-400">1. Monsoon-to-Market Intelligence (TN/KL)</li>
              <li className="text-slate-400">2. Urban Expansion vs Economic Prosperity</li>
              <li className="text-slate-400">3. AI Career & Skill Training Finder</li>
              <li className="text-cyan-400 font-medium">Deterministic Local Execution</li>
            </ul>
          </div>

          {/* Col 3: Education & Certifications */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Credentials</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="text-slate-300">B.E. in ECE • NPR College of Engg (2021-25)</li>
              <li className="text-slate-300">Python for Data Science • Besant Technologies</li>
              <li className="text-slate-300">SQL for Data Analysis • Besant Technologies</li>
              <li className="text-slate-300">Excel Business Analytics • Besant Technologies</li>
            </ul>
          </div>

          {/* Col 4: Contact & Resume */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Direct Reach</h4>
            <div className="space-y-1 text-[11px]">
              <p className="text-slate-300 font-mono">{RESUME_PROFILE.email}</p>
              <p className="text-slate-300 font-mono">{RESUME_PROFILE.phone}</p>
            </div>
            <div className="pt-2">
              <a
                href={RESUME_PROFILE.resumeFileUrl}
                download="Nithishkumar_K_Data_Analyst_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 text-[11px] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Nithishkumar K. Built with React, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All 3 Interactive Simulation Modules Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
