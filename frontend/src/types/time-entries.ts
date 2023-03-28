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

export interface ReportsDataRow extends TimeEntry {
  tags: Tag[];
}

export interface ReportsData {
  data: ReportsDataRow[];
  total: number;
}

export type InsightParams =
  | {
      type: "bar-chart";
    }
  | {
      type: "calendar-heatmap";
      year: number;
    };

export type InsightDataMap = {
  "bar-chart": number[];
  "calendar-heatmap": [string, number][];
};

export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntrySchema>;

export interface TimeEntryReportFilters {
  start?: string;
  end?: string;
  tags?: string[];
  page?: number;
  size?: number;
}
