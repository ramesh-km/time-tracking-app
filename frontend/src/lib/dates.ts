import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export function formatDateAndTime(date: string | Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}

export function getDuration(start: string | Date, end: string | Date) {
  return dayjs(end).diff(dayjs(start));
}

export function formatDuration(duration: number) {
  return dayjs.duration(duration, "milliseconds").format("HH:mm:ss");
}
