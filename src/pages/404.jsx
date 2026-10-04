import * as React from "react";
import { Link } from "gatsby";
import "../styles/site.css";
export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">UNIVERSE25 / LOST POST</p>
      <h1>
        This message
        <br />
        lost its way.
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <Link className="button green" to="/">
        Return to the film ↗
      </Link>
    </main>
  );
}
export const Head = () => (
  <>
    <html lang="en" />
    <title>Page not found — Universe25</title>
    <meta name="robots" content="noindex" />
  </>
);
