'use client';

// Demo mode flag. Lives in sessionStorage so it lasts for this tab only.
const FLAG_KEY = 'galleryboard-demo';
const ENTER_KEY = 'galleryboard-demo-enter';

// Fallback for when sessionStorage is blocked (private windows, strict settings)
let memoryFlag = false;
let memoryEnter = false;

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(FLAG_KEY) === '1' || memoryFlag;
  } catch {
    return memoryFlag;
  }
}

export function enterDemoMode() {
  memoryFlag = true;
  memoryEnter = true;
  try {
    sessionStorage.setItem(FLAG_KEY, '1');
    sessionStorage.setItem(ENTER_KEY, '1');
  } catch {}
}

export function exitDemoMode() {
  memoryFlag = false;
  memoryEnter = false;
  try {
    sessionStorage.removeItem(FLAG_KEY);
    sessionStorage.removeItem(ENTER_KEY);
  } catch {}
}

// True once right after /demo, so the home page opens straight into the sample room
export function takeDemoEnter(): boolean {
  let enter = memoryEnter;
  memoryEnter = false;
  try {
    enter = enter || sessionStorage.getItem(ENTER_KEY) === '1';
    sessionStorage.removeItem(ENTER_KEY);
  } catch {}
  return enter;
}
