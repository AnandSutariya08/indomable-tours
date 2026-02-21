#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const SUPPORTED_INPUT_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DEFAULT_WIDTHS = [480, 768, 1200];
const DEFAULT_INPUT_DIRS = ["public/assets/tours"];
const DEFAULT_OUTPUT_FORMAT = "webp";

const parseArgs = () => {
  const args = process.argv.slice(2);
  const config = {
    inputDirs: DEFAULT_INPUT_DIRS,
    widths: DEFAULT_WIDTHS,
    quality: 72,
    format: DEFAULT_OUTPUT_FORMAT,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--input" && args[i + 1]) {
      config.inputDirs = [args[i + 1]];
      i += 1;
      continue;
    }
    if (arg === "--inputs" && args[i + 1]) {
      config.inputDirs = args[i + 1]
        .split(",")
        .map((dir) => dir.trim())
        .filter(Boolean);
      i += 1;
      continue;
    }
    if (arg === "--widths" && args[i + 1]) {
      config.widths = args[i + 1]
        .split(",")
        .map((w) => Number(w.trim()))
        .filter((w) => Number.isFinite(w) && w > 0);
      i += 1;
      continue;
    }
    if (arg === "--quality" && args[i + 1]) {
      const q = Number(args[i + 1]);
      if (Number.isFinite(q) && q > 0 && q <= 100) config.quality = q;
      i += 1;
      continue;
    }
    if (arg === "--format" && args[i + 1]) {
      const f = args[i + 1].trim().toLowerCase();
      if (f === "webp" || f === "avif") config.format = f;
      i += 1;
      continue;
    }
  }

  return config;
};

const getAllFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return getAllFiles(full);
      return [full];
    })
  );
  return files.flat();
};

const isGeneratedVariant = (filename) => /-\d+\.(webp|avif)$/i.test(filename);

const createVariantPath = (inputFile, width, format) => {
  const dir = path.dirname(inputFile);
  const ext = path.extname(inputFile);
  const base = path.basename(inputFile, ext);
  return path.join(dir, `${base}-${width}.${format}`);
};

const createVariant = async (sharp, inputFile, outputFile, width, quality, format) => {
  const image = sharp(inputFile);
  if (format === "avif") {
    await image
      .resize({ width, withoutEnlargement: true })
      .avif({ quality })
      .toFile(outputFile);
    return;
  }
  await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputFile);
};

const main = async () => {
  const { inputDirs, widths, quality, format } = parseArgs();

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "Missing dependency: sharp\nRun: npm install -D sharp\nThen rerun: npm run images:responsive"
    );
    process.exit(1);
  }

  const sourceFiles = [];
  for (const dir of inputDirs) {
    const absInputDir = path.resolve(process.cwd(), dir);
    try {
      await fs.access(absInputDir);
    } catch {
      console.warn(`Skipping missing input directory: ${absInputDir}`);
      continue;
    }

    const allFiles = await getAllFiles(absInputDir);
    const candidates = allFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      if (!SUPPORTED_INPUT_EXT.has(ext)) return false;
      return !isGeneratedVariant(path.basename(file));
    });
    sourceFiles.push(...candidates);
  }

  if (sourceFiles.length === 0) {
    console.log(`No source images found in: ${inputDirs.join(", ")}`);
    return;
  }

  let generated = 0;
  for (const file of sourceFiles) {
    const meta = await sharp(file).metadata();
    const sourceWidth = typeof meta.width === "number" ? meta.width : 0;
    if (!sourceWidth) continue;

    for (const width of widths) {
      const outputFile = createVariantPath(file, width, format);
      await createVariant(sharp, file, outputFile, width, quality, format);
      generated += 1;
      console.log(`Generated: ${path.relative(process.cwd(), outputFile)}`);
    }
  }

  console.log(`Done. Generated ${generated} responsive variants.`);
};

main().catch((err) => {
  console.error("Failed to generate responsive images:", err);
  process.exit(1);
});
