import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from 'src/shared/entities/menu/menu.entity';
import { MenuRepository } from 'src/shared/entities/menu/menu.repository';
import { Store } from 'src/shared/entities/store/store.entity';
import { StoreRepository } from 'src/shared/entities/store/store.repository';
import { GetMenuResponse } from './response/get.menu';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepo: MenuRepository,
    private readonly storeRepo: StoreRepository,
  ) {}
  async getMenus(storeId: number): Promise<GetMenuResponse[]> {
    const store: Store = await this.storeRepo.findOne({
      where: { id: storeId },
    });
    if (!store) {
      throw new NotFoundException('상점을 찾을 수 없습니다.');
    }

    const menus: Menu[] = await this.menuRepo.find({
      where: { storeId: store },
    });

    return menus.map((data: Menu) => {
      return new GetMenuResponse(data);
    });
  }
}
