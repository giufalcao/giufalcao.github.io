export type ImpactBullet = {
  text: string;
  metrics?: { value: string; label: string }[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: ImpactBullet[];
  note?: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: 'ReflexAI',
    role: 'Machine Learning Engineer',
    period: 'March 2025 — Present',
    location: 'New York, USA (Remote)',
    current: true,
    bullets: [
      {
        text: 'Architected a production-grade LLM evaluation pipeline using LLM-as-a-judge, deployed on GCP Cloud Run with Terraform. Integrated LangFuse for prompt versioning and cost/metric tracking.',
      },
      {
        text: 'Productionized a generative persona creation system using LangGraph + LangChain, replacing a manual workflow and significantly reducing content creation bottlenecks.',
      },
    ],
  },
  {
    company: 'Thoughtworks',
    role: 'Senior Data Scientist',
    period: 'December 2023 — February 2025',
    location: 'Recife, Brazil',
    bullets: [
      {
        text: 'Productionized a pharmaceutical recommendation system on Databricks + PySpark + MLflow. Optimized the featurization stage achieving a 60% cost reduction — from $16,380 to $312 per run.',
        metrics: [
          { value: '60%', label: 'cost reduction' },
          { value: '$16,380→$312', label: 'per run' },
        ],
      },
      {
        text: 'Refactored the data preparation pipeline with spark.cache(), cutting runtime by 79.4% — from 3h 15min to 40min — and reducing costs from $54.93 to $11.27.',
        metrics: [
          { value: '79.4%', label: 'faster runtime' },
          { value: '3h15m→40min', label: '' },
        ],
      },
    ],
  },
  {
    company: 'CESAR',
    role: 'Data Scientist',
    period: 'December 2021 — November 2023',
    location: 'Recife, Brazil',
    bullets: [
      {
        text: 'Built and optimized an ETL pipeline for a US tech client using Python + Docker + MySQL. Applied a Decorator pattern refactor that reduced execution time by 80%.',
        metrics: [{ value: '80%', label: 'faster ETL' }],
      },
      {
        text: 'Developed KPI dashboards in Tableau integrated via REST API, achieving a 25% reduction in user process time.',
        metrics: [{ value: '25%', label: 'process time saved' }],
      },
    ],
    note: 'Started as a Software Engineer (2019), building PHP/Symfony APIs and Ember.js frontends, before transitioning to Data Science in 2021.',
  },
];
