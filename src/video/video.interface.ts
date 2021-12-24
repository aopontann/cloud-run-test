import { youtube_v3 } from '@googleapis/youtube';

export interface GetVideoParams {
  videoId?: string[];
  songConfirm?: boolean;
  startAtAfter?: string;
  startAtBefore?: string;
  maxResults?: number;
  page?: number;
  order?: string;
  tags?: string[];
}

export interface AddVideoParams {
  videoInfoList: youtube_v3.Schema$Video[];
  songConfirm: boolean;
}

export interface UpdateVideoParams {
  id: string;
  songConfirm?: boolean;
  title?: string;
  description?: string;
}
