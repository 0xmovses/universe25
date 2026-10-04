const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const film = require("../src/data/film.json");
const bios = require("../src/data/bios.json");
const statement = require("../src/data/statement.json");
const bts = require("../src/data/bts.json");
const redRoom = require("../src/data/redRoom.json");
const root = path.join(__dirname, "..");
test("the four biographies and full director statement are present", () => {
  assert.deepEqual(
    bios.map((b) => b.name),
    ["Richard Melkonian", "Giacomo Gex", "Elodie Chiper", "Juanjo L. Salazar"],
  );
  const endings = [
    "premiered at Palm Springs 2020.",
    "hidden in the Philippines.",
    "film magazines and poetry publications.",
    "longer-format storytelling.",
  ];
  for (const [i, b] of bios.entries())
    assert.ok(b.paragraphs.at(-1).endsWith(endings[i]), b.name);
  assert.ok(statement.at(-1).endsWith("share it with the world."));
  assert.ok(statement.join(" ").includes("string quartet"));
});
test("promotional downloads are real, non-empty files", () => {
  for (const file of [
    "Universe25-EPK.pdf",
    "Universe25-press-kit.zip",
    "poster.jpg",
    ...film.gallery.map((g) => g.id + ".jpg"),
  ])
    assert.ok(
      fs.statSync(path.join(root, "static/press", file)).size > 1000,
      file,
    );
  assert.equal(
    fs
      .readFileSync(path.join(root, "static/press/Universe25-EPK.pdf"))
      .subarray(0, 5)
      .toString(),
    "%PDF-",
  );
});
test("review attribution and film identity are preserved", () => {
  assert.equal(film.trailerId, "i_0Imx6azDg");
  assert.equal(
    film.reviews[0].url,
    "https://filmthreat.com/reviews/universe25/",
  );
  for (const r of film.reviews) {
    assert.ok(r.author && r.date);
    assert.ok(r.quote.split(/\s+/).length <= 25);
    assert.equal(new URL(r.url).protocol, "https:");
  }
});
test("all responsive still and portrait variants exist", () => {
  for (const id of [
    ...film.gallery.map((g) => g.id),
    ...bios.map((b) => b.id),
    ...bts.map((photo) => photo.id),
    ...redRoom.map((photo) => photo.id),
    "mott-lamb",
  ])
    for (const w of [640, 1280, 1920])
      assert.ok(
        fs.statSync(path.join(root, `static/images/${id}-${w}.webp`)).size > 0,
      );
});
test("the red-room sequence follows the eight-image post and identifies its sources", () => {
  assert.equal(redRoom.length, 8);
  assert.equal(redRoom.at(-1).sourceFile, "Instagram carousel image 8");
  for (const photo of redRoom.slice(0, 7)) {
    assert.equal(bts.find((item) => item.id === photo.id)?.sourceFile, photo.sourceFile);
  }
});
