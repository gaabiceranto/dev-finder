export interface Developer {
  id?: string;
  githubUsername: string;
  avatarUrl: string;
  name: string;
  email: string;
  city: string;
  education: string;
  technologies: string[];
  bio?: string;
  githubProfile?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DeveloperFormData {
  githubUsername: string;
  avatarUrl: string;
  name: string;
  email: string;
  city: string;
  education: string;
  technologies: string;
}
