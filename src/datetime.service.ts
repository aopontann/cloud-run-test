import { Injectable } from '@nestjs/common';
import { formatToTimeZone } from 'date-fns-timezone';

@Injectable()
export class DatetimeService {
  get_time(q?: {
    timezone?: string;
    time?: string;
    hour_ago?: number;
    day_ago?: number;
    format?: string;
  }): string {
    const time = q?.time ? new Date(q.time) : new Date();
    q?.hour_ago ? time.setHours(time.getHours() - q?.hour_ago) : '';
    q?.day_ago ? time.setDate(time.getDate() - q.day_ago) : '';
    const format: string = q?.format || 'YYYY-MM-DDTHH:mm:ssZ';
    const timezone: string = q?.timezone || 'Asia/Tokyo';
    const formatted_time: string = formatToTimeZone(time, format, {
      timeZone: timezone,
    });
    return formatted_time;
  }
}
