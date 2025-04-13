export interface User {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export type AgeGroup = 'kids' | 'teen' | 'young' | 'adult';

export interface AuthState {
  user: User | null;
  ageGroup: AgeGroup | null;
  isAuthenticated: boolean;
}