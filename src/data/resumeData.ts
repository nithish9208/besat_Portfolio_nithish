export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  skills: string[];
  bulletPoints: string[];
  metrics: { label: string; value: string; desc: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  skillsCovered: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: Array<{
    name: string;
    levelPct: number;
    experience: string;
    keyUses: string;
  }>;
}

export const RESUME_PROFILE = {
  name: "Nithishkumar K",
  title: "Data Analyst | Operations Analytics | MIS Reporting",
  location: "Chennai, India",
  phone: "+91-9787169246",
  email: "nithi11716@gmail.com",
  summary: "Data-focused engineering graduate with internship experience in SQL-based data extraction, Excel-based MIS reporting, data cleaning and validation, reporting automation, and Power BI dashboard development. Cleaned and validated 5,000+ records using Python (Pandas, NumPy), prepared recurring operational reports, and built KPI views to support performance tracking and business decision-making. Working knowledge of SQL/MySQL, Advanced Excel, Power BI, DAX, data modeling, and trend analysis; known for a detail-oriented approach to data accuracy and structured processes.",
  resumeFileUrl: `${import.meta.env.BASE_URL}Nithishkumar_K_Data_Analyst_Resume.pdf`,
  links: {
    github: "https://github.com/nithishkumar",
    linkedin: "https://linkedin.com/in/nithishkumar-k",
    email: "mailto:nithi11716@gmail.com"
  }
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "BDreamz Global Solutions Pvt Ltd",
    role: "Data Analyst Intern",
    period: "Feb 2026 – June 2026",
    location: "Chennai, India",
    skills: ["SQL (MySQL)", "Python (Pandas, NumPy)", "Microsoft Excel", "Power BI", "DAX", "MIS Reporting"],
    bulletPoints: [
      "Prepared daily and monthly MIS reports using SQL and Excel, supporting recurring operational reporting and stakeholder decision-making.",
      "Cleaned and validated 5,000+ records using Python (Pandas and NumPy), supporting data quality and more reliable downstream reporting.",
      "Automated recurring reporting workflows to reduce manual effort and turnaround time for standard reports.",
      "Developed interactive Power BI dashboards and KPI views to track performance trends and communicate actionable business insights."
    ],
    metrics: [
      { label: "Records Cleaned", value: "5,000+", desc: "Deduplicated and validated using Pandas & NumPy pipelines" },
      { label: "Reporting Cadence", value: "Daily & Monthly", desc: "Automated recurring operational MIS dashboards" },
      { label: "Manual Effort Reduction", value: "Significant", desc: "Eliminated repetitive Excel lookups via scripted SQL & macros" },
      { label: "Stakeholder KPIs", value: "Real-time", desc: "Interactive Power BI tracking with DAX measures" }
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "B.E. in Electronics and Communication Engineering",
    institution: "NPR College of Engineering and Technology",
    period: "2021 – 2025",
    score: "CGPA: 7.35 / 10"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "Python for Data Science",
    issuer: "Besant Technologies",
    date: "2025",
    skillsCovered: ["Pandas", "NumPy", "Data Cleaning", "Data Wrangling", "Exploratory Data Analysis"]
  },
  {
    name: "SQL for Data Analysis",
    issuer: "Besant Technologies",
    date: "2025",
    skillsCovered: ["Complex Joins", "Aggregations", "Subqueries", "Window Functions", "Data Extraction"]
  },
  {
    name: "Excel for Business Analytics",
    issuer: "Besant Technologies",
    date: "2025",
    skillsCovered: ["PivotTables", "XLOOKUP", "INDEX-MATCH", "MIS Automation", "Data Modeling"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Data Analysis & Querying",
    iconName: "Database",
    description: "Extracting, aggregating, and structuring business intelligence from relational databases.",
    skills: [
      { name: "SQL & MySQL", levelPct: 92, experience: "Academic & Internship", keyUses: "Complex joins, subqueries, group by, date truncations, MIS extraction" },
      { name: "Ad Hoc Data Analysis", levelPct: 88, experience: "Internship", keyUses: "Root-cause diagnostics, transactional slice-and-dice, metric anomaly detection" },
      { name: "Data Extraction & ETL", levelPct: 85, experience: "Internship", keyUses: "Structured views, automated CSV/DB pulls, transactional sanitization" },
      { name: "Trend & Time-Series Analysis", levelPct: 84, experience: "Projects & Internship", keyUses: "Moving averages, year-over-year variances, seasonal cycle tracking" }
    ]
  },
  {
    category: "Excel & MIS Reporting",
    iconName: "FileSpreadsheet",
    description: "Operational reporting, spreadsheet modeling, and automated executive summary decks.",
    skills: [
      { name: "Advanced Excel (XLOOKUP / INDEX-MATCH)", levelPct: 94, experience: "Core Expertise", keyUses: "Multi-criteria data lookups, dynamic array formulas, nested logic" },
      { name: "PivotTables & Pivot Charts", levelPct: 92, experience: "Daily Operational", keyUses: "Multi-dimensional summaries, slicers, calculated fields, grouped timelines" },
      { name: "MIS Recurring Reporting", levelPct: 90, experience: "BDreamz Internship", keyUses: "Daily flash reports, monthly operational scorecards, standardized decks" },
      { name: "Power BI & DAX Modeling", levelPct: 86, experience: "Internship & Portfolio", keyUses: "Star schema relationships, calculated columns, time-intelligence DAX" }
    ]
  },
  {
    category: "Python & Data Quality",
    iconName: "Terminal",
    description: "Algorithmic data cleaning, imputation, transformation, and automated validation scripts.",
    skills: [
      { name: "Python Core", levelPct: 88, experience: "Besant Certified", keyUses: "Scripting, file operations, JSON/CSV parsing, batch automation" },
      { name: "Pandas", levelPct: 90, experience: "Internship & 5k+ Records", keyUses: "DataFrame wrangling, outlier detection, missing-value imputation, groupby merges" },
      { name: "NumPy", levelPct: 85, experience: "Internship & Cert", keyUses: "Vectorized arithmetic, array calculations, statistical percentiles" },
      { name: "Data Cleaning & Validation", levelPct: 92, experience: "Production Workflow", keyUses: "Type casting, regex sanitization, deduplication, schema validation" }
    ]
  }
];
