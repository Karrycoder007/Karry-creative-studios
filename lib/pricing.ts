export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  priceIndia: string; // e.g. '₹25,000'
  priceIntl?: string; // e.g. '$500' — set deliberately, not a straight currency conversion
  priceNote: string; // e.g. 'onwards'
  features: string[];
  featured?: boolean;
  custom?: boolean; // when true, hides numeric prices and shows a "Custom" CTA instead
};

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Portfolio',
    tagline: 'Personal brands, freelancers, small studios',
    priceIndia: '₹25,000',
    priceIntl: '$500',
    priceNote: 'onwards',
    features: [
      'Up to 5 pages, fully responsive',
      'Custom design — no templates',
      'Light motion & scroll animation',
      'Basic on-page SEO setup',
      '2 weeks delivery',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Hotels, hospitality, premium & celebrity brands',
    priceIndia: '₹75,000',
    priceIntl: '$1,400',
    priceNote: 'onwards',
    features: [
      'Up to 10 pages, custom UI system',
      'Advanced GSAP / Framer Motion animation',
      'CMS-ready content (blog, gallery, listings)',
      'Multi-language / booking-flow ready',
      'Priority support for 30 days post-launch',
    ],
    featured: true,
  },
  {
    id: 'studio',
    name: 'Full Studio',
    tagline: 'E-commerce, complex builds, photography & SEO — fully bespoke',
    priceIndia: 'Custom',
    priceNote: 'scoped to your project',
    features: [
      'Everything in Signature',
      'E-commerce & payment integration (Shopify or custom checkout)',
      'On-location photography & drone coverage',
      'Full SEO strategy & technical setup',
      'Brand system: logo, palette, typography',
      'Single point of contact, start to finish',
    ],
    custom: true,
  },
];