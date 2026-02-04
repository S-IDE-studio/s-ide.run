import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Docs collection with enhanced validation
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z
    .object({
      title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters')
        .refine((val) => !val.includes('<'), { message: 'Title must not contain HTML' }),
      description: z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .refine((val) => !val.includes('<'), { message: 'Description must not contain HTML' })
        .optional(),
      order: z
        .number()
        .int('Order must be an integer')
        .min(0, 'Order must be non-negative')
        .max(9999, 'Order must be less than 10000')
        .optional(),
    })
    .strict(), // Prevent additional properties
});

export const collections = { docs };
