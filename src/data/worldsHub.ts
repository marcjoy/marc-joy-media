/**
 * Worlds hub (/worlds) — card order and routes.
 * Safe to move to a CMS later: keep URLs stable (`to` paths).
 */

export type WorldsHubImageKey = 'kemetopolis' | 'neveronemonth' | 'scatteredThrones';

export type WorldsHubCard =
  | {
      id: string;
      tag: string;
      title: string;
      description: string;
      to: string;
      variant: 'image';
      imageKey: WorldsHubImageKey;
      /** Kemetopolis card uses 3D tilt on desktop */
      featured?: boolean;
    }
  | {
      id: string;
      tag: string;
      title: string;
      description: string;
      to: string;
      variant: 'placeholder';
      /** Visual accent for gradient placeholder (no asset yet) */
      accent: 'violet' | 'amber' | 'slate';
    };

export const worldsHubCards: WorldsHubCard[] = [
  {
    id: 'kemetopolis',
    tag: 'Universe',
    title: 'Kemetopolis',
    description: 'A city-planet universe spanning novels, art, and film.',
    to: '/kemetopolis',
    variant: 'image',
    imageKey: 'kemetopolis',
    featured: true,
  },
  {
    id: 'the-department',
    tag: 'Series',
    title: 'The Department',
    description: 'A workplace comedy where every department is its own dimension.',
    to: '/worlds/the-department',
    variant: 'placeholder',
    accent: 'violet',
  },
  {
    id: 'dream-in-public',
    tag: 'Media',
    title: 'Dream in Public',
    description: 'The public-facing newsroom and creative platform of Marc Joy Media.',
    to: '/worlds/dream-in-public',
    variant: 'placeholder',
    accent: 'amber',
  },
  {
    id: 'neveronemonth',
    tag: 'Culture',
    title: 'NeverOneMonth / NileGen',
    description:
      '365 days of Black history, culture, and future. Because it was never just one month.',
    to: '/worlds/neveronemonth',
    variant: 'image',
    imageKey: 'neveronemonth',
  },
  {
    id: 'blaq-timbre',
    tag: 'Music',
    title: 'Blaq Timbre',
    description: 'Afrofuturist sound from the Atum-Ra system.',
    to: '/music',
    variant: 'placeholder',
    accent: 'slate',
  },
  {
    id: 'scattered-thrones',
    tag: 'Film',
    title: 'Scattered Thrones',
    description:
      'Documentary and narrative film production rooted in Black stories and Pacific Northwest history.',
    to: '/worlds/scattered-thrones',
    variant: 'image',
    imageKey: 'scatteredThrones',
  },
];
