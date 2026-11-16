'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FlaskConical } from 'lucide-react';
import { isDemoMode } from '@/lib/demo';

// Thin strip above every page while demo mode is on. It scrolls away with the
// page; full-screen views cover it and have their own way out.
export function DemoBanner() {
  const pathname = usePathname();
  const [demo, setDemo] = useState(false);

  // Re-check on navigation: /demo turns the flag on and then client-navigates home
  useEffect(() => {
    setDemo(isDemoMode());
  }, [pathname]);

  if (!demo) return null;

  return (
    <div
      role="status"
      className="flex min-h-9 items-center justify-center gap-x-3 gap-y-1 bg-primary px-4 py-1.5 text-center text-[13px] text-primary-foreground"
    >
      <span className="inline-flex items-center gap-1.5">
        <FlaskConical className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        <span>
          <span className="font-medium">Demo mode</span>
          <span className="hidden text-primary-foreground/70 sm:inline"> · sample class, nothing is saved</span>
        </span>
      </span>
      <a
        href="/demo/exit"
        className="rounded-full bg-primary-foreground/10 px-2.5 py-0.5 font-medium text-brand transition-colors hover:bg-primary-foreground/20"
      >
        Exit demo
      </a>
    </div>
  );
}
