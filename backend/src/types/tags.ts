import { z } from "zod";
import { createTagSchema,  } from "../modules/tag/zod-schemas";

export type CreateTagInput = z.infer<typeof createTagSchema>;
