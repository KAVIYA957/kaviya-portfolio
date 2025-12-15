import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(projectRoot, "src");

const IGNORE_DIRS = new Set(["node_modules", ".git", "dist"]);
const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      out.push(...(await walk(path.join(dir, entry.name))));
      continue;
    }

    const ext = path.extname(entry.name);
    if (!CODE_EXTS.has(ext)) continue;

    out.push(path.join(dir, entry.name));
  }

  return out;
}

function toPosix(p) {
  return p.replace(/\\/g, "/");
}

function computeRelativeImport(fromFile, atImport) {
  const fromDir = path.dirname(fromFile);
  const targetAbs = path.join(srcRoot, atImport);
  let rel = path.relative(fromDir, targetAbs);

  rel = toPosix(rel);
  if (!rel.startsWith(".")) rel = `./${rel}`;

  return rel;
}

async function rewriteFile(filePath) {
  const original = await fs.readFile(filePath, "utf8");
  let updated = original;

  const patterns = [
    { re: /from\s+(['"])@\/([^'"\n]+)\1/g, kind: "from" },
    { re: /import\s+(['"])@\/([^'"\n]+)\1/g, kind: "side" },
  ];

  for (const { re } of patterns) {
    updated = updated.replace(re, (_m, quote, p1) => {
      const rel = computeRelativeImport(filePath, p1);
      return _m.replace(`@/${p1}`, `${rel}`);
    });
  }

  if (updated !== original) {
    await fs.writeFile(filePath, updated, "utf8");
    return true;
  }

  return false;
}

async function main() {
  const files = await walk(srcRoot);
  let changed = 0;

  for (const f of files) {
    if (await rewriteFile(f)) changed++;
  }

  process.stdout.write(String(changed));
}

await main();
