# Universe25

A Gatsby + React film and press website for Richard Melkonian’s **Universe25**. The design follows the supplied EPK: black, electric green, original 16mm stills and restrained typography.

Includes the supplied YouTube trailer, seven attributed review excerpts, verified festival history, all four EPK biographies, full director’s statement, cast and crew, mobile navigation, downloadable EPK / poster / press ZIP, screener and interview email requests, accessible image and trailer dialogs, social links, share / copy utilities, social preview metadata and Movie structured data.

## Run

Use Node 22 LTS or 24, then:

```sh
npm ci
npm run develop
```

## Validate and build

```sh
npm test
npm run build
npm run serve
```

For GitHub Pages:

```sh
PATH_PREFIX=/universe25 SITE_URL=https://0xmovses.github.io/universe25 npm run build -- --prefix-paths
```

The GitHub Actions workflow deploys `public/` with Pages. Configure Pages to use GitHub Actions. For another host, use `npm run build`, publish `public`, and set `SITE_URL` to the final public origin. Leave `PATH_PREFIX` empty on a root domain. No secret is needed in the frontend.

## Edit

- `src/data/film.json`: synopsis, contact, social links, cast, credits, festivals, reviews and technical facts.
- `src/data/bios.json`: all EPK biographies.
- `src/data/statement.json`: director’s statement.
- `src/pages/index.jsx`: page and interactions.
- `src/styles/site.css`: responsive EPK-inspired design.
- `static/press/`: downloadable promotional files; rebuild ZIP after any file changes.
- `docs/CONTENT-SOURCES.md`: provenance, editorial choices, and outstanding source gaps.

The site has no tracking, forms backend, auto-playing background media or third-party fonts. YouTube loads only after clicking Play. Review screener requests open the visitor’s email app and do not expose a screener publicly.

Film images, artwork and promotional text remain the property of their respective rights holders; they are supplied here for the film’s promotional website. Third-party reviews are linked and briefly quoted, not republished.
