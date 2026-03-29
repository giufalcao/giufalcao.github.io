export type Project = {
  id: string;
  title: string;
  description: string;
  motivation?: string;
  categories: string[];
  techStack: string[];
  pipelineLabel?: string;
  repo?: string;
  demo?: string;
  isPrivate: boolean;
  accentColor: 'emerald' | 'blue' | 'teal';
};

export const projects: Project[] = [
  {
    id: 'formula1',
    title: 'Formula-1 Data Pipeline',
    description:
      'End-to-end production data pipeline processing 70+ years of Formula 1 racing history. GDPR-compliant ingestion, Delta Lakehouse architecture with schema validation, and weekly orchestration delivering analytics via Power BI.',
    categories: ['Data Engineering', 'Production'],
    techStack: ['Databricks', 'Azure Data Lake', 'PySpark', 'ADF', 'Power BI', 'Delta Lake'],
    pipelineLabel: 'ADF → Azure Data Lake → Databricks → Power BI',
    repo: 'https://github.com/giufalcao/Formula-1',
    isPrivate: false,
    accentColor: 'emerald',
  },
  {
    id: 'vector-search',
    title: 'MongoDB Atlas Vector Search',
    description:
      'Foundational RAG retrieval pipeline enabling semantic search over document collections using vector embeddings. Reference implementation for production AI systems with similarity-based document queries beyond keyword matching.',
    categories: ['AI Infrastructure', 'RAG / Vectors'],
    techStack: ['MongoDB Atlas', 'Vector Embeddings', 'RAG', 'Python', 'PyMongo', 'Semantic Search'],
    pipelineLabel: 'Query → Embed → [Vector DB] → Similarity → Response',
    repo: 'https://github.com/giufalcao/mongodb-atlas-vector-search',
    isPrivate: false,
    accentColor: 'blue',
  },
  {
    id: 'voto-explicado',
    title: 'Voto Explicado',
    description:
      'Political transparency app translating Brazilian congressional votes into plain language. Pulls live data from the Chamber of Deputies public API, showing how parties and politicians vote on landmark legislation.',
    motivation: 'Every citizen deserves to understand how their representatives vote.',
    categories: ['Civic Tech', 'Full-Stack', '🇧🇷 Open Data'],
    techStack: ['Next.js', 'Supabase', 'TypeScript', 'Câmara API', 'Tailwind CSS'],
    demo: 'https://voto-explicado.vercel.app/',
    isPrivate: true,
    accentColor: 'teal',
  },
];
