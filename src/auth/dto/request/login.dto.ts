import { IsEmail, IsEnum, IsString } from 'class-validator';

export class LoginRequestBodyDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginRequestParamDto {
  @IsEnum(['owner', 'client'])
  type: string;
}
