import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { Response } from 'src/shared/response/Response';
import { ResponseData } from 'src/shared/response/ResponseData';
import { UpdateUserAddressDto, UpdateUserDto } from './request/patch.user';
import { GetUserResponse } from './response/get.user';
import { UserService } from './user.service';

@Controller('/my')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request): Promise<ResponseData<GetUserResponse>> {
    const user = request.user;
    const userData: GetUserResponse = await this.userService.getUserData(user);
    return new ResponseData(HttpStatus.OK, '성공', userData);
  }
  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Req() request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    const userData = request.user;
    await this.userService.updateUser(userData, updateUserDto);
    return new Response(HttpStatus.OK, '성공');
  }
  @Patch('/address')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async updateUserAddress(
    @Req() request,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<Response> {
    const userData = request.user;
    await this.userService.updateUserAddress(userData, updateUserAddressDto);
    return new Response(HttpStatus.OK, '성공');
  }
}
