import dayjs from "dayjs";

export function formatDateAndTime(date: string | Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}

export function getDuration(start: string | Date, end: string | Date) {
  return dayjs(end).diff(dayjs(start));
}
