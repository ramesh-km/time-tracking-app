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

export const getTimeEntriesReportSchema = z.object({
  page: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(1).max(100).default(10),
  // default to current week
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  tags: z.preprocess(
    (value) => (value ? String(value).split(",").filter(Boolean) : []),
    z.array(z.string().min(1).max(50)).optional().default([])
  ),
  note: z.string().max(255).optional().default(""),
  sort: z.enum(["start", "end", "note", "tags"]).default("start"),
  direction: z.enum(["asc", "desc"]).default("desc"),
});

export const insightsDataSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("bar-chart"),
  }),
  z.object({
    type: z.literal("calendar-heatmap"),
    year: z.coerce.number().int().min(2000).max(2100),
  }),
]);
