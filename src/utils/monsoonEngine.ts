import { 
  MonsoonInputs, 
  MonsoonSimulationResult, 
  MonsoonDataPoint, 
  MonsoonMarketComparison 
} from '../types/simulations';
import { downloadCSV } from './csvExport';

export const MONSOON_MARKETS = {
  'Tamil Nadu': [
    'Chennai Koyambedu',
    'Madurai Central Market',
    'Coimbatore MGR Market',
    'Salem VOC Market',
    'Tirunelveli Market'
  ],
  'Kerala': [
    'Ernakulam Market',
    'Palakkad APMC',
    'Kozhikode Valiyangadi',
    'Thrissur Sakthan Market'
  ]
};

export const MONSOON_VEGETABLES = [
  'Tomato',
  'Onion',
  'Potato',
  'Green Chilli',
  'Carrot'
];

export const BASELINE_COMMODITY_PRICES: Record<string, number> = {
  'Tomato': 38.0,
  'Onion': 34.0,
  'Potato': 28.5,
  'Green Chilli': 62.0,
  'Carrot': 44.0
};

export const COMMODITY_SENSITIVITY: Record<string, { rainSens: number; perishability: number; freightSens: number }> = {
  'Tomato': { rainSens: 0.35, perishability: 0.90, freightSens: 0.25 },
  'Onion': { rainSens: 0.20, perishability: 0.40, freightSens: 0.22 },
  'Potato': { rainSens: 0.15, perishability: 0.30, freightSens: 0.20 },
  'Green Chilli': { rainSens: 0.40, perishability: 0.85, freightSens: 0.28 },
  'Carrot': { rainSens: 0.25, perishability: 0.65, freightSens: 0.24 }
};

export const DEFAULT_MONSOON_INPUTS: MonsoonInputs = {
  state: 'Tamil Nadu',
  market: 'Chennai Koyambedu',
  vegetable: 'Tomato',
  dateRange: 'June 2026 – Sept 2026 (Southwest Monsoon)',
  rainfallDeviationPct: 45, // +45% excess
  supplyDisruptionSeverityPct: 35, // 35% disruption
  transportCostDeltaPct: 20 // +20% transport cost
};

export const SAMPLE_MONSOON_SCENARIO: MonsoonInputs = {
  state: 'Tamil Nadu',
  market: 'Chennai Koyambedu',
  vegetable: 'Tomato',
  dateRange: 'June 2026 – Sept 2026 (Southwest Monsoon)',
  rainfallDeviationPct: 85, // Heavy rainfall shock
  supplyDisruptionSeverityPct: 65, // Severe transit bottleneck
  transportCostDeltaPct: 40 // +40% freight spike
};

