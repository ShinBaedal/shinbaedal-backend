import { IsNumber } from 'class-validator';

export class CreateOrderRequestDto {
  @IsNumber()
  storeId: number;

  @IsNumber({}, { each: true })
  menuIds: number[];
}
