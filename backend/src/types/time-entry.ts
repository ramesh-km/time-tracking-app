import { z } from "zod";
import { createTimeEntrySchema, updateTimeEntrySchema, } from "../modules/time-entry/zod-schemas";

export type CreateTimeEntryInput = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntrySchema>;