import { createWriteStream, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import yaml from 'js-yaml';

const REGISTRY_BASE = 'https://raw.githubusercontent.com/BranonConor/context-registry/main/registry';
const CACHE_DIR = join(homedir(), '.context-gen', 'cache');
const CACHE_INDEX = join(CACHE_DIR, 'index.json');
const CACHE_META = join(CACHE_DIR, 'cache-meta.json');
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function ensureCacheDir() {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function isCacheStale() {
  if (!existsSync(CACHE_META)) return true;
  try {
    const meta = JSON.parse(readFileSync(CACHE_META, 'utf8'));
    return Date.now() - meta.fetchedAt > CACHE_TTL_MS;
  } catch {
    return true;
  }
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

export async function fetchIndex(offline = false) {
  ensureCacheDir();

  if (!offline && isCacheStale()) {
    try {
      const index = await fetchJSON(`${REGISTRY_BASE}/index.json`);
      writeFileSync(CACHE_INDEX, JSON.stringify(index, null, 2));
      writeFileSync(CACHE_META, JSON.stringify({ fetchedAt: Date.now() }));
      return index;
    } catch {
      // fall through to cache or offline snapshot
    }
  }

  if (existsSync(CACHE_INDEX)) {
    return JSON.parse(readFileSync(CACHE_INDEX, 'utf8'));
  }

  // offline bundled snapshot
  const snapshotPath = new URL('../offline/registry-snapshot/index.json', import.meta.url);
  return JSON.parse(readFileSync(snapshotPath, 'utf8'));
}

export async function fetchTemplate(id, offline = false) {
  const templateCacheDir = join(CACHE_DIR, 'templates', id);
  const metaCachePath = join(templateCacheDir, 'meta.yaml');
  const templateCachePath = join(templateCacheDir, 'template.md');

  if (!offline) {
    try {
      const [metaText, templateText] = await Promise.all([
        fetchText(`${REGISTRY_BASE}/templates/${id}/meta.yaml`),
        fetchText(`${REGISTRY_BASE}/templates/${id}/template.md`),
      ]);
      mkdirSync(templateCacheDir, { recursive: true });
      writeFileSync(metaCachePath, metaText);
      writeFileSync(templateCachePath, templateText);
      return {
        meta: yaml.load(metaText),
        template: templateText,
      };
    } catch {
      // fall through
    }
  }

  if (existsSync(metaCachePath) && existsSync(templateCachePath)) {
    return {
      meta: yaml.load(readFileSync(metaCachePath, 'utf8')),
      template: readFileSync(templateCachePath, 'utf8'),
    };
  }

  // offline bundled snapshot
  const snapMeta = new URL(`../offline/registry-snapshot/templates/${id}/meta.yaml`, import.meta.url);
  const snapTemplate = new URL(`../offline/registry-snapshot/templates/${id}/template.md`, import.meta.url);
  return {
    meta: yaml.load(readFileSync(snapMeta, 'utf8')),
    template: readFileSync(snapTemplate, 'utf8'),
  };
}
