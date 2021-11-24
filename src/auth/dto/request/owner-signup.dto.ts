import { IsEmail, IsString } from 'class-validator';

export class OwnerSignupRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
