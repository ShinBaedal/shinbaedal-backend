import { resolve } from 'path';
import { PostStoreDto } from 'src/store/request/post.store';
import { GetPost } from 'src/store/response/get.post';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { Owner } from '../owner/owner.entity';
import { Store } from './store.entity';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {
  async savePost(
    postStoreDto: PostStoreDto,
    owner: Owner,
    category: Category,
  ): Promise<number> {
    const result = await this.createQueryBuilder()
      .insert()
      .into(Store)
      .values({
        id: null,
        name: postStoreDto.name,
        tel: postStoreDto.tel,
        photoUrl: postStoreDto.photoUrl,
        address: postStoreDto.address,
        ownerId: owner,
        categoryId: category,
      })
      .execute();
    console.log(result);
    return result.raw.insertId;
  }
  async getStore(storeId: number): Promise<any> {
    return this.createQueryBuilder('store')
      .innerJoin('category', 'category', 'store.category_id = category.id')
      .select('*')
      .where('store.id = :store_id', { store_id: storeId })
      .getRawOne();
  }

  async getStores(category: string, address: string): Promise<any> {
    return await this.createQueryBuilder('store')
      .innerJoin('category', 'category', 'store.category_id = category.id')
      .select('store.*, category.category')
      .where('store.address like :address', { address: `${address}%` })
      .getRawMany();
  }
}
