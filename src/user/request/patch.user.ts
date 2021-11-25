import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserAddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}
