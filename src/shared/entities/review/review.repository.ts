import { EntityRepository, Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewPayload } from '../../../review/interfaces/create-review-payload.interface';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async getAvg(store_id: number): Promise<number> {
    return this.createQueryBuilder()
      .select('IFNULL(AVG(review.rate),0)', 'avg')
      .where('review.store_id = :store_id and review.type != :t', {
        t: 'MALIGNITY',
        store_id: store_id,
      })
      .getRawOne();
  }

  async isReviewExist(orderId: string): Promise<number> {
    return await this.createQueryBuilder('review')
      .select()
      .leftJoinAndSelect('review.orderId', 'orderId')
      .leftJoinAndSelect('review.clientId', 'clientId')
      .andWhere('orderId.id = :orderId', { orderId })
      .getCount();
  }

  async getReview(reviewId: string): Promise<Review> {
    return await this.createQueryBuilder('review')
      .select()
      .leftJoinAndSelect('review.orderId', 'orderId')
      .leftJoinAndSelect('review.clientId', 'clientId')
      .leftJoinAndSelect('review.storeId', 'storeId')
      .leftJoinAndSelect('storeId.ownerId', 'ownerId')
      .andWhere('review.id = :reviewId', { reviewId })
      .getOne();
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

  async getReviews(storeId: string, type: string): Promise<[Review[], number]> {
    return await this.createQueryBuilder('review')
      .leftJoinAndSelect('review.orderId', 'orderId')
      .leftJoinAndSelect('review.clientId', 'clientId')
      .leftJoinAndSelect('review.storeId', 'storeId')
      .leftJoinAndSelect('storeId.ownerId', 'ownerId')
      .leftJoinAndSelect('review.replyId', 'replyId')
      .leftJoinAndSelect('orderId.orderMenu', 'orderMenu')
      .leftJoinAndSelect('orderMenu.menuId', 'menuId')
      .where('review.type IN (:...type)', {
        type: type === 'NEGATIVE' ? ['NEGATIVE', 'MALIGNITY'] : [type],
      })
      .andWhere('storeId.id = :storeId', { storeId })
      .getManyAndCount();
  }
}
