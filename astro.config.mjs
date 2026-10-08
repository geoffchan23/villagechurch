import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://villagechurch.ca',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true },
  // Keep links from the old WordPress site working.
  redirects: {
    '/about-us': '/about/',
    '/our-beliefs': '/about/#beliefs',
    '/kids-ministry': '/kids/',
    '/resources': '/sermons/',
    '/events': '/',
    '/hello-world': '/',
  },
});
