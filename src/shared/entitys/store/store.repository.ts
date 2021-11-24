import { PostStoreDto } from 'src/store/request/post.store';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { Owner } from '../owner/owner.entity';
import { Store } from './store.entity';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {
  async savePost(postStoreDto: PostStoreDto, owner: Owner, category: Category) {
    this.createQueryBuilder()
      .insert()
      .into(Store)
      .values({
        name: postStoreDto.name,
        tel: postStoreDto.tel,
        photoUrl: postStoreDto.photoUrl,
        address: postStoreDto.address,
        ownerId: owner,
        categoryId: category,
      })
      .execute();
  }
}
