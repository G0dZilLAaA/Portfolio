import { z } from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(3).max(100),

    shortDescription: z.string().min(10).max(250),

    description: z.string().min(20),

    githubUrl: z.string().url().optional(),

    liveUrl: z.string().url().optional(),

    thumbnail: z.string().optional(),

    featured: z.boolean().optional(),

    published: z.boolean().optional(),

    technologies: z.array(z.string()).min(1)
});