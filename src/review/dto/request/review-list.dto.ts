import { IsEnum, IsString } from 'class-validator';

export class ReviewListRequestParamDto {
  @IsString()
  storeId: string;
}

export class ReviewListRequestQueryDto {
  @IsEnum(['POSITIVE', 'NEUTRAL', 'NEGATIVE'])
  type: string;
}
