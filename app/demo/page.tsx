'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enterDemoMode } from '@/lib/demo';

// Turns on demo mode for this tab and opens the sample room as its teacher
export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    enterDemoMode();
    router.replace('/');
  }, [router]);

  return <p className="p-8 text-center text-sm text-gray-500">Opening the demo…</p>;
}
