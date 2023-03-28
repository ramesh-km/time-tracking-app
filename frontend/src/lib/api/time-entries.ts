import { Tag } from "../../types/tags";
import {
  CreateTimeEntryInput,
  InsightDataMap,
  InsightParams,
  ReportsData,
  TimeEntry,
  TimeEntryReportFilters,
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

export async function getTimeEntriesReport(
  filters: TimeEntryReportFilters,
  download = false
) {
  const headers = download
    ? { "Content-Type": "text/csv", Accept: "text/csv" }
    : {};
  const res = await http.get<ReportsData>("/time-entry/report", {
    headers,
  });

  if (!download) {
    return res.data;
  }

  const fileName = `time-entries-${new Date().toISOString()}.csv`;

  const blob = new Blob([String(res.data)], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", fileName);
  link.click();
  window.URL.revokeObjectURL(url);
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

export async function getInsightsData<T extends InsightParams["type"]>(
  type: T,
  params?: Omit<InsightParams, "type">
) {
  const res = await http.get<InsightDataMap[T]>(`/time-entry/insights`, {
    params: {
      type,
      ...params,
    },
  });
  return res.data;
}
