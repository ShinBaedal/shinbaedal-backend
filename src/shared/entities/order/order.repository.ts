import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';

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
}
