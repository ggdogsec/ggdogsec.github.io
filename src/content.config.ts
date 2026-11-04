import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds } from './data/categories';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/\\/g, '/'),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(categoryIds),
    /**
     * 1-based position in that WeChat 合集, matching the album UI top to bottom.
     * Listing and continuous-read prev/next sort by this ascending. pubDate is not a sort key.
     */
    albumOrder: z.number().int().positive(),
    /** Scaffold placeholder. Excluded from homepage counts. */
    sample: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
