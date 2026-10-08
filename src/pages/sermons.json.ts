// Open, machine-readable sermon list (for apps, search tools and AI assistants).
import type { APIRoute } from 'astro';
import { sermons, sermonHref } from '../lib/sermons';
import { abs } from '../lib/schema';

export const GET: APIRoute = ({ site }) =>
  new Response(
    JSON.stringify(
      sermons.map((s) => ({
        title: s.title,
        date: s.date,
        speaker: s.speaker,
        series: s.series,
        passages: s.passages,
        topics: s.topics,
        url: abs(sermonHref(s), site!),
        audio: s.audio?.url ?? null,
        video: s.video?.url ?? null,
        durationSeconds: s.audio?.duration ?? null,
      })),
      null,
      1,
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
