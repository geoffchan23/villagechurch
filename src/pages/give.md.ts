import type { APIRoute } from 'astro';
import { giveMd } from '../lib/markdown';

export const GET: APIRoute = () => new Response(giveMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
