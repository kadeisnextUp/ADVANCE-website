export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
}

export const sponsors: Sponsor[] = [];
