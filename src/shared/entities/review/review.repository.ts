import { EntityRepository, Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewPayload } from '../../../review/interfaces/create-review-payload.interface';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async getAvg(store_id: number): Promise<number> {
    return this.createQueryBuilder()
      .select('SUM(review.rate)', 'avg')
      .where('review.store_id = :store_id and review.type != :t', {
        t: 'MALIGNITY',
        store_id: store_id,
      })
      .getRawOne();
  }

  async isReviewExist(email: string, orderId: string): Promise<number> {
    return await this.createQueryBuilder('review')
      .select()
      .leftJoinAndSelect('review.orderId', 'orderId')
      .leftJoinAndSelect('review.clientId', 'clientId')
      .where('clientId.email = :email', { email })
      .andWhere('orderId.id = :orderId', { orderId })
      .getCount();
  }

  async insertOneReview(payload: CreateReviewPayload) {
    await this.createQueryBuilder()
      .insert()
      .into(Review)
      .values({
        content: payload.content,
        rate: payload.rate,
        type: payload.type,
        clientId: () => payload.clientId.toString(),
        storeId: () => payload.storeId.toString(),
        orderId: () => payload.orderId.toString(),
      })
      .execute();
  }
}
