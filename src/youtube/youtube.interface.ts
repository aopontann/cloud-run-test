export interface ActivitiesParams {
  all_channelId: string[];
  publishedAfter: string;
  publishedBefore: string;
}

export interface SearchParams {
  publishedAfter: string;
  publishedBefore: string;
}

export interface VideosParams {
  videoIdList: string[];
}

export interface SearchQuery {
  publishedAfter: string;
  publishedBefore: string;
}
