import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/HttpExceptionFilter';
import { PostStoreDto } from './request/post.store';
import { StoreService } from './store.service';

@Controller()
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post('/store')
  @UseFilters(new HttpExceptionFilter())
  async addStore(@Body() postStoreDto: PostStoreDto): Promise<Response> {
    await this.storeService.addStore(postStoreDto);
    return new Response(HttpStatus.CREATED, '성공');
  }

  // @Get("/store/:store_id")
  // @UseFilters(new HttpExceptionFilter)
}
