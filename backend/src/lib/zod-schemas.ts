import { z } from "zod";

export const idSchema = z.object({
  id: z.preprocess(
    (value) => parseInt(String(value), 10),
    z.number().int().min(1).positive()
  ),
});
