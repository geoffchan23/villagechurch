import type { APIRoute } from 'astro';
import { homeMd, aboutMd, kidsMd, giveMd, sermonsMd } from '../lib/markdown';
import { abs } from '../lib/schema';

export const GET: APIRoute = ({ site }) => {
  const a = (p: string) => abs(p, site!);
  const body = [homeMd(a), aboutMd(), kidsMd(), giveMd(), sermonsMd(a)].join('\n---\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
