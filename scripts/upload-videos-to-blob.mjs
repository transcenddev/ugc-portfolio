// One-time uploader: uploads public/assets/videos/browser-ready/** and the
// public/assets/testimonials/** video into the Vercel Blob store as videos/**
// and videos/testimonials/** (the local `assets/` tree is not part of the path).
//
// Usage:
//   node --env-file=.env.local scripts/upload-videos-to-blob.mjs
//   node --env-file=.env.local scripts/upload-videos-to-blob.mjs <video path>
//
// With no argument, uploads the whole library plus the testimonial. With one
// relative path (relative to public/assets/videos/browser-ready/ or public/),
// uploads only that file.
//
// Requires BLOB_READ_WRITE_TOKEN. Uploads are idempotent: deterministic
// pathnames overwrite in place.

import { existsSync, openAsBlob } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";

const CONCURRENCY = 4;

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const publicDir = path.join(projectRoot, "public");
const videoRoot = path.join(publicDir, "assets", "videos", "browser-ready");
const testimonialRoot = path.join(publicDir, "assets", "testimonials");

/** Production Blob tree; the local `assets/` prefixes are not part of it. */
const BLOB_VIDEO_ROOT = "videos";
const BLOB_TESTIMONIAL_ROOT = "videos/testimonials";

const extraFiles = [
  path.join(testimonialRoot, "ian_madrid_testimonial.mp4"),
];

/** Recursively collects .mp4 files under `dir`. */
async function collectVideos(dir, out) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectVideos(full, out);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".mp4")) {
      out.push(full);
    }
  }
}

/** Runs `worker` over `items` with a bounded number of in-flight calls. */
async function runPool(items, limit, worker) {
  let cursor = 0;
  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (cursor < items.length) {
        const item = items[cursor++];
        await worker(item);
      }
    },
  );
  await Promise.all(runners);
}

/** True when a `path.relative` result points inside the base directory. */
function isInside(relativePath) {
  return (
    relativePath !== "" &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath)
  );
}

/** Normalizes OS-specific separators to forward slashes. */
function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

/**
 * Maps a local file to its production Blob pathname under `videos/`. The local
 * `assets/videos/browser-ready/` and `assets/testimonials/` prefixes are not
 * part of the public path; any other file keeps its path relative to public/.
 */
function toPathname(absolutePath) {
  const resolved = path.resolve(absolutePath);

  const relToVideoRoot = path.relative(videoRoot, resolved);
  if (isInside(relToVideoRoot)) {
    return `${BLOB_VIDEO_ROOT}/${toPosix(relToVideoRoot)}`;
  }

  const relToTestimonials = path.relative(testimonialRoot, resolved);
  if (isInside(relToTestimonials)) {
    return `${BLOB_TESTIMONIAL_ROOT}/${toPosix(relToTestimonials)}`;
  }

  return toPosix(path.relative(publicDir, resolved));
}

/**
 * Resolves a CLI path argument to an absolute file inside public/. Accepts a
 * path relative to the video root (same shape as Project.file), relative to
 * public/, or an absolute path under public/.
 */
function resolveCliFile(arg) {
  const normalized = arg.replace(/\\/g, "/").replace(/^\.\//, "");
  const candidates = path.isAbsolute(arg)
    ? [path.resolve(arg)]
    : [
        path.join(videoRoot, normalized),
        path.join(publicDir, normalized),
        path.join(projectRoot, normalized),
      ];

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    const rel = path.relative(publicDir, resolved);
    const insidePublic =
      rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
    if (insidePublic && existsSync(resolved)) {
      return resolved;
    }
  }

  throw new Error(
    `Video not found under public/: ${arg}\n` +
      "Pass a path relative to public/assets/videos/browser-ready/ " +
      "(e.g. fitness_wellness/clip.mp4) or relative to public/ (e.g. assets/....mp4).",
  );
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Copy it from the Vercel Blob store " +
        "into .env.local and rerun with --env-file=.env.local.",
    );
  }

  const args = process.argv.slice(2).filter((value) => value !== "");
  if (args.length > 1) {
    throw new Error(
      "Expected at most one video path. " +
        "Usage: npm run videos:push -- <relative-video-path>",
    );
  }

  const files = [];
  if (args.length === 1) {
    files.push(resolveCliFile(args[0]));
  } else {
    await collectVideos(videoRoot, files);
    for (const file of extraFiles) {
      if (await stat(file).then(() => true).catch(() => false)) {
        files.push(file);
      }
    }
  }

  if (files.length === 0) {
    throw new Error(`No .mp4 files found under ${videoRoot}.`);
  }

  const sizes = await Promise.all(files.map((file) => stat(file)));
  const totalBytes = sizes.reduce((sum, info) => sum + info.size, 0);
  console.log(
    `Uploading ${files.length} files (${formatBytes(totalBytes)}) with concurrency ${CONCURRENCY}`,
  );

  let uploaded = 0;
  let uploadedBytes = 0;

  await runPool(files, CONCURRENCY, async (file) => {
    const pathname = toPathname(file);
    const body = await openAsBlob(file, { type: "video/mp4" });
    const result = await put(pathname, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    uploaded += 1;
    uploadedBytes += body.size;
    console.log(`[${uploaded}/${files.length}] ${pathname} (${formatBytes(body.size)}) -> ${result.url}`);
  });

  console.log(
    `Done. Uploaded ${uploaded} files (${formatBytes(uploadedBytes)}).`,
  );
  console.log(
    "Set NEXT_PUBLIC_ASSET_ORIGIN to the store's public origin, e.g. " +
      "https://<store-id>.public.blob.vercel-storage.com",
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
