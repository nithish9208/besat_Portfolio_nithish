import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  AlertCircle, 
  Users, 
  Compass, 
  ChevronRight, 
  Info,
  DollarSign,
  Activity,
  Layers,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ScatterChart, 
  Scatter, 
  ZAxis, 
  Cell 
} from 'recharts';
import { 
  UrbanInputs, 
  UrbanSimulationResult 
} from '../../types/simulations';
import { 
  TAMIL_NADU_CITIES, 
  DEFAULT_URBAN_INPUTS, 
  SAMPLE_URBAN_SCENARIO, 
  runUrbanSimulation, 
  exportUrbanSimulationCSV 
} from '../../utils/urbanEngine';
import { SimulationSharedHeader } from './SimulationSharedHeader';

export const UrbanSimulator: React.FC = () => {
  const [inputs, setInputs] = useState<UrbanInputs>(DEFAULT_URBAN_INPUTS);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<UrbanSimulationResult>(() => runUrbanSimulation(DEFAULT_URBAN_INPUTS));
  const [showLogic, setShowLogic] = useState(false);

  const handleCityChange = (cityName: string) => {
    const cityMeta = TAMIL_NADU_CITIES[cityName] || TAMIL_NADU_CITIES['Coimbatore'];
    const updatedInputs: UrbanInputs = {
      ...inputs,
      city: cityName,
      expansionRatePct: cityMeta.defaultExpansionRate,
      employmentGrowthPct: cityMeta.defaultEmploymentGrowth,
      populationGrowthPct: cityMeta.defaultPopulationGrowth
    };
    setInputs(updatedInputs);
    setResult(runUrbanSimulation(updatedInputs));
  };

  const handleRunSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = runUrbanSimulation(inputs);
      setResult(res);
      setIsCalculating(false);
    }, 380);
  };

  const handleReset = () => {
    setInputs(DEFAULT_URBAN_INPUTS);
    setResult(runUrbanSimulation(DEFAULT_URBAN_INPUTS));
  };

  const handleSampleScenario = () => {
    setInputs(SAMPLE_URBAN_SCENARIO);
    setResult(runUrbanSimulation(SAMPLE_URBAN_SCENARIO));
  };

  const handleExportCSV = () => {
    exportUrbanSimulationCSV(result);
  };

  const imbalanceBadgeClass = {
    'Balanced Growth': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Moderate Physical Sprawl': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Severe Spatial Inefficiency': 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }[result.imbalanceClassification];

  return (
    <div className="space-y-6">
      <SimulationSharedHeader
        title="Urban Expansion vs Economic Prosperity"
        subtitle="Socioeconomic Decoupling & Spatial Growth Analytics across Tamil Nadu"
        tagline="Model the trade-offs between physical land expansion rates, infrastructure capital allocation, and per-capita economic productivity across 6 major urban agglomerations."
        badgeText="Synthetic Data — Heuristic Policy Model"
        badgeType="synthetic"
        isCalculating={isCalculating}
        onRunSimulation={handleRunSimulation}
        onReset={handleReset}
        onSampleScenario={handleSampleScenario}
        onExportCSV={handleExportCSV}
        runButtonLabel="Run Scenario"
      />

      {/* Grid: Controls and Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Controls */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Scenario Parameters
            </h3>
            <span className="text-xs text-slate-400 font-mono">2026 – 2030 Horizon</span>
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Municipal Corporation</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(TAMIL_NADU_CITIES).map(cName => (
                <button
                  key={cName}
                  type="button"
                  onClick={() => handleCityChange(cName)}
                  className={`py-2 px-2.5 text-xs font-medium rounded-lg border transition-all text-center ${
                    inputs.city === cName
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cName}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-4">
            {/* Assumed Urban Expansion Rate */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  Assumed Expansion Rate
                </span>
                <span className="font-mono font-semibold text-cyan-400">
                  {inputs.expansionRatePct}% / year
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={inputs.expansionRatePct}
                onChange={e => setInputs(prev => ({ ...prev, expansionRatePct: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>1.0% (Compact)</span>
                <span>4.0% (Normal)</span>
                <span>10.0% (High Sprawl)</span>
              </div>
            </div>

            {/* Infrastructure Investment Index */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  Infrastructure Capital Index
                </span>
                <span className="font-mono font-semibold text-blue-400">
                  {inputs.infraInvestmentIndex} (Base=100)
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={inputs.infraInvestmentIndex}
                onChange={e => setInputs(prev => ({ ...prev, infraInvestmentIndex: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>50 (Deficit)</span>
                <span>100 (Status Quo)</span>
                <span>200 (Surge Outlay)</span>
              </div>
            </div>

            {/* Employment Growth */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Formal Employment Growth
                </span>
                <span className="font-mono font-semibold text-emerald-400">
                  {inputs.employmentGrowthPct}% / year
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="10.0"
                step="0.2"
                value={inputs.employmentGrowthPct}
                onChange={e => setInputs(prev => ({ ...prev, employmentGrowthPct: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>0% (Stagnant)</span>
                <span>5% (Dynamic)</span>
                <span>10% (Boom)</span>
              </div>
            </div>

            {/* Population Growth */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  Demographic Inflow Rate
                </span>
                <span className="font-mono font-semibold text-purple-400">
                  {inputs.populationGrowthPct}% / year
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={inputs.populationGrowthPct}
                onChange={e => setInputs(prev => ({ ...prev, populationGrowthPct: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>0.5% (Stable)</span>
                <span>2.0% (Moderate)</span>
                <span>5.0% (Rapid Influx)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isCalculating}
            className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isCalculating ? 'Projecting Trajectory...' : 'Recalculate Scenario'}
          </button>
        </div>

        {/* Right: Dynamic KPIs and Charts */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Projected Built-Up (2030)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white tracking-tight">{result.projectedBuiltUpArea2030}</span>
                <span className="text-xs text-slate-400">km²</span>
              </div>
              <div className="mt-1 text-[11px] text-cyan-400">
                +{result.builtUpDeltaPct}% expansion
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Per Capita GSDP (2030)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-emerald-400 tracking-tight">₹{result.projectedPerCapitaGsdp2030}k</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                +{result.gsdpDeltaPct}% real value gain
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Growth Imbalance (GII)</span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-bold tracking-tight ${result.growthImbalanceIndicator >= 1.45 ? 'text-rose-400' : result.growthImbalanceIndicator >= 1.15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {result.growthImbalanceIndicator}
                </span>
                <span className="text-xs text-slate-400">ratio</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Land / Economic Growth
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Spatial Equilibrium</span>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${imbalanceBadgeClass}`}>
                  {result.imbalanceClassification}
                </span>
              </div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                {result.growthImbalanceIndicator <= 1.15 ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Policy Health Check</span>
              </div>
            </div>
          </div>

          {/* Automated Insight Alert */}
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-xl p-4 shadow-md bg-gradient-to-r from-blue-950/20 to-transparent">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-0.5 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-0.5">
                  Analytical Interpretation & Urban Policy Summary
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.automatedInsight}
                </p>
              </div>
            </div>
          </div>

          {/* Chart 1: Built-Up Area Expansion (Baseline vs Scenario) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  Physical Built-Up Area Footprint (km²) — 2026 to 2030
                </h4>
                <p className="text-xs text-slate-400">Comparing baseline municipal trend vs simulated expansion trajectory</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-0.5 bg-slate-500 rounded"></span> Baseline Trend
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                  <span className="w-3 h-0.5 bg-cyan-400 rounded"></span> Simulated Footprint
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={result.timeSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit=" km²" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="baselineBuiltUpAreaKm2" 
                    name="Baseline Footprint (km²)" 
                    stroke="#64748b" 
                    strokeDasharray="4 4" 
                    strokeWidth={2} 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="builtUpAreaKm2" 
                    name="Simulated Footprint (km²)" 
                    stroke="#06b6d4" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#06b6d4' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 & 3: City Comparison & Growth vs Prosperity Scatter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cross-City Growth Imbalance Comparison */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <h4 className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Cross-City Imbalance Ratio Comparison
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">Ratio &gt; 1.25 indicates risk of unserviced urban sprawl</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={result.cityComparisons} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="cityName" stroke="#64748b" tick={{ fontSize: 9 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 2.5]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                    />
                    <Bar dataKey="imbalanceRatio" name="Imbalance Ratio" radius={[3, 3, 0, 0]}>
                      {result.cityComparisons.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.cityName === inputs.city ? '#38bdf8' : entry.imbalanceRatio > 1.35 ? '#f43f5e' : '#334155'} 
                        />
                      ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scatter Plot: Urban Growth vs Prosperity Index */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <h4 className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Urban Growth Rate vs Prosperity Score
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">Identifies cities delivering high value per unit of expansion</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" dataKey="expansionRate" name="Expansion Rate (%)" unit="%" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis type="number" dataKey="prosperityScore" name="Prosperity Score" stroke="#64748b" tick={{ fontSize: 10 }} domain={[40, 100]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                      formatter={(val: any, name: any) => [val, name]}
                    />
                    <Scatter name="Cities" data={result.scatterData} fill="#06b6d4">
                      {result.scatterData.map((entry, index) => (
                        <Cell 
                          key={`scatter-${index}`} 
                          fill={entry.city === inputs.city ? '#38bdf8' : '#818cf8'} 
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Methodology Accordion */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowLogic(!showLogic)}
              className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                Growth Imbalance Indicator Formula & Calculation Logic
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showLogic ? 'rotate-90' : ''}`} />
            </button>
            {showLogic && (
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-300 space-y-2.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-semibold text-cyan-400 block mb-1">Growth Imbalance Indicator (GII) Formula</span>
                  <code className="text-cyan-300 block bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] mb-1.5">
                    GII = (Annual Built-Up Area Growth Rate %) / [(Formal Employment Growth % * 0.75) + ((Infra Index - 100) * 0.035)]
                  </code>
                  <p className="text-[11px] text-slate-400">
                    A ratio greater than 1.25 indicates spatial sprawl occurring faster than economic value generation. This signals fiscal risk for municipal corporations obligated to extend piped water, sewage, and public transit to low-density fringe wards.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <strong className="text-slate-200">Synthetic Data Notice:</strong> Baseline values reflect aggregated statistics from Tamil Nadu Economic Appraisals; individual projection curves represent simulated policy scenarios and should not be cited as definitive government forecasts.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
