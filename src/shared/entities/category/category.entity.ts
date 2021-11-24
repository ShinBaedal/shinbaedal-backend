import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Store } from '../store/store.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  category: string;

  @OneToMany((type) => Store, (store) => store.categoryId)
  stores: Store[];
}
