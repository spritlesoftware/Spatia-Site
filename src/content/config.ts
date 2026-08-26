import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    blogType: z.enum(['tech', 'business']).default('tech'),
    readTime: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),

    // SEO
    seoTitle: z.string(),
    seoDescription: z.string(),
    keywords: z.string().optional(),
  }),
});

export const collections = { blog };
