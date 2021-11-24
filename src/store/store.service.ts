import {
  HttpException,
  HttpStatus,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/filter/HttpExceptionFilter';
import { Category } from 'src/shared/category/category.entity';
import { CategoryRepository } from 'src/shared/category/category.repository';
import { Store } from 'src/shared/store/store.entity';
import { StoreRepository } from 'src/shared/store/store.repository';
import { PostStoreDto } from './request/post.store';
import { StoreConvertor } from './store.convertor';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: StoreRepository,
    @InjectRepository(Category)
    private readonly categoryRepo: CategoryRepository,
    private readonly storeConvertor: StoreConvertor,
  ) {}

  async addStore(postStoreDto: PostStoreDto) {
    try {
      const category: Category = await this.categoryRepo.findOne({
        where: { category: postStoreDto.category },
      });

      if (Category == null) {
        throw new HttpException(
          '카테고리를 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }
      const store: Store = this.storeConvertor.changePostStoreDto(
        postStoreDto,
        category,
      );
      await this.storeRepo.save(store);
    } catch (e) {
      console.error(e);
      throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
