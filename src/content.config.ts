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
    // Optional topic tags used to build a richer knowledge map. For example,
    // a film reflection can connect through "Movies" to "Hidden Figures".
    tags: z.array(z.string()).default([]),
    stage: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverCredit: z.string().optional(),
    coverCreditUrl: z.string().optional(),
  }),
});

export const collections = { writings };
