import { Module } from '@nestjs/common';
import { YouTubeController } from './youtube.controller';
import { YouTubeService } from './youtube.service';
import { PrismaService } from 'src/prisma.service';
import { DatetimeService } from 'src/datetime.service';

@Module({
  controllers: [YouTubeController],
  providers: [YouTubeService, PrismaService, DatetimeService],
})
export class YouTubeModule {}
