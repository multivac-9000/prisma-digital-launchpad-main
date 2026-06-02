import { existsSync, mkdirSync, writeFileSync, renameSync, readFileSync } from 'fs';
import { join } from 'path';

const outputDir = '.output';
const serverDir = join(outputDir, 'server');
const functionsDir = join(outputDir, 'functions');
const serverFuncDir = join(functionsDir, '__server.func');

if (!existsSync(serverDir)) {
  console.log('No .output/server directory found, skipping vercel post-build');
  process.exit(0);
}

mkdirSync(functionsDir, { recursive: true });
renameSync(serverDir, serverFuncDir);

let runtime = 'nodejs22.x';
const nitroJsonPath = join(outputDir, 'nitro.json');
if (existsSync(nitroJsonPath)) {
  try {
    const nitroJson = JSON.parse(readFileSync(nitroJsonPath, 'utf-8'));
    runtime = nitroJson?.config?.vercel?.functions?.runtime || runtime;
  } catch {}
}

writeFileSync(
  join(serverFuncDir, '.vc-config.json'),
  JSON.stringify({ runtime, handler: 'index.mjs', launcherType: 'Nodejs', shouldAddHelpers: false }, null, 2),
);

console.log(`✓ Vercel function created at ${serverFuncDir} (runtime: ${runtime})`);
