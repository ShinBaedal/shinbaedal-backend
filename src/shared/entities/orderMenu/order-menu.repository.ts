import { EntityRepository, Repository } from 'typeorm';
import { OrderMenu } from './order-menu.entity';

@EntityRepository(OrderMenu)
export class OrderMenuRepository extends Repository<OrderMenu> {
  async getMenuIds(orderId: number): Promise<OrderMenu[]> {
    return await this.createQueryBuilder('orderMenu')
      .select()
      .leftJoinAndSelect('orderMenu.menuId', 'menuId')
      .where('orderMenu.orderId = :orderId', { orderId })
      .getMany();
  }

  async insertOrderMenus(orderId: number, menuIds: number[]): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .into(OrderMenu)
      .values(
        menuIds.map((menuId) => ({
          orderId: () => orderId.toString(),
          menuId: () => menuId.toString(),
        })),
      );
  }
}
