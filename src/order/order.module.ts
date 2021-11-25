import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from '../shared/entities/client/client.repository';
import { OrderRepository } from '../shared/entities/order/order.repository';
import { MenuRepository } from '../shared/entities/menu/menu.repository';
import { StoreRepository } from '../shared/entities/store/store.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientRepository,
      OrderRepository,
      MenuRepository,
      StoreRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
