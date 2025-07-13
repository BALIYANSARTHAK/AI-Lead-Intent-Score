export type AgeGroup = "18-25" | "26-35" | "36-50" | "51+";
export type FamilyBackground = "Single" | "Married" | "Married with Kids";

export interface Lead {
  id: string;
  phoneNumber: string;
  email: string;
  creditScore: number;
  ageGroup: AgeGroup;
  familyBackground: FamilyBackground;
  income: number;
  comments: string;
  initialScore?: number;
  rerankedScore?: number;
}

export interface ScoreResponse {
  initialScore: number;
  rerankedScore: number;
  factors?: Record<string, number>;
}