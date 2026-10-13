import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { RESUME_PROFILE } from '../data/resumeData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
    // Prepare direct mailto fallback link
    window.location.href = `mailto:${RESUME_PROFILE.email}?subject=${encodeURIComponent(formData.subject || 'Data Analyst Inquiry')}&body=${encodeURIComponent(`Hi Nithishkumar,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
          Get in Touch
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
          Contact & Collaboration
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Interested in discussing a data analyst role, operational reporting project, or simulation architecture? Let's connect directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href={`mailto:${RESUME_PROFILE.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Email</span>
                  <span className="text-slate-200 font-mono font-medium group-hover:text-cyan-300">
                    {RESUME_PROFILE.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${RESUME_PROFILE.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Phone</span>
                  <span className="text-slate-200 font-mono font-medium group-hover:text-emerald-300">
                    {RESUME_PROFILE.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Location</span>
                  <span className="text-slate-200 font-medium">
                    {RESUME_PROFILE.location} (Open to Relocation & Remote)
                  </span>
                </div>
              </div>
            </div>

            {/* Resume Download Action */}
            <div className="pt-4 border-t border-slate-800">
              <a
                href={RESUME_PROFILE.resumeFileUrl}
                download="Nithishkumar_K_Data_Analyst_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download Complete Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the details below to initialize a direct email inquiry.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Initialized!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your mail client has been opened with your message directed to <strong>{RESUME_PROFILE.email}</strong>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs text-cyan-400 underline hover:text-cyan-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Hiring Manager / Recruiter"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Data Analyst Role / Analytics Project"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the opportunity or project requirements..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry via Email
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
