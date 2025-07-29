export interface Vacancy {
  id: string;
  name: string;
  description: string;
  salary: {
    from: number | null;
    to: number | null;
    currency: string;
    gross: boolean;
  } | null;
  address: {
    city: string | null;
    street?: string;
    building?: string;
    lat?: number;
    lng?: number;
    description?: string | null;
    raw?: string;
  } | null;
  employer: {
    id: string;
    name: string;
    url: string;
    alternate_url: string;
    logo_urls?: string;
  };
  experience: {
    id: string;
    name: string;
  };
  work_format?: {
    id: string;
    name: string;
  }[];
  schedule?: {
    id: string;
    name: string;
  };
  employment?: {
    id: string;
    name: string;
  };
  apply_alternate_url?: string;
  alternate_url: string;
  snippet?: {
    requirement: string;
    responsibility: string;
  };
}
