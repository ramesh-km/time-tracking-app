import { z } from "zod";

export const idSchema = z.object({
  id: z.number().int().min(1).positive(),
});

