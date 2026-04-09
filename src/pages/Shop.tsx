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
      className="flex min-h-screen flex-col items-center justify-center bg-background pb-[max(8rem,env(safe-area-inset-bottom,0px))] pl-[max(2rem,env(safe-area-inset-left,0px))] pr-[max(2rem,env(safe-area-inset-right,0px))] pt-48"
    >
      <p className="font-body text-on-surface-variant text-center">Redirecting to the shop…</p>
    </div>
  );
}
