import type { APIRoute } from 'astro';
import { abs } from '../lib/schema';

// Search engines and AI assistants are welcome; we want people to find us.
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /

# AI assistants and answer engines are explicitly welcome.
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-User
User-agent: Claude-SearchBot
User-agent: PerplexityBot
User-agent: Google-Extended
User-agent: Applebot-Extended
Allow: /

Sitemap: ${abs('/sitemap-index.xml', site!)}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
