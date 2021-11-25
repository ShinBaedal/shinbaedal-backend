import { IsString } from 'class-validator';

export class CreateReplyRequestBodyDto {
  @IsString()
  content: string;
}

export class CreateReplyRequestParamDto {
  @IsString()
  reviewId: string;
}
