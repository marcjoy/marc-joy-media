import { images } from '../lib/images';

export type KemetopolisSlug =
  | 'kofi'
  | '8bit'
  | 'soliloquy'
  | 'zamani'
  | 'anyanwu-ama'
  | 'mjenzi'
  | 'nana-oshi';

export type KemetopolisCharacterDetail = {
  name: string;
  ability: string;
  slug: KemetopolisSlug;
  heroVideo: string | null;
  image: string;
  lore: string[];
  adinkra: string;
  palette: { accent: string; bg: string };
};

const characterDetailsRaw = {
  kofi: {
    name: 'Kofi',
    ability: 'Protagonist / Griot & Narrator',
    slug: 'kofi' as const,
    heroVideo: images.heroVideo.sailboatPortal,
    lore: [
      'Kofi did not choose the Archive. The Archive chose Kofi. He arrived on Kemetopolis as a crypto-linguist with a museum appointment and left as something the city had no word for — a man fluent in languages that no longer existed, speaking through doorways no map had ever charted.',
      'His translator ring was not a tool. It was a tuning fork. Every phrase Kofi spoke in the old tongues resonated against the Ancient Doorways scattered across Kemetopolis like scars from a war nobody remembered winning. Phrase plus artifact plus intent: that was the equation. The Doorways did the rest.',
      'The Ntru Arts do not flow through Kofi the way they flow through the Cosmic Kids — hot and visible and hungry. His gift is quieter. He listens. He translates what the city is trying to say. And sometimes, in the silence between one language and the next, he hears what Kemetopolis is still mourning.',
    ],
    adinkra: 'Sankofa',
    palette: { accent: 'var(--color-primary)', bg: '#0a0e1a' },
  },
  '8bit': {
    name: '8Bit',
    ability: 'Data & Code Manipulation',
    slug: '8bit' as const,
    heroVideo: null,
    lore: [
      '8Bit does not hack systems. He speaks to them. Every data stream in Kemetopolis carries a rhythm underneath the code — a pulse that most Techsmiths filter out as noise. 8Bit turned that noise into a language and taught himself to answer back.',
      'He was sixteen when he rewrote a Drift Collective surveillance grid in real time during a market raid, erasing sixty faces from the footage without touching a single terminal. Nobody in the Drift knew what happened. 8Bit was already three blocks away, eating plantain chips, listening to the city hum.',
      'His alignment with the Ntru Arts is Breath of Shu — not because air is soft, but because air is everywhere. 8Bit moves through systems the same way: present in every layer, visible in none, until he decides otherwise.',
    ],
    adinkra: 'Dwennimmen',
    palette: { accent: '#7B5EA7', bg: '#080c18' },
  },
  soliloquy: {
    name: 'Soliloquy',
    ability: 'Story & Memory Arts',
    slug: 'soliloquy' as const,
    heroVideo: null,
    lore: [
      'Memory in Kemetopolis is not metaphor. It is matter. Soliloquy learned this at nine years old when she accidentally replayed her grandmother\'s last conversation inside a crowded transit car and every passenger wept without knowing why.',
      'She does not create false memories. That distinction matters to her more than anything. She excavates. She surfaces. She can pull a buried truth from three generations back and hold it in the air like a photograph nobody knew existed. The Ntru Arts call this the Story thread — the strand of Ma\'at woven through every life that refuses to be erased.',
      'What Soliloquy is still learning is that remembering everything is not the same as understanding it. And that some truths, once surfaced, cannot be put back.',
    ],
    adinkra: 'Aya',
    palette: { accent: '#C04E6A', bg: '#0d0a14' },
  },
  zamani: {
    name: 'Zamani',
    ability: 'Temporal Manipulation',
    slug: 'zamani' as const,
    heroVideo: null,
    lore: [
      'Zamani does not travel through time. He slows it. He compresses it. He finds the seams where one moment is stitched to the next and presses his thumb in until there is room to breathe, to think, to move.',
      'The Bones of Geb flow through him — earth-rooted, patient, heavy with geological time. When Zamani holds still, the space around him thickens. Clocks lose a half-second. Machines stutter. People blink and find themselves unsure how long they have been standing there.',
      'He is seventeen and already exhausted by what he carries. Time is not a gift when you can feel every second of it pressing against your skin.',
    ],
    adinkra: 'Nyame Dua',
    palette: { accent: '#7A9E5F', bg: '#080d0a' },
  },
  'anyanwu-ama': {
    name: 'Anyanwu Ama',
    ability: 'Solar Channeling',
    slug: 'anyanwu-ama' as const,
    heroVideo: null,
    lore: [
      'Anyanwu Ama was born during a solar conjunction that happens once every two hundred and forty years in the Atum-Ra system. The astronomers noted it. The Builders logged it. Her mother ignored all of it and named her after the sun anyway, because she could already see the light moving behind the girl\'s eyes.',
      'The Flame of Sekhmet does not burn Anyanwu — it reports to her. She channels direct solar energy through her body and redirects it with a precision that should not be possible at her age. The Calibrated faction has been trying to recruit her since she was fourteen. She has declined eleven times.',
      'She runs with the Cosmic Kids not because she agrees with all of their choices, but because they are the only ones who have never asked her to be careful.',
    ],
    adinkra: 'Gye Nyame',
    palette: { accent: '#D4683A', bg: '#120a05' },
  },
  mjenzi: {
    name: 'Mjenzi',
    ability: 'Tech Construction',
    slug: 'mjenzi' as const,
    heroVideo: null,
    lore: [
      'Mjenzi builds things that have not been asked for yet. That is the only way he can explain it. He wakes up knowing what needs to exist and spends the day making it real, often without blueprints, often without explaining himself, always without asking permission.',
      'He is aligned with the Bones of Geb through the Techsmith tradition — the ancient understanding that construction is a sacred act, that every structure holds memory in its material. The buildings in Kemetopolis are not just architecture. They are arguments. Mjenzi understands this better than most licensed engineers twice his age.',
      'The Drift Collective has stolen three of his inventions. He has not forgotten. He is not the type to forgive before he is ready.',
    ],
    adinkra: 'Akoma Ntoso',
    palette: { accent: '#3A8FD4', bg: '#050b12' },
  },
  'nana-oshi': {
    name: 'Nana Oshi',
    ability: 'The Archive — Keeper of What Survived',
    slug: 'nana-oshi' as const,
    heroVideo: null,
    lore: [
      'Five hundred years is a long time to be in exile. Oshira Nexari — Nana Oshi to everyone who has ever been inside her kitchen — spent two centuries building the Archive beneath Shetau Hall before she admitted to herself that she was not just preserving history. She was leaving evidence.',
      'She created the Obsidian Feed. She mapped the 21 regions. She recorded the languages, the bloodlines, the disputes, the reconciliations, the things Kemetopolis chose to forget about itself. She did this alone, in the dark, over five hundred years, because she had made a promise to Amenirdis at the beginning of all of it and she did not consider promises optional.',
      'Kofi is her grandson. She knew he would come before he knew Kemetopolis existed. She left the Archive organized in a way that only he could navigate. This was not an accident.',
    ],
    adinkra: 'Adinkrahene',
    palette: { accent: '#B8A062', bg: '#0e0a06' },
  },
} as const satisfies Record<KemetopolisSlug, Omit<KemetopolisCharacterDetail, 'image'>>;

