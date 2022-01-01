import {
  IsRFC3339,
  IsBooleanString,
  IsAscii,
  IsOptional,
  Matches,
  Min,
} from 'class-validator';

export class GetVideoDto {
  @IsOptional()
  @IsAscii()
  videoId: string[];

  @IsOptional()
  @IsBooleanString()
  songConfirm: boolean;

  @IsOptional()
  @IsRFC3339()
  startAtAfter: string;

  @IsOptional()
  @IsRFC3339()
  startAtBefore: string;

  @IsOptional()
  tags: string[];

  @IsOptional()
  @Matches('startTime', 'random')
  order: string;

  @IsOptional()
  @Min(1)
  maxResults: number;

  @IsOptional()
  @Min(1)
  page: number;
}
