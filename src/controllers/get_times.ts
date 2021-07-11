// タイムゾーンの時間を取得
import { formatToTimeZone } from "date-fns-timezone";

const FORMAT = "YYYY-MM-DDTHH:mm:ss";

interface Query {
  format?: string;
  timezone?: string;
  hour_diff?: number;
}

export function get_time(TIME_ZONE: string, time_hour_diff: number): string {
  const time = new Date();
  time.setHours(time.getHours() + time_hour_diff);
  const formatted_time = formatToTimeZone(time, FORMAT, {
    timeZone: TIME_ZONE,
  });
  return formatted_time + "Z";
}

export function get_time2(q?: Query | null): string {
  const query: Query = q || {};
  const time: Date = new Date();
  q?.hour_diff ? time.setHours(time.getHours() + q.hour_diff) : "";
  const format: string = query.format || "YYYY-MM-DDTHH:mm:ss";
  const timezone: string = query.timezone || "Asia/Tokyo";
  const formatted_time: string = formatToTimeZone(time, format, {
    timeZone: timezone,
  });
  return formatted_time + "Z";
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
  //date.setHours(date.getHours() + 9);
  const formatted_time = formatToTimeZone(date, FORMAT, {
    timeZone: "Asia/Tokyo",
  });
  return formatted_time + "Z";
}
