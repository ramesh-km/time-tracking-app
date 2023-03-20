import { z } from "zod";

export const createTagSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_ ]+$/)
    .min(1)
    .max(50),
});

export const deleteTagSchema = createTagSchema;
