import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../order/order.entity';
import { Menu } from '../menu/menu.entity';

@Entity()
export class OrderMenu {
  @PrimaryGeneratedColumn()
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Order, (order) => order.id, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  orderId: Order;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Menu, (menu) => menu.id, { nullable: false })
  @JoinColumn({ name: 'menu_id' })
  menuId: Menu;
}
