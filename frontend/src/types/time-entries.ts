export interface TimeEntry {
  id: number;
  note: string;
  start: string;
  end: string;
  tags: string[];
}

export type CreateTimeEntryInput = Pick<TimeEntry, "note" | "tags">;
