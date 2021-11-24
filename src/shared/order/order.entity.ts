import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../store/store.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Client, (client) => client.id)
  clientId: Client;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Store, (store) => store.id)
  storeId: Store;

  @CreateDateColumn()
  createdAt: Date;
}
