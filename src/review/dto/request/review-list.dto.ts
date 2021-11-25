import { IsString } from 'class-validator';

export class ReviewListRequestDto {
  @IsString()
  storeId: string;
}
