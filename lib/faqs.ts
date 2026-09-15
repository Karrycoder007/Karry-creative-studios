export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: 'timeline',
    question: 'How long does a project take?',
    answer:
      'A Portfolio-tier site typically takes 2 weeks from kickoff to launch. Signature and Full Studio projects run 4–6 weeks depending on content readiness, page count, and how much photography or SEO work is bundled in. You get a firm timeline before any work starts, not after.',
  },
  {
    id: 'ownership',
    question: 'Do I own the code and the domain?',
    answer:
      'Yes, fully. Once the project is delivered, the codebase, the domain, and the hosting account are yours — no lock-in, no recurring "platform fees" to keep your own site running. You can hand it to another developer at any time.',
  },
  {
    id: 'process',
    question: "What's the actual process?",
    answer:
      'Discover → Design → Build → Deliver. A direct call to scope the project, a visual direction specific to your brand, a build in Next.js with the agreed motion and functionality, then a handoff with a short walkthrough. You get updates at each stage, not just at the end.',
  },
  {
    id: 'revisions',
    question: 'How many revisions are included?',
    answer:
      "Two structured revision rounds are included in every tier — one after the initial design direction, one after the first full build. Beyond that, small tweaks are usually quick and informal; larger scope changes are quoted separately so there's no ambiguity.",
  },
  {
    id: 'international',
    question: 'Do you work with clients outside India?',
    answer:
      "Yes — Studio Solarch is based in Goa but works with clients worldwide. Calls are scheduled across time zones, payments can be made internationally, and all communication happens over email or WhatsApp, whichever you prefer.",
  },
  {
    id: 'maintenance',
    question: 'What happens after launch?',
    answer:
      'Every project includes 30 days of priority support post-launch for bug fixes and small adjustments. After that, ongoing maintenance or new feature work is available on request — there\'s no obligation to sign up for a retainer.',
  },
  {
    id: 'photography',
    question: 'Can I book photography or drone work separately from a website?',
    answer:
      "Yes. Photography, filmmaking, and drone coverage are available as standalone bookings, not just bundled into the Full Studio package — useful if you already have a site and just need content shot.",
  },
  {
    id: 'stack',
    question: 'What do you build with, and why does it matter?',
    answer:
      'Next.js, TypeScript, and Tailwind CSS, with GSAP or Framer Motion for animation. This stack is fast by default, ranks well for SEO, and scales cleanly if you need to add features later — versus a page-builder site that gets slower and harder to maintain as it grows.',
  },
];