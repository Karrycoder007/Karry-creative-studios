export type Photo = {
  id: string;
  src: string;
  alt: string;
  location: string;
  tall?: boolean;
};

// Swap with real Panch Kedar / trek shots — /public/photography/
export const photos: Photo[] = [
  { id: 'p1', src: '/fromindiawithlove.png', alt: 'Kedarnath at dawn', location: 'Kedarnath', tall: true },
  { id: 'p2', src: '/photography/placeholder-2.jpg', alt: 'Trail through the Himalaya', location: 'Madhyamaheshwar' },
  { id: 'p3', src: '/photography/placeholder-3.jpg', alt: 'Astro shot over the ridgeline', location: 'Tungnath' },
  { id: 'p4', src: '/photography/placeholder-4.jpg', alt: 'Prayer flags in the wind', location: 'Rudranath', tall: true },
  { id: 'p5', src: '/photography/placeholder-5.jpg', alt: 'Solo trekker silhouette', location: 'Kalpeshwar' },
  { id: 'p6', src: '/photography/placeholder-6.jpg', alt: 'Valley clouds rolling in', location: 'Panch Kedar' },
  { id: 'p7', src: '/photography/placeholder-7.jpg', alt: 'Golden hour on the peaks', location: 'Badrinath', tall: true },
  { id: 'p8', src: '/photography/placeholder-8.jpg', alt: 'River crossing', location: 'Haridwar' },
];
