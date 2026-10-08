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

Five themes live in `src/styles/global.css` (Cabin, Woodland, Lakeshore, Modern, Harvest).
A floating **Theme** button lets reviewers switch; `?theme=woodland` links straight to one.
To pick a final theme, move its values into the `:root` block and set `showThemePicker = false`
in `src/data/site.ts`.

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
