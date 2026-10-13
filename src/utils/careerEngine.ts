import { 
  CareerInputs, 
  CareerSimulationResult, 
  RecommendedCareerPath, 
  DistrictSkillDemand 
} from '../types/simulations';
import { downloadCSV } from './csvExport';

export const EDUCATION_LEVELS = [
  'B.E. / B.Tech (Engineering)',
  'B.Sc / BCA (Computer Science/Math)',
  'B.Com / BBA (Commerce & Business)',
  'Diploma in Engineering',
  'Post Graduate (M.Tech / MCA / MBA)',
  'Any Graduate'
];

export const TN_DISTRICTS = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Salem',
  'Tiruchirappalli',
  'Hosur'
];

export const CAREER_DOMAINS = [
  'Data Analytics',
  'Operations & MIS Analytics',
  'Business Intelligence & Reporting',
  'Supply Chain Analytics',
  'Cloud & DevOps Engineering',
  'Industrial IoT & Automation'
];

export const INDUSTRY_SECTORS = [
  'IT & Software Services',
  'Manufacturing & Automotive',
  'Logistics & Supply Chain',
  'Banking & FinTech',
  'Healthcare & Pharma Analytics'
];

export const ALL_SKILLS_LIST = [
  'SQL',
  'MySQL',
  'Python',
  'Pandas',
  'NumPy',
  'Excel (Advanced)',
  'Power BI',
  'DAX',
  'Data Modeling',
  'MIS Reporting',
  'ETL & Data Cleaning',
  'Tableau',
  'Statistics & Probability',
  'Git / GitHub',
  'Machine Learning Basics',
  'Linux & Bash',
  'Cloud (AWS/Azure Basics)',
  'Docker Basics',
  'PLC / SCADA',
  'Industrial IoT Basics'
];

export interface RoleTaxonomyItem {
  id: string;
  title: string;
  domain: string;
  industry: string;
  minEducationTier: number; // 1: Diploma, 2: Graduate, 3: Engineering/Masters
  salaryBenchmarkTier: 'Entry Level (3.5 - 5.5 LPA)' | 'Mid Tier (5.5 - 8.5 LPA)' | 'Specialist (8.5 - 12+ LPA)';
  requiredSkills: string[];
  niceToHaveSkills: string[];
  trainingWeeksDefault: number;
  courses: Array<{
    name: string;
    durationWeeks: number;
    providerType: string;
    focus: string;
  }>;
}

