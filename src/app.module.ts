import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOption } from './ormconfig';
import { Category } from './shared/category/category.entity';
import { Client } from './shared/client/client.entity';
import { Order } from './shared/order/order.entity';
import { Owner } from './shared/owner/owner.entity';
import { ReviewPhoto } from './shared/reviewPhoto/review-photo.entity';
import { Reply } from './shared/reply/reply.entity';
import { Store } from './shared/store/store.entity';
import { OrderMenu } from './shared/orderMenu/order-menu.entity';
import { Menu } from './shared/menu/menu.entity';
import { Review } from './shared/review/review.entity';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...connectionOption,
      entities: [
        Category,
        Client,
        Menu,
        Order,
        OrderMenu,
        Owner,
        Reply,
        Review,
        ReviewPhoto,
        Store,
      ],
    }),
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
