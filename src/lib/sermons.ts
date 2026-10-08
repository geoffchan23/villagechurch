import raw from '../data/sermons.json';

export type Sermon = {
  id: number;
  slug: string;
  title: string;
  date: string;
  speaker: string | null;
  series: string | null;
  passages: string[];
  topics: string[];
  audio: { url: string; duration: number; bytes: number } | null;
  video: { url: string; poster: string | null; width: number | null; height: number | null } | null;
};

export const sermons = raw as Sermon[];

export const sermonHref = (s: Sermon) => `/sermons/${s.slug}/`;

export const prettyDate = (d: string, month: 'short' | 'long' = 'long') =>
  new Date(d + 'T12:00:00').toLocaleDateString('en-CA', { month, day: 'numeric', year: 'numeric' });

export const minutes = (secs: number) => `${Math.max(1, Math.round(secs / 60))} min`;

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** JSON payload the site-wide player reads from data-play buttons. */
export const playPayload = (s: Sermon) =>
  JSON.stringify({
    id: s.id,
    title: s.title,
    speaker: s.speaker,
    date: s.date,
    url: s.audio?.url,
    href: sermonHref(s),
    duration: s.audio?.duration,
  });

/** Series ordered by most recent sermon, with counts and date range. */
export function seriesList() {
  const map = new Map<string, Sermon[]>();
  for (const s of sermons) if (s.series) map.set(s.series, [...(map.get(s.series) ?? []), s]);
  return [...map.entries()].map(([name, items]) => ({
    name,
    slug: slug(name),
    items,
    latest: items[0].date,
    first: items[items.length - 1].date,
  }));
}

export function speakerList() {
  const counts = new Map<string, number>();
  for (const s of sermons) if (s.speaker) counts.set(s.speaker, (counts.get(s.speaker) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
}
