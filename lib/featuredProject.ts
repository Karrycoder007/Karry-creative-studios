export type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  imageAspect: string; // matches the actual source image aspect — avoids cropping/blur
  href?: string;
};



// Replace image paths with real project screenshots once ready.
// Generate them at the SAME aspect ratio as imageAspect below so
// object-cover never has to crop or upscale awkwardly.
export const featuredProjects: FeaturedProject[] = [
  {
    id: 'fp-01',
    title: 'From India With Love',
    category: 'Web Development',
    year: '2025',
    description:
      'A Next.js site for Mandar Apte — motion-led storytelling for a cross-border social initiative.',
    image: '/photography/fromindiawithlove.png',
    imageAspect: '8/5',
    href: 'https://fromindiawithlove.org',
  },
  {
    id: 'fp-02',
    title: 'Anita Raicar Portfolio',
    category: 'Web Development',
    year: '2024',
    description:
      'Brand site for a peace-building initiative — chooselove.in, built for clarity and trust.',
    image: '/photography/anita.png',
    imageAspect: '8/5',
    href: 'https://chooselove.in',
  },
];