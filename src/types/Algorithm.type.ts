export interface Algorithm {
  id: number;
  name: string;
  url: string;
  tag: string;
  level: number;
  solved: boolean;
  testcases: string[];
  answers: string[];
}