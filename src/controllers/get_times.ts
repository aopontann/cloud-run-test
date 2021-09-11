// タイムゾーンの時間を取得
import { formatToTimeZone } from "date-fns-timezone";

const FORMAT = "YYYY-MM-DDTHH:mm:ss"; 
// timezone: "Asia/Tokyo" || "UTC"

interface Query {
  format?: string;
  timezone?: string;
  hour_diff?: number;
}

export function get_time(q?: {timezone?: string, time?: string, hour_ago?: number, format?: string}): string {
  const time = q?.time ? new Date(q.time) : new Date()
  q?.hour_ago ? time.setHours(time.getHours() - q?.hour_ago) : ""
  const format: string = q?.format || "YYYY-MM-DDTHH:mm:ssZ";
  const timezone: string = q?.timezone || "Asia/Tokyo";
  const formatted_time: string = formatToTimeZone(time, format, {
    timeZone: timezone,
  });
  return formatted_time;
}

export function get_time2(q?: {
  format?: string;
  time?: string;
  timezone?: string;
  hour_ago?: number;
  day_ago?: number;
  addZ?: boolean;
}): string {
  const time: Date = q?.time ? new Date(q.time) : new Date();
  q?.hour_ago ? time.setHours(time.getHours() - q.hour_ago) : "";
  q?.day_ago ? time.setDate(time.getDate() - q.day_ago) : "";
  const format: string = q?.format || "YYYY-MM-DDTHH:mm:ss";
  const timezone: string = q?.timezone || "Asia/Tokyo";
  const formatted_time: string = formatToTimeZone(time, format, {
    timeZone: timezone,
  });
  return q?.addZ == false ?  formatted_time : formatted_time + "Z";
}

// JST 2021-05-23T16:22:24Z
export function toUTC(JST: string): string {
  const time = Date.parse(JST);
  const date = new Date(time);
  date.setHours(date.getHours() - 9);
  const formatted_time = formatToTimeZone(date, FORMAT, {
    timeZone: "UTC",
  });
  return formatted_time + "Z";
}

export function toJST(UTC: string): string {
  const time = Date.parse(UTC);
  const date = new Date(time);
  const format = "YYYY-MM-DDTHH:mm:ss.sss";
  //date.setHours(date.getHours() + 9);
  const formatted_time = formatToTimeZone(date, format, {
    timeZone: "Asia/Tokyo",
  });
  return formatted_time + "Z";
}

export function format_date(q?: {date?: Date, format?: string}): string {
  const time = q?.date || new Date();
  const format: string = q?.format || "YYYY-MM-DDTHH:mm:ssZ";
  const formatted_time: string = formatToTimeZone(time, format, {
    timeZone: "UTC",
  });
  return formatted_time;
}
