import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestBodyDto,
  LoginRequestParamDto,
} from './dto/request/login.dto';
import { ClientSignupRequestDto } from './dto/request/client-signup.dto';
import { OwnerSignupRequestDto } from './dto/request/owner-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/:type')
  async login(
    @Body() payload: LoginRequestBodyDto,
    @Param() param: LoginRequestParamDto,
  ) {
    return this.authService.login(payload, param);
  }

  @Post('signup/client')
  async signupClient(@Body() payload: ClientSignupRequestDto) {
    return this.authService.signup(payload, 'client');
  }

  @Post('signup/owner')
  async signupOwner(@Body() payload: OwnerSignupRequestDto) {
    return this.authService.signup(payload, 'owner');
  }
}
