export interface ExecutiveBoardTheme {
  bg: string; // page background while this member's dialog is open
  fg: string; // body text
  accent: string; // headings, active nav link, borders, card names
}

export interface ExecutiveBoardMember {
  id: string;
  name: string | null; // null -> vacant seat, rendered as "Vacant"
  role: string;
  bio: string;
  photo: string | null; // null -> render initials monogram instead
  team: 'leadership' | 'external' | 'internal';
  theme: ExecutiveBoardTheme;
}

export const executiveBoard: ExecutiveBoardMember[] = [
  {
    id: 'president',
    name: 'Momar Mobaye',
    role: 'President',
    photo: 'images/Executive_Board_Photos/President_of_ADVANCE.webp',
    team: 'leadership',
    theme: { bg: 'hsl(222 42% 15%)', fg: 'hsl(222 30% 88%)', accent: 'hsl(222 55% 68%)' },
    bio: "The President leads ADVANCE in achieving its mission and strategic goals, overseeing initiatives across all departments. They foster leadership among members, represent the organization publicly, and collaborate with the Executive Board and Advisory Board to guide long- and short-term planning. The President ensures organizational cohesion and accountability, making key decisions to advance ADVANCE's objectives.",
  },
  {
    id: 'vice-president',
    name: null,
    role: 'Vice President',
    photo: null,
    team: 'leadership',
    theme: { bg: 'hsl(247 42% 15%)', fg: 'hsl(247 30% 88%)', accent: 'hsl(247 55% 68%)' },
    bio: "The Executive Vice President serves as second-in-command of ADVANCE, leading in the President's absence and collaborating with the President, Advisory Board Chair, and Cabinet to achieve organizational goals. They oversee department directors across all areas, delegate assignments, and ensure effective execution of initiatives. The role includes coordinating major events, conducting performance evaluations of Vice Presidents, and promoting member engagement at the director level. Additionally, the EVP drives professional development, leads special projects, and takes initiative on approved goals to advance the organization.",
  },
  {
    id: 'executive-secretary',
    name: 'Queen Hurry',
    role: 'Executive Secretary',
    photo: null,
    team: 'leadership',
    theme: { bg: 'hsl(149 42% 15%)', fg: 'hsl(149 30% 88%)', accent: 'hsl(149 55% 68%)' },
    bio: "The Executive Secretary reports directly to the President & CEO and is responsible for managing ADVANCE's filing system and maintaining accurate records of meetings and training programs. They prepare correspondence, assist Executive Board members with documentation, and provide weekly progress reports to leadership. Additionally, they help benchmark organizational goals and take initiative on approved projects. The role ensures smooth communication, organization, and administrative support across the organization.",
  },
  {
    id: 'vp-external-affairs',
    name: 'Kofi Oduro',
    role: 'Vice President of External Affairs',
    photo: null,
    team: 'external',
    theme: { bg: 'hsl(271 42% 15%)', fg: 'hsl(271 30% 88%)', accent: 'hsl(271 55% 68%)' },
    bio: "The Vice President of External Affairs reports directly to the President and may assume leadership in the absence of the President or Executive Vice President. They oversee the Programming, Community Affairs, and Marketing Departments, providing guidance and ensuring each division meets ADVANCE's strategic goals. The role includes leading major initiatives such as the Corporate Excursion, conducting departmental performance evaluations, and contributing to staff development. Additionally, the Vice President collaborates on organizational events, supports marketing efforts, and drives new initiatives that strengthen ADVANCE's external presence and engagement.",
  },
  {
    id: 'director-corporate-relations',
    name: 'Paulissen Owusu-Ansah',
    role: 'Director of Corporate Relations',
    photo: 'images/Executive_Board_Photos/Director_of_Corporate_Relations.webp',
    team: 'external',
    theme: { bg: 'hsl(100 42% 15%)', fg: 'hsl(100 30% 88%)', accent: 'hsl(100 55% 68%)' },
    bio: "The Director of Corporate Relations reports directly to the President and may act in their absence when needed. They serve as a liaison between the Executive Board, Advisory Board, and other organizations, developing mentorship programs and fostering partnerships. The role leads the planning and execution of corporate excursions, annual meetings, and events, while coordinating guest communications and workshop logistics. Additionally, they support the production of the Annual Report and take on other assigned tasks to strengthen ADVANCE's external relationships.",
  },
  {
    id: 'director-marketing',
    name: 'Kaleel Watts',
    role: 'Director of Marketing',
    photo: 'images/Executive_Board_Photos/Director_of_Marketing.webp',
    team: 'external',
    theme: { bg: 'hsl(345 42% 15%)', fg: 'hsl(345 30% 88%)', accent: 'hsl(345 55% 68%)' },
    bio: "The Marketing Director reports to the Vice President of External Affairs and oversees all ADVANCE marketing and promotional efforts. They design and distribute flyers, coordinate mailings, create public service announcements, and produce videos to enhance the organization's visibility. The role also manages event photography, promotional materials like shirts, and collaborates on the quarterly electronic newsletter. Additionally, the Marketing Director takes initiative on approved projects and supports recruiting efforts.",
  },
  {
    id: 'director-programming',
    name: 'Kennedy Davis',
    role: 'Director of Programming',
    photo: 'images/Executive_Board_Photos/Director_of_Programming.webp',
    team: 'external',
    theme: { bg: 'hsl(198 42% 15%)', fg: 'hsl(198 30% 88%)', accent: 'hsl(198 55% 68%)' },
    bio: 'The Program Director reports to the Vice President of External Affairs and manages the planning and execution of all ADVANCE programs and activities. They coordinate logistics such as securing venues, equipment, and speaker arrangements while ensuring smooth event operations. The role also leads the Welcome Committee to create a positive experience for guests and members and collects program evaluations for continuous improvement.',
  },
  {
    id: 'outreach-chair',
    name: 'Zoeria Logan',
    role: 'Outreach Chair',
    photo: null,
    team: 'external',
    theme: { bg: 'hsl(75 42% 15%)', fg: 'hsl(75 30% 88%)', accent: 'hsl(75 55% 68%)' },
    bio: "The Outreach Chair reports to the Vice President of External Affairs and leads ADVANCE's community service and philanthropic initiatives. They develop and implement service projects, motivate members to engage in volunteerism, and track participation to uphold the organization's philanthropic mission. The role also assists with fundraising activities when appropriate, oversees the liaison committee, and serves as a spokesperson to promote ADVANCE within the Greater Cincinnati community. Through outreach and service, the director strengthens the organization's impact and community presence.",
  },
  {
    id: 'vp-internal-affairs',
    name: 'Anja Bell',
    role: 'Vice President of Internal Affairs',
    photo: 'images/Executive_Board_Photos/Vice_President_of_Internal_Affairs.webp',
    team: 'internal',
    theme: { bg: 'hsl(30 42% 15%)', fg: 'hsl(30 30% 88%)', accent: 'hsl(30 55% 68%)' },
    bio: "The Vice President of Internal Affairs reports directly to the President and may assume leadership in the absence of the President or Executive Vice President. They oversee the Finance, Community Affairs, and Digital Technology Departments, ensuring each functions effectively and aligns with ADVANCE's goals. The role includes delegating assignments, coaching department personnel, and conducting performance evaluations while contributing to staff development. Additionally, the Vice President assists with major events, supports organizational marketing, and pursues professional growth to strengthen ADVANCE's internal operations.",
  },
  {
    id: 'director-finance',
    name: 'Nyla Florence',
    role: 'Director of Finance',
    photo: 'images/Executive_Board_Photos/Director_of_Finance.webp',
    team: 'internal',
    theme: { bg: 'hsl(173 42% 15%)', fg: 'hsl(173 30% 88%)', accent: 'hsl(173 55% 68%)' },
    bio: 'The Finance Director reports to the Vice President of Internal Affairs and oversees all financial operations of ADVANCE. They develop the annual budget, manage program and project funding, and assist with the collection and allocation of organizational funds. The role includes generating fundraising ideas, managing purchases, and coordinating financial initiatives such as scholarship programs and investment exercises. Additionally, the Finance Director identifies entrepreneurial opportunities and ensures fiscal responsibility across all ADVANCE activities.',
  },
  {
    id: 'director-human-resources',
    name: 'Nazir Williams',
    role: 'Director of Human Resources',
    photo: null,
    team: 'internal',
    theme: { bg: 'hsl(320 42% 15%)', fg: 'hsl(320 30% 88%)', accent: 'hsl(320 55% 68%)' },
    bio: 'The Human Resources position reports to the Vice-President of Internal Affairs and oversees member recruitment, onboarding, placement, and retention, including application processing and department assignments. This role maintains accurate rosters and contact information, coordinates orientations, meetings, and check-ins, and collaborates with Marketing and Digital Technology on the ADVANCE newsletter. Additionally, HR manages awards and recognition programs, supports Executive Board needs, and represents ADVANCE at student activity fairs.',
  },
  {
    id: 'director-community-affairs',
    name: 'Joseph Jackson',
    role: 'Director of Community Affairs',
    photo: null,
    team: 'internal',
    theme: { bg: 'hsl(296 42% 15%)', fg: 'hsl(296 30% 88%)', accent: 'hsl(296 55% 68%)' },
    bio: "The Director of Community Affairs reports to the Vice President of Internal Affairs and manages the recruitment, onboarding, and retention of ADVANCE members. They oversee membership records, coordinate orientations and general body meetings, and ensure effective communication across departments. The role also manages recognition programs, including monthly and annual awards, to celebrate member achievements. Additionally, the Director collaborates on newsletters, organizes recruitment events, and takes initiative on new projects to enhance member engagement and organizational culture.",
  },
  {
    id: 'director-health-wellness',
    name: 'Jada Freeman',
    role: 'Director of Health & Wellness',
    photo: null,
    team: 'internal',
    theme: { bg: 'hsl(124 42% 15%)', fg: 'hsl(124 30% 88%)', accent: 'hsl(124 55% 68%)' },
    bio: 'The Director of Health and Wellness reports to the Vice President of Internal Affairs and promotes a culture of well-being within ADVANCE. They collaborate with executive board members to integrate wellness initiatives into meetings, programs, and events. The role involves connecting members with campus health resources, fostering an inclusive and supportive environment, and gathering feedback to address evolving wellness needs. Through these efforts, the Director ensures members feel supported, valued, and encouraged to prioritize their overall well-being.',
  },
  {
    id: 'director-digital-technology',
    name: 'Kaden Sawyer',
    role: 'Director of Digital Technology',
    photo: 'images/Executive_Board_Photos/Director_of_Digital_Technology.webp',
    team: 'internal',
    theme: { bg: 'hsl(9 42% 15%)', fg: 'hsl(9 30% 88%)', accent: 'hsl(9 55% 68%)' },
    bio: "The Director of Digital Technology reports to the Vice President of Internal Affairs and oversees all technological operations within ADVANCE (I led the development of the website). They manage the Digital Technology committee (ADVANCE Devs), maintain and update the organization's website, online platforms, and ensure smooth digital communication. The role also includes preparing presentations for events and collaborating with the Marketing and Human Resources Departments on newsletters and member directories. Overall, the director leads tech initiatives that enhance efficiency and supports the organization's digital growth.",
  },
];
