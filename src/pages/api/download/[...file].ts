/**
 * Download proxy API endpoint
 * Proxies file downloads from GitHub to ensure direct downloads without redirect
 */
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const filename = params.file;

  if (!filename) {
    return new Response('Filename is required', { status: 400 });
  }

  try {
    // Get the original URL from query parameter
    const url = new URL(request.url);
    const originalUrl = url.searchParams.get('url');

    if (!originalUrl) {
      return new Response('Download URL is required', { status: 400 });
    }

    // Fetch the file from GitHub
    const response = await fetch(originalUrl);

    if (!response.ok) {
      return new Response(`Failed to fetch file: ${response.statusText}`, { status: response.status });
    }

    // Get file content and headers from GitHub response
    const content = response.body;
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');

    // Create headers for direct download
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    // Stream the file to the client
    return new Response(content, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download proxy error:', error);
    return new Response('Internal server error', { status: 500 });
  }
};
