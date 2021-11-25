import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/request/create-order.dto';
import { OrderRepository } from '../shared/entities/order/order.repository';
import { ClientRepository } from '../shared/entities/client/client.repository';
import { MenuRepository } from '../shared/entities/menu/menu.repository';
import { StoreRepository } from '../shared/entities/store/store.repository';
import { OrderListResponseDto } from './dto/response/order-list.dto';
import { OrderMenuRepository } from '../shared/entities/orderMenu/order-menu.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderMenuRepository: OrderMenuRepository,
    private readonly menuRepository: MenuRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async createOrder(email: string, payload: CreateOrderRequestDto) {
    if (!payload.menuIds.length) throw new BadRequestException();
    const menus = await this.menuRepository.getMenus(payload.menuIds);
    if (menus.length !== payload.menuIds.length)
      throw new BadRequestException();

    const { id } = (
      await this.orderRepository.insertOneOrder({
        clientId: (await this.clientRepository.getOneClient(email)).id,
        storeId: (await this.storeRepository.getStore(payload.storeId)).id,
        orderMenu: menus,
      })
    )[0];

    await this.orderMenuRepository.insertOrderMenus(
      id,
      menus.map((menu) => menu.id),
    );
  }

  async markOrderAsDone(email: string, orderId: number): Promise<void> {
    const order = await this.orderRepository.getOrder(orderId.toString());
    if (!order) throw new NotFoundException();
    if (order.storeId.ownerId.email !== email) throw new ForbiddenException();
    if (order.isDone) throw new ConflictException();

    await this.orderRepository.markOrderAsDone(orderId);
  }

  async getOrderList(
    email: string,
    role: string,
  ): Promise<OrderListResponseDto> {
    switch (role) {
      case 'client': {
        const orders = (await this.orderRepository.getOrdersByUser(email)).map(
          async (order) => ({
            id: order.id,
            storeName: order.storeId.name,
            menuNames: (
              await this.orderMenuRepository.getMenuIds(order.id)
            ).map((menu) => menu.menuId.name),
            isDone: order.isDone,
          }),
        );

        return {
          orders: await Promise.all(orders),
        };
      }

      case 'owner': {
        const orders = (await this.orderRepository.getOrdersByOwner(email)).map(
          async (order) => ({
            id: order.id,
            storeName: order.storeId.name,
            menuNames: (
              await this.orderMenuRepository.getMenuIds(order.id)
            ).map((menu) => menu.menuId.name),
            isDone: order.isDone,
          }),
        );

        return {
          orders: await Promise.all(orders),
        };
      }
    }
  }
}
