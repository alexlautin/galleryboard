'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

// Room code shown big enough to read off a projector, with a copy button
export function RoomCode({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'group inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 font-mono text-lg font-semibold tracking-[0.2em] shadow-sm transition-colors hover:bg-muted',
        className
      )}
      aria-label={`Room code ${code.split('').join(' ')}. Copy`}
    >
      {code}
      {copied ? (
        <Check className="h-4 w-4 text-brand-ink" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
      )}
    </button>
  );
}
