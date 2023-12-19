export interface Algorithm {
  id: number;
  name: string;
  url: string;
  tag: string;
  level: number;
}

export interface AlgorithmSolved extends Algorithm {
  solved: boolean;
  language: string;
  stored: boolean;
}