import { Tag } from "../../types/tags";
import {
  CreateTimeEntryInput,
  ReportsData,
  TimeEntry,
  UpdateTimeEntryInput,
} from "../../types/time-entries";
import http from "../http";

export async function createTimeEntry(timeEntry: CreateTimeEntryInput) {
  const res = await http.post<TimeEntry>("/time-entry", timeEntry);
  return res.data;
}

export async function updateTimeEntry(
  timeEntry: UpdateTimeEntryInput & { id: number }
) {
  const res = await http.put<TimeEntry>(
    `/time-entry/${timeEntry.id}`,
    timeEntry
  );
  return res.data;
}

export async function getTimeEntriesReport() {
  const res = await http.get<ReportsData>("/time-entry/report");
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

export async function getTimeEntry(id: number) {
  const res = await http.get<TimeEntry>(`/time-entry/${id}`);
  return res.data;
}

export async function stopTimeEntry(id: number) {
  const res = await http.put<TimeEntry>(`/time-entry/stop/${id}`);
  return res.data;
}
