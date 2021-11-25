import { Type } from 'src/shared/enums/review.type';
import { EntityRepository, Repository } from 'typeorm';
import { Review } from './review.entity';

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
}
