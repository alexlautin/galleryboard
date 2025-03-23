const adjectives = [
  'Happy', 'Clever', 'Bright', 'Swift', 'Gentle', 'Bold', 'Calm', 'Wise',
  'Kind', 'Quick', 'Brave', 'Smart', 'Eager', 'Fair', 'Pure', 'Warm',
  'Sharp', 'Fresh', 'Noble', 'Proud'
];

const nouns = [
  'Panda', 'Eagle', 'Tiger', 'Dolphin', 'Lion', 'Wolf', 'Bear', 'Fox',
  'Hawk', 'Deer', 'Owl', 'Swan', 'Horse', 'Robin', 'Dove', 'Seal',
  'Lynx', 'Elk', 'Hare', 'Crane'
];

export function generateTwoWordName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}${noun}`;
} 