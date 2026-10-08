// Pulls the church's sermon catalogue from Logos Sermons (formerly SoundFaith)
// and writes a normalized copy to src/data/sermons.json for the site build.
//
// Logos stays the place sermons get uploaded; this site just presents them.
// Run with `npm run sync`. CI runs it before every build.

import { writeFile, readFile } from 'node:fs/promises';

const ACCOUNT_ID = '12479216';
const API = 'https://sermons.logos.com/api/sermons';
const OUT = new URL('../src/data/sermons.json', import.meta.url);

// Speaker names as typed in Logos, mapped to how they should appear.
const SPEAKER_ALIASES = {
  'Audrey': 'Audrey Jose',
  'Dr. Greg Reader': 'Greg Reader',
};

// Series names as typed in Logos, mapped to a tidy grouping.
// Anything not listed is cleaned up by tidySeries() below.
const SERIES_ALIASES = {
  'Gen': 'Genesis',
  'Philipians': 'Philippians',
  'Hebrew': 'Hebrews',
  'Easter Sunday': 'Easter',
  'Christmas Eve': 'Advent & Christmas',
  'Advent Week': 'Advent & Christmas',
  'Advent': 'Advent & Christmas',
  'Nativity': 'Advent & Christmas',
  'Prayer': 'Prayer',
};

function tidySeries(raw) {
  if (!raw) return null;
  let s = raw
    .replace(/\s+series$/i, '')            // "Luke Series" -> "Luke"
    .replace(/:.*$/, '')                   // "Advent Week 2: Peace" -> "Advent Week 2"
    .replace(/\s+\d+([-–,]\s*\d+)*$/, '')  // "Genesis 40-41", "Marriage Matters 3"
    .trim();
  return SERIES_ALIASES[s] ?? s;
}

// Many older uploads are titled "Sunday Service" or just the date.
const PLACEHOLDER_TITLE = /^(sunday service|test\d*|[a-z]{3,9}\.? \d{1,2},? \d{4})\b/i;

function slugify(s) {
  return s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').slice(0, 60);
}

function torontoDate(iso) {
  // YYYY-MM-DD in the church's timezone (uploads are stamped in UTC).
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto' }).format(new Date(iso));
}

async function fetchAll() {
  const all = [];
  let next = '';
  for (let page = 0; page < 50; page++) {
    const url = `${API}?accountId=${ACCOUNT_ID}&limit=100${next ? `&next=${encodeURIComponent(next)}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Logos API ${res.status} for ${url}`);
    const data = await res.json();
    all.push(...data.sermons);
    if (!data.next) break;
    next = data.next;
  }
  return all;
}

function normalize(s) {
  const audio = s.assets?.recording;
  const video = s.assets?.video;
  const passages = (s.passages ?? []).map((p) => p.text);
  const speaker = SPEAKER_ALIASES[s.speaker?.speakerName?.trim()] ?? s.speaker?.speakerName?.trim() ?? null;
  const series = tidySeries(s.series ?? s.sermonSeries?.seriesTitle);
  const rawTitle = (s.title ?? '').trim();
  const placeholder = PLACEHOLDER_TITLE.test(rawTitle);
  const title = placeholder ? passages[0] ?? s.series ?? 'Sunday Service' : rawTitle;
  const date = torontoDate(s.datePresented ?? s.dateSubmitted);

  return {
    id: s.sermonId,
    slug: `${date}-${slugify(title)}`,
    title,
    date,
    speaker,
    series,
    passages,
    topics: (s.topics ?? []).map((t) => t.text),
    audio: audio?.url ? { url: audio.url, duration: Math.round(audio.duration ?? 0), bytes: audio.byteCount ?? 0 } : null,
    video: video?.url
      ? {
          url: video.url,
          poster: video.thumbnailLarge ?? null,
          width: video.width ?? null,
          height: video.height ?? null,
        }
      : null,
  };
}

async function main() {
  let raw;
  try {
    raw = await fetchAll();
  } catch (err) {
    // Don't fail a deploy because Logos is having a bad day; keep the last good copy.
    const existing = await readFile(OUT, 'utf8').catch(() => null);
    if (existing) {
      console.warn(`! Sermon sync failed (${err.message}); keeping existing sermons.json`);
      return;
    }
    throw err;
  }

  const sermons = raw
    .filter((s) => s.sermonState === 'published' && !/^test\d*$/i.test(s.title?.trim() ?? ''))
    .map(normalize)
    .filter((s) => s.audio || s.video)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  // Guarantee unique slugs (two uploads on the same day with the same title).
  const seen = new Map();
  for (const s of sermons) {
    const n = seen.get(s.slug) ?? 0;
    seen.set(s.slug, n + 1);
    if (n) s.slug = `${s.slug}-${n + 1}`;
  }

  await writeFile(OUT, JSON.stringify(sermons, null, 1) + '\n');
  console.log(`✓ ${sermons.length} sermons → src/data/sermons.json (latest: ${sermons[0]?.date} "${sermons[0]?.title}")`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
