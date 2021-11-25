import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/filter/HttpExceptionFilter';
import { PostStoreDto } from './request/post.store';
import { StoreService } from './store.service';
import { Response } from '../shared/response/Response';
import { ResponseData } from 'src/shared/response/ResponseData';
import { GetPost } from './response/get.post';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('/store')
  @UseFilters(new HttpExceptionFilter())
  @Roles(Role.Owner)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async addStore(
    @Body() postStoreDto: PostStoreDto,
    @Req() req,
  ): Promise<Response> {
    const email = req.user.email;
    await this.storeService.addStore(postStoreDto, email);
    return new Response(HttpStatus.CREATED, '성공');
  }

  @Get('/store/:store_id')
  @UseFilters(new HttpExceptionFilter())
  async getStore(
    @Param('store_id') storeId: number,
  ): Promise<ResponseData<GetPost>> {
    const post: GetPost = await this.storeService.getStore(storeId);
    return new ResponseData(HttpStatus.CREATED, '성공', post);
  }
}
