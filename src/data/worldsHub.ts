/**
 * Worlds hub (/worlds) — editorial tiers drive the layout.
 *
 * tier: 'flagship'    → Full-width cinematic hero card. One only.
 * tier: 'active'      → Medium cards with real images. Actively in production.
 * tier: 'development' → Muted placeholder cards. In pipeline, not yet launched.
 *
 * Keep URLs stable — the `to` values are used for routing.
 */

export type WorldsHubImageKey = 'kemetopolis' | 'neveronemonth' | 'scatteredThrones';

export type WorldTier = 'flagship' | 'active' | 'development';

export type WorldsHubCard =
  | {
      id: string;
      tag: string;
      title: string;
      description: string;
      to: string;
      tier: WorldTier;
      variant: 'image';
      imageKey: WorldsHubImageKey;
    }
  | {
      id: string;
      tag: string;
      title: string;
      description: string;
      to: string;
      tier: WorldTier;
      variant: 'placeholder';
      accent: 'violet' | 'amber' | 'slate';
    };

export const worldsHubCards: WorldsHubCard[] = [
  // ── FLAGSHIP ──────────────────────────────────────────────────────────────
  {
    id: 'kemetopolis',
    tag: 'Universe',
    title: 'Kemetopolis',
    description:
      'A city-planet in the Atum-Ra system. Built from African cosmology, Afrofuturist aesthetics, and original mythology spanning novels, art, and film.',
    to: '/kemetopolis',
    tier: 'flagship',
    variant: 'image',
    imageKey: 'kemetopolis',
  },

  // ── ACTIVE ────────────────────────────────────────────────────────────────
  {
    id: 'neveronemonth',
    tag: 'Culture',
    title: 'NeverOneMonth / NileGen',
    description:
      '365 days of Black history, culture, and future. Because it was never just one month.',
    to: '/worlds/neveronemonth',
    tier: 'active',
    variant: 'image',
    imageKey: 'neveronemonth',
  },
  {
    id: 'scattered-thrones',
    tag: 'Film',
    title: 'Scattered Thrones',
    description:
      'Documentary and narrative film recovering historically erased figures from the African diaspora and Pacific Northwest Black history.',
    to: '/worlds/scattered-thrones',
    tier: 'active',
    variant: 'image',
    imageKey: 'scatteredThrones',
  },

  // ── IN DEVELOPMENT ────────────────────────────────────────────────────────
  {
    id: 'the-department',
    tag: 'Series',
    title: 'The Department',
    description:
      'A workplace comedy where every department is its own pocket dimension. The only person who moves between all of them is IT.',
    to: '/worlds/the-department',
    tier: 'development',
    variant: 'placeholder',
    accent: 'violet',
  },
  {
    id: 'blaq-timbre',
    tag: 'Music',
    title: 'Blaq Timbre',
    description: 'Afrofuturist sound from the Atum-Ra system. Original compositions, world scores, and sonic extensions of the Kemetopolis universe.',
    to: '/music',
    tier: 'development',
    variant: 'placeholder',
    accent: 'slate',
  },
  {
    id: 'dream-in-public',
    tag: 'Media',
    title: 'Dream in Public',
    description:
      'The public-facing newsroom and creative platform of Marc Joy Media. Documenting, distributing, and amplifying the full MJM ecosystem.',
    to: '/worlds/dream-in-public',
    tier: 'development',
    variant: 'placeholder',
    accent: 'amber',
  },
];
