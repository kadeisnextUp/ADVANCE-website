export interface ResourceLink {
  id: string;
  label: string;
  url: string;
  category?: string;
  // Defaults to true. Set to false for a same-site link that shouldn't open
  // in a new tab or carry rel="noopener noreferrer".
  external?: boolean;
}

export const helpfulLinks: ResourceLink[] = [
  {
    id: 'uc-career-center',
    label: 'UC Career & Co-op Support',
    url: 'https://www.uc.edu/campus-life/career-co-op-support.html',
    category: 'University Resources',
  },
  {
    id: 'handshake',
    label: 'Handshake',
    url: 'https://joinhandshake.com',
    category: 'Job & Internship Boards',
  },
  {
    id: 'inroads',
    label: 'INROADS',
    url: 'https://inroads.org',
    category: 'Job & Internship Boards',
  },
  {
    id: 'nace',
    label: 'National Association of Colleges and Employers (NACE)',
    url: 'https://www.naceweb.org/',
    category: 'Career Tools & Associations',
  },
  {
    id: 'ai-resume-tailor',
    label: 'Simplify — AI Resume Tailor',
    url: 'https://simplify.jobs/',
    category: 'Career Tools & Associations',
  },
  {
    id: 'the-muse',
    label: 'The Muse',
    url: 'https://www.themuse.com',
    category: 'Career Tools & Associations',
  },
];

export const memberForms: ResourceLink[] = [
  {
    id: 'exec-board-application',
    label: 'Executive Board Application',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdtpJvH3BqNvOtr-V-2HROK62FXJrTCt59k7M3L4bAJR10gCA/viewform',
  },
  {
    id: 'event-rsvp',
    label: 'Event RSVP',
    url: 'https://docs.google.com/forms/d/1gNyTa6lA_4gb3bG6gyZXDwyAsYPWCHYq6vEX7CpIVes/viewform',
  },
];
