import type { KemetopolisSlug } from './kemetopolisCharacterDetails';

/** RGB triples (comma-separated) for `rgba(...)` in BackgroundGradientAnimation. */
export type CharacterGradientPreset = {
  gradientBackgroundStart: string;
  gradientBackgroundEnd: string;
  firstColor: string;
  secondColor: string;
  thirdColor: string;
  fourthColor: string;
  fifthColor: string;
  pointerColor: string;
};

/** Tuned to each character’s page palette / story tone (teal, violet, rose, earth, solar, electric, archive). */
export const kemetopolisCharacterGradients: Record<KemetopolisSlug, CharacterGradientPreset> = {
  kofi: {
    gradientBackgroundStart: 'rgb(8, 18, 32)',
    gradientBackgroundEnd: 'rgb(4, 12, 28)',
    firstColor: '45, 200, 180',
    secondColor: '20, 140, 160',
    thirdColor: '80, 220, 210',
    fourthColor: '30, 90, 120',
    fifthColor: '15, 60, 85',
    pointerColor: '87, 241, 219',
  },
  '8bit': {
    gradientBackgroundStart: 'rgb(12, 10, 28)',
    gradientBackgroundEnd: 'rgb(4, 8, 22)',
    firstColor: '123, 94, 167',
    secondColor: '180, 120, 255',
    thirdColor: '90, 60, 140',
    fourthColor: '239, 68, 68',
    fifthColor: '34, 197, 94',
    pointerColor: '160, 130, 220',
  },
  soliloquy: {
    gradientBackgroundStart: 'rgb(18, 10, 20)',
    gradientBackgroundEnd: 'rgb(8, 6, 14)',
    firstColor: '192, 78, 106',
    secondColor: '140, 50, 80',
    thirdColor: '220, 160, 180',
    fourthColor: '90, 40, 70',
    fifthColor: '60, 30, 55',
    pointerColor: '230, 120, 150',
  },
  zamani: {
    gradientBackgroundStart: 'rgb(10, 22, 14)',
    gradientBackgroundEnd: 'rgb(4, 12, 8)',
    firstColor: '90, 140, 75',
    secondColor: '122, 158, 95',
    thirdColor: '50, 90, 55',
    fourthColor: '70, 100, 65',
    fifthColor: '35, 55, 40',
    pointerColor: '130, 170, 110',
  },
  'anyanwu-ama': {
    gradientBackgroundStart: 'rgb(28, 12, 6)',
    gradientBackgroundEnd: 'rgb(10, 6, 4)',
    firstColor: '212, 104, 58',
    secondColor: '255, 160, 80',
    thirdColor: '180, 70, 40',
    fourthColor: '255, 200, 120',
    fifthColor: '120, 50, 30',
    pointerColor: '255, 140, 70',
  },
  mjenzi: {
    gradientBackgroundStart: 'rgb(6, 14, 24)',
    gradientBackgroundEnd: 'rgb(4, 8, 16)',
    firstColor: '58, 143, 212',
    secondColor: '100, 200, 255',
    thirdColor: '40, 100, 180',
    fourthColor: '80, 160, 220',
    fifthColor: '30, 70, 120',
    pointerColor: '120, 190, 255',
  },
  'nana-oshi': {
    gradientBackgroundStart: 'rgb(22, 16, 10)',
    gradientBackgroundEnd: 'rgb(8, 6, 4)',
    firstColor: '140, 120, 80',
    secondColor: '184, 160, 98',
    thirdColor: '100, 85, 55',
    fourthColor: '90, 70, 50',
    fifthColor: '60, 48, 35',
    pointerColor: '200, 175, 120',
  },
};

export function getCharacterGradient(slug: KemetopolisSlug): CharacterGradientPreset {
  return kemetopolisCharacterGradients[slug];
}
