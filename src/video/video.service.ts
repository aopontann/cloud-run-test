import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  GetVideoParams,
  AddVideoParams,
  UpdateVideoParams,
} from './video.interface';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}
  async getVideo(params: GetVideoParams) {
    const NG_tags = ['test'];
    console.log(`songConfirm: ${params.songConfirm}`);
    console.log(`type songConfirm: ${typeof params.songConfirm}`);
    const {
      videoId,
      songConfirm,
      startAtAfter,
      startAtBefore,
      tags,
      order,
      maxResults,
      page,
    } = params;

    const getVideo = await this.prisma.videos.findMany({
      where: {
        AND: [
          { id: videoId ? { in: videoId } : undefined },
          { songConfirm: songConfirm },
          { startTime: startAtAfter ? { gte: startAtAfter } : undefined },
          { startTime: startAtBefore ? { lte: startAtBefore } : undefined },
          { tags: tags ? { some: { name: { in: tags } } } : undefined },
        ],
      },
      orderBy:
        order == 'startTime'
          ? { startTime: 'desc' }
          : {
              statistic: {
                viewCount: 'desc',
              },
            },
      skip: maxResults ? maxResults * (page - 1) : undefined,
      take: order == 'random' ? 9999 : maxResults,
      include: {
        thumbnail: true,
        statistic: true,
        tags: {
          where: {
            name: { notIn: NG_tags },
          },
          select: {
            name: true,
          },
        },
      },
    });

    if (order === 'random') {
      for (let i = getVideo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [getVideo[i], getVideo[j]] = [getVideo[j], getVideo[i]];
      }
    }

    return getVideo.slice(0, maxResults);
  }

  async addVideo(params: AddVideoParams) {
    let cnt = 1;
    for await (const videoInfo of params.videoInfoList) {
      console.log(
        `(${cnt++} / ${params.videoInfoList.length}) videoId = ${videoInfo.id}`,
      );
      const thumb = videoInfo.snippet.thumbnails;
      const count = videoInfo.statistics;
      const startTime =
        videoInfo.liveStreamingDetails?.scheduledStartTime ||
        videoInfo.liveStreamingDetails?.actualStartTime ||
        videoInfo.snippet.publishedAt ||
        '2000-01-01T00:00:00';

      await this.prisma.videos
        .upsert({
          where: { id: videoInfo.id },
          create: {
            id: videoInfo.id,
            title: videoInfo.snippet?.title || '',
            description: videoInfo.snippet?.description || '',
            songConfirm: params.songConfirm,
            startTime,
            thumbnail: {
              create: {
                defaultUrl: thumb?.default?.url || null,
                medium: thumb?.medium?.url || null,
                high: thumb?.high?.url || null,
                standard: thumb?.standard?.url || null,
                maxres: thumb?.maxres?.url || null,
              },
            },
            statistic: {
              create: {
                viewCount: count?.viewCount ? Number(count.viewCount) : null,
                likeCount: count?.likeCount ? Number(count.likeCount) : null,
                dislikeCount: count?.dislikeCount
                  ? Number(count.dislikeCount)
                  : null,
                commentCount: count?.commentCount
                  ? Number(count.commentCount)
                  : null,
              },
            },
          },
          update: {
            title: videoInfo.snippet?.title || undefined,
            description: videoInfo.snippet?.description || undefined,
            songConfirm: params.songConfirm,
          },
        })
        .catch((e) => {
          console.log('add_video error!');
          throw e;
        });
    }
  }

  async updateVideo(params: UpdateVideoParams) {
    const updateSongConfirm = await this.prisma.videos
      .update({
        where: {
          id: params.id,
        },
        data: {
          songConfirm: params.songConfirm,
          title: params.title,
          description: params.description,
        },
      })
      .catch((e) => {
        console.log('update_video error');
        throw e;
      });

    return updateSongConfirm;
  }

  async deleteVideo(deleteIdlist: string[]) {
    for await (const deleteId of deleteIdlist) {
      console.log(`id = ${deleteId}`);
      const deleteStatistics = this.prisma.statistics.deleteMany({
        where: {
          id: deleteId,
        },
      });
      const deleteTags = this.prisma.tags.deleteMany({
        where: {
          videoId: deleteId,
        },
      });
      const thumbnails = this.prisma.thumbnails.delete({
        where: {
          id: deleteId,
        },
      });
      const videos = this.prisma.videos.delete({
        where: {
          id: deleteId,
        },
      });
      await this.prisma
        .$transaction([deleteTags, deleteStatistics, thumbnails, videos])
        .catch((e) => {
          console.log('delete error =>', deleteId);
          throw e;
        });
    }
  }
}
