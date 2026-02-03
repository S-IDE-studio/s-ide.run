import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Docs collection
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

// Tutorials collection
const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    duration: z.string(),
    publishedAt: z.coerce.date(),
  }),
});

// Releases collection (synced from GitHub)
const releases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/releases' }),
  schema: z.object({
    version: z.string(),
    tag_name: z.string(),
    published_at: z.coerce.date(),
    body: z.string().optional(),
    html_url: z.string().optional(),
  }),
});

export const collections = { docs, tutorials, releases };
