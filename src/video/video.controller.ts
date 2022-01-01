import { Controller, Get, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { GetVideoDto } from './video.dto';

@Controller('/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getVideo(@Query() queryString: GetVideoDto) {
    return this.videoService.getVideo(queryString);
  }
}