export const CAREER_ROLES_TAXONOMY: RoleTaxonomyItem[] = [
  {
    id: 'ROLE_DATA_ANALYST',
    title: 'Data Analyst (Business & Product)',
    domain: 'Data Analytics',
    industry: 'IT & Software Services',
    minEducationTier: 2,
    salaryBenchmarkTier: 'Entry Level (3.5 - 5.5 LPA)',
    requiredSkills: ['SQL', 'Python', 'Pandas', 'Excel (Advanced)', 'Power BI'],
    niceToHaveSkills: ['DAX', 'NumPy', 'ETL & Data Cleaning', 'Statistics & Probability'],
    trainingWeeksDefault: 12,
    courses: [
      { name: 'Applied SQL & Relational Analytics', durationWeeks: 4, providerType: 'Besant Technologies / Practical Lab', focus: 'Complex Joins, Aggregations, Window Functions' },
      { name: 'Python for Data Analysis (Pandas & NumPy)', durationWeeks: 4, providerType: 'Technical Certification', focus: 'Data Cleaning, Outlier Treatment, EDA' },
      { name: 'Power BI & Executive Dashboarding', durationWeeks: 4, providerType: 'Project Mentorship', focus: 'DAX Measures, Data Modeling, KPI Cards' }
    ]
  },
  {
    id: 'ROLE_MIS_OPERATIONS_ANALYST',
    title: 'Operations Analyst / MIS Lead',
    domain: 'Operations & MIS Analytics',
    industry: 'Logistics & Supply Chain',
    minEducationTier: 2,
    salaryBenchmarkTier: 'Entry Level (3.5 - 5.5 LPA)',
    requiredSkills: ['Excel (Advanced)', 'MIS Reporting', 'SQL', 'Data Modeling'],
    niceToHaveSkills: ['Power BI', 'Python', 'ETL & Data Cleaning'],
    trainingWeeksDefault: 8,
    courses: [
      { name: 'Advanced Corporate Excel & Macro Automation', durationWeeks: 3, providerType: 'Industry Bootcamp', focus: 'XLOOKUP, Dynamic Arrays, Automated Worksheets' },
      { name: 'Operational MIS & Performance Tracking', durationWeeks: 3, providerType: 'Corporate Training', focus: 'SLA Tracking, Variance Analysis, Executive Decks' },
      { name: 'SQL for Operational Data Warehouses', durationWeeks: 2, providerType: 'Technical Certification', focus: 'Extracting ERP & CRM transactional tables' }
    ]
  },
  {
    id: 'ROLE_BI_DEVELOPER',
    title: 'Business Intelligence Developer',
    domain: 'Business Intelligence & Reporting',
    industry: 'Banking & FinTech',
    minEducationTier: 2,
    salaryBenchmarkTier: 'Mid Tier (5.5 - 8.5 LPA)',
    requiredSkills: ['Power BI', 'DAX', 'SQL', 'Data Modeling', 'ETL & Data Cleaning'],
    niceToHaveSkills: ['Tableau', 'Excel (Advanced)', 'Python'],
    trainingWeeksDefault: 14,
    courses: [
      { name: 'Enterprise Power BI & Star Schema Modeling', durationWeeks: 5, providerType: 'Advanced BI Academy', focus: 'Star Schema, Bidirectional Relationships, Row-Level Security' },
      { name: 'Advanced DAX Formulas & Time Intelligence', durationWeeks: 5, providerType: 'Specialist Course', focus: 'CALCULATE Context Transition, Semi-additive Measures' },
      { name: 'SQL Data Warehouse Pipelines', durationWeeks: 4, providerType: 'Database Academy', focus: 'Stored Procedures, Indexing, View Optimization' }
    ]
  },
  {
    id: 'ROLE_SUPPLY_CHAIN_ANALYST',
    title: 'Supply Chain & Procurement Analyst',
    domain: 'Supply Chain Analytics',
    industry: 'Manufacturing & Automotive',
    minEducationTier: 2,
    salaryBenchmarkTier: 'Mid Tier (5.5 - 8.5 LPA)',
    requiredSkills: ['Excel (Advanced)', 'Python', 'SQL', 'MIS Reporting'],
    niceToHaveSkills: ['Pandas', 'Power BI', 'Statistics & Probability'],
    trainingWeeksDefault: 10,
    courses: [
      { name: 'Supply Chain Inventory & Lead-Time Analytics', durationWeeks: 4, providerType: 'Sector Academy', focus: 'Safety Stock, Reorder Heuristics, Freight Variance' },
      { name: 'Python for Procurement Optimization', durationWeeks: 4, providerType: 'Applied Data Lab', focus: 'Demand Forecasting, Price Volatility Tracking' },
      { name: 'Vendor Scorecarding in Power BI', durationWeeks: 2, providerType: 'Corporate Workshop', focus: 'Vendor On-Time Delivery KPIs, Cost Breakdown' }
    ]
  },
  {
    id: 'ROLE_CLOUD_DATA_ENGINEER',
    title: 'Junior Cloud Data Engineer',
    domain: 'Cloud & DevOps Engineering',
    industry: 'IT & Software Services',
    minEducationTier: 3,
    salaryBenchmarkTier: 'Mid Tier (5.5 - 8.5 LPA)',
    requiredSkills: ['SQL', 'Python', 'Git / GitHub', 'Linux & Bash'],
    niceToHaveSkills: ['Cloud (AWS/Azure Basics)', 'Docker Basics', 'ETL & Data Cleaning'],
    trainingWeeksDefault: 16,
    courses: [
      { name: 'Linux Command Line & Scripting Essentials', durationWeeks: 3, providerType: 'Systems Lab', focus: 'Bash Automation, Cron Jobs, Server Monitoring' },
      { name: 'Data Pipeline Engineering with Python & SQL', durationWeeks: 7, providerType: 'Cloud Academy', focus: 'Batch Pipelines, Orchestration, Parquet Files' },
      { name: 'AWS Cloud Fundamentals & Container Basics', durationWeeks: 6, providerType: 'Cloud Certification', focus: 'S3, RDS, EC2, Docker Containerization' }
    ]
  },
  {
    id: 'ROLE_INDUSTRIAL_IOT_ANALYST',
    title: 'Smart Manufacturing Analytics Specialist',
    domain: 'Industrial IoT & Automation',
    industry: 'Manufacturing & Automotive',
    minEducationTier: 3,
    salaryBenchmarkTier: 'Mid Tier (5.5 - 8.5 LPA)',
    requiredSkills: ['Python', 'SQL', 'PLC / SCADA', 'Industrial IoT Basics'],
    niceToHaveSkills: ['Power BI', 'Excel (Advanced)', 'Statistics & Probability'],
    trainingWeeksDefault: 14,
    courses: [
      { name: 'Industrial IoT Telemetry & Sensor Data', durationWeeks: 5, providerType: 'Mechatronics Hub', focus: 'MQTT, PLC Gateway Data, Time-Series Logging' },
      { name: 'Shop-Floor OEE & Downtime Analytics', durationWeeks: 5, providerType: 'Industrial Lab', focus: 'Overall Equipment Effectiveness, Bottleneck Analysis' },
      { name: 'Real-Time Telemetry Dashboarding', durationWeeks: 4, providerType: 'Applied Engineering', focus: 'Streaming Power BI Dashboards, Anomaly Flags' }
    ]
  }
];

