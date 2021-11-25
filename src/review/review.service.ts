import {
  ConflictException,
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

@Injectable()
export class ReviewService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly reviewRepository: ReviewRepository,
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
    if (
      await this.reviewRepository.isReviewExist(req.user.email, param.orderId)
    )
      throw new ConflictException();

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
}
