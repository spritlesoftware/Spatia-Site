import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      blogType: z.enum(['tech', 'business']).default('tech'),
      readTime: z.string(),
      // Hero image: provide either a remote URL or an uploaded file.
      // `imageUpload` (local) takes precedence over `imageUrl` (remote).
      imageUrl: z.string().optional(),
      imageUpload: z.string().optional(),
      imageAlt: z.string(),
      date: z.coerce.date(),
      featured: z.boolean().default(false),

      // SEO
      seoTitle: z.string(),
      seoDescription: z.string(),
      keywords: z.string().optional(),
    })
    // Resolve to a single `image` value the rest of the site reads.
    .transform((data) => ({
      ...data,
      image: data.imageUpload ?? data.imageUrl ?? '',
    }))
    .refine((data) => data.image.length > 0, {
      message: 'A hero image is required: set either "Hero Image URL" or upload a "Hero Image".',
      path: ['image'],
    }),
});

export const collections = { blog };
