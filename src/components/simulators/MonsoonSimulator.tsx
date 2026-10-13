import React, { useState, useMemo } from 'react';
import { 
  CloudRain, 
  TrendingUp, 
  AlertTriangle, 
  Truck, 
  Layers, 
  ChevronRight, 
  Info,
  DollarSign,
  Activity,
  Calendar,
  CheckCircle2
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
  Legend, 
  Area 
} from 'recharts';
import { 
  MonsoonInputs, 
  MonsoonSimulationResult 
} from '../../types/simulations';
import { 
  MONSOON_MARKETS, 
  MONSOON_VEGETABLES, 
  DEFAULT_MONSOON_INPUTS, 
  SAMPLE_MONSOON_SCENARIO, 
  runMonsoonSimulation, 
  exportMonsoonSimulationCSV 
} from '../../utils/monsoonEngine';
import { SimulationSharedHeader } from './SimulationSharedHeader';

export const MonsoonSimulator: React.FC = () => {
  const [inputs, setInputs] = useState<MonsoonInputs>(DEFAULT_MONSOON_INPUTS);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<MonsoonSimulationResult>(() => runMonsoonSimulation(DEFAULT_MONSOON_INPUTS));
  const [showLogic, setShowLogic] = useState(false);

  // Available markets based on selected state
  const availableMarkets = useMemo(() => {
    return MONSOON_MARKETS[inputs.state] || MONSOON_MARKETS['Tamil Nadu'];
  }, [inputs.state]);

  const handleStateChange = (newState: 'Tamil Nadu' | 'Kerala') => {
    const markets = MONSOON_MARKETS[newState];
    setInputs(prev => ({
      ...prev,
      state: newState,
      market: markets[0]
    }));
  };

  const handleRunSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = runMonsoonSimulation(inputs);
      setResult(res);
      setIsCalculating(false);
    }, 380); // Realistic calculation micro-delay
  };

  const handleReset = () => {
    setInputs(DEFAULT_MONSOON_INPUTS);
    setResult(runMonsoonSimulation(DEFAULT_MONSOON_INPUTS));
  };

  const handleSampleScenario = () => {
    setInputs(SAMPLE_MONSOON_SCENARIO);
    setResult(runMonsoonSimulation(SAMPLE_MONSOON_SCENARIO));
  };

  const handleExportCSV = () => {
    exportMonsoonSimulationCSV(result);
  };

  const riskBadgeClass = {
    'Normal': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Moderate': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Critical': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'Severe': 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }[result.supplyRiskLabel];

  return (
    <div className="space-y-6">
      <SimulationSharedHeader
        title="Monsoon-to-Market Intelligence"
        subtitle="Weather Shock Transmission & Agricultural Wholesale Price Simulator"
        tagline="Evaluate how regional precipitation anomalies, ghat logistics bottlenecks, and transit costs transmit into mandi pricing across Tamil Nadu & Kerala."
        badgeText="Illustrative — Not Actual Market Data"
        badgeType="illustrative"
        isCalculating={isCalculating}
        onRunSimulation={handleRunSimulation}
        onReset={handleReset}
        onSampleScenario={handleSampleScenario}
        onExportCSV={handleExportCSV}
      />

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Controls */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Scenario Controls
            </h3>
            <span className="text-xs text-slate-400 font-mono">TN & KL Grid</span>
          </div>

          {/* State & Market Selection */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">State Jurisdiction</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Tamil Nadu', 'Kerala'] as const).map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStateChange(st)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                      inputs.state === st
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Market / Mandi</label>
              <select
                value={inputs.market}
                onChange={e => setInputs(prev => ({ ...prev, market: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {availableMarkets.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Commodity / Vegetable</label>
              <select
                value={inputs.vegetable}
                onChange={e => setInputs(prev => ({ ...prev, vegetable: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {MONSOON_VEGETABLES.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Date Range / Monitored Season
              </label>
              <div className="w-full bg-slate-950/80 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300">
                {inputs.dateRange}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-4">
            {/* Rainfall Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                  Rainfall Deviation
                </span>
                <span className={`font-mono font-semibold ${inputs.rainfallDeviationPct >= 0 ? 'text-cyan-400' : 'text-amber-400'}`}>
                  {inputs.rainfallDeviationPct >= 0 ? `+${inputs.rainfallDeviationPct}%` : `${inputs.rainfallDeviationPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="150"
                step="5"
                value={inputs.rainfallDeviationPct}
                onChange={e => setInputs(prev => ({ ...prev, rainfallDeviationPct: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>-50% (Drought)</span>
                <span>Normal</span>
                <span>+150% (Extreme)</span>
              </div>
            </div>

            {/* Supply Disruption Severity */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Supply Disruption Severity
                </span>
                <span className="font-mono font-semibold text-amber-400">
                  {inputs.supplyDisruptionSeverityPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={inputs.supplyDisruptionSeverityPct}
                onChange={e => setInputs(prev => ({ ...prev, supplyDisruptionSeverityPct: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>0% (Smooth)</span>
                <span>50% (Ghat Bottleneck)</span>
                <span>100% (Gridlock)</span>
              </div>
            </div>

            {/* Transport Cost Delta */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  Transportation Cost Delta
                </span>
                <span className={`font-mono font-semibold ${inputs.transportCostDeltaPct >= 0 ? 'text-blue-400' : 'text-emerald-400'}`}>
                  {inputs.transportCostDeltaPct >= 0 ? `+${inputs.transportCostDeltaPct}%` : `${inputs.transportCostDeltaPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="60"
                step="5"
                value={inputs.transportCostDeltaPct}
                onChange={e => setInputs(prev => ({ ...prev, transportCostDeltaPct: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>-20% (Subsidized)</span>
                <span>Base (0%)</span>
                <span>+60% (Fuel Surge)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isCalculating}
            className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isCalculating ? 'Computing Impact Matrices...' : 'Recalculate Scenario'}
          </button>
        </div>

        {/* Right: Dynamic KPIs and Charts */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Simulated Modal Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white tracking-tight">₹{result.avgSimulatedPrice.toFixed(2)}</span>
                <span className="text-xs text-slate-400">/kg</span>
              </div>
              <div className="mt-1 text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <span>Base: ₹{result.avgBaselinePrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Simulated Price Delta</span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-bold tracking-tight ${result.priceDeltaPct >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {result.priceDeltaPct >= 0 ? `+${result.priceDeltaPct}%` : `${result.priceDeltaPct}%`}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                {result.priceDeltaPct >= 0 ? 'Wholesale Inflation' : 'Price Discounting'}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Total Monitored Rain</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-cyan-400 tracking-tight">{result.totalSimulatedRainfallMm}</span>
                <span className="text-xs text-slate-400">mm</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Anomaly: {result.rainfallDeviationMm >= 0 ? `+${result.rainfallDeviationMm}` : result.rainfallDeviationMm} mm
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Supply Risk Index</span>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white tracking-tight">{result.supplyRiskScore}/100</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${riskBadgeClass}`}>
                  {result.supplyRiskLabel}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Mandi Arrival Fragility
              </div>
            </div>
          </div>

          {/* Automated Insight Alert */}
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 shadow-md bg-gradient-to-r from-cyan-950/20 to-transparent">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 mt-0.5 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-0.5">
                  Automated Scenario Insight
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.automatedInsight}
                </p>
              </div>
            </div>
          </div>

          {/* Chart 1: Vegetable Price Trend (Baseline vs Simulated) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Vegetable Price Trajectory (₹/kg) — Baseline vs Simulated
                </h4>
                <p className="text-xs text-slate-400">Weekly progression showing weather shock lag & transit cost escalation</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-0.5 bg-slate-500 rounded"></span> Baseline Price
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                  <span className="w-3 h-0.5 bg-cyan-400 rounded"></span> Simulated Price
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={result.timeSeries} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={['auto', 'auto']} unit="₹" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="baselinePrice" 
                    name="Baseline Price (₹)" 
                    stroke="#64748b" 
                    strokeDasharray="4 4" 
                    strokeWidth={2} 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="simulatedPrice" 
                    name="Simulated Price (₹)" 
                    stroke="#06b6d4" 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#06b6d4' }}
                    activeDot={{ r: 6, fill: '#38bdf8' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Rainfall Trend & Supply Risk Index */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Weekly Rainfall Comparison */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <h4 className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                Precipitation Pattern (mm/week)
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">Normal catchment rainfall vs simulated anomaly</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={result.timeSeries} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit="mm" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                    />
                    <Bar dataKey="baselineRainfall" name="Normal Rain (mm)" fill="#334155" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="simulatedRainfall" name="Simulated Rain (mm)" fill="#38bdf8" radius={[2, 2, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Market-Wise Price Comparison */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <h4 className="text-xs font-semibold text-white mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                Cross-Market Mandi Clearing Prices
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">Simulated price levels across key Southern hubs</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={result.marketComparisons} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="market" stroke="#64748b" tick={{ fontSize: 9 }} interval={0} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit="₹" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                    />
                    <Bar dataKey="baselinePrice" name="Baseline (₹)" fill="#475569" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="simulatedPrice" name="Simulated (₹)" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Calculation Methodology & Formula Accordion */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowLogic(!showLogic)}
              className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                How are simulated prices calculated? (Analytical Methodology & Formulas)
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showLogic ? 'rotate-90' : ''}`} />
            </button>
            {showLogic && (
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-300 space-y-2.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[11px] font-semibold text-cyan-400 block mb-1">1. Precipitation Sensitivity</span>
                    <p className="text-[11px] text-slate-400">
                      Calculates crop-specific elasticity. Perishables like Tomato and Green Chilli have a higher rain sensitivity factor (0.35–0.40) than tubers (0.15–0.20).
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[11px] font-semibold text-amber-400 block mb-1">2. Supply Disruption Impact</span>
                    <p className="text-[11px] text-slate-400">
                      Models mandi arrival contraction caused by road washouts along the Western Ghats (Palakkad Gap, Dindigul-Theni pass).
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[11px] font-semibold text-blue-400 block mb-1">3. Freight Transmission</span>
                    <p className="text-[11px] text-slate-400">
                      Translates diesel and logistics freight variance directly into terminal wholesale spot premiums.
                    </p>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <strong className="text-slate-200">Formula:</strong> <code className="text-cyan-300">Simulated Price = BasePrice * (1 + (RainfallFactor * Sens + Disruption * Perishability + FreightDelta * FreightSens))</code>
                  <br />
                  <em className="text-slate-500">Note: All calculations are run client-side deterministically for simulation modeling purposes. Real-world wholesale spot clearing requires continuous mandi arrivals registry data.</em>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
