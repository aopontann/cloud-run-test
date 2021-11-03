import { Injectable } from '@nestjs/common';
import { youtube, youtube_v3 } from '@googleapis/youtube';
import { PrismaService } from 'src/prisma.service';
import { DatetimeService } from 'src/datetime.service';
import {
  ActivitiesParams,
  SearchParams,
  VideosParams,
} from './youtube.interface';
import {
  match_list_ng,
  match_list_ok,
  match_list_indeterminate,
} from './verificationDataList';

@Injectable()
export class YouTubeService {
  constructor(private prisma: PrismaService, private dts: DatetimeService) {}

  async activities(params: ActivitiesParams): Promise<string[]> {
    const { all_channelId, publishedAfter, publishedBefore } = params;
    const service = youtube('v3');

    console.log(`探索期間(UTC) ${publishedAfter} <--> ${publishedBefore}`);

    //  期間分全ての動画情報を入れる
    const result_videoId: string[] = [];
    for await (const channelId of all_channelId) {
      let cnt = 0;
      const cntMax = 50;
      let pageToken = '';

      while (cnt++ < cntMax) {
        const res = await service.activities
          .list({
            part: ['contentDetails'],
            pageToken,
            maxResults: 50,
            channelId,
            publishedAfter,
            publishedBefore,
            key: process.env.YOUTUBE_DATA_API_KEY,
          })
          .catch((e) => {
            console.error('youtube_activities error!');
            throw e;
          });
        res.data.items?.forEach((item) => {
          const content = item.contentDetails?.upload?.videoId || null;
          content ? result_videoId.push(content) : '';
        });

        if (!res.data.nextPageToken) {
          break;
        }

        pageToken = res.data.nextPageToken;
      }
    }
    return result_videoId; // videoId,videoId,...
  }

  async search(params: SearchParams): Promise<string[]> {
    const { publishedAfter, publishedBefore } = params;
    const service = youtube('v3');

    console.log(`探索期間(UTC) ${publishedAfter} <--> ${publishedBefore}`);

    // 関連性の高いデータだけ取得するため、1ページのみのデータを取得
    const res = await service.search
      .list({
        part: ['id'],
        maxResults: 50,
        publishedAfter,
        publishedBefore,
        q: 'にじさんじ + 歌って|cover|歌',
        key: process.env.YOUTUBE_DATA_API_KEY,
      })
      .catch((e) => {
        console.error('youtube search error!');
        throw e;
      });

    if (res.data.items) {
      const all_videoId = res.data.items.map((item) => item.id?.videoId);
      // null undefined を除外
      const result = all_videoId.filter(
        (videoId) => typeof videoId == 'string',
      ) as string[];
      return result;
    } else {
      throw 'not found res.data.items';
    }
  }

  async videos(params: VideosParams) {
    const { videoIdList } = params;
    const service = youtube('v3');
    const result_items: youtube_v3.Schema$Video[] = [];
    let cnt = 0;
    const cutsize = 50;

    console.log('Youtube Data 取得開始');
    while (videoIdList.length > cnt * cutsize) {
      console.log('Youtube Data 取得中');
      // 50個のURLに分ける
      const videoId = videoIdList.slice(cnt * cutsize, (cnt + 1) * cutsize); // 0 - 49まで配列をコピー 49ない場合最後まで

      const res = await service.videos
        .list({
          part: [
            'statistics',
            'contentDetails',
            'snippet',
            'liveStreamingDetails',
          ],
          id: videoId,
          key: process.env.YOUTUBE_DATA_API_KEY,
        })
        .catch((e) => {
          console.error('get_youtube_videos error!');
          throw e;
        });
      res.data.items ? result_items.push(...res.data.items) : '';

      cnt++;
    }

    console.log('Youtube Data 完了!');
    return result_items;
  }

  async select(videoList: youtube_v3.Schema$Video[]) {
    //  条件にあった全ての動画データを入れる
    // songConfirm 歌ってみた動画確定 // unsongConfirm 不確定
    const return_data: {
      songConfirm: youtube_v3.Schema$Video[];
      unsongConfirm: youtube_v3.Schema$Video[];
    } = {
      songConfirm: [],
      unsongConfirm: [],
    };
    const result_get_vtuber = await this.prisma.vtuber.findMany();
    const all_channelId = result_get_vtuber.map((vtuber) => vtuber.id);
    const all_name = result_get_vtuber.map((vtuber) => vtuber.name);

    for (const videoInfo of videoList) {
      // 生放送の公開予定情報の場合、contentDetails.duration は "P0D" となっている
      // あらかじめ動画の長さが決まっている動画(歌ってみた動画など)は動画の長さデータが格納されている
      const videotime = videoInfo.contentDetails?.duration || 'P0D'; // 例 "PT1H33M45S"
      const comptime = 'PT9M59S'; // 9分59秒

      if (
        videotime.search(/\d\dM/) === -1 &&
        comptime.length >= videotime.length &&
        videotime !== 'P0D'
      ) {
        // 動画の長さが9分59秒以下の場合
        const checktitle = videoInfo.snippet?.title || '';
        const checkDesc = videoInfo.snippet?.description || '';

        // にじさんじ公式チャンネル、にじさんじ所属ライバーチャンネルからアップロードされた動画か
        if (all_channelId.includes(videoInfo.snippet?.channelId || 'error')) {
          // ngワードを含む動画を除外
          if (this.select_video(checktitle, match_list_ng)) {
            ('');
          }
          // 歌動画に含まれているキーワードが含まれているか
          else if (this.select_video(checktitle, match_list_ok)) {
            return_data.songConfirm.push(videoInfo);
          }
          // 歌動画に含まれている可能性があるキーワード
          else if (
            this.select_video(checktitle, match_list_indeterminate) ||
            this.select_video(checkDesc, match_list_indeterminate)
          ) {
            return_data.unsongConfirm.push(videoInfo);
          }
        }
        // にじさんじ外部チャンネルからアップロードされた動画か(にじさんじとコラボの可能性)
        else {
          if (this.select_video(checktitle, [...match_list_ng, '切り抜き'])) {
            (''); // ngワードを含む動画を除外
          } else if (
            this.select_video(checktitle, match_list_ok) &&
            this.select_video(checktitle, all_name)
          ) {
            return_data.unsongConfirm.push(videoInfo);
          }
        }
      }
    }
    return return_data;
  }

  private select_video(search: string, all_match_data: string[]) {
    for (const match_data of all_match_data) {
      const reg = new RegExp(match_data);
      if (reg.test(search)) {
        return true;
      }
    }
    return false;
  }
}
