import { defineConfig } from 'astro/config';

// SITE_URL/BASE_PATH let the same code run as a preview under a sub-path
// (e.g. https://geoffreychan.com/villagechurch/) or live at the domain root.
const site = process.env.SITE_URL ?? 'https://villagechurch.ca';
const base = process.env.BASE_PATH ?? '/';
const to = (p) => base.replace(/\/$/, '') + p;

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  prefetch: { prefetchAll: true },
  // Keep links from the old WordPress site working.
  redirects: {
    '/about-us': to('/about/'),
    '/our-beliefs': to('/about/#beliefs'),
    '/kids-ministry': to('/kids/'),
    '/resources': to('/sermons/'),
    '/events': to('/'),
    '/hello-world': to('/'),
  },
});
