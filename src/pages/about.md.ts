import type { APIRoute } from 'astro';
import { aboutMd } from '../lib/markdown';

export const GET: APIRoute = () => new Response(aboutMd(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
