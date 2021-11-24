import { Column, Entity, ManyToOne } from 'typeorm';
import { Review } from '../review/review.entity';
import { Store } from '../store/store.entity';

@Entity()
export class Reply {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Review, (review) => review.id, { primary: true })
  reviewId: Review;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Store, (store) => store.id, { primary: true })
  storeId: Store;

  @Column({ type: 'varchar', length: 200 })
  content: string;
}
