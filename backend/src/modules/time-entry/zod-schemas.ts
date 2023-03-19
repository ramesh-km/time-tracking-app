import { z } from "zod";

export const createTimeEntrySchema = z.object({
  note: z.string().min(1).max(255),
  tags: z.array(z.number().int().positive()),
});

export const updateTimeEntrySchema = z.object({
  note: z.string().min(1).max(255),
  tags: z.array(z.number().int().positive()),
  start: z.date(),
  end: z.date(),
});
