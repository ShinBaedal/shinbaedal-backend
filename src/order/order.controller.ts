import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Role } from '../shared/enums/role.enum';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderRequestDto } from './dto/request/create-order.dto';
import { Response } from '../shared/response/Response';
import { MarkOrderDoneRequestDto } from './dto/request/mark-order-done.dto';
import { ResponseData } from '../shared/response/ResponseData';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.Client)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async createOrder(@Request() req, @Body() payload: CreateOrderRequestDto) {
    await this.orderService.createOrder(req.user.email, payload);
    return new Response(
      HttpStatus.CREATED,
      'Your order has been created successfully',
    );
  }

  @Patch(':orderId')
  @Roles(Role.Owner)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async markOrderAsDone(
    @Request() req,
    @Param() param: MarkOrderDoneRequestDto,
  ) {
    await this.orderService.markOrderAsDone(req.user.email, param.orderId);
    return new Response(
      HttpStatus.CREATED,
      `Order ${param.orderId} marked as done successfully`,
    );
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getOrderList(@Request() req) {
    return new ResponseData(
      HttpStatus.OK,
      'List of orders successfully retrieved',
      await this.orderService.getOrderList(req.user.email, req.user.role),
    );
  }
}
