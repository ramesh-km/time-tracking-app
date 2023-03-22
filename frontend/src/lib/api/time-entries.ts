import { CreateTimeEntryInput, TimeEntry } from "../../types/time-entries";
import http from "../http";

export async function createTimeEntry(timeEntry: CreateTimeEntryInput) {
  const res = await http.post<TimeEntry>("/time-entry", timeEntry);
  return res.data;
}

export async function getTimeEntriesReport() {
  const res = await http.get<TimeEntry[]>("/time-entry/report");
  return res.data;
}

export async function getAllCurrentWeekEntries() {
  const res = await http.get<TimeEntry[]>(
    "/time-entry/all-current-week-entries"
  );
  return res.data;
}

export async function deleteTimeEntry(id: number) {
  await http.delete(`/time-entry/${id}`);
}
