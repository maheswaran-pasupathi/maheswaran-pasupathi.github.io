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
    // Digital-garden growth stage - how settled the idea is, independent of
    // publish date. seedling: a rough note or open question. budding: worked
    // out and useful, but could still be revised. evergreen: revisited more
    // than once and holding up.
    stage: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
  }),
});

export const collections = { writings };
