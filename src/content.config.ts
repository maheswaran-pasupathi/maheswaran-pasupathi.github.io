import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writings' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['physics', 'computation', 'experiments', 'journeys', 'books']),
    categoryLabel: z.string(),
    meta: z.string(),
    excerpt: z.string(),
  }),
});

export const collections = { writings };
