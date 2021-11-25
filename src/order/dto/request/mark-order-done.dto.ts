import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class MarkOrderDoneRequestDto {
  @IsNumber()
  @Type(() => Number)
  orderId: number;
}