export const DISTRICT_SECTOR_WEIGHTS: Record<string, Record<string, number>> = {
  'Chennai': {
    'IT & Software Services': 1.25,
    'Banking & FinTech': 1.20,
    'Manufacturing & Automotive': 1.10,
    'Logistics & Supply Chain': 1.15,
    'Healthcare & Pharma Analytics': 1.10
  },
  'Coimbatore': {
    'Manufacturing & Automotive': 1.25,
    'IT & Software Services': 1.15,
    'Logistics & Supply Chain': 1.10,
    'Banking & FinTech': 0.95,
    'Healthcare & Pharma Analytics': 1.05
  },
  'Hosur': {
    'Manufacturing & Automotive': 1.30,
    'Logistics & Supply Chain': 1.20,
    'IT & Software Services': 1.05,
    'Banking & FinTech': 0.85,
    'Healthcare & Pharma Analytics': 0.90
  },
  'Madurai': {
    'IT & Software Services': 1.05,
    'Healthcare & Pharma Analytics': 1.15,
    'Manufacturing & Automotive': 1.00,
    'Logistics & Supply Chain': 1.05,
    'Banking & FinTech': 0.90
  },
  'Salem': {
    'Manufacturing & Automotive': 1.20,
    'Logistics & Supply Chain': 1.15,
    'IT & Software Services': 0.95,
    'Banking & FinTech': 0.85,
    'Healthcare & Pharma Analytics': 0.95
  },
  'Tiruchirappalli': {
    'Manufacturing & Automotive': 1.20,
    'IT & Software Services': 1.05,
    'Logistics & Supply Chain': 1.05,
    'Banking & FinTech': 0.90,
    'Healthcare & Pharma Analytics': 0.95
  }
};

export const DISTRICT_DEMAND_DATA: DistrictSkillDemand[] = [
  { district: 'Chennai', topSector: 'IT / FinTech / SaaS', topSkillsDemand: ['SQL', 'Python', 'Power BI', 'AWS', 'DAX'], growthIndex: 94 },
  { district: 'Coimbatore', topSector: 'Textile / Auto / Tech Services', topSkillsDemand: ['Python', 'SQL', 'Advanced Excel', 'MIS Reporting'], growthIndex: 88 },
  { district: 'Hosur', topSector: 'Automotive / EV / Precision Eng', topSkillsDemand: ['Industrial IoT', 'Python', 'Excel', 'PLC/SCADA'], growthIndex: 91 },
  { district: 'Madurai', topSector: 'ITeS / Healthcare Analytics', topSkillsDemand: ['SQL', 'Excel', 'Power BI', 'Data Cleaning'], growthIndex: 78 },
  { district: 'Salem', topSector: 'Steel / Auto Ancillaries / Logistics', topSkillsDemand: ['MIS Reporting', 'Excel', 'SQL', 'Inventory Analytics'], growthIndex: 75 },
  { district: 'Tiruchirappalli', topSector: 'Heavy Eng / Tech Services', topSkillsDemand: ['Python', 'SQL', 'Power BI', 'CAD/Data'], growthIndex: 79 }
];

export const DEFAULT_CAREER_INPUTS: CareerInputs = {
  educationLevel: 'B.E. / B.Tech (Engineering)',
  district: 'Chennai',
  careerInterests: ['Data Analytics', 'Operations & MIS Analytics'],
  currentSkills: ['SQL', 'MySQL', 'Python', 'Pandas', 'NumPy', 'Excel (Advanced)', 'Power BI', 'DAX', 'MIS Reporting', 'ETL & Data Cleaning'],
  preferredIndustry: 'IT & Software Services',
  desiredPath: 'Data Analyst (Business & Product)',
  availableDurationMonths: 3
};

