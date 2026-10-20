import fs from "node:fs";
import * as topojson from "topojson-client";
import { geoPath, geoAlbersUsa } from "d3-geo";

const topo = JSON.parse(fs.readFileSync("node_modules/us-atlas/states-10m.json", "utf8"));
const fc = topojson.feature(topo, topo.objects.states);

const W = 960, H = 600;
const projection = geoAlbersUsa().fitExtent([[6, 6], [W - 6, H - 6]], fc);
const path = geoPath(projection);

const src = fs.readFileSync("src/data/states.ts", "utf8");
const byName = new Map();
for (const m of src.matchAll(/name: "([^"]+)", abbr: "([A-Z]{2})", slug: "([a-z-]+)"/g)) {
  byName.set(m[1], { abbr: m[2], slug: m[3] });
}

// States too small to hold a label inside their own shape.
const LEADER = new Set(["VT","NH","MA","RI","CT","NJ","DE","MD","DC"]);

const out = [];
for (const f of fc.features) {
  const name = f.properties.name;
  const meta = byName.get(name);
  if (!meta) continue;                       // territories we don't serve
  const d = path(f);
  if (!d) continue;
  const c = path.centroid(f);
  out.push({
    name, abbr: meta.abbr, slug: meta.slug, d,
    cx: Math.round(c[0] * 10) / 10,
    cy: Math.round(c[1] * 10) / 10,
    outside: LEADER.has(meta.abbr),
  });
}
out.sort((a, b) => a.name.localeCompare(b.name));
console.error("baked", out.length, "of", byName.size);

const missing = [...byName.keys()].filter((n) => !out.some((o) => o.name === n));
if (missing.length) console.error("MISSING:", missing.join(", "));

const body = `/**
 * Real US state geometry, baked at build time from \`us-atlas\` (states-10m,
 * US Census TIGER) projected with d3-geo's Albers USA into a ${W}x${H} viewBox.
 * Regenerate with \`node scripts/bake-map.mjs\` if the state list ever changes.
 * Public domain source data; nothing here is hand-drawn or approximated.
 */
export const MAP_VIEWBOX = "0 0 ${W} ${H}";

export type StateShape = {
  name: string;
  abbr: string;
  slug: string;
  /** SVG path data in the ${W}x${H} viewBox. */
  d: string;
  /** Label anchor — the projected centroid of the state. */
  cx: number;
  cy: number;
  /** True when the state is too small to carry its label inside its own shape. */
  outside: boolean;
};

export const stateShapes: StateShape[] = ${JSON.stringify(out, null, 0).replace(/\},\{/g, "},\n  {").replace(/^\[/, "[\n  ").replace(/\]$/, ",\n]")};
`;
fs.writeFileSync("src/data/us-map.ts", body);
console.error("wrote src/data/us-map.ts", (fs.statSync("src/data/us-map.ts").size / 1024).toFixed(0), "KB");
