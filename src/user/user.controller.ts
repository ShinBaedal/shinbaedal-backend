import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseData } from 'src/shared/response/ResponseData';
import { GetUserResponse } from './response/get.user';
import { UserService } from './user.service';

@Controller('/qqq')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request): Promise<ResponseData<GetUserResponse>> {
    console.log('hello');
    const user = request.user;
    const userData: GetUserResponse = await this.userService.getUserData(user);
    return new ResponseData(HttpStatus.OK, '성공', userData);
  }
}
