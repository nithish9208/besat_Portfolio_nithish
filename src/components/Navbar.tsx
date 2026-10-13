import React, { useState } from 'react';
import { 
  BarChart3, 
  Menu, 
  X, 
  Download, 
  Sun, 
  Moon, 
  Sparkles,
  Layers,
  Play
} from 'lucide-react';
import { NavTab, ProjectId } from '../types/portfolio';
import { RESUME_PROFILE } from '../data/resumeData';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  onQuickLaunchSim: (id: ProjectId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isLightMode,
  onToggleTheme,
  onQuickLaunchSim
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects & Simulations' },
    { id: 'skills', label: 'Skills & Tools' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div 
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                {RESUME_PROFILE.name}
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <p className="text-[10px] font-medium text-cyan-400 font-mono tracking-tight">
                Data Analyst | Operations Analytics
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Resume */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {isLightMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Resume Button */}
            <a
              href={RESUME_PROFILE.resumeFileUrl}
              download="Nithishkumar_K_Data_Analyst_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400"
            >
              {isLightMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold ${
                activeTab === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <a
              href={RESUME_PROFILE.resumeFileUrl}
              download="Nithishkumar_K_Data_Analyst_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-500 text-white text-xs font-semibold"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
