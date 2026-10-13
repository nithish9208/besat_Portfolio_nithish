import { 
  UrbanInputs, 
  UrbanSimulationResult, 
  UrbanYearDataPoint, 
  UrbanCityComparison 
} from '../types/simulations';
import { downloadCSV } from './csvExport';

export interface CityBaselineInfo {
  city: string;
  builtUp2026Km2: number;
  perCapitaGsdp2026K: number; // in '000 INR
  infraAccessIndex: number; // 0-100
  populationMillions: number;
  defaultExpansionRate: number;
  defaultEmploymentGrowth: number;
  defaultPopulationGrowth: number;
}

export const TAMIL_NADU_CITIES: Record<string, CityBaselineInfo> = {
  'Chennai': {
    city: 'Chennai',
    builtUp2026Km2: 485.0,
    perCapitaGsdp2026K: 345.0,
    infraAccessIndex: 84.0,
    populationMillions: 11.2,
    defaultExpansionRate: 4.6,
    defaultEmploymentGrowth: 5.2,
    defaultPopulationGrowth: 2.1
  },
  'Coimbatore': {
    city: 'Coimbatore',
    builtUp2026Km2: 310.0,
    perCapitaGsdp2026K: 295.0,
    infraAccessIndex: 78.5,
    populationMillions: 2.85,
    defaultExpansionRate: 4.1,
    defaultEmploymentGrowth: 4.8,
    defaultPopulationGrowth: 1.8
  },
  'Madurai': {
    city: 'Madurai',
    builtUp2026Km2: 195.0,
    perCapitaGsdp2026K: 215.0,
    infraAccessIndex: 68.0,
    populationMillions: 1.82,
    defaultExpansionRate: 3.5,
    defaultEmploymentGrowth: 3.4,
    defaultPopulationGrowth: 1.5
  },
  'Tiruchirappalli': {
    city: 'Tiruchirappalli',
    builtUp2026Km2: 165.0,
    perCapitaGsdp2026K: 228.0,
    infraAccessIndex: 71.0,
    populationMillions: 1.25,
    defaultExpansionRate: 3.2,
    defaultEmploymentGrowth: 3.6,
    defaultPopulationGrowth: 1.4
  },
  'Salem': {
    city: 'Salem',
    builtUp2026Km2: 145.0,
    perCapitaGsdp2026K: 198.0,
    infraAccessIndex: 64.0,
    populationMillions: 1.08,
    defaultExpansionRate: 4.2,
    defaultEmploymentGrowth: 3.1,
    defaultPopulationGrowth: 1.6
  },
  'Tirunelveli': {
    city: 'Tirunelveli',
    builtUp2026Km2: 120.0,
    perCapitaGsdp2026K: 185.0,
    infraAccessIndex: 60.5,
    populationMillions: 0.88,
    defaultExpansionRate: 3.0,
    defaultEmploymentGrowth: 2.8,
    defaultPopulationGrowth: 1.3
  }
};

export const DEFAULT_URBAN_INPUTS: UrbanInputs = {
  city: 'Coimbatore',
  expansionRatePct: 4.1,
  infraInvestmentIndex: 110, // 10% above baseline capital outlay
  employmentGrowthPct: 4.8,
  populationGrowthPct: 1.8
};

export const SAMPLE_URBAN_SCENARIO: UrbanInputs = {
  city: 'Salem',
  expansionRatePct: 6.8, // Aggressive peripheral land conversion
  infraInvestmentIndex: 85, // Lagging municipal capital budget
  employmentGrowthPct: 2.5, // Sluggish formal job absorption
  populationGrowthPct: 2.4
};

