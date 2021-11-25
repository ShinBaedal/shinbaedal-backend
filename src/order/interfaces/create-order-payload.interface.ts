import { Menu } from '../../shared/entities/menu/menu.entity';

export interface CreateOrderPayload {
  clientId: number;
  storeId: number;
  orderMenu: Menu[];
}
