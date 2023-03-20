import { CreateTimeEntryInput, TimeEntry } from "../../types/time-entries";
import http from "../http";

export function createTimeEntry(timeEntry: CreateTimeEntryInput) {
  return http.post<TimeEntry>("/time-entry", timeEntry);
}
