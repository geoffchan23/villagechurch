import type { APIRoute } from 'astro';
import { homeMd } from '../lib/markdown';
import { abs } from '../lib/schema';

export const GET: APIRoute = ({ site }) => {
  const a = (p: string) => abs(p, site!);
  return new Response(homeMd(a), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
