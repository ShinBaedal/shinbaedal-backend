import { EntityRepository, Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { MenuDto } from 'src/store/request/post.store';
import { Store } from '../store/store.entity';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
  async saveMenu(menu: MenuDto, store: Store) {
    await this.createQueryBuilder()
      .insert()
      .into(Menu)
      .values({
        name: menu.name,
        photoUrl: menu.photoUrl,
        price: menu.price,
        storeId: store,
      })
      .execute();
  }

  async getMenus(menuIds: number[]): Promise<Menu[]> {
    return await this.createQueryBuilder('menu')
      .select()
      .where('menu.id IN (:...menuIds)', { menuIds })
      .getMany();
  }
}
