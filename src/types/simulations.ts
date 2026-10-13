// 1. Monsoon Simulator Types
export interface MonsoonInputs {
  state: 'Tamil Nadu' | 'Kerala';
  market: string;
  vegetable: string;
  dateRange: string;
  rainfallDeviationPct: number; // e.g. -50% to +150%
  supplyDisruptionSeverityPct: number; // 0 to 100%
  transportCostDeltaPct: number; // -20% to +60%
}

export interface MonsoonDataPoint {
  date: string;
  baselineRainfall: number;
  simulatedRainfall: number;
  baselinePrice: number;
  simulatedPrice: number;
  supplyRiskIndex: number;
}

export interface MonsoonMarketComparison {
  market: string;
  baselinePrice: number;
  simulatedPrice: number;
  transportSharePct: number;
}

export interface MonsoonSimulationResult {
  inputs: MonsoonInputs;
  avgBaselinePrice: number;
  avgSimulatedPrice: number;
  priceDeltaPct: number;
  totalSimulatedRainfallMm: number;
  rainfallDeviationMm: number;
  supplyRiskScore: number; // 0 - 100
  supplyRiskLabel: 'Normal' | 'Moderate' | 'Critical' | 'Severe';
  timeSeries: MonsoonDataPoint[];
  marketComparisons: MonsoonMarketComparison[];
  automatedInsight: string;
  isSampleScenario?: boolean;
}

// 2. Urban Simulator Types
export interface UrbanInputs {
  city: string;
  expansionRatePct: number; // 1.0% to 10.0%
  infraInvestmentIndex: number; // 50 to 200 (100 = baseline)
  employmentGrowthPct: number; // 0% to 10.0%
  populationGrowthPct: number; // 0.5% to 5.0%
}

export interface UrbanYearDataPoint {
  year: number;
  builtUpAreaKm2: number;
  baselineBuiltUpAreaKm2: number;
  perCapitaGsdpThousand: number;
  infraAccessIndex: number;
  employmentIndex: number;
  imbalanceScore: number;
}

export interface UrbanCityComparison {
  cityName: string;
  builtUpGrowthRate: number;
  prosperityIndex: number;
  imbalanceRatio: number;
  status: 'Balanced' | 'Moderate Sprawl' | 'High Sprawl Risk';
}

export interface UrbanSimulationResult {
  inputs: UrbanInputs;
  projectedBuiltUpArea2030: number;
  builtUpDeltaPct: number;
  projectedPerCapitaGsdp2030: number;
  gsdpDeltaPct: number;
  growthImbalanceIndicator: number; // Ratio: Land expansion rate / Economic productivity rate
  imbalanceClassification: 'Balanced Growth' | 'Moderate Physical Sprawl' | 'Severe Spatial Inefficiency';
  timeSeries: UrbanYearDataPoint[];
  cityComparisons: UrbanCityComparison[];
  scatterData: Array<{
    city: string;
    expansionRate: number;
    prosperityScore: number;
    population: number;
  }>;
  automatedInsight: string;
  isSampleScenario?: boolean;
}

// 3. Career Recommender Types
export interface CareerInputs {
  educationLevel: string;
  district: string;
  careerInterests: string[];
  currentSkills: string[];
  preferredIndustry: string;
  desiredPath: string;
  availableDurationMonths: number;
}

export interface RecommendedCareerPath {
  id: string;
  title: string;
  domain: string;
  fitScore: number; // 0 - 100
  skillMatchPct: number;
  eligibilityMet: boolean;
  industryRelevanceScore: number;
  salaryBenchmarkTier: 'Entry Level (3.5 - 5.5 LPA)' | 'Mid Tier (5.5 - 8.5 LPA)' | 'Specialist (8.5 - 12+ LPA)';
  missingCriticalSkills: string[];
  acquiredSkills: string[];
  recommendedCourses: Array<{
    name: string;
    durationWeeks: number;
    providerType: string;
    focus: string;
  }>;
  trainingPathwayWeeks: number;
  districtDemandLevel: 'Very High' | 'High' | 'Moderate' | 'Emerging';
}

export interface DistrictSkillDemand {
  district: string;
  topSector: string;
  topSkillsDemand: string[];
  growthIndex: number;
}

export interface CareerSimulationResult {
  inputs: CareerInputs;
  overallTopFitScore: number;
  recommendedPaths: RecommendedCareerPath[];
  radarSkillsData: Array<{
    skill: string;
    learnerLevel: number;
    targetRoleRequirement: number;
  }>;
  eligibilityChecklist: Array<{
    criterion: string;
    status: 'passed' | 'warning' | 'gap';
    notes: string;
  }>;
  automatedInsight: string;
  isSampleScenario?: boolean;
}
