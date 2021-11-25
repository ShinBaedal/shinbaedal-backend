import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
import { GetPost, GetPostList } from './response/get.post';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
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

  @Get('/:store_id')
  @UseFilters(new HttpExceptionFilter())
  async getStore(
    @Param('store_id') storeId: number,
  ): Promise<ResponseData<GetPost>> {
    const post: GetPost = await this.storeService.getStore(storeId);
    return new ResponseData(HttpStatus.OK, '성공', post);
  }

  @Get('/list/:category')
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  async getStores(
    @Param('category') category: string,
    @Query('address') address: string,
    @Req() request,
  ): Promise<ResponseData<GetPostList[]>> {
    const user = request.user;
    const posts: GetPostList[] = await this.storeService.getStores(
      category,
      address,
      user,
    );
    return new ResponseData(HttpStatus.OK, '성공', posts);
  }
}
