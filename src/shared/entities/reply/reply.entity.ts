import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Review } from '../review/review.entity';
import { Store } from '../store/store.entity';

@Entity()
export class Reply {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Review, (review) => review.replyId, { primary: true })
  @JoinColumn({ name: 'review_id' })
  reviewId: Review;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Store, (store) => store.id, { primary: true })
  @JoinColumn({ name: 'store_id' })
  storeId: Store;

  @Column({ type: 'varchar', length: 200 })
  content: string;
}
