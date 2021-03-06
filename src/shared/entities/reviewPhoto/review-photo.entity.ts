import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../review/review.entity';

@Entity()
export class ReviewPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Review, (review) => review.id, { nullable: false })
  @JoinColumn({ name: 'review_id' })
  reviewId: Review;
}
