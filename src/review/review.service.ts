import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from '../shared/entities/review/review.repository';
import {
  CreateReviewRequestBodyDto,
  CreateReviewRequestParamDto,
} from './request/create-review.dto';
import { OrderRepository } from '../shared/entities/order/order.repository';
import { HttpService } from '@nestjs/axios';
import { ClientRepository } from '../shared/entities/client/client.repository';
import { lastValueFrom } from 'rxjs';
import {
  CreateReplyRequestBodyDto,
  CreateReplyRequestParamDto,
} from './request/create-reply.dto';
import { ReplyRepository } from '../shared/entities/reply/reply.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly replyRepository: ReplyRepository,
    private readonly orderRepository: OrderRepository,
    private readonly httpService: HttpService,
  ) {}

  async createReview(
    req,
    payload: CreateReviewRequestBodyDto,
    param: CreateReviewRequestParamDto,
  ): Promise<void> {
    const order = await this.orderRepository.getOrder(
      req.user.email,
      param.orderId,
    );
    if (!order) throw new NotFoundException();

    const review = await this.reviewRepository.isReviewExist(param.orderId);
    if (review) throw new ConflictException();

    const res = await lastValueFrom(
      this.httpService.post(process.env.CLOVA_SENTIMENT_API_URL, {
        content: payload.content,
      }),
    );

    await this.reviewRepository.insertOneReview({
      content: payload.content,
      rate: payload.rate,
      type: (res.data.document.sentiment as string).toUpperCase(),
      clientId: (await this.clientRepository.getOneClient(req.user.email)).id,
      storeId: order.storeId.id,
      orderId: order.id,
    });
  }

  async createReply(
    req,
    payload: CreateReplyRequestBodyDto,
    param: CreateReplyRequestParamDto,
  ): Promise<void> {
    const review = await this.reviewRepository.getReview(param.reviewId);
    if (!review) throw new NotFoundException();

    if (review.storeId.ownerId.email !== req.user.email)
      throw new ForbiddenException();

    await this.replyRepository.insertOneReply({
      reviewId: param.reviewId,
      storeId: review.storeId.id,
      content: payload.content,
    });
  }
}
