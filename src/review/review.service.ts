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
} from './dto/request/create-review.dto';
import { OrderRepository } from '../shared/entities/order/order.repository';
import { HttpService } from '@nestjs/axios';
import { ClientRepository } from '../shared/entities/client/client.repository';
import { lastValueFrom } from 'rxjs';
import {
  CreateReplyRequestBodyDto,
  CreateReplyRequestParamDto,
} from './dto/request/create-reply.dto';
import { ReplyRepository } from '../shared/entities/reply/reply.repository';
import {
  ReviewDto,
  ReviewListResponseDto,
} from './dto/response/review-list.dto';

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
    if (!order) throw new NotFoundException('주문을 찾을 수 없음');

    const review = await this.reviewRepository.isReviewExist(param.orderId);
    if (review) throw new ConflictException('이미 리뷰가 존재함');

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
    if (!review) throw new NotFoundException('리뷰를 찾을 수 없음');

    if (review.storeId.ownerId.email !== req.user.email)
      throw new ForbiddenException('유저의 주문이 아님');

    await this.replyRepository.insertOneReply({
      reviewId: param.reviewId,
      storeId: review.storeId.id,
      content: payload.content,
    });
  }

  async getReviewList(
    storeId: string,
    type: string,
  ): Promise<ReviewListResponseDto> {
    const [res, count] = await this.reviewRepository.getReviews(storeId, type);
    if (!count) throw new NotFoundException('리뷰를 찾을 수 없습니다.');

    const reviews = res.map(
      (review): ReviewDto => ({
        id: review.id,
        user: {
          id: review.clientId.id,
          name: review.clientId.name,
        },
        menuNames: review.orderId.orderMenu.map(
          (orderMenu) => orderMenu.menuId.name,
        ),
        type: review.type,
        createdAt: review.createdAt,
        content: review.content,
        rate: review.rate,
        reply: {
          content: review.replyId.content,
        },
      }),
    );

    return {
      storeId: res[0].storeId.id,
      storeName: res[0].storeId.name,
      reviewCount: count,
      reviews,
    };
  }
}
