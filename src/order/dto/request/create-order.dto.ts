import { IsNumber, IsString } from 'class-validator';

export class CreateOrderRequestDto {
  @IsString()
  storeId: number;

  @IsNumber({}, { each: true })
  menuIds: number[];
}
