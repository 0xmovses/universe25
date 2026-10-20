# Universe25

A Gatsby + React film and press website for Richard Melkonian’s **Universe25**. The design follows the supplied EPK: black, electric green, original 16mm stills and restrained typography.

Includes the supplied YouTube trailer, seven attributed review excerpts, verified festival history, four filmmaker biographies, full director’s statement, cast and crew, mobile navigation, downloadable EPK / poster / press ZIP, screener and interview email requests, accessible image and trailer dialogs, social links, share / copy utilities, social preview metadata and Movie structured data.

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
PATH_PREFIX=/universe25 SITE_URL=https://universe25film.com npm run build -- --prefix-paths
```

Vercel hosts the primary site at https://universe25film.com/. GitHub Pages is a fallback copy: its asset prefix differs, but its canonical link and sitemap still identify the primary domain. The GitHub Actions workflow deploys `public/` with Pages. For a root-domain build, leave `PATH_PREFIX` empty. `SITE_URL` overrides the canonical origin when intentionally moving the site; do not set it to a preview or fallback host. No secret is needed in the frontend.

The build generates `/robots.txt` and `/sitemap.xml` at the Vercel domain root. Submit `https://universe25film.com/sitemap.xml` in Google Search Console for the verified `https://universe25film.com/` URL-prefix property or `sc-domain:universe25film.com` domain property. The Google-issued verification file in `static/google6a0ed5ae6dde6051.html` must remain available at the domain root to retain the owner’s Search Console verification. Search Console verification and index status require account access; a published sitemap alone does not confirm submission or indexing.

## Edit

- `src/data/seo.json`: primary origin, title and concise search/social description.
- `src/data/film.json`: synopsis, contact, social links, cast, credits, festivals, reviews and technical facts.
- `src/data/bios.json`: website biographies.
- `src/data/bts.json`: the production gallery and source filenames.
- `src/data/redRoom.json`: the eight-image red-room story and source order.
- `src/data/statement.json`: director’s statement.
- `src/pages/index.jsx`: page and interactions.
- `src/styles/site.css`: responsive EPK-inspired design.
- `static/press/`: downloadable promotional files; rebuild ZIP after any file changes.
- `docs/CONTENT-SOURCES.md`: provenance, editorial choices, and outstanding source gaps.

The site has no tracking, forms backend, auto-playing background media or third-party fonts. YouTube loads only after clicking Play. Review screener requests open the visitor’s email app and do not expose a screener publicly.

Film images, artwork and promotional text remain the property of their respective rights holders; they are supplied here for the film’s promotional website. Third-party reviews are linked and briefly quoted, not republished.