export function runUrbanSimulation(inputs: UrbanInputs): UrbanSimulationResult {
  const base = TAMIL_NADU_CITIES[inputs.city] || TAMIL_NADU_CITIES['Coimbatore'];
  const years = [2026, 2027, 2028, 2029, 2030];

  const timeSeries: UrbanYearDataPoint[] = [];

  for (let i = 0; i < years.length; i++) {
    const yr = years[i];
    const step = i;

    // Baseline trajectory (using standard defaults)
    const baseBuiltUp = Number((base.builtUp2026Km2 * Math.pow(1 + base.defaultExpansionRate / 100, step)).toFixed(1));
    
    // Scenario physical built-up area
    const simBuiltUp = Number((base.builtUp2026Km2 * Math.pow(1 + inputs.expansionRatePct / 100, step)).toFixed(1));

    // Economic multiplier: employment + infrastructure elasticity
    const infraFactor = (inputs.infraInvestmentIndex - 100) * 0.035;
    const effectiveEconGrowth = (inputs.employmentGrowthPct * 0.75) + infraFactor;
    const simGsdp = Number((base.perCapitaGsdp2026K * Math.pow(1 + effectiveEconGrowth / 100, step)).toFixed(1));

    // Infrastructure access index
    const infraChangePerYear = ((inputs.infraInvestmentIndex / 100) * 2.4) - ((inputs.expansionRatePct - 3.0) * 0.6);
    const simInfra = Math.min(98, Math.max(30, Number((base.infraAccessIndex + (step * infraChangePerYear)).toFixed(1))));

    // Formal employment index (Base 100 in 2026)
    const empIndex = Number((100 * Math.pow(1 + inputs.employmentGrowthPct / 100, step)).toFixed(1));

    // Imbalance score for the step
    const builtUpDelta = (simBuiltUp - base.builtUp2026Km2) / base.builtUp2026Km2;
    const gsdpDelta = (simGsdp - base.perCapitaGsdp2026K) / base.perCapitaGsdp2026K;
    const stepImbalance = step === 0 ? 1.00 : Number((builtUpDelta / Math.max(gsdpDelta, 0.01)).toFixed(2));

    timeSeries.push({
      year: yr,
      builtUpAreaKm2: simBuiltUp,
      baselineBuiltUpAreaKm2: baseBuiltUp,
      perCapitaGsdpThousand: simGsdp,
      infraAccessIndex: simInfra,
      employmentIndex: empIndex,
      imbalanceScore: stepImbalance
    });
  }

  const projected2030 = timeSeries[timeSeries.length - 1];
  const builtUpDeltaPct = Number((((projected2030.builtUpAreaKm2 - base.builtUp2026Km2) / base.builtUp2026Km2) * 100).toFixed(1));
  const gsdpDeltaPct = Number((((projected2030.perCapitaGsdpThousand - base.perCapitaGsdp2026K) / base.perCapitaGsdp2026K) * 100).toFixed(1));

  // Overall Growth Imbalance Indicator (Ratio of physical growth rate to per-capita economic growth rate)
  const growthImbalanceIndicator = Number((inputs.expansionRatePct / Math.max(0.4, (inputs.employmentGrowthPct * 0.75) + ((inputs.infraInvestmentIndex - 100) * 0.035))).toFixed(2));

  let imbalanceClassification: 'Balanced Growth' | 'Moderate Physical Sprawl' | 'Severe Spatial Inefficiency' = 'Balanced Growth';
  if (growthImbalanceIndicator >= 1.45) imbalanceClassification = 'Severe Spatial Inefficiency';
  else if (growthImbalanceIndicator >= 1.15) imbalanceClassification = 'Moderate Physical Sprawl';

  // Cross-city comparisons
  const cityComparisons: UrbanCityComparison[] = Object.values(TAMIL_NADU_CITIES).map(c => {
    const isCurrent = c.city === inputs.city;
    const expRate = isCurrent ? inputs.expansionRatePct : c.defaultExpansionRate;
    const empRate = isCurrent ? inputs.employmentGrowthPct : c.defaultEmploymentGrowth;
    const infraIdx = isCurrent ? inputs.infraInvestmentIndex : 100;
    const econEff = (empRate * 0.75) + ((infraIdx - 100) * 0.035);
    const ratio = Number((expRate / Math.max(0.4, econEff)).toFixed(2));

    let status: 'Balanced' | 'Moderate Sprawl' | 'High Sprawl Risk' = 'Balanced';
    if (ratio >= 1.40) status = 'High Sprawl Risk';
    else if (ratio >= 1.15) status = 'Moderate Sprawl';

    const prosperityScore = Number(((c.perCapitaGsdp2026K / 350 * 50) + (c.infraAccessIndex / 100 * 50)).toFixed(1));

    return {
      cityName: c.city,
      builtUpGrowthRate: expRate,
      prosperityIndex: prosperityScore,
      imbalanceRatio: ratio,
      status
    };
  });

  // Scatter plot points
  const scatterData = cityComparisons.map(cc => {
    const cMeta = TAMIL_NADU_CITIES[cc.cityName];
    return {
      city: cc.cityName,
      expansionRate: cc.builtUpGrowthRate,
      prosperityScore: cc.prosperityIndex,
      population: cMeta.populationMillions
    };
  });

  // Automated analytical insight
  const insightParts: string[] = [];
  insightParts.push(`For ${inputs.city}, an annual urban expansion rate of ${inputs.expansionRatePct}% expands built-up territory to ${projected2030.builtUpAreaKm2} km² (+${builtUpDeltaPct}% by 2030).`);

  if (growthImbalanceIndicator >= 1.45) {
    insightParts.push(`Physical land absorption heavily outstrips per-capita economic output (Imbalance Ratio: ${growthImbalanceIndicator}). Municipal corporation faces severe infrastructure delivery strain across fringe wards.`);
  } else if (growthImbalanceIndicator >= 1.15) {
    insightParts.push(`Urban growth shows moderate peripheral sprawl (Imbalance Ratio: ${growthImbalanceIndicator}). Targeted mass-transit and utility infill are recommended to consolidate density.`);
  } else {
    insightParts.push(`Spatial footprint growth aligns harmoniously with productivity gains (Imbalance Ratio: ${growthImbalanceIndicator}). Economic value density supports compact municipal sustainability.`);
  }

  insightParts.push(`Infrastructure access index evolves to ${projected2030.infraAccessIndex}/100 under an investment index of ${inputs.infraInvestmentIndex}. [Synthetic demo data — indicative policy heuristic model.]`);

  return {
    inputs,
    projectedBuiltUpArea2030: projected2030.builtUpAreaKm2,
    builtUpDeltaPct,
    projectedPerCapitaGsdp2030: projected2030.perCapitaGsdpThousand,
    gsdpDeltaPct,
    growthImbalanceIndicator,
    imbalanceClassification,
    timeSeries,
    cityComparisons,
    scatterData,
    automatedInsight: insightParts.join(' ')
  };
}

export function exportUrbanSimulationCSV(result: UrbanSimulationResult) {
  const headers = [
    'Year',
    'City',
    'Simulated Built-Up Area (sq km)',
    'Baseline Built-Up Area (sq km)',
    'Per Capita GSDP (INR Thousands)',
    'Infra Access Index (0-100)',
    'Employment Index (2026=100)',
    'Growth Imbalance Ratio',
    'Imbalance Status',
    'Data Status'
  ];

  const rows = result.timeSeries.map(pt => [
    pt.year,
    result.inputs.city,
    pt.builtUpAreaKm2,
    pt.baselineBuiltUpAreaKm2,
    pt.perCapitaGsdpThousand,
    pt.infraAccessIndex,
    pt.employmentIndex,
    pt.imbalanceScore,
    result.imbalanceClassification,
    'Synthetic Scenario Model'
  ]);

  downloadCSV(`Urban_Expansion_Simulation_${result.inputs.city}.csv`, headers, rows);
}
