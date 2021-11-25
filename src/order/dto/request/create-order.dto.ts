import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderRequestDto {
  @IsNumber()
  @Type(() => Number)
  storeId: number;

  @IsNumber({}, { each: true })
  menuIds: number[];
}
