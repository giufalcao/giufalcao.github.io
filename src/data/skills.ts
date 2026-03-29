export type SkillTier = 'core' | 'proficient' | 'familiar';

export type Skill = {
  name: string;
  tier?: SkillTier;
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
      { name: 'LangGraph', tier: 'core' },
      { name: 'LangChain', tier: 'core' },
      { name: 'LangFuse', tier: 'core' },
      { name: 'Opik', tier: 'core' },
      { name: 'RAG', tier: 'core' },
      { name: 'Prompt Engineering', tier: 'core' },
      { name: 'LLM Observability', tier: 'proficient' },
      { name: 'LLM-as-a-Judge', tier: 'proficient' },
      { name: 'Vector Search', tier: 'proficient' },
    ],
  },
  {
    label: 'MLOps & Infrastructure',
    colorScheme: 'blue',
    skills: [
      { name: 'MLflow', tier: 'core' },
      { name: 'Databricks', tier: 'core' },
      { name: 'PySpark', tier: 'core' },
      { name: 'Docker', tier: 'core' },
      { name: 'GitHub Actions', tier: 'core' },
      { name: 'Terraform', tier: 'proficient' },
      { name: 'GCP Cloud Run', tier: 'proficient' },
      { name: 'Airflow', tier: 'proficient' },
    ],
  },
  {
    label: 'Cloud & Data Platforms',
    colorScheme: 'slate',
    skills: [
      { name: 'GCP', tier: 'core' },
      { name: 'BigQuery', tier: 'proficient' },
      { name: 'Azure Data Lake', tier: 'proficient' },
      { name: 'AWS S3', tier: 'proficient' },
      { name: 'Datadog', tier: 'proficient' },
      { name: 'MongoDB Atlas', tier: 'proficient' },
      { name: 'Supabase', tier: 'familiar' },
    ],
  },
  {
    label: 'Languages & Frameworks',
    colorScheme: 'muted',
    skills: [
      { name: 'Python', tier: 'core' },
      { name: 'TypeScript', tier: 'proficient' },
      { name: 'FastAPI', tier: 'core' },
      { name: 'SQL', tier: 'proficient' },
      { name: 'Next.js', tier: 'proficient' },
      { name: 'Pydantic', tier: 'core' },
    ],
  },
  {
    label: 'Data Science & ML',
    colorScheme: 'purple',
    skills: [
      { name: 'XGBoost', tier: 'proficient' },
      { name: 'BERT / NLP', tier: 'proficient' },
      { name: 'Scikit-Learn', tier: 'proficient' },
      { name: 'Feature Engineering', tier: 'proficient' },
      { name: 'Imbalanced Datasets', tier: 'proficient' },
      { name: 'TensorFlow', tier: 'familiar' },
      { name: 'Tableau', tier: 'proficient' },
    ],
  },
];
