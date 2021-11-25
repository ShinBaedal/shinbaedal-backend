import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderPayload } from '../../../order/interfaces/create-order-payload.interface';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async getOrder(email: string, orderId: string): Promise<Order> {
    return await this.createQueryBuilder('order')
      .select()
      .leftJoinAndSelect('order.clientId', 'clientId')
      .leftJoinAndSelect('order.storeId', 'store')
      .where('order.id = :orderId', { orderId })
      .andWhere('clientId.email = :email', { email })
      .getOne();
  }

  async insertOneOrder(payload: CreateOrderPayload): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .into(Order)
      .values({
        isDone: false,
        clientId: () => payload.clientId.toString(),
        storeId: () => payload.storeId.toString(),
        orderMenu: payload.orderMenu,
      })
      .execute();
  }
}
