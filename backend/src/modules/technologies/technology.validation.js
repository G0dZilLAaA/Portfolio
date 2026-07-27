import { z } from "zod";

export const createTechnologySchema = z.object({
    name: z
        .string()
        .min(2)
        .max(50)
        .trim()
});