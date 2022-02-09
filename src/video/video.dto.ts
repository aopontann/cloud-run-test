import { Transform, Type } from 'class-transformer';
import {
  IsRFC3339,
  IsBooleanString,
  IsAscii,
  IsOptional,
  Matches,
  Min,
  IsNumberString,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class GetVideoDto {
  @IsOptional()
  @IsAscii({ each: true })
  @Transform(({ value }) => value.split(','))
  videoId: string[];

  // "true", "false" 以外でもバリデート通ってしまう
  // 解決策が分からないため、今はこのまま実装しておく
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    console.log(`transfrom: ${value}`);
    if (value == 'true') return true;
    if (value == 'false') return false;
  })
  songConfirm: boolean;

  @IsOptional()
  @IsRFC3339()
  startAtAfter: string;

  @IsOptional()
  @IsRFC3339()
  startAtBefore: string;

  @IsOptional({ each: true })
  @Transform(({ value }) => value.split(','))
  tags: string[];

  @IsOptional()
  @Matches('startTime', 'random')
  order: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  @Min(1)
  maxResults: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  @Min(1)
  page: number;
}
