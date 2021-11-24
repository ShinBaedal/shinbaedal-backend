import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isDone: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Client, (client) => client.id, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  clientId: Client;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Store, (store) => store.id, { nullable: false })
  @JoinColumn({ name: 'store_id' })
  storeId: Store;

  @CreateDateColumn()
  createdAt: Date;
}
