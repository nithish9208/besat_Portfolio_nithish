export type NavTab = 
  | 'overview' 
  | 'about' 
  | 'projects' 
  | 'skills' 
  | 'experience' 
  | 'contact';

export type ProjectId = 'monsoon' | 'urban' | 'career';

export interface KPIItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  formula?: string;
  context?: string;
}

export interface SQLSnippet {
  title: string;
  description: string;
  code: string;
}

export interface PythonSnippet {
  title: string;
  description: string;
  code: string;
}

export interface DataDictionaryField {
  columnName: string;
  dataType: string;
  description: string;
  example: string;
}

export interface ProjectMetadata {
  id: ProjectId;
  title: string;
  subtitle: string;
  tagline: string;
  technologies: string[];
  category: string;
  businessProblem: string;
  objective: string;
  dataDictionary: DataDictionaryField[];
  dataCleaningProcess: string[];
  sqlQueries: SQLSnippet[];
  pythonWorkflows: PythonSnippet[];
  kpiDefinitions: {
    kpi: string;
    formula: string;
    businessSignificance: string;
  }[];
  keyFindings: string[];
  limitations: string[];
  businessImplications: string[];
  dataSourceNotice: string;
  githubUrl?: string;
}