export function runMonsoonSimulation(inputs: MonsoonInputs): MonsoonSimulationResult {
  const basePrice = BASELINE_COMMODITY_PRICES[inputs.vegetable] || 35.0;
  const sens = COMMODITY_SENSITIVITY[inputs.vegetable] || { rainSens: 0.25, perishability: 0.5, freightSens: 0.22 };

  // Market distance / terminal hub premium
  let marketDistanceMarkup = 1.0;
  if (inputs.market.includes('Chennai')) marketDistanceMarkup = 1.08;
  if (inputs.market.includes('Ernakulam') || inputs.market.includes('Kozhikode')) marketDistanceMarkup = 1.12;
  if (inputs.market.includes('Palakkad') || inputs.market.includes('Salem')) marketDistanceMarkup = 0.95;

  const adjustedBasePrice = basePrice * marketDistanceMarkup;

  // Rainfall factor: positive rainfall shock damages crops; negative shock creates medium-term drought stress
  const rainShockFactor = (inputs.rainfallDeviationPct / 100.0) * sens.rainSens;
  // Supply disruption severity factor
  const disruptionFactor = (inputs.supplyDisruptionSeverityPct / 100.0) * 0.45 * sens.perishability;
  // Transport cost transmission
  const transportFactor = (inputs.transportCostDeltaPct / 100.0) * sens.freightSens;

  // Combined price impact percentage
  const totalPriceDeltaPct = Math.max(-25, Math.min(180, (rainShockFactor + disruptionFactor + transportFactor) * 100));
  const avgSimulatedPrice = Number((adjustedBasePrice * (1 + totalPriceDeltaPct / 100)).toFixed(2));

  // Supply risk score (0 - 100)
  const normRain = Math.min(100, Math.max(0, inputs.rainfallDeviationPct * 0.8));
  const riskScoreRaw = (normRain * 0.35) + (inputs.supplyDisruptionSeverityPct * 0.45) + (Math.max(0, inputs.transportCostDeltaPct) * 0.5);
  const supplyRiskScore = Math.min(100, Math.max(5, Math.round(riskScoreRaw)));

  let supplyRiskLabel: 'Normal' | 'Moderate' | 'Critical' | 'Severe' = 'Normal';
  if (supplyRiskScore >= 75) supplyRiskLabel = 'Severe';
  else if (supplyRiskScore >= 55) supplyRiskLabel = 'Critical';
  else if (supplyRiskScore >= 35) supplyRiskLabel = 'Moderate';

  // 12 Weeks Time Series (June to August)
  const weeks = [
    'Jun W1', 'Jun W2', 'Jun W3', 'Jun W4',
    'Jul W1', 'Jul W2', 'Jul W3', 'Jul W4',
    'Aug W1', 'Aug W2', 'Aug W3', 'Aug W4'
  ];

  const baseRainfallPattern = [12, 18, 24, 35, 48, 55, 62, 45, 38, 30, 22, 15]; // mm/week
  const priceSeasonality = [0.96, 0.98, 1.02, 1.05, 1.10, 1.15, 1.18, 1.12, 1.08, 1.04, 0.99, 0.97];

  const timeSeries: MonsoonDataPoint[] = weeks.map((wk, idx) => {
    const baseRain = baseRainfallPattern[idx];
    const simRain = Math.max(0, Math.round(baseRain * (1 + inputs.rainfallDeviationPct / 100)));
    const wkBasePrice = Number((adjustedBasePrice * priceSeasonality[idx]).toFixed(2));
    
    // Impact builds up from week 3 to week 8 (peak monsoon shock)
    const timeLagWeight = idx < 2 ? 0.3 : idx < 7 ? 1.0 + (idx - 2) * 0.08 : 0.85 - (idx - 7) * 0.06;
    const effectiveDelta = (totalPriceDeltaPct * timeLagWeight);
    const wkSimPrice = Number((wkBasePrice * (1 + effectiveDelta / 100)).toFixed(2));
    const wkRisk = Math.min(100, Math.round(supplyRiskScore * (0.7 + (idx >= 3 && idx <= 7 ? 0.35 : 0.1))));

    return {
      date: wk,
      baselineRainfall: baseRain,
      simulatedRainfall: simRain,
      baselinePrice: wkBasePrice,
      simulatedPrice: wkSimPrice,
      supplyRiskIndex: wkRisk
    };
  });

  const totalSimulatedRainfallMm = timeSeries.reduce((acc, curr) => acc + curr.simulatedRainfall, 0);
  const baselineTotalRainMm = timeSeries.reduce((acc, curr) => acc + curr.baselineRainfall, 0);
  const rainfallDeviationMm = totalSimulatedRainfallMm - baselineTotalRainMm;

  // Cross-market comparisons
  const allMarkets = [
    ...MONSOON_MARKETS['Tamil Nadu'].slice(0, 3),
    ...MONSOON_MARKETS['Kerala'].slice(0, 2)
  ];

  const marketComparisons: MonsoonMarketComparison[] = allMarkets.map(mkt => {
    let mktMult = 1.0;
    let transportShare = 14;
    if (mkt.includes('Chennai')) { mktMult = 1.06; transportShare = 18; }
    if (mkt.includes('Madurai')) { mktMult = 0.94; transportShare = 12; }
    if (mkt.includes('Coimbatore')) { mktMult = 0.98; transportShare = 13; }
    if (mkt.includes('Ernakulam')) { mktMult = 1.14; transportShare = 22; }
    if (mkt.includes('Palakkad')) { mktMult = 0.96; transportShare = 15; }

    const mBase = Number((basePrice * mktMult).toFixed(2));
    const mSim = Number((mBase * (1 + (totalPriceDeltaPct * (1 + (transportShare - 15) * 0.015)) / 100)).toFixed(2));

    return {
      market: mkt,
      baselinePrice: mBase,
      simulatedPrice: mSim,
      transportSharePct: transportShare
    };
  });

  // Automated analytical insight
  const insightParts: string[] = [];
  if (inputs.rainfallDeviationPct > 30) {
    insightParts.push(`Heavy rainfall anomaly (+${inputs.rainfallDeviationPct}%) triggers field-level harvest delays and perishability losses.`);
  } else if (inputs.rainfallDeviationPct < -20) {
    insightParts.push(`Below-normal rainfall (${inputs.rainfallDeviationPct}%) dampens yield expectations while reducing immediate transit washouts.`);
  } else {
    insightParts.push(`Near-normal precipitation patterns maintain consistent baseline farm-gate supply.`);
  }

  if (inputs.supplyDisruptionSeverityPct >= 50) {
    insightParts.push(`Severe transit disruption (${inputs.supplyDisruptionSeverityPct}%) restricts mandi arrivals, shifting market power toward wholesale aggregators.`);
  }

  if (inputs.transportCostDeltaPct > 15) {
    insightParts.push(`Elevated diesel and transit freight (+${inputs.transportCostDeltaPct}%) adds approx ₹${((adjustedBasePrice * inputs.transportCostDeltaPct * sens.freightSens) / 100).toFixed(1)}/kg to wholesale delivery landed costs.`);
  }

  insightParts.push(`Net simulated outcome: ${inputs.vegetable} at ${inputs.market} shifts from baseline ₹${adjustedBasePrice.toFixed(2)} to ₹${avgSimulatedPrice.toFixed(2)} (${totalPriceDeltaPct >= 0 ? '+' : ''}${totalPriceDeltaPct.toFixed(1)}%). [Note: Illustrative scenario modeling — not actual market quote.]`);

  return {
    inputs,
    avgBaselinePrice: Number(adjustedBasePrice.toFixed(2)),
    avgSimulatedPrice,
    priceDeltaPct: Number(totalPriceDeltaPct.toFixed(1)),
    totalSimulatedRainfallMm,
    rainfallDeviationMm,
    supplyRiskScore,
    supplyRiskLabel,
    timeSeries,
    marketComparisons,
    automatedInsight: insightParts.join(' ')
  };
}

export function exportMonsoonSimulationCSV(result: MonsoonSimulationResult) {
  const headers = [
    'Period',
    'State',
    'Market',
    'Vegetable',
    'Baseline Rainfall (mm)',
    'Simulated Rainfall (mm)',
    'Baseline Price (INR/kg)',
    'Simulated Price (INR/kg)',
    'Price Delta (%)',
    'Supply Risk Score',
    'Data Status'
  ];

  const rows = result.timeSeries.map(pt => [
    pt.date,
    result.inputs.state,
    result.inputs.market,
    result.inputs.vegetable,
    pt.baselineRainfall,
    pt.simulatedRainfall,
    pt.baselinePrice,
    pt.simulatedPrice,
    (((pt.simulatedPrice - pt.baselinePrice) / pt.baselinePrice) * 100).toFixed(1),
    pt.supplyRiskIndex,
    'Illustrative Simulation'
  ]);

  downloadCSV(`Monsoon_Simulation_${result.inputs.market.replace(/\s+/g, '_')}_${result.inputs.vegetable}.csv`, headers, rows);
}
