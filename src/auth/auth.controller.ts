import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestBodyDto,
  LoginRequestParamDto,
} from './dto/request/login.dto';
import { ClientSignupRequestDto } from './dto/request/client-signup.dto';
import { OwnerSignupRequestDto } from './dto/request/owner-signup.dto';
import { CheckEmailRequestDto } from './dto/request/check-email.dto';
import { ConfirmEmailRequestDto } from './dto/request/confirm-email.dto';
import { ResponseData } from '../shared/response/ResponseData';
import { Response } from '../shared/response/Response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/:type')
  async login(
    @Body() payload: LoginRequestBodyDto,
    @Param() param: LoginRequestParamDto,
  ) {
    return new ResponseData(
      HttpStatus.OK,
      'Successfully logged in.',
      await this.authService.login(payload, param),
    );
  }

  @Post('signup/client')
  async signupClient(@Body() payload: ClientSignupRequestDto) {
    return new ResponseData(
      HttpStatus.CREATED,
      'Successfully signed up.',
      await this.authService.signup(payload, 'client'),
    );
  }

  @Post('signup/owner')
  async signupOwner(@Body() payload: OwnerSignupRequestDto) {
    return new ResponseData(
      HttpStatus.CREATED,
      'Successfully signed up.',
      await this.authService.signup(payload, 'owner'),
    );
  }

  @Get('email')
  async checkEmail(@Query() query: CheckEmailRequestDto) {
    await this.authService.sendMail(query.email);
    return new Response(HttpStatus.OK, 'Email sent successfully.');
  }

  @Post('email')
  @HttpCode(200)
  async confirmEmail(@Body() payload: ConfirmEmailRequestDto) {
    await this.authService.checkMail(payload);
    return new Response(HttpStatus.OK, 'Email verified successfully.');
  }
}
