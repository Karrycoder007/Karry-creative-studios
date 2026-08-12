export type PhotoCategory = {
  id: string;
  label: string;
  description: string;
  image: string;
};

// One representative shot per category — swap for real work once ready.
// These link straight to /photography?category=<id> so a visitor sees
// exactly the kind of work they're expecting, not the full mixed gallery.
export const photoCategories: PhotoCategory[] = [
  {
    id: 'real-estate',
    label: 'Real Estate',
    description: 'Interior & exterior shoots for listings, hotels, and hospitality spaces.',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww',
  },
  {
    id: 'portrait',
    label: 'Portrait & Model',
    description: 'Editorial and lifestyle portrait sessions, studio or on-location.',
    image: 'https://plus.unsplash.com/premium_photo-1673758905770-a62f4309c43c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWx8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 'nature',
    label: 'Nature & Landscape',
    description: 'Expedition and travel photography — Himalaya and beyond.',
    image: 'https://images.unsplash.com/photo-1751225750479-43ad27b94fa0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];