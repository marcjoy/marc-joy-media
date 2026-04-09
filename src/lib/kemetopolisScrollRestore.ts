/** Passed when opening a character from Kemetopolis — Back restores this offset. */
export type KemetopolisNavigateToCharacterState = {
  kemetopolisScrollY: number;
};

/** Passed when returning to `/kemetopolis` — consumed by ScrollToTop. */
export type KemetopolisScrollRestoreState = {
  scrollY: number;
};

export function readKemetopolisScrollRestore(
  state: unknown,
): number | undefined {
  if (
    state &&
    typeof state === 'object' &&
    'scrollY' in state &&
    typeof (state as KemetopolisScrollRestoreState).scrollY === 'number'
  ) {
    return (state as KemetopolisScrollRestoreState).scrollY;
  }
  return undefined;
}

export function readKemetopolisOriginScroll(
  state: unknown,
): number | undefined {
  if (
    state &&
    typeof state === 'object' &&
    'kemetopolisScrollY' in state &&
    typeof (state as KemetopolisNavigateToCharacterState).kemetopolisScrollY === 'number'
  ) {
    return (state as KemetopolisNavigateToCharacterState).kemetopolisScrollY;
  }
  return undefined;
}
