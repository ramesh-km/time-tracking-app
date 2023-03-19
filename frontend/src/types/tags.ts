import { z } from "zod";
import { createTagSchema } from "../lib/zod-schemas";

export interface Tag {
  name: string;
}

export interface TagWithCount extends Tag {
  count: number;
}

export type CreateTagInput = z.infer<typeof createTagSchema>;
