const fs = require("node:fs");
const path = require("node:path");
exports.onPostBuild = ({ store }) => {
  const root = store.getState().program.directory;
  const url = (
    process.env.SITE_URL || "https://0xmovses.github.io/universe25"
  ).replace(/\/$/, "");
  fs.writeFileSync(
    path.join(root, "public", "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url}/</loc></url></urlset>`,
  );
  fs.writeFileSync(
    path.join(root, "public", "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${url}/sitemap.xml\n`,
  );
};
