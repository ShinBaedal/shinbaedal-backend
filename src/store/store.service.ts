import {
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/shared/entities/category/category.entity';
import { CategoryRepository } from 'src/shared/entities/category/category.repository';
import { Store } from 'src/shared/entities/store/store.entity';
import { StoreRepository } from 'src/shared/entities/store/store.repository';
import { PostStoreDto } from './request/post.store';
import { GetPost, GetPostList } from './response/get.post';
import { Owner } from 'src/shared/entities/owner/owner.entity';
import { OwnerRepository } from 'src/shared/entities/owner/owner.repository';
import { ReviewRepository } from 'src/shared/entities/review/review.repository';

import { MenuRepository } from 'src/shared/entities/menu/menu.repository';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepo: StoreRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly ownerRepo: OwnerRepository,
    private readonly reviewRepo: ReviewRepository,
    private readonly menuRepo: MenuRepository,
  ) {}

  async addStore(postStoreDto: PostStoreDto, email: string) {
    try {
      const owner: Owner = await this.ownerRepo.findOne({
        where: { email: email },
      });

      if (owner == null) {
        throw new NotFoundException('유저를 찾을 수 없습니다.');
      }

      const category: Category = await this.categoryRepo.findOne({
        where: { category: postStoreDto.category },
      });

      if (category == null) {
        throw new NotFoundException('카테고리를 찾을 수 없습니다.');
      }

      const id = await this.storeRepo.savePost(postStoreDto, owner, category);

      const store: Store = await this.storeRepo.findOne({ where: { id: id } });
      postStoreDto.menus.map((menu) => {
        this.menuRepo.saveMenu(menu, store);
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('서버 에러');
    }
  }
  async getStore(storeId: number): Promise<GetPost> {
    try {
      // return await this.storeRepo.getStore(storeId);
      const store = await this.storeRepo.getStore(storeId);

      const rate: number = await this.reviewRepo.getAvg(storeId);
      return new GetPost(store, rate);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('서버 에러');
    }
  }

  async getStores(category: string, address: string): Promise<GetPostList[]> {
    const location = address.split(' ').slice(0, 3).join(' ');
    const store = await this.storeRepo.getStores(category, location);

    const storeDtos: GetPostList[] = await Promise.all(
      store.map(async (data) => {
        const rate = await this.reviewRepo.getAvg(data.id);
        return await new GetPostList(data, rate);
      }),
    );

    return storeDtos;
  }
}
