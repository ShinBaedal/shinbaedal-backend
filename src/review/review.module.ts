import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from '../shared/entities/review/review.repository';
import { OrderRepository } from '../shared/entities/order/order.repository';
import { HttpModule } from '@nestjs/axios';
import { ClientRepository } from '../shared/entities/client/client.repository';
import { ReplyRepository } from '../shared/entities/reply/reply.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientRepository,
      ReviewRepository,
      ReplyRepository,
      OrderRepository,
    ]),
    HttpModule.register({
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.CLOVA_API_KEY,
        'X-NCP-APIGW-API-KEY': process.env.CLOVA_API_SECRET,
        'Content-Type': 'application/json',
      },
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
