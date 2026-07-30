export interface Sponsor {
  id: string;
  name: string;
  description: string;
  // public-relative path without a leading slash, e.g. 'images/Logos/acme.webp' (matches the convention used by events.ts and executive-board.ts)
  logo?: string;
  website?: string;
}

export const sponsors: Sponsor[] = [];
