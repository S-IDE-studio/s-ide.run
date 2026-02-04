/**
 * Fetch documentation files from GitHub repository
 *
 * Usage:
 *   npm run fetch:docs
 *
 * Environment variables:
 *   GITHUB_TOKEN - Optional GitHub Personal Access Token for rate limiting
 *   DOCS_REPO - Docs repository (default: S-IDE-studio/docs)
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface GitHubFile {
  name: string;
  path: string;
  type: string;
  download_url: string | null;
}

interface GitHubTreeItem {
  path: string;
  type: string;
  url: string;
}

const CONFIG = {
  owner: 'S-IDE-studio',
  repo: process.env.DOCS_REPO || 'docs',
  branch: 'main',
  contentDir: 'docs',
  outputDir: resolve(__dirname, '../src/content/docs'),
};

const headers: Record<string, string> = {
  Accept: 'application/vnd.github.v3+json',
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

/**
 * Fetch file list from GitHub repository
 */
async function fetchDocsList(): Promise<string[]> {
  const url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.contentDir}?ref=${CONFIG.branch}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch docs list: ${response.status} ${error}`);
  }

  const files: GitHubFile[] = await response.json();
  return files
    .filter((f) => f.type === 'file' && f.name.endsWith('.md'))
    .map((f) => f.path);
}

/**
 * Fetch single file content from GitHub
 */
async function fetchFileContent(path: string): Promise<string> {
  // Use raw.githubusercontent.com for direct content access
  const rawUrl = `https://raw.githubusercontent.com/${CONFIG.owner}/${CONFIG.repo}/${CONFIG.branch}/${path}`;

  const response = await fetch(rawUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch file ${path}: ${response.status}`);
  }

  return await response.text();
}

/**
 * Clear existing docs directory
 */
async function clearOutputDir(): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');

  try {
    const files = await fs.readdir(CONFIG.outputDir);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(CONFIG.outputDir, file)))
    );
  } catch {
    // Directory might not exist yet
  }
}

/**
 * Write fetched content to file
 */
async function writeFile(filename: string, content: string): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');

  // Ensure output directory exists
  await fs.mkdir(CONFIG.outputDir, { recursive: true });

  const filePath = path.join(CONFIG.outputDir, filename);
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Main execution
 */
async function main() {
  console.log(`Fetching docs from ${CONFIG.owner}/${CONFIG.repo}...`);

  try {
    const filePaths = await fetchDocsList();
    console.log(`Found ${filePaths.length} documentation files`);

    await clearOutputDir();

    for (const filePath of filePaths) {
      const filename = filePath.split('/').pop() || filePath;
      console.log(`  Fetching: ${filename}`);
      const content = await fetchFileContent(filePath);
      await writeFile(filename, content);
    }

    console.log('✓ Documentation synced successfully');
  } catch (error) {
    console.error('✗ Error fetching docs:', error);
    process.exit(1);
  }
}

main();
