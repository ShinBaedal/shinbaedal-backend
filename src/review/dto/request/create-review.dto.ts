import { IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewRequestBodyDto {
  @IsString()
  content: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  @Type(() => Number)
  rate: number;

  @IsUrl({}, { each: true })
  photoUrls: string[];
}

export class CreateReviewRequestParamDto {
  @IsString()
  storeId: string;
}
