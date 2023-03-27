import { z } from "zod";
import { updateTimeEntrySchema } from "../lib/zod-schemas";
import { Tag } from "./tags";

export interface TimeEntry {
  id: number;
  note: string;
  start: string;
  end: string;
  tags: Tag[];
}

export interface CreateTimeEntryInput {
  note: string;
  tags: string[];
}
export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntrySchema>;