import { cn } from "@/lib/utils";

// Four little boards in a frame: the teacher's grid of student whiteboards
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <rect width="32" height="32" rx="9" fill="#BEDCCB" />
      <rect x="7" y="7" width="8" height="8" rx="2" fill="#fff" />
      <rect x="17" y="7" width="8" height="8" rx="2" fill="#fff" />
      <rect x="7" y="17" width="8" height="8" rx="2" fill="#fff" />
      <rect x="17" y="17" width="8" height="8" rx="2" fill="#17201c" />
      <path d="M19 22.5c1.2-2.4 2.4-2.4 3 0" stroke="#BEDCCB" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight">GalleryBoard</span>
    </span>
  );
}
