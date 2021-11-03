import { Controller, Get } from '@nestjs/common';
import { YouTubeService } from './youtube.service';
import { Query } from '@nestjs/common';
import { ActivitiesDto, SearchDto, VideosDto } from './youtube.dto';

@Controller('/youtube')
export class YouTubeController {
  constructor(private readonly youtubeService: YouTubeService) {}

  @Get('/activities')
  async activities(@Query() queryString: ActivitiesDto): Promise<string[]> {
    const { id, publishedAfter, publishedBefore } = queryString;
    const resultActivities = await this.youtubeService.activities({
      all_channelId: id,
      publishedAfter,
      publishedBefore,
    });
    return resultActivities;
  }

  @Get('/search')
  async search(@Query() queryString: SearchDto): Promise<string[]> {
    const { publishedAfter, publishedBefore } = queryString;
    const resultSearch = await this.youtubeService.search({
      publishedAfter,
      publishedBefore,
    });
    return resultSearch;
  }

  @Get('/videos')
  async videos(@Query() queryString: VideosDto) {
    const { videoId, select } = queryString;
    const resultVideos = await this.youtubeService.videos({
      videoIdList: videoId,
    });
    return select
      ? await this.youtubeService.select(resultVideos)
      : { result: resultVideos };
  }
}
