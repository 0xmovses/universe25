import * as React from "react";
import { withPrefix, graphql } from "gatsby";
import film from "../data/film.json";
import bios from "../data/bios.json";
import statement from "../data/statement.json";
import "../styles/site.css";

const asset = (path) => withPrefix(path);
const Arrow = () => <span aria-hidden="true">↗</span>;
const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 4v16l13-8z" />
  </svg>
);
function Still({
  name,
  alt,
  className = "",
  eager = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}) {
  return (
    <img
      className={className}
      src={asset(`/images/${name}-1280.webp`)}
      srcSet={[640, 1280, 1920]
        .map((w) => `${asset(`/images/${name}-${w}.webp`)} ${w}w`)
        .join(", ")}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}
function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
function Download({ href, children, meta }) {
  return (
    <a className="download" href={asset(href)} download>
      <span>
        {children}
        <small>{meta}</small>
      </span>
      <span aria-hidden="true">↓</span>
    </a>
  );
}
const request = `mailto:${film.email}?subject=${encodeURIComponent("Universe25 — review screener / interview request")}&body=${encodeURIComponent("Hello Richard,\n\nI would like to cover Universe25.\n\nName / publication / channel:\nProfile or website:\nPlanned coverage and timing:\nScreener or interview request:\n\nThank you!")}`;

export default function Home() {
  const [menu, setMenu] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const dialog = React.useRef(null);
  React.useEffect(() => {
    if (modal && dialog.current && !dialog.current.open)
      dialog.current.showModal();
    if (!modal && dialog.current?.open) dialog.current.close();
    document.body.classList.toggle("modal-open", !!modal);
    return () => document.body.classList.remove("modal-open");
  }, [modal]);
  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(label);
    } catch {
      setMessage(
        "Copy is unavailable here. Select the text, or use your browser’s Share option.",
      );
    }
  }
  async function share() {
    const url = window.location.href.split("#")[0];
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Universe25 — A film by Richard Melkonian",
          url,
        });
        return;
      } catch (e) {
        if (e.name === "AbortError") return;
      }
    }
    await copy(url, "Site link copied.");
  }
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="header">
        <a className="wordmark" href="#" aria-label="Universe25 home">
          UNIVERSE25
          <span className="signal" />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close −" : "Menu +"}
        </button>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={menu ? "is-open" : ""}
        >
          {[
            ["film", "The film"],
            ["reviews", "Reviews"],
            ["festivals", "Festivals"],
            ["people", "The people"],
            ["press", "Press kit"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a className="nav-contact" href={request}>
            Request a screener <Arrow />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="film-title">
          <Still
            name="mott-lamb"
            alt="Mott holds a lamb on the bank of the Thames in a black-and-white frame from Universe25."
            className="hero-image"
            eager
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="hero-top">
            <span>
              A FILM BY
              <br />
              <strong>RICHARD MELKONIAN</strong>
            </span>
            <span>
              84 MINUTES
              <br />
              SHOT ON 16MM
            </span>
          </div>
          <div className="hero-content">
            <p className="eyebrow">
              AN ANGEL. THREE TASKS. THE END OF THE WORLD.
            </p>
            <h1 id="film-title">
              UNIVERSE<span>25</span>
            </h1>
            <div className="hero-bottom">
              <p>
                An angel from the future.
                <br />
                An all-too-human world.
              </p>
              <div className="hero-actions">
                <button
                  className="button green"
                  onClick={() => setModal({ type: "trailer" })}
                >
                  <Play /> Watch the trailer
                </button>
                <a className="text-link" href="#press">
                  Explore the press kit <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
          <div className="frame-number" aria-hidden="true">
            U25 / FRAME 001
          </div>
        </section>
        <div
          className="festival-ribbon"
          aria-label="Selected festival screenings"
        >
          <span>
            SLAMDANCE <small>WORLD PREMIERE / 2025</small>
          </span>
          <span>
            CHATTANOOGA <small>FILM FESTIVAL / 2025</small>
          </span>
          <span>
            ARMENIAN FILM FESTIVAL <small>LONDON · ICA / 2025</small>
          </span>
        </div>
        <section className="reviews section" id="reviews">
          <SectionLabel number="01">THE WORD OUTSIDE</SectionLabel>
          <div className="review-lead">
            <div>
              <span className="score">
                9.5<span>/10</span>
              </span>
              <span className="eyebrow">FILM THREAT</span>
            </div>
            <figure>
              <blockquote>
                “Highly original and
                <br className="desktop" /> completely absorbing.”
              </blockquote>
              <figcaption>
                <a href={film.reviews[0].url} target="_blank" rel="noreferrer">
                  Bobby LePire · Film Threat <Arrow />
                </a>
              </figcaption>
            </figure>
          </div>
          <div className="reviews-grid">
            {film.reviews.slice(1).map((r) => (
              <figure key={r.outlet}>
                <blockquote lang={r.language}>“{r.quote}”</blockquote>
                {r.translation && (
                  <p className="translation">{r.translation}</p>
                )}
                <figcaption>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.outlet} <Arrow />
                  </a>
                  <span>
                    {r.author} · {r.date}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="story" id="film">
          <div className="story-copy">
            <SectionLabel number="02">THE FILM</SectionLabel>
            <h2>
              Sent to save us.
              <br />
              <em>Tempted to be us.</em>
            </h2>
            <p className="intro">{film.logline}</p>
            {film.synopsis.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="story-tags">
              <span>A MUSICAL DRAMA</span>
              <span>LONDON ↔ BUCHAREST</span>
              <span>16MM</span>
            </div>
          </div>
          <div className="story-image">
            <Still
              name="telephone"
              alt="Mott listens to his mysterious caller under an electric green light."
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <span className="image-caption">Giacomo Gex as Mott</span>
          </div>
        </section>
        <section className="trailer section" id="trailer">
          <SectionLabel number="03">ENTER THE WORLD</SectionLabel>
          <div className="section-heading">
            <h2>The trailer.</h2>
            <a
              className="text-link"
              href={film.trailer}
              target="_blank"
              rel="noreferrer"
            >
              Watch on YouTube <Arrow />
            </a>
          </div>
          <button
            className="trailer-poster"
            onClick={() => setModal({ type: "trailer" })}
            aria-label="Play Universe25 official trailer"
          >
            <Still name="chandelier" alt="" sizes="100vw" />
            <span className="play-circle">
              <Play />
            </span>
            <span className="trailer-label">UNIVERSE25 / OFFICIAL TRAILER</span>
          </button>
        </section>
        <section className="gallery section" id="stills">
          <div className="section-heading">
            <div>
              <SectionLabel number="04">FRAGMENTS FROM THE FILM</SectionLabel>
              <h2>A world on celluloid.</h2>
            </div>
            <a
              className="text-link"
              href={asset("/press/Universe25-press-kit.zip")}
              download
            >
              Download press assets ↓
            </a>
          </div>
          <div className="gallery-grid">
            {film.gallery.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setModal({ type: "image", ...g })}
                aria-label={`Enlarge still ${i + 1}: ${g.alt}`}
              >
                <Still name={g.id} alt={g.alt} />
                <span>
                  <span>0{i + 1} / UNIVERSE25</span>
                  <span aria-hidden="true">↗</span>
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="festivals section" id="festivals">
          <SectionLabel number="05">ON THE BIG SCREEN</SectionLabel>
          <div className="section-heading">
            <h2>Festival journey.</h2>
            <span className="eyebrow">SCREENING ARCHIVE</span>
          </div>
          <div className="festival-list">
            {film.festivals.map((f, i) => (
              <a key={f.name} href={f.url} target="_blank" rel="noreferrer">
                <span className="festival-index">0{i + 1}</span>
                <div>
                  <small>{f.label}</small>
                  <h3>{f.name}</h3>
                  <p>{f.location}</p>
                </div>
                <span className="festival-date">{f.date}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>
        <section className="statement section">
          <SectionLabel number="06">IN THE DIRECTOR’S WORDS</SectionLabel>
          <div className="statement-layout">
            <h2>
              “My primary goal
              <br />
              was to conjure
              <br />
              <em>an original mood.</em>”
            </h2>
            <div>
              <p className="intro">
                Music, image and text. A film discovered in the making.
              </p>
              <p>
                Written as it was shot, composed as it was edited: Richard
                Melkonian’s debut feature grew through a fluid exchange between
                storytelling, performance and music.
              </p>
              <p className="byline">
                RICHARD MELKONIAN
                <br />
                <span>Writer · Director · Composer</span>
              </p>
              <details>
                <summary>
                  Read the full director’s statement{" "}
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="long-copy">
                  {statement.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </section>
        <section className="people section" id="people">
          <SectionLabel number="07">THE PEOPLE BEHIND THE FILM</SectionLabel>
          <h2>A shared vision.</h2>
          <div className="people-grid">
            {bios.map((b) => (
              <article key={b.id}>
                <Still
                  name={b.id}
                  alt={b.name}
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                />
                <h3>{b.name}</h3>
                <p className="role">{b.role}</p>
                <p>{b.paragraphs[0]}</p>
                <details>
                  <summary>
                    Full biography <span aria-hidden="true">+</span>
                  </summary>
                  <div className="long-copy">
                    {b.paragraphs.slice(1).map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </details>
              </article>
            ))}
          </div>
          <div className="credits">
            <div>
              <h3>Cast</h3>
              <dl>
                {film.cast.map(([a, r]) => (
                  <div key={a}>
                    <dt>{a}</dt>
                    <dd>{r}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3>Creative credits</h3>
              <dl>
                {film.credits.map(([r, n]) => (
                  <div key={r}>
                    <dt>{r}</dt>
                    <dd>{n}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="source-note">
            Biographies and credits adapted from the film’s original electronic
            press kit.
          </p>
        </section>
        <section className="press section" id="press">
          <SectionLabel number="08">FOR PRESS & CREATORS</SectionLabel>
          <div className="press-layout">
            <div>
              <h2>
                Let’s talk
                <br />
                about <em>Universe25.</em>
              </h2>
              <p className="intro">
                Reviewing the film? Making a video? Planning an interview?
              </p>
              <p>
                Find the story, credits, photography and press kit here. For a
                review screener, interviews or screening enquiries, get in touch
                with Richard.
              </p>
              <a className="button green" href={request}>
                Request a screener / interview <Arrow />
              </a>
              <a className="email-link" href={`mailto:${film.email}`}>
                {film.email}
              </a>
              <div className="social-links">
                <a href={film.instagram} target="_blank" rel="noreferrer">
                  Instagram <Arrow />
                </a>
                <a href={film.trailer} target="_blank" rel="noreferrer">
                  YouTube <Arrow />
                </a>
                <a
                  href="https://www.imdb.com/title/tt22802312/"
                  target="_blank"
                  rel="noreferrer"
                >
                  IMDb <Arrow />
                </a>
                <a
                  href="https://letterboxd.com/film/universe-25-2025/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Letterboxd <Arrow />
                </a>
              </div>
            </div>
            <div className="press-downloads">
              <Download
                href="/press/Universe25-EPK.pdf"
                meta="PDF · SYNOPSIS, BIOS & CREDITS"
              >
                Electronic press kit
              </Download>
              <Download
                href="/press/Universe25-press-kit.zip"
                meta="ZIP · EPK, POSTER & 5 FILM STILLS"
              >
                Complete press assets
              </Download>
              <Download href="/press/poster.jpg" meta="JPG · ORIGINAL KEY ART">
                Film poster
              </Download>
              <button
                className="download"
                onClick={() =>
                  copy(
                    `${film.title}\nA film by ${film.director}\n\n${film.logline}\n\n${film.synopsis.join("\n\n")}`,
                    "Synopsis copied.",
                  )
                }
              >
                <span>
                  Copy synopsis<small>READY FOR YOUR REVIEW NOTES</small>
                </span>
                <span aria-hidden="true">↗</span>
              </button>
              <button className="download" onClick={share}>
                <span>
                  Share the film<small>SEND THE WEBSITE TO SOMEONE</small>
                </span>
                <span aria-hidden="true">↗</span>
              </button>
              <p className="copy-status" role="status" aria-live="polite">
                {message}
              </p>
            </div>
          </div>
          <div className="facts">
            {film.facts.map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <a href="#" className="footer-title" aria-label="Back to top">
          UNIVERSE25<span aria-hidden="true">↑</span>
        </a>
        <div>
          <span>AN ENTROPY FILMS PRODUCTION</span>
          <span>A FILM BY RICHARD MELKONIAN</span>
          <a href={film.instagram} target="_blank" rel="noreferrer">
            @richard_melkonian <Arrow />
          </a>
        </div>
      </footer>
      <div className="mobile-actions">
        <button onClick={() => setModal({ type: "trailer" })}>
          <Play /> Watch trailer
        </button>
        <a href="#press">
          Press kit <span aria-hidden="true">↗</span>
        </a>
      </div>
      <dialog
        ref={dialog}
        className={
          modal?.type === "image" ? "media-dialog image-dialog" : "media-dialog"
        }
        onCancel={() => setModal(null)}
        onClose={() => setModal(null)}
        aria-label={
          modal?.type === "image" ? "Film still" : "Universe25 official trailer"
        }
      >
        <div className="dialog-head">
          <span>
            {modal?.type === "image"
              ? "UNIVERSE25 / FILM STILL"
              : "UNIVERSE25 / OFFICIAL TRAILER"}
          </span>
          <button
            autoFocus
            onClick={() => setModal(null)}
            aria-label="Close viewer"
          >
            Close ×
          </button>
        </div>
        {modal?.type === "trailer" ? (
          <>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${film.trailerId}?autoplay=1&rel=0`}
              title="Universe25 official trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <p className="video-fallback">
              Player unavailable?{" "}
              <a href={film.trailer} target="_blank" rel="noreferrer">
                Watch directly on YouTube ↗
              </a>
            </p>
          </>
        ) : modal?.type === "image" ? (
          <>
            <Still name={modal.id} alt={modal.alt} eager sizes="95vw" />
            <p>
              {modal.alt}{" "}
              <a href={asset(`/press/${modal.id}.jpg`)} download>
                Download still ↓
              </a>
            </p>
          </>
        ) : null}
      </dialog>
    </>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export function Head({ data }) {
  const siteUrl = data.site.siteMetadata.siteUrl.replace(/\/$/, "");
  const title = "Universe25 — A film by Richard Melkonian";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: film.title,
    url: `${siteUrl}/`,
    description: film.logline,
    duration: "PT84M",
    director: { "@type": "Person", name: film.director },
    actor: film.cast.map(([name]) => ({ "@type": "Person", name })),
    image: `${siteUrl}/images/social.jpg`,
    inLanguage: ["en", "ro"],
    countryOfOrigin: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Romania" },
    ],
    productionCompany: { "@type": "Organization", name: "Entropy Films" },
    sameAs: [
      "https://www.imdb.com/title/tt22802312/",
      "https://letterboxd.com/film/universe-25-2025/",
    ],
  };
  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta
        name="description"
        content={`${film.logline} Watch the trailer, read reviews, meet the filmmakers and download the official press kit.`}
      />
      <meta name="theme-color" content="#090a09" />
      <link rel="icon" type="image/svg+xml" href={asset("/favicon.svg")} />
      <link rel="canonical" href={`${siteUrl}/`} />
      <meta property="og:type" content="video.movie" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={film.logline} />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:image" content={`${siteUrl}/images/social.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Mott holding a lamb by the Thames in Universe25"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={film.logline} />
      <meta name="twitter:image" content={`${siteUrl}/images/social.jpg`} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </>
  );
}
