export interface Release {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
  }>;
}

const GITHUB_API = 'https://api.github.com/repos/S-IDE-studio/S-IDE';

export async function getLatestRelease(): Promise<Release> {
  const res = await fetch(`${GITHUB_API}/releases/latest`, {
    next: { revalidate: 300 } // 5 minutes
  });
  if (!res.ok) {
    throw new Error('Failed to fetch latest release');
  }
  return res.json();
}

export async function getAllReleases(): Promise<Release[]> {
  const res = await fetch(`${GITHUB_API}/releases`, {
    next: { revalidate: 300 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch releases');
  }
  return res.json();
}

export interface ReleaseAssets {
  windows: Release['assets'][0] | null;
  macos: Release['assets'][0] | null;
  linux: Release['assets'][0] | null;
}

export function getAssetsByOS(release: Release): ReleaseAssets {
  return {
    windows: release.assets.find(a =>
      a.name.includes('.exe') || a.name.includes('windows')
    ) || null,
    macos: release.assets.find(a =>
      a.name.includes('.dmg') || a.name.includes('macos')
    ) || null,
    linux: release.assets.find(a =>
      a.name.includes('.AppImage') || a.name.includes('.deb') || a.name.includes('linux')
    ) || null,
  };
}

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
