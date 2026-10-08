// llms.txt (https://llmstxt.org): a short, plain-text guide to the site for AI assistants.
import type { APIRoute } from 'astro';
import { church } from '../data/site';
import { seriesList } from '../lib/sermons';
import { keyFacts } from '../lib/markdown';
import { abs } from '../lib/schema';

export const GET: APIRoute = ({ site }) => {
  const a = (p: string) => abs(p, site!);
  const body = `# ${church.name}

> ${church.description}

${keyFacts(a)}

## Pages

- [Home](${a('/index.md')}): welcome, Sunday service details, midweek groups, leadership team, FAQ
- [About](${a('/about.md')}): our story, values, beliefs and partnerships
- [Kids](${a('/kids.md')}): nursery and kids' program
- [Give](${a('/give.md')}): how to give online
- [Sermons](${a('/sermons.md')}): every sermon with date, speaker, series and Bible passages

## Data

- [Full site text](${a('/llms-full.txt')}): everything above in one file
- [Sermons JSON](${a('/sermons.json')}): structured sermon list with audio/video links
- [Podcast RSS](${a('/podcast.xml')})

## Optional

${seriesList()
  .map((s) => `- [${s.name} series](${a(`/sermons/series/${s.slug}/`)})`)
  .join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
