// Plain-markdown versions of the site's content. Served as /index.md,
// /about.md, /sermons/<slug>.md etc. and stitched into /llms-full.txt, so AI
// assistants (and anyone else) can read the site without parsing HTML.
import { church, sunday, midweek, team, values, beliefs, history, partners, kids, care, giving, faq } from '../data/site';
import { sermons, seriesList, sermonHref, prettyDate, minutes, type Sermon } from './sermons';

type Abs = (path: string) => string;

const addr = `${church.address.venue}, ${church.address.street}, ${church.address.city}`;

export const keyFacts = (abs: Abs) => `- **Sunday service:** ${sunday.time} (coffee from ${sunday.coffee})
- **Location:** ${addr} — [map](${church.address.mapUrl})
- **Contact:** ${church.email} · ${church.phone}
- **Kids:** nursery (ages 0–4) and kids' classes (ages 4–12) during the service
- **Network:** member of ${partners.network.name} (${partners.network.href})
- **Founded:** January 2021
- **Sermons:** ${sermons.length} messages online at ${abs('/sermons/')} · podcast feed ${abs('/podcast.xml')}
- **Facebook:** ${church.social.facebook}`;

export const homeMd = (abs: Abs) => `# ${church.name}

> ${church.description}

${church.welcome} We'd love to get to know you.

## Key facts

${keyFacts(abs)}

## Sundays at ${sunday.time}

${sunday.summary}

${sunday.after}

## Through the week

${midweek.intro}

${midweek.groups.map((g) => `- ${g}`).join('\n')}

## Leadership team

${team.map((m) => `### ${m.name} — ${m.role}\n\n${m.bio}`).join('\n\n')}

## Pastoral care

${care}

## Frequently asked questions

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Latest sermon

${sermons[0] ? sermonLine(sermons[0], abs) : ''}
`;

export const aboutMd = () => `# About ${church.name}

## Our story

${history}

## Our values

${values.map((v) => `### ${v.title}\n\n${v.body}`).join('\n\n')}

## What we believe

${beliefs.map((b) => `- ${b}`).join('\n')}

## Partnerships

- Member of [${partners.network.name}](${partners.network.href}), ${partners.network.note}.
${[...partners.global, ...partners.local].map((p) => `- [${p.name}](${p.href}) — ${p.note}`).join('\n')}
`;

export const kidsMd = () => `# Kids ministry at ${church.name}

${kids.intro}

${kids.groups.map((g) => `## ${g.name} (${g.ages})\n\n${g.body}`).join('\n\n')}

${kids.safety}

Questions: ${church.email}
`;

export const giveMd = () => `# Give to ${church.name}

${giving}

Give online: ${church.giveUrl}
`;

export function sermonLine(s: Sermon, abs: Abs) {
  const bits = [prettyDate(s.date, 'short'), s.speaker, s.series && `${s.series} series`, s.passages.join('; '), s.audio && minutes(s.audio.duration)];
  return `- [${s.title}](${abs(sermonHref(s))}) — ${bits.filter(Boolean).join(' · ')}`;
}

export const sermonsMd = (abs: Abs) => `# Sermons — ${church.name}

${sermons.length} Sunday sermons, newest first. Each page has audio, video (where recorded) and the Bible passages.
Podcast feed: ${abs('/podcast.xml')} · Machine-readable list: ${abs('/sermons.json')}

## Series

${seriesList()
  .map((s) => `- [${s.name}](${abs(`/sermons/series/${s.slug}/`)}) — ${s.items.length} sermons, ${s.first.slice(0, 4)}–${s.latest.slice(0, 4)}`)
  .join('\n')}

## All sermons

${sermons.map((s) => sermonLine(s, abs)).join('\n')}
`;

export const sermonMd = (s: Sermon, abs: Abs) => `# ${s.title}

- **Date:** ${prettyDate(s.date)}
${s.speaker ? `- **Speaker:** ${s.speaker}\n` : ''}${s.series ? `- **Series:** ${s.series}\n` : ''}${s.passages.length ? `- **Scripture:** ${s.passages.join('; ')}\n` : ''}${s.topics.length ? `- **Topics:** ${s.topics.join(', ')}\n` : ''}${s.audio ? `- **Length:** ${minutes(s.audio.duration)}\n- **Audio (MP3):** ${s.audio.url}\n` : ''}${s.video ? `- **Video (MP4):** ${s.video.url}\n` : ''}- **Page:** ${abs(sermonHref(s))}

A sermon from ${church.name}, a church in Newcastle, Ontario that meets Sundays at ${sunday.time}.
`;
