import { z } from 'zod';

// Zod schema for validating GitHub API responses
const AssetSchema = z.object({
  name: z.string(),
  browser_download_url: z.string().url(),
  size: z.number().int().nonnegative(),
});

const ReleaseSchema = z.object({
  tag_name: z.string(),
  name: z.string(),
  body: z.string(),
  published_at: z.string(),
  html_url: z.string().url(),
  prerelease: z.boolean(),
  assets: z.array(AssetSchema),
});

export type Release = z.infer<typeof ReleaseSchema>;

const GITHUB_API_BASE = 'https://api.github.com/repos/S-IDE-studio/S-IDE';
const GITHUB_API_ACCEPT_HEADER = 'application/vnd.github.v3+json';

/**
 * Custom error class for GitHub API errors
 */
export class GitHubApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

/**
 * Fetch with timeout and error handling for GitHub API
 */
async function githubFetch(url: string, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: GITHUB_API_ACCEPT_HEADER,
        'User-Agent': 'S-IDE-Website',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Don't leak error details in production, but log them server-side
      if (response.status === 404) {
        throw new GitHubApiError('Resource not found', 404, 'Not Found');
      }
      if (response.status === 403) {
        throw new GitHubApiError('Rate limit exceeded or access forbidden', 403, 'Forbidden');
      }
      if (response.status >= 500) {
        throw new GitHubApiError(
          'GitHub service unavailable',
          response.status,
          response.statusText
        );
      }
      throw new GitHubApiError(
        `GitHub API request failed: ${response.status}`,
        response.status,
        response.statusText
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof GitHubApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('GitHub API request timed out');
    }

    throw new Error('Failed to connect to GitHub API');
  }
}

/**
 * Fetch the latest release from GitHub
 * @throws {GitHubApiError} If the GitHub API returns an error
 * @throws {Error} If the request fails or times out
 */
export async function getLatestRelease(): Promise<Release> {
  const res = await githubFetch(`${GITHUB_API_BASE}/releases/latest`);

  try {
    const rawData = await res.json();
    return ReleaseSchema.parse(rawData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Invalid GitHub API response format');
    }
    throw error;
  }
}

/**
 * Fetch all releases from GitHub
 * @throws {GitHubApiError} If the GitHub API returns an error
 * @throws {Error} If the request fails or times out
 */
export async function getAllReleases(): Promise<Release[]> {
  const res = await githubFetch(`${GITHUB_API_BASE}/releases?per_page=30`);

  try {
    const rawData = await res.json();
    return z.array(ReleaseSchema).parse(rawData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Invalid GitHub API response format');
    }
    throw error;
  }
}

export interface ReleaseAssets {
  windows: z.infer<typeof AssetSchema> | null;
  macos: z.infer<typeof AssetSchema> | null;
  linux: z.infer<typeof AssetSchema> | null;
}

/**
 * Extract platform-specific assets from a release
 */
export function getAssetsByOS(release: Release): ReleaseAssets {
  const byName = (name: string) => release.assets.find((a) => a.name === name) ?? null;
  const byExt = (ext: string) => release.assets.find((a) => a.name.endsWith(ext)) ?? null;

  return {
    // Prefer stable "latest download" asset names (added by CI), then fall back to any matching assets.
    windows: byName('s-ide-windows-setup.exe') ?? byExt('.exe'),
    macos: byName('s-ide-macos-arm64.dmg') ?? byExt('.dmg'),
    linux:
      byName('s-ide-linux.AppImage') ??
      byExt('.AppImage') ??
      byName('s-ide-linux.deb') ??
      byExt('.deb') ??
      byExt('.rpm'),
  };
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'] as const;
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
