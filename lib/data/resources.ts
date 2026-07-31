export interface ResourceLink {
  id: string;
  label: string;
  url: string;
}

export const helpfulLinks: ResourceLink[] = [
  { id: 'uc-career-center', label: 'UC Career & Co-op Support', url: 'https://www.uc.edu/campus-life/career-co-op-support.html' },
  { id: 'nace', label: 'National Association of Colleges and Employers (NACE)', url: 'https://www.naceweb.org/' },
  { id: 'ai-resume-tailor', label: 'AI Resume Tailor', url: 'https://simplify.jobs/' },
  { id: 'handshake', label: 'Handshake', url: 'https://joinhandshake.com' },
  { id: 'inroads', label: 'INROADS', url: 'https://inroads.org' },
  { id: 'the-muse', label: 'The Muse', url: 'https://www.themuse.com' },
];

export const memberMaterials: ResourceLink[] = [
  { id: 'linktree', label: 'ADVANCE Linktree', url: 'https://linktr.ee/advance_uc' },
];
