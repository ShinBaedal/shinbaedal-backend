import { EntityRepository, Repository } from 'typeorm';
import { Reply } from './reply.entity';
import { CreateReplyPayload } from '../../../review/interfaces/create-reply-payload.interface';

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  async insertOneReply(payload: CreateReplyPayload) {
    await this.createQueryBuilder()
      .insert()
      .into(Reply)
      .values({
        reviewId: () => payload.reviewId,
        storeId: () => payload.storeId.toString(),
        content: payload.content,
      })
      .execute();
  }
}
