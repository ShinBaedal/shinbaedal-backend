import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/filter/HttpExceptionFilter';
import { Category } from 'src/shared/category/category.entity';
import { CategoryRepository } from 'src/shared/category/category.repository';
import { Store } from 'src/shared/store/store.entity';
import { StoreRepository } from 'src/shared/store/store.repository';
import { PostStoreDto } from './request/post.store';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: StoreRepository,
    @InjectRepository(Category)
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async addStore(postStoreDto: PostStoreDto) {
    try {
      const category: Category = await this.categoryRepo.findOne({
        where: { category: postStoreDto.category },
      });

      if (Category == null) {
        throw new NotFoundException('카테고리를 찾을 수 없습니다.');
      }

      await this.storeRepo.savePost(postStoreDto, null, category);
    } catch (e) {
      throw new InternalServerErrorException('서버 에러');
    }
  }
}
