import React from 'react';
import { RefreshCw, Play, Download, Sparkles, AlertCircle } from 'lucide-react';

interface SimulationSharedHeaderProps {
  title: string;
  subtitle: string;
  tagline: string;
  badgeText: string;
  badgeType?: 'synthetic' | 'illustrative' | 'prototype';
  isCalculating: boolean;
  onRunSimulation: () => void;
  onReset: () => void;
  onSampleScenario: () => void;
  onExportCSV: () => void;
  runButtonLabel?: string;
}

export const SimulationSharedHeader: React.FC<SimulationSharedHeaderProps> = ({
  title,
  subtitle,
  tagline,
  badgeText,
  badgeType = 'illustrative',
  isCalculating,
  onRunSimulation,
  onReset,
  onSampleScenario,
  onExportCSV,
  runButtonLabel = 'Run Simulation'
}) => {
  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'synthetic':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'prototype':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'illustrative':
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium flex items-center gap-1.5 ${getBadgeStyle()}`}>
              <AlertCircle className="w-3.5 h-3.5" />
              {badgeText}
            </span>
            <span className="text-xs text-slate-400 border border-slate-800 rounded-full px-2.5 py-1 bg-slate-800/40">
              Interactive Analytics Engine
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
          <p className="text-sm font-medium text-cyan-400 mt-0.5">{subtitle}</p>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">{tagline}</p>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={onSampleScenario}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/70 rounded-lg transition-all"
            title="Load illustrative pre-configured scenario"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Sample Scenario
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/70 rounded-lg transition-all"
            title="Reset to default baseline inputs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            Reset
          </button>

          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-750 rounded-lg transition-all"
            title="Export calculated simulation data to CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export CSV
          </button>

          <button
            onClick={onRunSimulation}
            disabled={isCalculating}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-lg shadow-cyan-500/20 transition-all ${
              isCalculating 
                ? 'bg-cyan-700 cursor-not-allowed opacity-80' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95'
            }`}
          >
            {isCalculating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                Calculating...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                {runButtonLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
