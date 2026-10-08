// Podcast feed generated from the sermon catalogue, so the church can list
// on Apple Podcasts / Spotify without a separate service.
import type { APIRoute } from 'astro';
import { sermons, sermonHref } from '../lib/sermons';
import { church } from '../data/site';

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);
const rfc822 = (d: string) => new Date(d + 'T15:00:00Z').toUTCString();

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const items = sermons
    .filter((s) => s.audio)
    .map((s) => {
      const desc = [s.speaker, s.series && `${s.series} series`, s.passages.join('; ')].filter(Boolean).join(' · ');
      return `
    <item>
      <title>${esc(s.title)}</title>
      <link>${abs(sermonHref(s))}</link>
      <guid isPermaLink="false">logos-sermon-${s.id}</guid>
      <pubDate>${rfc822(s.date)}</pubDate>
      <description>${esc(desc)}</description>
      <itunes:author>${esc(s.speaker ?? church.name)}</itunes:author>
      <itunes:duration>${s.audio!.duration}</itunes:duration>
      <enclosure url="${esc(s.audio!.url)}" length="${s.audio!.bytes}" type="audio/mpeg" />
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(church.name)} Sermons</title>
    <link>${abs('/sermons/')}</link>
    <atom:link href="${abs('/podcast.xml')}" rel="self" type="application/rss+xml" />
    <language>en-ca</language>
    <description>Sunday messages from ${esc(church.name)} in Newcastle, Ontario.</description>
    <itunes:author>${esc(church.name)}</itunes:author>
    <itunes:owner><itunes:name>${esc(church.name)}</itunes:name><itunes:email>${church.email}</itunes:email></itunes:owner>
    <itunes:image href="${abs('/podcast-cover.png')}" />
    <itunes:category text="Religion &amp; Spirituality"><itunes:category text="Christianity" /></itunes:category>
    <itunes:explicit>false</itunes:explicit>${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
