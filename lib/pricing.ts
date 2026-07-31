export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Portfolio',
    tagline: 'Personal brands, freelancers, small studios',
    price: '₹35,000',
    priceNote: 'starting from',
    features: [
      'Up to 4 pages, fully responsive',
      'Custom design — no templates',
      'Light motion & scroll animation',
      'Basic on-page SEO setup',
      '1 weeks delivery',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Hotels, hospitality, premium & celebrity brands',
    price: '₹85,000',
    priceNote: 'starting from',
    features: [
      'Up to 8 pages, custom UI system',
      'Advanced GSAP / Framer Motion animation',
      'CMS-ready content (blog, gallery, listings)',
      'Multi-language / booking-flow ready',
      'Priority support for 20 days post-launch',
    ],
    featured: true,
  },
  {
    id: 'studio',
    name: 'Full Studio',
    tagline: 'Website + photography/drone + SEO, end to end',
    price: '₹1,50,000+',
    priceNote: 'starting from',
    features: [
      'Everything in Signature',
      'On-location photography & drone coverage',
      'Full SEO strategy & technical setup',
      'Brand system: logo, palette, typography',
      'Single point of contact, start to finish',
    ],
  },
];