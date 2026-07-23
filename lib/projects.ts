export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  href?: string;
};

// Swap image paths with real shots once you drop them into /public/projects
export const projects: Project[] = [
  {
    id: '01',
    title: 'From India With Love',
    category: 'Web Development',
    year: '2025',
    description: 'Next.js site for Mandar Apte — motion-led storytelling for a cross-border social initiative.',
    image: '/photography/fromindiawithlove.png',
    href: 'https://fromindiawithlove.org',
  },
  {
    id: '02',
    title: 'Cities4Peace',
    category: 'Web Development',
    year: '2024',
    description: 'Brand site for a peace-building initiative — chooselove.in, built for clarity and trust.',
    image: '/photography/anita.png',
    href: 'https://anitaraicar.in',
  },
  {
    id: '03',
    title: 'Project Three',
    category: 'Web Development',
    year: '2025',
    description: 'Replace with your real project title and a one-line description of the problem it solved.',
    image: '/photography/cleanroom.png',
  },
  {
    id: '04',
    title: 'Project Four',
    category: 'Web Development',
    year: '2025',
    description: 'Replace with your real project title and a one-line description of the problem it solved.',
    image: '/photography/grudhra.png',
  },
  {
    id: '05',
    title: 'Project Five',
    category: 'Web Development',
    year: '2026',
    description: 'Replace with your real project title and a one-line description of the problem it solved.',
    image: '/photography/portfolio.png',
  },
  {
    id: '06',
    title: 'Project Six',
    category: 'Web Development',
    year: '2026',
    description: 'Replace with your real project title and a one-line description of the problem it solved.',
    image: '/photography/trvael.png',
  },
];
