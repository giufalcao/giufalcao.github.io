export type SkillTier = 'core' | 'proficient' | 'familiar';

export type Skill = {
  name: string;
  tier?: SkillTier;
  years?: number;
};

export type SkillGroup = {
  label: string;
  colorScheme: 'emerald' | 'blue' | 'slate' | 'muted' | 'purple';
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI / LLM Engineering',
    colorScheme: 'emerald',
    skills: [
      { name: 'LangGraph', tier: 'core', years: 2 },
      { name: 'LangChain', tier: 'core', years: 2 },
      { name: 'LangFuse', tier: 'core', years: 1 },
      { name: 'Opik', tier: 'core', years: 1 },
      { name: 'RAG', tier: 'core', years: 2 },
      { name: 'Prompt Engineering', tier: 'core', years: 2 },
      { name: 'LLM Observability', tier: 'proficient', years: 2 },
      { name: 'LLM-as-a-Judge', tier: 'proficient', years: 1 },
      { name: 'Vector Search', tier: 'proficient', years: 2 },
    ],
  },
  {
    label: 'MLOps & Infrastructure',
    colorScheme: 'blue',
    skills: [
      { name: 'MLflow', tier: 'core', years: 3 },
      { name: 'Databricks', tier: 'core', years: 3 },
      { name: 'PySpark', tier: 'core', years: 3 },
      { name: 'Docker', tier: 'core', years: 4 },
      { name: 'GitHub Actions', tier: 'core', years: 4 },
      { name: 'Terraform', tier: 'proficient', years: 2 },
      { name: 'GCP Cloud Run', tier: 'proficient', years: 2 },
      { name: 'Airflow', tier: 'proficient', years: 2 },
    ],
  },
  {
    label: 'Cloud & Data Platforms',
    colorScheme: 'slate',
    skills: [
      { name: 'GCP', tier: 'core', years: 4 },
      { name: 'BigQuery', tier: 'proficient', years: 3 },
      { name: 'Azure Data Lake', tier: 'proficient', years: 2 },
      { name: 'AWS S3', tier: 'proficient', years: 3 },
      { name: 'Datadog', tier: 'proficient', years: 2 },
      { name: 'MongoDB Atlas', tier: 'proficient', years: 2 },
      { name: 'Supabase', tier: 'familiar', years: 1 },
    ],
  },
  {
    label: 'Languages & Frameworks',
    colorScheme: 'muted',
    skills: [
      { name: 'Python', tier: 'core', years: 6 },
      { name: 'FastAPI', tier: 'core', years: 4 },
      { name: 'Pydantic', tier: 'core', years: 4 },
      { name: 'SQL', tier: 'proficient', years: 5 },
      { name: 'TypeScript', tier: 'proficient', years: 3 },
      { name: 'Next.js', tier: 'proficient', years: 2 },
    ],
  },
  {
    label: 'Data Science & ML',
    colorScheme: 'purple',
    skills: [
      { name: 'Scikit-Learn', tier: 'proficient', years: 5 },
      { name: 'Feature Engineering', tier: 'proficient', years: 5 },
      { name: 'XGBoost', tier: 'proficient', years: 4 },
      { name: 'BERT / NLP', tier: 'proficient', years: 3 },
      { name: 'Imbalanced Datasets', tier: 'proficient', years: 3 },
      { name: 'Tableau', tier: 'proficient', years: 3 },
      { name: 'TensorFlow', tier: 'familiar', years: 2 },
    ],
  },
];
