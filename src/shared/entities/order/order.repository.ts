import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderPayload } from '../../../order/interfaces/create-order-payload.interface';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async getOrder(orderId: string): Promise<Order> {
    return await this.createQueryBuilder('order')
      .select()
      .leftJoinAndSelect('order.clientId', 'clientId')
      .leftJoinAndSelect('order.storeId', 'storeId')
      .leftJoinAndSelect('storeId.ownerId', 'ownerId')
      .where('order.id = :orderId', { orderId })
      .getOne();
  }

  async insertOneOrder(payload: CreateOrderPayload): Promise<InsertResult> {
    return await this.createQueryBuilder()
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

  async markOrderAsDone(orderId: number): Promise<void> {
    await this.createQueryBuilder()
      .update(Order)
      .set({
        isDone: true,
      })
      .where('id = :orderId', { orderId })
      .execute();
  }

  async getOrdersByUser(email: string): Promise<Order[]> {
    return await this.createQueryBuilder('order')
      .select()
      .leftJoinAndSelect('order.clientId', 'clientId')
      .leftJoinAndSelect('order.storeId', 'storeId')
      .leftJoinAndSelect('storeId.ownerId', 'ownerId')
      .where('clientId.email = :email', { email })
      .getMany();
  }

  async getOrdersByOwner(email: string): Promise<Order[]> {
    return await this.createQueryBuilder('order')
      .select()
      .leftJoinAndSelect('order.storeId', 'storeId')
      .leftJoinAndSelect('storeId.ownerId', 'ownerId')
      .where('ownerId.email = :email', { email })
      .getMany();
  }
}
