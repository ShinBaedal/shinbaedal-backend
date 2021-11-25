import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Roles } from '../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../shared/enums/role.enum';
import {
  CreateReviewRequestBodyDto,
  CreateReviewRequestParamDto,
} from './request/create-review.dto';
import { Response } from '../shared/response/Response';
import {
  CreateReplyRequestBodyDto,
  CreateReplyRequestParamDto,
} from './request/create-reply.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':orderId')
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Request() req,
    @Body() payload: CreateReviewRequestBodyDto,
    @Param() param: CreateReviewRequestParamDto,
  ) {
    await this.reviewService.createReview(req, payload, param);
    return new Response(HttpStatus.CREATED, 'Review created successfully');
  }

  @Post('reply/:reviewId')
  @Roles(Role.Owner)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async createReply(
    @Request() req,
    @Body() payload: CreateReplyRequestBodyDto,
    @Param() param: CreateReplyRequestParamDto,
  ) {
    await this.reviewService.createReply(req, payload, param);
    return new Response(HttpStatus.CREATED, 'Reply created successfully');
  }
}
