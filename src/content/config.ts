import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      blogType: z.enum(['tech', 'business']).default('tech'),
      // Article presentation. `watercolor` uses the illustrated field-note layout.
      articleLayout: z.enum(['standard', 'watercolor']).default('standard'),
      // Optional byline, shown in the article meta.
      author: z.string().optional(),
      readTime: z.string(),
      // Hero image: provide either a remote URL or an uploaded file.
      // `imageUpload` (local) takes precedence over `imageUrl` (remote).
      imageUrl: z.string().optional(),
      imageUpload: z.string().optional(),
      imageAlt: z.string(),
      date: z.coerce.date(),
      featured: z.boolean().default(false),
      // Hidden from every listing and page until switched back to false.
      draft: z.boolean().default(false),

      // SEO
      seoTitle: z.string(),
      seoDescription: z.string(),
      keywords: z.string().optional(),
    })
    // Resolve to a single `image` value the rest of the site reads.
    // Upload wins over remote URL; falls back to a placeholder so a missing
    // image never breaks the whole build.
    .transform((data) => ({
      ...data,
      image: data.imageUpload || data.imageUrl || '/media/placeholder.svg',
    })),
});

export const collections = { blog };
