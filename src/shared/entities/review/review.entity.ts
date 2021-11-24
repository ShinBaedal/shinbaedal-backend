import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../client/client.entity';
import { Store } from '../store/store.entity';
import { Order } from '../order/order.entity';
import { ReviewType } from '../../enums/review.type';
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  content: string;

  @Column({ type: 'int' })
  rate: number;

  @Column({ type: 'varchar', length: 45, enum: ReviewType })
  type: ReviewType;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Client, (client) => client.id, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  clientId: Client;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Store, (store) => store.id, { nullable: false })
  @JoinColumn({ name: 'store_id' })
  storeId: Store;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Order, (order) => order.id, { nullable: false })
  @JoinColumn({ name: 'order_id' })
  orderId: Order;

  @CreateDateColumn()
  createdAt: Date;
}
