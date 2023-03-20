import dayjs from "dayjs";
import { z } from "zod";

export const createTimeEntrySchema = z.object({
  note: z.string().min(1).max(255),
  tags: z.array(z.string().min(1).max(50)),
});

export const updateTimeEntrySchema = z
  .object({
    start: z.date(),
    end: z.date(),
  })
  .merge(createTimeEntrySchema);

export const timeEntriesPaginationSchema = z.object({
  page: z.coerce.number().int().min(0),
  size: z.coerce.number().int().min(1).max(100).default(10),
  // default to current week
  from: z.coerce.date().optional().default(dayjs().endOf("week").toDate()),
  to: z.coerce.date().optional().default(dayjs().toDate()),
  tags: z.preprocess(
    (value) => String(value).split(",").filter(Boolean),
    z.array(z.string().min(1).max(50)).optional().default([])
  ),
  note: z.string().min(1).max(255).optional().default(""),
  sort: z.enum(["start", "end", "note", "tags"]).default("start"),
  direction: z.enum(["asc", "desc"]).default("desc"),
});
