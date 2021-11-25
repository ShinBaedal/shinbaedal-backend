import { IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewRequestBodyDto {
  @IsString()
  content: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rate: number;

  @IsUrl({}, { each: true })
  photoUrls: string[];
}

export class CreateReviewRequestParamDto {
  @IsString()
  orderId: string;
}
