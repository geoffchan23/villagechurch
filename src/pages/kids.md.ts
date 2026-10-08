import type { APIRoute } from 'astro';
import { kidsMd } from '../lib/markdown';

export const GET: APIRoute = () => new Response(kidsMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
