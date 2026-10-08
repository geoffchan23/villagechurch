// schema.org structured data (JSON-LD). Search engines use it for rich results
// (address, service times, events, podcast episodes); AI assistants use it to
// answer questions about the church accurately.
import { church, sunday, team, partners } from '../data/site';
import { u } from './url';

export const abs = (path: string, site: URL) => new URL(path.startsWith(import.meta.env.BASE_URL) ? path : u(path), site).href;

export function churchSchema(site: URL, image: string) {
  const a = church.address;
  const address = {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
  return {
    '@type': 'Church',
    '@id': abs('/#church', site),
    name: church.name,
    alternateName: church.shortName,
    slogan: church.tagline.join(', '),
    description: church.description,
    url: abs('/', site),
    logo: abs('/favicon.png', site),
    image,
    telephone: church.phone,
    email: church.email,
    foundingDate: church.founded,
    address,
    hasMap: a.mapUrl,
    areaServed: church.areaServed.map((name) => ({ '@type': 'City', name })),
    sameAs: Object.values(church.social).filter(Boolean),
    memberOf: { '@type': 'Organization', name: partners.network.name, url: partners.network.href },
    employee: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
    event: {
      '@type': 'Event',
      name: 'Sunday Worship Gathering',
      description: `${sunday.summary} ${sunday.after}`,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      isAccessibleForFree: true,
      organizer: { '@id': abs('/#church', site) },
      location: { '@type': 'Place', name: a.venue, address },
      eventSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P1W',
        byDay: 'https://schema.org/Sunday',
        startTime: '10:30:00',
        scheduleTimezone: 'America/Toronto',
      },
    },
  };
}

export function websiteSchema(site: URL) {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website', site),
    name: church.name,
    url: abs('/', site),
    inLanguage: 'en-CA',
    publisher: { '@id': abs('/#church', site) },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${abs('/sermons/', site)}?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(site: URL, crumbs: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path, site),
    })),
  };
}

/** ISO 8601 duration, e.g. PT45M12S. */
export const isoDuration = (secs: number) => `PT${Math.floor(secs / 60)}M${Math.round(secs % 60)}S`;
