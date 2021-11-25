import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/request/create-order.dto';
import { OrderRepository } from '../shared/entities/order/order.repository';
import { ClientRepository } from '../shared/entities/client/client.repository';
import { MenuRepository } from '../shared/entities/menu/menu.repository';
import { StoreRepository } from '../shared/entities/store/store.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly orderRepository: OrderRepository,
    private readonly menuRepository: MenuRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async createOrder(email: string, payload: CreateOrderRequestDto) {
    if (!payload.menuIds.length) throw new BadRequestException();
    const menus = await this.menuRepository.getMenus(payload.menuIds);
    if (menus.length !== payload.menuIds.length)
      throw new BadRequestException();

    await this.orderRepository.insertOneOrder({
      clientId: (await this.clientRepository.getOneClient(email)).id,
      storeId: (await this.storeRepository.getStore(payload.storeId)).id,
      orderMenu: menus,
    });
  }
}
