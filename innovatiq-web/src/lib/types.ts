export interface Career {
  _id: string;
  jobTitle: string;
  companyName: string;
  primarySkills: string;
  location: string;
  experience: string;
  employmentType: string;
  jobDescription?: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
  salary?: string;
  createdAt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  image?: string;
  likes?: number;
  dislikes?: number;
  createdAt?: string;
}

export interface Award {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  images?: string[];
  year?: string;
  createdAt?: string;
}

export interface Video {
  _id: string;
  title: string;
  videoLink: string;
  category?: string;
  home?: boolean;
  career?: boolean;
  cloud?: boolean;
  cyber?: boolean;
  consulting?: boolean;
  digital?: boolean;
  managed?: boolean;
  infra?: boolean;
  field?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
