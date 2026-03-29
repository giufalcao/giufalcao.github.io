export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export type Publication = {
  title: string;
  titleEn: string;
  venue: string;
  year: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    name: 'DP-203: Processing in Azure Using Streaming Solutions',
    issuer: 'Microsoft',
    year: '2023',
  },
  {
    name: 'DP-203: Building an Azure Data Engineer Foundation',
    issuer: 'Microsoft',
    year: '2023',
  },
  {
    name: 'Generative AI with Large Language Models',
    issuer: 'DeepLearning.AI',
    year: '2023',
  },
  {
    name: 'Mathematics for Machine Learning and Data Science',
    issuer: 'DeepLearning.AI',
    year: '2022',
  },
];

export const publications: Publication[] = [
  {
    title:
      'Algoritmos de Aprendizagem Supervisionada com Conjuntos de Dados Desbalanceados para Classificação de Requisitos Não-Funcionais',
    titleEn:
      'Supervised Learning Algorithms with Imbalanced Datasets for Non-Functional Requirements Classification',
    venue: 'Universidade Católica de Pernambuco',
    year: '2021',
  },
];
