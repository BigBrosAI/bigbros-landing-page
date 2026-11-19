import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  // Plain apostrophes and quotes in JSX copy render fine; escaping them all hurts readability.
  { rules: { 'react/no-unescaped-entities': 'off' } },
];

export default config;
