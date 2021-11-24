import { Injectable } from '@nestjs/common';
import { Category } from 'src/shared/category/category.entity';
import { Store } from 'src/shared/store/store.entity';
import { PostStoreDto } from './request/post.store';

@Injectable()
export class StoreConvertor {
  changePostStoreDto(postStoreDto: PostStoreDto, category: Category): Store {
    const store: Store = new Store();
    store.name = postStoreDto.name;
    store.address = postStoreDto.address;
    store.photoUrl = postStoreDto.photoUrl;
    store.categoryId = category;
    store.tel = postStoreDto.tel;
    store.ownerId = null;
    return store;
  }
}
