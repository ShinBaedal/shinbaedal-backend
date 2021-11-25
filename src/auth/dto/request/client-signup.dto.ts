import { IsEmail, IsString } from 'class-validator';

export class ClientSignupRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