export const SAMPLE_CAREER_SCENARIO: CareerInputs = {
  educationLevel: 'B.Com / BBA (Commerce & Business)',
  district: 'Coimbatore',
  careerInterests: ['Operations & MIS Analytics', 'Supply Chain Analytics'],
  currentSkills: ['Excel (Advanced)', 'MIS Reporting'],
  preferredIndustry: 'Logistics & Supply Chain',
  desiredPath: 'Operations Analyst / MIS Lead',
  availableDurationMonths: 3
};

export function runCareerSimulation(inputs: CareerInputs): CareerSimulationResult {
  const userSkillsSet = new Set(inputs.currentSkills);
  const districtWeights = DISTRICT_SECTOR_WEIGHTS[inputs.district] || DISTRICT_SECTOR_WEIGHTS['Chennai'];

  // Educational Tier Level
  let eduTier = 2;
  if (inputs.educationLevel.includes('B.E.') || inputs.educationLevel.includes('Post Graduate')) eduTier = 3;
  if (inputs.educationLevel.includes('Diploma')) eduTier = 1;

  const evaluatedPaths: RecommendedCareerPath[] = CAREER_ROLES_TAXONOMY.map(role => {
    // 1. Skill Alignment Score (50%)
    const matchedRequired = role.requiredSkills.filter(s => userSkillsSet.has(s));
    const missingCritical = role.requiredSkills.filter(s => !userSkillsSet.has(s));
    const matchedOptional = role.niceToHaveSkills.filter(s => userSkillsSet.has(s));

    const reqPct = role.requiredSkills.length > 0 ? (matchedRequired.length / role.requiredSkills.length) * 85 : 85;
    const optBonus = Math.min(15, matchedOptional.length * 5);
    const skillMatchScore = Math.min(100, reqPct + optBonus);

    // 2. Eligibility & Education Alignment (20%)
    const meetsEdu = eduTier >= role.minEducationTier;
    const eduScore = meetsEdu ? 100 : 55;

    // 3. Career Interest Alignment (15%)
    const interestMatch = inputs.careerInterests.includes(role.domain) ? 100 : 35;

    // 4. Regional Industry Relevance (15%)
    const districtFactor = districtWeights[role.industry] || 1.0;
    const industryRelevanceScore = Math.min(100, Math.round(districtFactor * 80));

    // Composite Career-Fit Score
    const compositeScore = (skillMatchScore * 0.50) + (eduScore * 0.20) + (interestMatch * 0.15) + (industryRelevanceScore * 0.15);
    const fitScore = Number(compositeScore.toFixed(1));

    // Estimated training duration in weeks adjusted by missing skills
    const baseWeeks = role.trainingWeeksDefault;
    const missingFraction = role.requiredSkills.length > 0 ? missingCritical.length / role.requiredSkills.length : 0.2;
    const adjustedWeeks = Math.max(2, Math.round(baseWeeks * Math.max(0.25, missingFraction)));

    // District demand label
    let districtDemandLevel: 'Very High' | 'High' | 'Moderate' | 'Emerging' = 'Moderate';
    if (districtFactor >= 1.20) districtDemandLevel = 'Very High';
    else if (districtFactor >= 1.10) districtDemandLevel = 'High';
    else if (districtFactor >= 0.95) districtDemandLevel = 'Moderate';
    else districtDemandLevel = 'Emerging';

    return {
      id: role.id,
      title: role.title,
      domain: role.domain,
      fitScore,
      skillMatchPct: Number(skillMatchScore.toFixed(1)),
      eligibilityMet: meetsEdu,
      industryRelevanceScore,
      salaryBenchmarkTier: role.salaryBenchmarkTier,
      missingCriticalSkills: missingCritical,
      acquiredSkills: [...matchedRequired, ...matchedOptional],
      recommendedCourses: role.courses,
      trainingPathwayWeeks: adjustedWeeks,
      districtDemandLevel
    };
  });

  // Sort descending by fit score and take top 3
  evaluatedPaths.sort((a, b) => b.fitScore - a.fitScore);
  const topPaths = evaluatedPaths.slice(0, 3);
  const primaryRole = topPaths[0];

  // Target role skill radar / comparison
  const benchmarkSkills = [
    'SQL',
    'Python',
    'Excel (Advanced)',
    'Power BI',
    'DAX',
    'MIS Reporting',
    'Data Modeling',
    'ETL & Data Cleaning'
  ];

  const radarSkillsData = benchmarkSkills.map(skill => {
    const isAcquired = userSkillsSet.has(skill);
    const isTargetRequired = CAREER_ROLES_TAXONOMY.find(r => r.id === primaryRole.id)?.requiredSkills.includes(skill);
    const isTargetOptional = CAREER_ROLES_TAXONOMY.find(r => r.id === primaryRole.id)?.niceToHaveSkills.includes(skill);

    return {
      skill,
      learnerLevel: isAcquired ? 90 : 20,
      targetRoleRequirement: isTargetRequired ? 95 : isTargetOptional ? 75 : 40
    };
  });

  // Eligibility Checklist
  const eligibilityChecklist: Array<{ criterion: string; status: 'passed' | 'warning' | 'gap'; notes: string }> = [
    {
      criterion: 'Academic Degree Qualification',
      status: primaryRole.eligibilityMet ? 'passed' : 'warning',
      notes: primaryRole.eligibilityMet
        ? `Meets minimum benchmark for ${primaryRole.title}.`
        : `Role typically targets ${CAREER_ROLES_TAXONOMY.find(r => r.id === primaryRole.id)?.minEducationTier === 3 ? 'Engineering/PG' : 'Graduates'}, but strong project portfolio bridges the threshold.`
    },
    {
      criterion: 'Technical Core Prerequisites',
      status: primaryRole.missingCriticalSkills.length === 0 ? 'passed' : primaryRole.missingCriticalSkills.length <= 2 ? 'warning' : 'gap',
      notes: primaryRole.missingCriticalSkills.length === 0
        ? 'All mandatory foundational toolsets validated.'
        : `Missing ${primaryRole.missingCriticalSkills.length} critical competency: ${primaryRole.missingCriticalSkills.join(', ')}.`
    },
    {
      criterion: 'Training Availability Feasibility',
      status: (primaryRole.trainingPathwayWeeks <= inputs.availableDurationMonths * 4) ? 'passed' : 'warning',
      notes: `Estimated pathway requires ~${primaryRole.trainingPathwayWeeks} weeks vs ${inputs.availableDurationMonths * 4} weeks available.`
    },
    {
      criterion: 'Regional Industry Demand Saturation',
      status: primaryRole.districtDemandLevel === 'Very High' || primaryRole.districtDemandLevel === 'High' ? 'passed' : 'warning',
      notes: `${inputs.district} shows ${primaryRole.districtDemandLevel} hiring intensity in this domain.`
    }
  ];

  // Automated Insight
  const insightParts: string[] = [];
  insightParts.push(`Evaluated against ${inputs.district} regional employment clusters with ${inputs.educationLevel}.`);
  insightParts.push(`Top recommended pathway: **${primaryRole.title}** with a Career-Fit Score of **${primaryRole.fitScore}%** (Skill Alignment: ${primaryRole.skillMatchPct}%).`);

  if (primaryRole.missingCriticalSkills.length > 0) {
    insightParts.push(`Key upskilling priority: Focus on ${primaryRole.missingCriticalSkills.slice(0, 2).join(' & ')} over the next ${primaryRole.trainingPathwayWeeks} weeks.`);
  } else {
    insightParts.push(`High profile readiness: Foundational requirements are fully matched; recommend proceeding directly to portfolio capstone projects.`);
  }

  insightParts.push(`[Rule-based algorithmic prototype — provides structured competency guidance rather than live vacancy guarantees.]`);

  return {
    inputs,
    overallTopFitScore: primaryRole.fitScore,
    recommendedPaths: topPaths,
    radarSkillsData,
    eligibilityChecklist,
    automatedInsight: insightParts.join(' ')
  };
}

export function exportCareerSimulationCSV(result: CareerSimulationResult) {
  const headers = [
    'Rank',
    'Recommended Role',
    'Domain',
    'Career-Fit Score (%)',
    'Skill Match (%)',
    'Missing Critical Skills',
    'Training Duration (Weeks)',
    'District Demand Level',
    'Target District',
    'Learner Education',
    'System Note'
  ];

  const rows = result.recommendedPaths.map((path, idx) => [
    idx + 1,
    path.title,
    path.domain,
    path.fitScore,
    path.skillMatchPct,
    path.missingCriticalSkills.join('; ') || 'None (Fully Matched)',
    path.trainingPathwayWeeks,
    path.districtDemandLevel,
    result.inputs.district,
    result.inputs.educationLevel,
    'Rule-Based Prototype Recommendation'
  ]);

  downloadCSV(`Career_Recommendations_${result.inputs.district}_${result.inputs.educationLevel.replace(/[^a-zA-Z0-9]/g, '_')}.csv`, headers, rows);
}