function withImage(slug: KemetopolisSlug): KemetopolisCharacterDetail {
  const imgMap: Record<KemetopolisSlug, string> = {
    kofi: images.characters.kofi,
    '8bit': images.characters.eightBit,
    soliloquy: images.characters.soliloquy,
    zamani: images.characters.zamani,
    'anyanwu-ama': images.characters.anyanwuAma,
    mjenzi: images.characters.mjenzi,
    'nana-oshi': images.characters.nanaOshi,
  };
  const row = characterDetailsRaw[slug];
  return {
    ...row,
    image: imgMap[slug],
  };
}

export const CHARACTER_SLUGS: KemetopolisSlug[] = [
  'kofi',
  '8bit',
  'soliloquy',
  'zamani',
  'anyanwu-ama',
  'mjenzi',
  'nana-oshi',
];

export const kemetopolisCharacterBySlug: Record<KemetopolisSlug, KemetopolisCharacterDetail> =
  Object.fromEntries(CHARACTER_SLUGS.map((s) => [s, withImage(s)])) as Record<
    KemetopolisSlug,
    KemetopolisCharacterDetail
  >;

export function getCharacterBySlug(slug: string | undefined): KemetopolisCharacterDetail | null {
  if (!slug) return null;
  if (!CHARACTER_SLUGS.includes(slug as KemetopolisSlug)) return null;
  return kemetopolisCharacterBySlug[slug as KemetopolisSlug];
}
