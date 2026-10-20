const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const seo = require("../src/data/seo.json");
const root = path.join(__dirname, "..");

test("production and Pages builds identify the same primary site", () => {
  assert.equal(seo.siteUrl, "https://universe25film.com");
  for (const prefix of ["", "/universe25"]) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "universe25-seo-test-"));
    fs.mkdirSync(path.join(directory, "public"));
    try {
      const output = execFileSync(process.execPath, ["-e", `
        const config = require("./gatsby-config");
        require("./gatsby-node").onPostBuild({
          store: { getState: () => ({ program: { directory: process.env.SEO_TEST_DIRECTORY } }) }
        });
        process.stdout.write(JSON.stringify(config));
      `], {
        cwd: root,
        env: { ...process.env, SITE_URL: "", PATH_PREFIX: prefix, SEO_TEST_DIRECTORY: directory },
        encoding: "utf8",
      });
      const config = JSON.parse(output);
      assert.equal(config.siteMetadata.siteUrl, seo.siteUrl);
      assert.equal(config.pathPrefix, prefix);
      assert.match(fs.readFileSync(path.join(directory, "public/sitemap.xml"), "utf8"),
        /<loc>https:\/\/universe25film\.com\/<\/loc>/);
      assert.equal(fs.readFileSync(path.join(directory, "public/robots.txt"), "utf8"),
        "User-agent: *\nAllow: /\nSitemap: https://universe25film.com/sitemap.xml\n");
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  }
});

test("the search description identifies the film within its editorial length budget", () => {
  assert.ok(seo.description.length <= 160);
  assert.ok(seo.description.includes("Universe25"));
  assert.ok(seo.description.includes("Richard Melkonian"));
});
