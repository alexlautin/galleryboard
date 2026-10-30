'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isDemoMode } from '@/lib/demo';

export const DEMO_BANNER_HEIGHT = 'h-8';

export function DemoBanner() {
  const pathname = usePathname();
  const [demo, setDemo] = useState(false);

  // Re-check on navigation: /demo turns the flag on and then client-navigates home
  useEffect(() => {
    setDemo(isDemoMode());
  }, [pathname]);

  if (!demo) return null;

  return (
    <>
      <div
        role="status"
        className={`fixed inset-x-0 top-0 z-[60] ${DEMO_BANNER_HEIGHT} flex items-center justify-center gap-2 border-b border-amber-200 bg-amber-100 px-4 text-sm text-amber-900`}
      >
        <span>Demo mode with sample data</span>
        <span aria-hidden="true">·</span>
        <a href="/demo/exit" className="font-medium underline underline-offset-2 hover:text-amber-950">
          Exit demo
        </a>
      </div>
      <div className={DEMO_BANNER_HEIGHT} aria-hidden="true" />
    </>
  );
}
