import { Module } from '@nestjs/common';
import { YouTubeModule } from './youtube/youtube.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [YouTubeModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
