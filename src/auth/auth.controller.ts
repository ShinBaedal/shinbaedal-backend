import { Body, Controller, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestBodyDto,
  LoginRequestParamDto,
} from './dto/request/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(
    @Body() payload: LoginRequestBodyDto,
    @Param() param: LoginRequestParamDto,
  ) {
    return this.authService.login(payload, param);
  }
}
