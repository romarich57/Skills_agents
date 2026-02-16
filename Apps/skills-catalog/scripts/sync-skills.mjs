import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const REPO_URL = 'https://github.com/sickn33/antigravity-awesome-skills';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, '..');
const vendorDir = join(rootDir, 'vendor', 'antigravity-awesome-skills');
const publicDataDir = join(rootDir, 'public', 'data');
const destinationPath = join(publicDataDir, 'skills_index.json');
const sourcePath = join(vendorDir, 'skills_index.json');

function runOrFail(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    ...options
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function syncRepository() {
  const gitDir = join(vendorDir, '.git');

  if (existsSync(gitDir)) {
    console.log('Updating vendor repo with git pull --ff-only...');
    runOrFail('git', ['-C', vendorDir, 'pull', '--ff-only']);
    return;
  }

  mkdirSync(join(rootDir, 'vendor'), { recursive: true });
  console.log('Cloning vendor repo...');
  runOrFail('git', ['clone', REPO_URL, vendorDir]);
}

function copyAndValidateJson() {
  const payload = readFileSync(sourcePath, 'utf8');
  const parsed = JSON.parse(payload);

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('skills_index.json is invalid or empty after sync.');
  }

  mkdirSync(publicDataDir, { recursive: true });
  writeFileSync(destinationPath, payload, 'utf8');

  console.log(`Synced ${parsed.length} skills to public/data/skills_index.json`);
}

try {
  syncRepository();
  copyAndValidateJson();
} catch (error) {
  console.error('sync:skills failed');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
