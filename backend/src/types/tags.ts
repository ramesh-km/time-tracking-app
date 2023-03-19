import { z } from "zod";
import { createTagSchema, updateTagSchema } from "../modules/tag/zod-schemas";

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
