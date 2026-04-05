/** Elfsight embeds share one platform script; inject at most once. */
export function ensureElfsightPlatform(): void {
  const id = 'elfsight-platform-js';
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.src = 'https://elfsightcdn.com/platform.js';
  script.async = true;
  document.body.appendChild(script);
}
