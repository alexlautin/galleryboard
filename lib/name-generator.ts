const adjectives = [
  'Happy', 'Clever', 'Brave', 'Swift', 'Bright', 'Calm', 'Wise', 'Kind',
  'Gentle', 'Smart', 'Quick', 'Lively', 'Peaceful', 'Cheerful', 'Eager', 'Friendly'
];

const nouns = [
  'Panda', 'Dolphin', 'Eagle', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox',
  'Hawk', 'Deer', 'Owl', 'Duck', 'Frog', 'Cat', 'Dog', 'Bird'
];

export function generateTwoWordName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
} 