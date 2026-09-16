import type { Project } from '@/components/FeaturedWork';

export const projects: Project[] = [
  {
    id: 'cities4peace',
    title: 'Cities4Peace',
    category: 'Web Development',
    year: '2026',
    image: '/work/cities4peace.jpg', // swap with your real screenshot
    href: 'https://fromindiawithlove.org',
    challenge:
      'A Figma design needed converting into a full, production-ready site — homepage, films, podcast, about, contact, and trips pages.',
    approach:
      'Built in Next.js. GSAP ScrollTrigger replaced an unreliable Framer Motion whileInView setup, fixing inconsistent scroll animations across browsers.',
    result:
      'Site performance moved from the Lighthouse 60s into the 90–95 range, with animations now behaving consistently across every browser tested.',
    metricLabel: 'Lighthouse Score',
    metricValue: '60 → 95',
  },

  // --- Fill these in with your real project details ---
  // I don\'t have this data, so these are placeholders only — replace
  // every field below with what actually happened on each project.
  {
    id: 'project-2',
    title: 'Project Title',
    category: 'Web Development', // or 'Photography' / 'Filmmaking'
    year: '2026',
    image: '/work/project-2.jpg',
    href: '#',
    challenge: 'What did the client actually need?',
    approach: 'What did you build, shoot, or set up — and how?',
    result: 'What changed because of it?',
    metricLabel: '', // e.g. 'Load Time', 'Pages Delivered' — omit if none
    metricValue: '',
  },
  {
    id: 'project-3',
    title: 'Project Title',
    category: 'Photography',
    year: '2026',
    image: '/work/project-3.jpg',
    href: '#',
    challenge: '',
    approach: '',
    result: '',
  },
  {
    id: 'project-4',
    title: 'Project Title',
    category: 'Filmmaking',
    year: '2026',
    image: '/work/project-4.jpg',
    href: '#',
    challenge: '',
    approach: '',
    result: '',
  },
  {
    id: 'project-5',
    title: 'Project Title',
    category: 'Web Development',
    year: '2026',
    image: '/work/project-5.jpg',
    href: '#',
    challenge: '',
    approach: '',
    result: '',
  },
  {
    id: 'project-6',
    title: 'Project Title',
    category: 'Web Development',
    year: '2026',
    image: '/work/project-6.jpg',
    href: '#',
    challenge: '',
    approach: '',
    result: '',
  },
];