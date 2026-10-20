const seo = require("./src/data/seo.json");
const siteUrl = (process.env.SITE_URL || seo.siteUrl).replace(/\/$/, "");
module.exports = {
  siteMetadata: { title: seo.title, siteUrl },
  pathPrefix: process.env.PATH_PREFIX || "",
  trailingSlash: "always",
  plugins: [],
};
