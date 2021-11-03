import {
  IsRFC3339,
  IsBooleanString,
  IsAscii,
  IsOptional,
} from 'class-validator';

export class ActivitiesDto {
  @IsAscii()
  id: string[];

  @IsRFC3339()
  publishedAfter: string;

  @IsRFC3339()
  publishedBefore: string;
}

export class SearchDto {
  @IsRFC3339()
  publishedAfter: string;

  @IsRFC3339()
  publishedBefore: string;
}

export class VideosDto {
  @IsAscii()
  videoId: string[];

  @IsOptional()
  @IsBooleanString()
  select: boolean;
}
