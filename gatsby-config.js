const siteUrl = process.env.SITE_URL || 'https://0xmovses.github.io/universe25';
module.exports = {
  siteMetadata: { title: 'Universe25 — A film by Richard Melkonian', siteUrl },
  pathPrefix: process.env.PATH_PREFIX || '',
  trailingSlash: 'always',
  plugins: [],
};
