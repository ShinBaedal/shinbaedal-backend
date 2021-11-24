import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Owner } from '../owner/owner.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 90 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  photoUrl: string;

  @Column({ type: 'varchar', length: 15 })
  tel: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Category, (category) => category.id)
  @JoinColumn()
  categoryId: Category;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Owner, (owner) => owner.id)
  ownerId: Owner;
}
