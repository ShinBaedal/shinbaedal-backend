import { EntityRepository, Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { OwnerSignupRequestDto } from '../../../auth/dto/request/owner-signup.dto';
import { MenuDto } from 'src/store/request/post.store';
import { Store } from '../store/store.entity';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
  async saveMenu(menu: MenuDto, store: Store) {
    this.createQueryBuilder()
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
}
