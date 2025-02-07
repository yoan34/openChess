import { Baloo_Da_2, Ballet } from 'next/font/google';

export const balooDa2 = Baloo_Da_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo',
  fallback: ['sans-serif']
});

export const ballet = Ballet({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ballet',
  fallback: ['sans-serif']
});