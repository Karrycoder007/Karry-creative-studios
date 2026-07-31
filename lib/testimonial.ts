export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

// Replace with real client quotes + photos once you have them
// Drop real headshots into /public/testimonials/ using the same filenames
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Kartik took a rough Figma export and turned it into a site that actually felt considered — every animation, every spacing decision had a reason behind it.',
    name: 'Mandar Apte',
    role: 'Founder, Cities4Peace',
    avatar: '/testimonials/avatar-1.jpg',
  },
  {
    id: 't2',
    quote:
      'What stood out was how direct he was — no agency layers, no lost-in-translation briefs. Just clear communication and a finished product that shipped on time.',
    name: 'Client Name',
    role: 'Role, Company',
    avatar: '/testimonials/avatar-2.jpg',
  },
  {
    id: 't3',
    quote:
      'The site loads instantly and looks sharp on every device. More importantly, he understood the brand before he wrote a single line of code.',
    name: 'Client Name',
    role: 'Role, Company',
    avatar: '/testimonials/avatar-3.jpg',
  },
];