import * as React from "react";
import { withPrefix, graphql } from "gatsby";
import film from "../data/film.json";
import bios from "../data/bios.json";
import statement from "../data/statement.json";
import btsGallery from "../data/bts.json";
import redRoomGallery from "../data/redRoom.json";
import "../styles/site.css";
import Arrow from "../components/Arrow";

const premierePhotos = [
  { id: "premiere-14", alt: "Guests gathered after the Universe25 UK premiere." },
  { id: "premiere-10", alt: "Two guests celebrating at the Universe25 afterparty." },
  { id: "premiere-13", alt: "A closely packed group at the Universe25 afterparty." },
  { id: "premiere-4", alt: "Guests gathered around a candlelit table at the Universe25 afterparty." },
].map((photo) => ({ ...photo, festival: true }));
const btsPhotos = btsGallery.map((photo) => ({ ...photo, bts: true }));
const redRoomPhotos = redRoomGallery.map((photo) => ({ ...photo, story: true }));
const premierePost = "https://www.instagram.com/p/DSIh881CIze/";
const redRoomPost = "https://www.instagram.com/p/DaQwd0rjkgi/";
const asset = (path) => withPrefix(path);
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
  widths = [640, 1280, 1920],
}) {
  return (
    <img
      className={className}
      src={asset(`/images/${name}-1280.webp`)}
      srcSet={widths
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
function PressAside({ review }) {
  return (
    <aside className="press-aside" aria-label={`Review excerpt from ${review.outlet}`}>
      <span className="press-aside-label">FROM THE REVIEWS / {review.outlet}</span>
      <blockquote>“{review.quote}”</blockquote>
      <a href={review.url} target="_blank" rel="noreferrer">
        {review.author} · Read the review <Arrow />
      </a>
    </aside>
  );
}
const request = `mailto:${film.email}?subject=${encodeURIComponent("Universe25 — review screener request")}&body=${encodeURIComponent("Hello Richard,\n\nI would like to cover Universe25.\n\nName / publication / channel:\nProfile or website:\nPlanned coverage and timing:\nReview screener request:\n\nThank you!")}`;

export default function Home() {
  const [menu, setMenu] = React.useState(false);
  const [modal, setModal] = React.useState(null);
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const galleryToggle = React.useRef(null);
  const [message, setMessage] = React.useState("");
  const dialog = React.useRef(null);
  React.useEffect(() => {
    if (modal && dialog.current && !dialog.current.open)
      dialog.current.showModal();
    if (!modal && dialog.current?.open) dialog.current.close();
    document.body.classList.toggle("modal-open", !!modal);
    return () => document.body.classList.remove("modal-open");
  }, [modal]);
  function stepPhoto(direction) {
    setModal((current) => {
      const photos = current?.story ? redRoomPhotos : btsPhotos;
      const index = photos.findIndex((photo) => photo.id === current?.id);
      if (index < 0) return current;
      return { type: "image", ...photos[(index + direction + photos.length) % photos.length] };
    });
  }
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
            ["statement", "Director’s statement"],
            ["stills", "Inside the film"],
            ["behind-the-scenes", "On set"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a className="nav-contact" href="#press" onClick={() => setMenu(false)}>
            Press <Arrow />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="film-title">
          <Still
            name="mirror-hero"
            widths={[640, 1280, 1920, 2834]}
            alt="Mott holds a hair comb across his eyes in Universe25."
            className="hero-image"
            eager
            sizes="100vw"
          />
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
            <h1 id="film-title">
              UNIVERSE<span className="title-number"><span className="raised-two">2</span>5</span>
            </h1>
            <div className="hero-bottom">
              <p>{film.logline}</p>
              <div className="hero-actions">
                <button
                  className="button green"
                  onClick={() => setModal({ type: "trailer" })}
                >
                  <Play /> Watch the trailer
                </button>
                <a className="text-link" href="#film">
                  Follow the story <span aria-hidden="true">↓</span>
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
          aria-label="Festival premieres and official selections"
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
          <span>
            FANTASPOA <small>OFFICIAL SELECTION / 2025</small>
          </span>
          <span>
            POPCORN FRIGHTS <small>OFFICIAL SELECTION / 2025</small>
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
            {film.reviews.slice(1).filter((r) => !r.placement).map((r) => (
              <figure key={r.outlet} className={r.desktopOnly ? "desktop-review" : undefined}>
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
            <h2>{film.logline}</h2>
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
        <PressAside review={film.reviews.find((r) => r.placement === "statement")} />
        <section className="statement section" id="statement" aria-labelledby="statement-title">
          <SectionLabel number="03">IN THE DIRECTOR’S WORDS</SectionLabel>
          <h2 id="statement-title" className="statement-quote">
            “My primary goal
            <br />
            was to conjure
            <br />
            <em>an original mood.</em>”
          </h2>
          <p className="intro">Music, image and text. A film discovered in the making.</p>
          <p className="statement-context">
            Written as it was shot, composed as it was edited: Richard Melkonian’s debut feature grew through a fluid exchange between storytelling, performance and music.
          </p>
          <p className="byline">
            <a href="https://www.richardmelkonian.com/" target="_blank" rel="noreferrer">RICHARD MELKONIAN</a>
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
        </section>
        <section className="trailer section" id="trailer">
          <SectionLabel number="04">ENTER THE WORLD</SectionLabel>
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
              <SectionLabel number="05">FRAGMENTS FROM THE FILM</SectionLabel>
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
                  <Arrow />
                </span>
              </button>
            ))}
          </div>
        </section>
        <PressAside review={film.reviews.find((r) => r.placement === "gallery")} />
        <section className="festivals section" id="festivals">
          <SectionLabel number="06">ON THE BIG SCREEN</SectionLabel>
          <div className="section-heading">
            <h2>Festival journey.</h2>
            <span className="eyebrow">PREMIERES & SELECTIONS</span>
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
          <div className="premiere-journal">
            <div className="premiere-heading">
              <div>
                <p className="eyebrow">LONDON / 2025</p>
                <p>
                  Universe25 UK premiere & afterparty.
                  <br />
                  ICA London · Christabel’s Sunday Service
                </p>
              </div>
              <a href={premierePost} target="_blank" rel="noreferrer">
                View the original post <Arrow />
              </a>
            </div>
            <div className="premiere-grid">
              {premierePhotos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setModal({ type: "image", ...photo })}
                  aria-label={`Enlarge photo ${i + 1}: ${photo.alt}`}
                >
                  <Still
                    name={photo.id}
                    alt={photo.alt}
                    sizes="(max-width: 700px) 45vw, 23vw"
                  />
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")} <Arrow />
                  </span>
                </button>
              ))}
            </div>
            <p className="premiere-credit">
              Photographs by{" "}
              <a
                href="https://www.instagram.com/roscoreckless/"
                target="_blank"
                rel="noreferrer"
              >
                @roscoreckless
              </a>{" "}
              · AFS London (Armenian Film Society London) · Armenian Film Festival London
              · Christabel’s Sunday Service · ICA London
            </p>
          </div>
        </section>
        <section className="bts section" id="behind-the-scenes">
          <SectionLabel number="07">BEHIND THE SCENES</SectionLabel>
          <div className="section-heading">
            <span className="eyebrow">PRODUCTION PHOTOGRAPHS / {btsPhotos.length} FRAGMENTS</span>
          </div>
          <div className="gallery-grid bts-grid">
            {btsPhotos.slice(0, 3).map((photo, i) => (
              <button key={photo.id}
                onClick={() => setModal({ type: "image", ...photo })}
                aria-label={`Enlarge behind-the-scenes photo ${i + 1}: ${photo.alt}`}>
                <Still name={photo.id} alt={photo.alt}
                  sizes="(max-width: 700px) 100vw, 31vw" />
                <span><span>0{i + 1} / ON SET</span><Arrow /></span>
              </button>
            ))}
          </div>
          <div className="gallery-controls">
            <button className="text-link" ref={galleryToggle}
              aria-expanded={galleryOpen} aria-controls="bts-full-gallery"
              onClick={() => setGalleryOpen(!galleryOpen)}>
              {galleryOpen ? "Close the gallery" : `Open the full BTS gallery · ${btsPhotos.length} photographs`}
              <span aria-hidden="true">{galleryOpen ? "−" : "+"}</span>
            </button>
          </div>
          <div id="bts-full-gallery" hidden={!galleryOpen}>
            {galleryOpen && <>
              <div className="gallery-grid bts-contact-sheet">
                {btsPhotos.slice(3).map((photo, i) => (
                  <button key={photo.id} onClick={() => setModal({ type: "image", ...photo })}
                    aria-label={`Enlarge behind-the-scenes photo ${i + 4}: ${photo.alt}`}>
                    <Still name={photo.id} alt={photo.alt} sizes="(max-width: 700px) 45vw, 22vw" />
                    <span><span>{String(i + 4).padStart(3, "0")} / ON SET</span><Arrow /></span>
                  </button>
                ))}
              </div>
              <button className="text-link gallery-close" onClick={() => {
                setGalleryOpen(false);
                galleryToggle.current?.focus();
                galleryToggle.current?.scrollIntoView({ block: "center" });
              }}>Close the gallery <span aria-hidden="true">−</span></button>
            </>}
          </div>
        </section>
        <section className="red-room section" id="red-room" aria-labelledby="red-room-title">
          <SectionLabel number="08">FROM THE SET / JOCASTA</SectionLabel>
          <div className="red-room-intro">
            <div>
              <p className="eyebrow">A ROOM BUILT FOR A SCENE</p>
              <h2 id="red-room-title">The red room.</h2>
            </div>
            <div>
              <p>For Mott and Jocasta’s hotel-room scene, the production built its own red-walled room inside a warehouse in Kent. The set gave the team control over the light, colour and space around the performers.</p>
              <p>Follow the room from construction and rehearsal to a frame from the finished film.</p>
              <a className="text-link" href={redRoomPost} target="_blank" rel="noreferrer">Richard’s original on-set post <Arrow /></a>
            </div>
          </div>
          <div className="red-room-grid">
            {redRoomPhotos.map((photo, i) => (
              <button key={photo.id} onClick={() => setModal({ type: "image", ...photo })}
                aria-label={`Enlarge red-room image ${i + 1}: ${photo.alt}`}>
                <Still name={photo.id} alt={photo.alt} sizes="(max-width: 700px) 45vw, 24vw" />
                <span><b>{String(i + 1).padStart(2, "0")}</b> {photo.caption}</span>
              </button>
            ))}
          </div>
          <p className="red-room-note">01–07 / behind the scenes · 08 / frame from the film</p>
        </section>
        <section className="people section" id="people">
          <SectionLabel number="09">THE PEOPLE BEHIND THE FILM</SectionLabel>
          <h2>Cast & crew.</h2>
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
                    {b.attribution && (
                      <p className="source-note">
                        {b.sourceUrl ? (
                          <a
                            href={b.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {b.attribution} <Arrow />
                          </a>
                        ) : (
                          b.attribution
                        )}
                      </p>
                    )}
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
            Richard’s biography supplied by the filmmaker; Giacomo’s adapted
            from his official website. Other biographies and credits follow the
            original press kit, with filmmaker supplied credit corrections and additions.
          </p>
        </section>
        <section className="press section" id="press">
          <SectionLabel number="10">PRESS / CONTACT & MATERIALS</SectionLabel>
          <div className="press-layout">
            <div>
              <h2>Press.</h2>
              <div className="press-requests">
                <a className="text-link" href={request}>Request a screener <Arrow /></a>
                <a className="text-link" href={`mailto:${film.email}?subject=${encodeURIComponent("Universe25 — interview request")}`}>Arrange an interview <Arrow /></a>
                <a className="text-link" href={`mailto:${film.email}?subject=${encodeURIComponent("Universe25 — screening enquiry")}`}>Enquire about a screening <Arrow /></a>
              </div>
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
                meta="ZIP · EPK, POSTER & 6 FILM STILLS"
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
                  Copy synopsis<small>LOGLINE & SYNOPSIS</small>
                </span>
                <Arrow />
              </button>
              <button className="download" onClick={share}>
                <span>
                  Share the film<small>COPY OR SHARE THE LINK</small>
                </span>
                <Arrow />
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
        <div className="footer-industry" aria-label="Film stock and processing credits">
          <img src={asset("/images/shot-on-kodak-film.png")} alt="Shot on Kodak Film" loading="lazy" />
          <span>FILM PROCESSED &amp; SCANNED AT CINELAB UK</span>
        </div>
        <a href="#" className="footer-title" aria-label="Back to top">
          UNIVERSE25<span aria-hidden="true">↑</span>
        </a>
        <div>
          <span>AN ENTROPY FILMS PRODUCTION</span>
          <span>A FILM BY RICHARD MELKONIAN</span>
          <a href={film.instagram} target="_blank" rel="noreferrer">
            @richard_melkonian <Arrow />
          </a>
          <nav className="footer-film-links" aria-label="Film profiles">
            <a href="https://www.imdb.com/title/tt22802312/" target="_blank" rel="noreferrer">
              IMDb <Arrow />
            </a>
            <a href="https://letterboxd.com/film/universe-25-2025/" target="_blank" rel="noreferrer">
              Letterboxd <Arrow />
            </a>
          </nav>
        </div>
      </footer>
      <div className="mobile-actions">
        <button onClick={() => setModal({ type: "trailer" })}>
          <Play /> Watch trailer
        </button>
        <a href="#film">
          Explore the film <Arrow />
        </a>
      </div>
      <dialog
        ref={dialog}
        className={
          modal?.type === "image" ? "media-dialog image-dialog" : "media-dialog"
        }
        onKeyDown={(event) => {
          if (!modal?.bts && !modal?.story) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            stepPhoto(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onCancel={() => setModal(null)}
        onClose={() => setModal(null)}
        aria-label={
          modal?.type === "image"
            ? modal.story
              ? "Red room image"
              : modal.bts
              ? "Behind-the-scenes photograph"
              : modal.festival
              ? "UK premiere and afterparty photograph"
              : "Film still"
            : "Universe25 official trailer"
        }
      >
        <div className="dialog-head">
          <span>
            {modal?.type === "image"
              ? modal.story
                ? "UNIVERSE25 / THE RED ROOM"
                : modal.bts
                ? "UNIVERSE25 / BEHIND THE SCENES"
                : modal.festival
                ? "UNIVERSE25 / UK PREMIERE & AFTERPARTY"
                : "UNIVERSE25 / FILM STILL"
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
                Watch directly on YouTube <Arrow />
              </a>
            </p>
          </>
        ) : modal?.type === "image" ? (
          <>
            <Still name={modal.id} alt={modal.alt} eager sizes="95vw" />
            {(modal.bts || modal.story) && <div className="viewer-navigation">
              <button onClick={() => stepPhoto(-1)} aria-label="Previous image">← Previous</button>
              <span role="status">{(modal.story ? redRoomPhotos : btsPhotos).findIndex((photo) => photo.id === modal.id) + 1} / {(modal.story ? redRoomPhotos : btsPhotos).length}</span>
              <button onClick={() => stepPhoto(1)} aria-label="Next image">Next →</button>
            </div>}
            <p>
              {modal.alt}{" "}
              {modal.bts || modal.story ? null : modal.festival ? (
                <a
                  href="https://www.instagram.com/roscoreckless/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Photograph by @roscoreckless <Arrow />
                </a>
              ) : (
                <a href={asset(`/press/${modal.id}.jpg`)} download>
                  Download still ↓
                </a>
              )}
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
        content="Mott holding a hair comb across his eyes in Universe25"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={film.logline} />
      <meta name="twitter:image" content={`${siteUrl}/images/social.jpg`} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </>
  );
}
