import { useEffect } from 'react';

const MERCH_STORE_URL = 'https://afrofuturisticdreams.com/';

/** /shop sends visitors to the Afrofuturistic Dreams Shopify store (bookmarks & shared links). */
export default function Shop() {
  useEffect(() => {
    window.location.replace(MERCH_STORE_URL);
  }, []);

  return (
    <div
      data-page="shop"
      className="min-h-screen flex flex-col items-center justify-center px-8 pt-48 pb-32 bg-background"
    >
      <p className="font-body text-on-surface-variant text-center">Redirecting to the shop…</p>
    </div>
  );
}
