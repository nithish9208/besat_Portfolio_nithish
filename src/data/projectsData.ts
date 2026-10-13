import { ProjectMetadata } from '../types/portfolio';

export const PROJECTS_METADATA: Record<string, ProjectMetadata> = {
  monsoon: {
    id: 'monsoon',
    title: 'Monsoon-to-Market Intelligence',
    subtitle: 'Agricultural Supply Chain & Climate Price Volatility Modeling',
    tagline: 'Analyzing rainfall shock propagation across vegetable wholesale markets in Tamil Nadu and Kerala',
    technologies: ['SQL (MySQL)', 'Python (Pandas, NumPy)', 'Power BI', 'DAX', 'Time-Series Modeling'],
    category: 'Supply Chain & Climate Analytics',
    businessProblem: 
      'Agricultural supply chains in Southern India face extreme seasonal price volatility. During erratic monsoon spells, intense downpours in key producing districts or transit bottlenecks along the Western Ghats trigger sharp supply contractions. Wholesale markets (e.g., Chennai Koyambedu, Madurai, Ernakulam) experience volatile wholesale spikes, while retail markups create consumer inflation. Traditional reporting looks only at lagging market averages without isolating weather anomalies, transit cost inflation, and district-level supply risks.',
    objective: 
      'Develop an analytical intelligence model and interactive scenario simulator that evaluates historical relationships between rainfall anomalies, wholesale arrival volumes, transit costs, and wholesale price shocks across Tamil Nadu and Kerala. Provide procurement managers and trade analysts with rapid scenario modeling tools.',
    dataDictionary: [
      { columnName: 'date', dataType: 'DATE (YYYY-MM-DD)', description: 'Wholesale trading date', example: '2026-07-15' },
      { columnName: 'state', dataType: 'VARCHAR(50)', description: 'State jurisdiction (Tamil Nadu / Kerala)', example: 'Tamil Nadu' },
      { columnName: 'market_name', dataType: 'VARCHAR(80)', description: 'Primary wholesale APMC or terminal market', example: 'Chennai Koyambedu' },
      { columnName: 'vegetable', dataType: 'VARCHAR(50)', description: 'Commodity category analyzed', example: 'Tomato' },
      { columnName: 'rainfall_actual_mm', dataType: 'FLOAT', description: 'Recorded daily rainfall in catchment district (mm)', example: '42.8' },
      { columnName: 'rainfall_normal_mm', dataType: 'FLOAT', description: 'Long-period average expected rainfall (mm)', example: '14.2' },
      { columnName: 'arrival_volume_quintals', dataType: 'FLOAT', description: 'Daily truck arrival volume registered at APMC gate', example: '840.5' },
      { columnName: 'wholesale_price_rs_kg', dataType: 'FLOAT', description: 'Modal wholesale spot clearing price (₹/kg)', example: '38.50' },
      { columnName: 'freight_index', dataType: 'FLOAT', description: 'Diesel & ghat-transit logistics cost index (Base=100)', example: '118.4' }
    ],
    dataCleaningProcess: [
      'Identified and handled missing arrival records across weekend market closures using forward-fill for inventory baseline.',
      'Detected price outliers (>3.5 IQR) caused by erroneous single-lot retail auctions and normalized to modal wholesale clearing price.',
      'Standardized district rainfall metrics from IMD station grids and merged with APMC market arrivals via composite date-district keys.',
      'Validated volume-to-price consistency using NumPy array vectorization, asserting negative elasticity in normal supply regimes.'
    ],
    sqlQueries: [
      {
        title: 'Weekly Modal Price & Rainfall Anomaly Aggregation',
        description: 'Extracts weekly moving trends, computing rainfall deviation percentage and average modal wholesale clearing price by district.',
        code: `-- Weekly Rainfall Anomaly vs Price Fluctuation
SELECT 
    m.state,
    m.market_name,
    m.vegetable,
    DATE_SUB(m.trade_date, INTERVAL WEEKDAY(m.trade_date) DAY) AS week_commencing,
    ROUND(AVG(m.wholesale_price_rs_kg), 2) AS avg_wholesale_price,
    ROUND(SUM(r.rainfall_actual_mm), 1) AS total_rainfall_mm,
    ROUND(SUM(r.rainfall_normal_mm), 1) AS normal_rainfall_mm,
    ROUND(((SUM(r.rainfall_actual_mm) - SUM(r.rainfall_normal_mm)) / NULLIF(SUM(r.rainfall_normal_mm), 0)) * 100, 1) AS rainfall_anomaly_pct,
    ROUND(SUM(m.arrival_volume_quintals), 0) AS total_arrivals_quintals
FROM wholesale_market_arrivals m
INNER JOIN district_rainfall_daily r 
    ON m.district_id = r.district_id 
   AND m.trade_date = r.record_date
WHERE m.trade_date BETWEEN '2026-06-01' AND '2026-09-30'
GROUP BY 1, 2, 3, 4
ORDER BY m.state, m.market_name, week_commencing ASC;`
      },
      {
        title: 'Cross-Market Price Volatility & Transport Spread Ranking',
        description: 'Calculates the 30-day standard deviation of prices and inter-market spread between terminal hub (Chennai) and secondary markets.',
        code: `-- Inter-Market Volatility & Spatial Spread
WITH MarketPriceStats AS (
    SELECT 
        market_name,
        vegetable,
        AVG(wholesale_price_rs_kg) AS mean_price,
        STDDEV_POP(wholesale_price_rs_kg) AS price_stdev,
        MIN(wholesale_price_rs_kg) AS min_price,
        MAX(wholesale_price_rs_kg) AS max_price
    FROM wholesale_market_arrivals
    WHERE trade_date >= '2026-06-01'
    GROUP BY market_name, vegetable
)
SELECT 
    market_name,
    vegetable,
    ROUND(mean_price, 2) AS mean_price_rs,
    ROUND(price_stdev, 2) AS price_stdev,
    ROUND((price_stdev / NULLIF(mean_price, 0)) * 100, 2) AS coefficient_of_variation_pct,
    ROUND(max_price - min_price, 2) AS high_low_spread_rs
FROM MarketPriceStats
ORDER BY coefficient_of_variation_pct DESC;`
      }
    ],
    pythonWorkflows: [
      {
        title: 'Data Validation, Rolling Elasticity & Missing Value Imputation',
        description: 'Pandas pipeline to validate data schema, compute 7-day rolling arrival averages, and estimate short-term price sensitivity.',
        code: `import pandas as pd
import numpy as np

def process_monsoon_market_dataset(filepath: str) -> pd.DataFrame:
    """Cleans wholesale arrivals and rainfall time-series data."""
    df = pd.read_csv(filepath, parse_dates=['date'])
    
    # 1. Deduplicate by date, market, and commodity
    df = df.drop_duplicates(subset=['date', 'market_name', 'vegetable']).sort_values('date')
    
    # 2. Impute missing rainfall with 0.0 and forward-fill market arrivals
    df['rainfall_actual_mm'] = df['rainfall_actual_mm'].fillna(0.0)
    df['arrival_volume_quintals'] = df.groupby(['market_name', 'vegetable'])['arrival_volume_quintals'].ffill()
    
    # 3. Calculate 7-day rolling metrics
    df['arrival_roll7_avg'] = (
        df.groupby(['market_name', 'vegetable'])['arrival_volume_quintals']
        .transform(lambda s: s.rolling(window=7, min_periods=3).mean())
    )
    
    # 4. Compute rainfall shock index (Deviation from 10-year district normal)
    df['rainfall_deviation_pct'] = np.where(
        df['rainfall_normal_mm'] > 0,
        ((df['rainfall_actual_mm'] - df['rainfall_normal_mm']) / df['rainfall_normal_mm']) * 100.0,
        0.0
    )
    
    # 5. Supply Risk Score (synthetic compound heuristic)
    # Higher rainfall anomaly combined with falling arrivals escalates risk
    arrival_stress = np.clip(1.0 - (df['arrival_volume_quintals'] / df['arrival_roll7_avg']), 0, 1.0)
    df['supply_risk_score'] = (
        (np.clip(df['rainfall_deviation_pct'], 0, 150) / 150.0) * 0.5 +
        arrival_stress * 0.5
    ) * 100.0
    
    return df`
      }
    ],
    kpiDefinitions: [
      {
        kpi: 'Simulated Price Delta (%)',
        formula: '((Simulated Modal Price - Baseline Modal Price) / Baseline Modal Price) * 100',
        businessSignificance: 'Quantifies the exact price shift expected by commercial buyers or mandi traders under simulated weather and supply disruptions.'
      },
      {
        kpi: 'Supply Risk Score (0-100)',
        formula: '0.45 * NormalizedRainfallShock + 0.35 * SupplyDisruptionSeverity + 0.20 * TransitCostInflation',
        businessSignificance: 'Composite warning index indicating likelihood of spot shortages and hoarding behavior at regional mandis.'
      },
      {
        kpi: 'Freight Cost Transmission Ratio',
        formula: 'Delta Price / Delta Transportation Cost Component',
        businessSignificance: 'Measures how much of intermediate diesel and ghat-transit disruption passes directly into terminal wholesale pricing.'
      }
    ],
    keyFindings: [
      'Rainfall excess in key producing belts (e.g., Dindigul, Theni, Wayanad) has an asymmetric transmission lag of 3 to 6 days before wholesale spikes manifest at terminal markets like Chennai and Ernakulam.',
      'Perishable crops (Tomato, Green Chilli) exhibit higher price elasticity to transportation bottlenecks compared to tuberous crops (Potato, Onion).',
      'Inter-state trade between Kerala and Tamil Nadu buffers localized price spikes when western ghat corridors remain open, but Ghat closures double the freight markup.'
    ],
    limitations: [
      'Analysis demonstrates correlation and scenario-based simulation rather than definitive single-variable causal proof.',
      'Cold-storage holdings and off-market corporate contracts are not fully captured in APMC mandi register arrivals.',
      'Extreme flash-flood anomalies may alter farm gate pricing before APMC arrival reporting registers the shock.'
    ],
    businessImplications: [
      'Wholesale distributors can hedge procurement commitments by pre-booking 4 days in advance when rainfall anomalies exceed +60%.',
      'State civil supplies departments can activate buffer stock releases prior to secondary market panic buying.',
      'Logistics planners can reroute freight through lowland corridors before mountain pass road closures inflate freight indices.'
    ],
    dataSourceNotice: 'Historical baseline synthesized from public Agmarknet and IMD rainfall patterns for illustrative scenario modeling.'
  },

  urban: {
    id: 'urban',
    title: 'Urban Expansion vs Economic Prosperity',
    subtitle: 'Socioeconomic Decoupling & Spatial Growth Analytics across Tamil Nadu Cities',
    tagline: 'Evaluating whether physical land expansion matches per-capita economic productivity across 6 major urban centers',
    technologies: ['Python (Pandas, GeoPandas)', 'SQL', 'Power BI', 'DAX', 'Econometric Clustering'],
    category: 'Urban Analytics & Public Policy',
    businessProblem: 
      'Rapid urbanization across Tamil Nadu has triggered expansive spatial sprawl along industrial corridors. However, physical land expansion does not uniformly translate into proportional economic prosperity or equitable infrastructure access. Some Tier-1 and Tier-2 municipal corporations experience premature peri-urban sprawl that strains municipal budgets, water distribution, and mass transit without delivering commensurate per-capita Gross District Domestic Product (GDDP) growth.',
    objective: 
      'Build an urban analytics dashboard and multi-variable scenario engine comparing historical physical built-up area expansion (km²) with per-capita economic indicators (GSDP/GDDP, formal employment, infrastructure access) across Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, and Tirunelveli.',
    dataDictionary: [
      { columnName: 'city_name', dataType: 'VARCHAR(50)', description: 'Municipal corporation / urban agglomeration', example: 'Coimbatore' },
      { columnName: 'year', dataType: 'INT', description: 'Observation or projection year', example: '2026' },
      { columnName: 'built_up_area_km2', dataType: 'FLOAT', description: 'Satellite-derived built-up impervious surface area (sq km)', example: '320.4' },
      { columnName: 'per_capita_gsdp_inr', dataType: 'FLOAT', description: 'Real per capita district domestic product (₹ constant prices)', example: '284000' },
      { columnName: 'infra_access_index', dataType: 'FLOAT', description: 'Composite index of piped water, road density, public transit (0-100)', example: '76.2' },
      { columnName: 'formal_employment_share_pct', dataType: 'FLOAT', description: 'Percentage of working-age population in formal enterprise', example: '41.8' },
      { columnName: 'population_millions', dataType: 'FLOAT', description: 'Urban agglomeration population (millions)', example: '2.45' }
    ],
    dataCleaningProcess: [
      'Harmonized municipal boundary changes across census and corporation re-notifications to ensure constant spatial denominator.',
      'Deflated nominal district domestic product figures using State CSO price deflators to derive real constant rupee series.',
      'Engineered normalized composite infrastructure index using min-max feature scaling across piped water, road network, and bus coverage.',
      'Handled inter-censal population estimates via compounding exponential growth calibrated against electoral roll voter counts.'
    ],
    sqlQueries: [
      {
        title: 'City-Level Spatial Expansion vs Economic Growth Ratio',
        description: 'Computes compound annual growth rate (CAGR) of built-up footprint vs per-capita economic product.',
        code: `-- Built-up Expansion vs Real Per Capita GDDP Growth
WITH CityBaseEnd AS (
    SELECT 
        city_name,
        MIN(CASE WHEN year = 2020 THEN built_up_area_km2 END) AS built_up_2020,
        MAX(CASE WHEN year = 2026 THEN built_up_area_km2 END) AS built_up_2026,
        MIN(CASE WHEN year = 2020 THEN per_capita_gsdp_inr END) AS gsdp_2020,
        MAX(CASE WHEN year = 2026 THEN per_capita_gsdp_inr END) AS gsdp_2026
    FROM urban_socioeconomic_metrics
    GROUP BY city_name
)
SELECT 
    city_name,
    built_up_2020,
    built_up_2026,
    ROUND(((built_up_2026 - built_up_2020) / built_up_2020) * 100, 2) AS built_up_growth_pct,
    ROUND(((gsdp_2026 - gsdp_2020) / gsdp_2020) * 100, 2) AS real_gsdp_growth_pct,
    ROUND(
        (((built_up_2026 - built_up_2020) / built_up_2020)) / 
        NULLIF((((gsdp_2026 - gsdp_2020) / gsdp_2020)), 0), 2
    ) AS spatial_decoupling_ratio
FROM CityBaseEnd
ORDER BY spatial_decoupling_ratio DESC;`
      },
      {
        title: 'Infrastructure Access & Employment Saturation by Tier',
        description: 'Segments cities into high-density efficient hubs vs low-density sprawl zones using window partitioning.',
        code: `-- Municipal Efficiency Tier Ranking
SELECT 
    city_name,
    year,
    infra_access_index,
    formal_employment_share_pct,
    ROUND(built_up_area_km2 / population_millions, 1) AS sq_km_per_million_capita,
    DENSE_RANK() OVER (ORDER BY infra_access_index DESC) AS infra_rank,
    CASE 
        WHEN (built_up_area_km2 / population_millions) > 160 THEN 'High Spatial Sprawl Risk'
        WHEN (built_up_area_km2 / population_millions) BETWEEN 110 AND 160 THEN 'Balanced Urban Density'
        ELSE 'High Density Nucleated'
    END AS urban_spatial_profile
FROM urban_socioeconomic_metrics
WHERE year = 2026;`
      }
    ],
    pythonWorkflows: [
      {
        title: 'Growth Imbalance Indicator & Scenario Computation',
        description: 'Computes dynamic elasticity between land footprint and socioeconomic index under varying policy investment assumptions.',
        code: `import pandas as pd
import numpy as np

def simulate_urban_trajectory(base_df: pd.DataFrame, city: str, 
                              expansion_rate_pct: float, 
                              infra_investment_index: float, 
                              employment_growth_pct: float,
                              population_growth_pct: float) -> pd.DataFrame:
    """Projects 2026-2030 urban spatial expansion vs prosperity."""
    city_data = base_df[base_df['city_name'] == city].sort_values('year').iloc[-1]
    
    years = [2026, 2027, 2028, 2029, 2030]
    results = []
    
    current_area = city_data['built_up_area_km2']
    current_gsdp = city_data['per_capita_gsdp_inr'] / 1000.0  # in '000s
    current_infra = city_data['infra_access_index']
    
    for yr in years:
        step = yr - 2026
        # Compound expansion
        projected_area = current_area * ((1 + (expansion_rate_pct / 100.0)) ** step)
        
        # Economic productivity driven by employment & infrastructure multiplier
        infra_boost = (infra_investment_index - 100.0) * 0.15
        net_econ_growth = (employment_growth_pct * 0.8) + (infra_boost * 0.4)
        projected_gsdp = current_gsdp * ((1 + (net_econ_growth / 100.0)) ** step)
        projected_infra = np.clip(current_infra + (step * (infra_investment_index / 100.0) * 2.2), 30, 98)
        
        # Growth Imbalance Indicator:
        # Ratio of physical expansion delta to economic value generation delta
        area_delta = ((projected_area - current_area) / current_area) if step > 0 else 0
        gsdp_delta = ((projected_gsdp - current_gsdp) / current_gsdp) if step > 0 else 0
        imbalance = round(area_delta / max(gsdp_delta, 0.01), 2) if step > 0 else 1.00
        
        results.append({
            'year': yr,
            'built_up_area_km2': round(projected_area, 1),
            'per_capita_gsdp_k': round(projected_gsdp, 1),
            'infra_access_index': round(projected_infra, 1),
            'growth_imbalance_ratio': imbalance
        })
        
    return pd.DataFrame(results)`
      }
    ],
    kpiDefinitions: [
      {
        kpi: 'Growth Imbalance Indicator (GII)',
        formula: '(Annual Built-Up Area Growth Rate %) / (Annual Real Per-Capita GSDP Growth Rate %)',
        businessSignificance: 'Values > 1.25 signal premature land expansion where infrastructure service costs outpace municipal tax base growth.'
      },
      {
        kpi: 'Spatial Efficiency Score (0-100)',
        formula: '100 - Min(100, (GII - 1.0) * 45) [Normalized against median state density]',
        businessSignificance: 'Summarizes whether urban development is compact and productive or dispersed and resource-intensive.'
      },
      {
        kpi: 'Infrastructure Deficit Gap',
        formula: 'Benchmark Access Level (85.0) - Simulated Infra Access Index',
        businessSignificance: 'Identifies the funding shortfall required to deliver equitable urban amenities to newly annexed wards.'
      }
    ],
    keyFindings: [
      'Tier-2 cities like Salem and Tirunelveli show rising spatial expansion rates along highway corridors without matching gains in high-wage formal employment.',
      'Coimbatore demonstrates the most balanced growth profile, pairing industrial land absorption with steady per-capita domestic output and private capital investments.',
      'Without targeted transit-oriented development (TOD), expanding fringe boundaries increases municipal per-capita pipe and road servicing costs by up to 34%.'
    ],
    limitations: [
      'Municipal boundary extensions create artificial statistical jumps in historical built-up area reporting.',
      'Informal economy productivity and micro-enterprises are partially under-reported in standard district domestic accounts.',
      'Simulation indicators model policy trade-offs rather than deterministic macro predictions.'
    ],
    businessImplications: [
      'Urban development authorities (CMDA, DTCP) can tie land conversion approvals to public transit availability thresholds.',
      'Commercial real estate investors can identify emerging micro-markets where economic productivity precedes infrastructure saturation.',
      'Municipal corporations can plan phased capital expenditure to prevent unfunded utility sprawl.'
    ],
    dataSourceNotice: 'Baseline indicators compiled from Tamil Nadu Economic Appraisal reports and open urban data repositories.'
  },

  career: {
    id: 'career',
    title: 'AI-Based Career & Skill Training Finder',
    subtitle: 'Transparent Rule-Based Pathway Recommender & Regional Skill-Gap Engine',
    tagline: 'Bridging learner aspirations, current capabilities, and district-level industry requirements across Tamil Nadu',
    technologies: ['Python (Recommendation Engine)', 'SQL', 'Power BI', 'DAX', 'Multi-Criteria Scoring Algorithm'],
    category: 'EdTech & Regional Workforce Analytics',
    businessProblem: 
      'Graduates and transitioning job-seekers across Tamil Nadu face a pervasive misalignment between college curricula and high-growth industry demands. While Tier-1 hubs (Chennai, Coimbatore) surge in data analytics, cloud architecture, and fintech, Tier-2 manufacturing belts (Hosur, Madurai, Salem) demand industrial IoT, supply chain optimization, and automated MIS reporting. Learners often enroll in generic courses without understanding prerequisite gaps, qualification thresholds, regional hiring intensity, or practical career fit.',
    objective: 
      'Build a transparent, multi-criteria recommendation engine and skills gap dashboard that calculates a weighted Career-Fit Score, identifies missing critical skills, maps realistic training pathways, and links learners to relevant skill curricula based on education level, current competencies, and regional industry demand.',
    dataDictionary: [
      { columnName: 'learner_id', dataType: 'VARCHAR(20)', description: 'Unique anonymized learner profile key', example: 'LNR-9021' },
      { columnName: 'education_level', dataType: 'VARCHAR(50)', description: 'Highest educational qualification attained', example: 'B.E./B.Tech' },
      { columnName: 'district', dataType: 'VARCHAR(50)', description: 'Learner home or target employment district', example: 'Chennai' },
      { columnName: 'career_interest', dataType: 'VARCHAR(80)', description: 'Primary professional track of interest', example: 'Data Analytics' },
      { columnName: 'current_skill_vector', dataType: 'JSON / TEXT', description: 'Self-reported verified competency list', example: '["SQL", "Excel"]' },
      { columnName: 'target_role_id', dataType: 'VARCHAR(30)', description: 'Standard occupational taxonomy code', example: 'ROLE-DATA-ANALYST' },
      { columnName: 'fit_score', dataType: 'FLOAT (0-100)', description: 'Calculated composite pathway alignment score', example: '86.5' }
    ],
    dataCleaningProcess: [
      'Standardized heterogeneous skill keyword variations (e.g., "Postgres", "SQL Server", "MySQL" mapped to canonical "SQL").',
      'Normalized educational qualifications against standard state technical education eligibility bands.',
      'Built a taxonomy matrix mapping 24 contemporary tech roles against 40 distinct core and auxiliary competencies.',
      'Calibrated district industry weighting using synthetic employment cluster distributions across Tamil Nadu manufacturing and IT zones.'
    ],
    sqlQueries: [
      {
        title: 'Skill Coverage & Role Alignment Query',
        description: 'Computes matching skill count and identifies missing core competencies for candidates targeting analytics positions.',
        code: `-- Candidate Skill Gap Analysis Query
SELECT 
    l.learner_id,
    l.education_level,
    r.role_title,
    COUNT(DISTINCT rsk.skill_id) AS total_required_skills,
    COUNT(DISTINCT lsk.skill_id) AS acquired_matching_skills,
    ROUND(
        (COUNT(DISTINCT lsk.skill_id) * 100.0) / 
        NULLIF(COUNT(DISTINCT rsk.skill_id), 0), 1
    ) AS skill_coverage_pct,
    GROUP_CONCAT(
        CASE WHEN lsk.skill_id IS NULL THEN rsk.skill_name END 
        ORDER BY rsk.importance_weight DESC SEPARATOR ', '
    ) AS missing_critical_skills
FROM learner_profiles l
CROSS JOIN standard_roles r
INNER JOIN role_skills rsk ON r.role_id = rsk.role_id
LEFT JOIN learner_skills lsk 
    ON l.learner_id = lsk.learner_id 
   AND rsk.skill_id = lsk.skill_id
WHERE l.learner_id = 'LNR-SAMPLE'
GROUP BY l.learner_id, l.education_level, r.role_title;`
      },
      {
        title: 'District Skill Demand & Industry Concentration Matrix',
        description: 'Aggregates open job profiles by district to surface high-demand technical clusters across Tamil Nadu.',
        code: `-- District-Wise Industry Skill Demand Weighting
SELECT 
    d.district_name,
    i.industry_sector,
    s.skill_name,
    COUNT(j.job_opening_id) AS open_positions_count,
    ROUND(AVG(j.min_experience_years), 1) AS avg_min_exp_years,
    DENSE_RANK() OVER (
        PARTITION BY d.district_name 
        ORDER BY COUNT(j.job_opening_id) DESC
    ) AS demand_rank_in_district
FROM district_job_demand j
JOIN districts d ON j.district_id = d.district_id
JOIN industries i ON j.industry_id = i.industry_id
JOIN job_skills_required js ON j.job_opening_id = js.job_opening_id
JOIN skills s ON js.skill_id = s.skill_id
GROUP BY 1, 2, 3
HAVING demand_rank_in_district <= 5
ORDER BY d.district_name, demand_rank_in_district ASC;`
      }
    ],
    pythonWorkflows: [
      {
        title: 'Deterministic Multi-Criteria Career Recommendation Engine',
        description: 'Computes weighted Career-Fit Score combining skill alignment, eligibility rules, interest match, and regional industry multiplier.',
        code: `from typing import List, Dict, Any

class CareerRecommendationEngine:
    """Deterministic, rule-based recommendation algorithm."""
    
    def __init__(self, role_taxonomy: Dict[str, Any], district_weights: Dict[str, Dict[str, float]]):
        self.role_taxonomy = role_taxonomy
        self.district_weights = district_weights

    def evaluate_candidate(self, candidate_profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        results = []
        user_skills = set(candidate_profile.get('current_skills', []))
        user_interests = set(candidate_profile.get('interests', []))
        user_edu = candidate_profile.get('education', 'Any Graduate')
        user_district = candidate_profile.get('district', 'Chennai')
        
        for role_id, role_info in self.role_taxonomy.items():
            req_skills = set(role_info['required_skills'])
            opt_skills = set(role_info.get('optional_skills', []))
            
            # 1. Skill Alignment (50% weight)
            matched_req = user_skills.intersection(req_skills)
            matched_opt = user_skills.intersection(opt_skills)
            skill_score = (len(matched_req) / max(len(req_skills), 1) * 85.0) + \\
                          (min(len(matched_opt), 2) * 7.5)
            skill_score = min(skill_score, 100.0)
            
            # 2. Eligibility & Education Alignment (20% weight)
            min_edu = role_info.get('min_education', 'Any Graduate')
            edu_score = 100.0 if self._check_education_hierarchy(user_edu, min_edu) else 40.0
            
            # 3. Interest Alignment (15% weight)
            domain_match = 100.0 if role_info['domain'] in user_interests else 30.0
            
            # 4. District Industry Relevance (15% weight)
            dist_multiplier = self.district_weights.get(user_district, {}).get(role_info['industry'], 0.70)
            dist_score = dist_multiplier * 100.0
            
            # Weighted Composite Career-Fit Score
            fit_score = (skill_score * 0.50) + (edu_score * 0.20) + (domain_match * 0.15) + (dist_score * 0.15)
            
            missing_critical = list(req_skills - user_skills)
            
            results.append({
                'role_id': role_id,
                'title': role_info['title'],
                'domain': role_info['domain'],
                'fit_score': round(fit_score, 1),
                'skill_match_pct': round(skill_score, 1),
                'eligibility_met': edu_score >= 80.0,
                'missing_critical_skills': missing_critical,
                'acquired_skills': list(matched_req.union(matched_opt)),
                'recommended_courses': role_info.get('courses', [])
            })
            
        return sorted(results, key=lambda x: x['fit_score'], reverse=True)`
      }
    ],
    kpiDefinitions: [
      {
        kpi: 'Career-Fit Score (0-100)',
        formula: '0.50 * SkillAlignment + 0.20 * EducationEligibility + 0.15 * InterestMatch + 0.15 * RegionalIndustryRelevance',
        businessSignificance: 'Holistic match percentage guiding realistic career pivot potential without overpromising immediate hiring.'
      },
      {
        kpi: 'Skill Gap Ratio',
        formula: '(Count of Missing Core Skills) / (Total Core Role Competencies)',
        businessSignificance: 'Identifies the depth of technical upskilling required before a candidate enters interview-ready readiness.'
      },
      {
        kpi: 'Pathway Velocity (Weeks)',
        formula: 'Sum(Estimated Weeks for Missing Competencies) Adjusted for Learner Availability',
        businessSignificance: 'Provides an achievable, structured timeline for learners to progress through milestone-based training.'
      }
    ],
    keyFindings: [
      'Candidates possessing foundational SQL and Excel achieve an immediate 40% jump in career-fit score for both Business Analytics and Operations Planning pathways.',
      'Tier-2 manufacturing clusters (Hosur, Coimbatore) exhibit high demand for hybrid profiles combining Python data handling with supply chain domain comprehension.',
      'Transitioning into high-level Machine Learning or AI Engineering without intermediate statistics and production data modeling leads to high course-drop rates.'
    ],
    limitations: [
      'The current prototype is an illustrative rule-based heuristics model and does not claim to guarantee live placement or certified vacancy counts.',
      'Self-assessed skills may not reflect actual coding rigor until validated through practical coding assessments.',
      'Hiring benchmarks reflect prevailing entry-level industry expectations rather than fixed contractual mandates.'
    ],
    businessImplications: [
      'Vocational training institutes can dynamically update course offerings based on real-time district skill deficits.',
      'Students and career changers avoid costly misdirected certifications by pursuing prerequisite-aligned curriculums.',
      'Regional hiring managers can target local talent pools tailored to specific technology stacks.'
    ],
    dataSourceNotice: 'Curriculum requirements and regional skill weights are based on academic research and industry frameworks for prototype simulation.'
  }
};
