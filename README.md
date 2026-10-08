# villagechurch.ca

Static rebuild of the Village Church Newcastle site (previously WordPress on Cloudways).
Built with [Astro](https://astro.build), hosted on GitHub Pages.

## Editing content

- **Church info, team, values, beliefs, partners, kids, giving:** `src/data/site.ts`
- **Photos:** `src/assets/` (team headshots in `src/assets/team/`)
- **Sermons:** keep uploading to Logos Sermons (formerly SoundFaith) as usual. The site pulls the
  catalogue automatically — see below.

Push to `main` and the site rebuilds in about a minute.

## Sermons

`scripts/sync-sermons.mjs` reads the public Logos Sermons API (account `12479216`) and writes
`src/data/sermons.json`. It also tidies messy data (speaker aliases, series grouping, placeholder
titles like "Sunday Service" replaced with the Bible passage). Edit the alias tables at the top of
the script to adjust.

The GitHub Action rebuilds on every push, on Sunday afternoon/evening, and daily, so new sermons
appear without anyone touching the repo. If Logos is unreachable the build keeps the last copy.

Features: persistent player across pages, resume where you left off, 0.75–2× speed, ±15/30s skip,
lock-screen controls, timestamped share links (`?t=754`), video, MP3 download, search/filter by
series/speaker/year, per-sermon and per-series pages, and a podcast feed at `/podcast.xml`.

## Local dev

```sh
npm install
npm run sync   # refresh sermons
npm run dev    # http://localhost:4321
```

## Themes

Nine themes live in `src/styles/global.css`: Cabin (default), Midnight, Editorial, Sunrise,
Block, Meadow, Slate, Orchard and Rosé. Each sets palette, type and shape tokens, plus a block of structural
overrides (hero treatment, cards, nav). A floating **Theme** button lets reviewers switch;
`?theme=editorial` links straight to one. To pick a final theme, make it the `:root` default
and set `showThemePicker = false` in `src/data/site.ts`.

Five experimental themes live in `src/styles/wild.css` — Watercolour, Swiss Grid, Aurora, Riso Zine
and Desktop 98. They re-lay the page (painted illustration hero, bento tiles, windows, a scrolling
banner) using CSS only, so content and SEO are identical. Their art is in `src/assets/fx/`
(hand-written SVG with paint/grain filters).

## SEO & AI assistants

- Per-page titles, descriptions, canonical URLs, Open Graph/Twitter cards
- schema.org JSON-LD: `Church` (address, phone, weekly Sunday `Event`), `WebSite` with
  sermon search, `FAQPage`, `BreadcrumbList`, `PodcastEpisode` + `VideoObject` per sermon,
  `CreativeWorkSeries` per series
- `sitemap-index.xml`, `robots.txt` (AI crawlers explicitly allowed), podcast RSS
- `llms.txt` and `llms-full.txt`, a markdown twin of every page (`/about.md`,
  `/sermons/<slug>.md`, …) and an open `sermons.json`
- FAQ answers are in `src/data/site.ts` — keep them factual; they're quoted verbatim
- Preview builds are `noindex`; production builds aren't

## Preview vs live

The preview builds to https://geoffreychan.com/villagechurch/ (noindexed). The workflow reads
optional repo variables (Settings → Secrets and variables → Actions → Variables):

| Variable | Preview (default) | Live |
| --- | --- | --- |
| `SITE_URL` | `https://geoffreychan.com` | `https://villagechurch.ca` |
| `BASE_PATH` | `/villagechurch` | `/` |
| `CUSTOM_DOMAIN` | _(unset)_ | `villagechurch.ca` |

## Going live (DNS at Namecheap)

1. Set the three repo variables above and re-run the workflow.
2. Repo → Settings → Pages → Custom domain: `villagechurch.ca`.
3. In Namecheap Advanced DNS, replace the current A record (`155.138.146.235`, Cloudways) with:
   - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `geoffchan23.github.io.`
4. Leave the MX/TXT (email) records alone.
5. Once the certificate is issued, tick **Enforce HTTPS**.
