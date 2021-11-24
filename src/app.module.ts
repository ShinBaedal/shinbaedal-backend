import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOption } from './ormconfig';
import { Category } from './shared/entities/category/category.entity';
import { Client } from './shared/entities/client/client.entity';
import { Order } from './shared/entities/order/order.entity';
import { Owner } from './shared/entities/owner/owner.entity';
import { ReviewPhoto } from './shared/entities/reviewPhoto/review-photo.entity';
import { Reply } from './shared/entities/reply/reply.entity';
import { Store } from './shared/entities/store/store.entity';
import { OrderMenu } from './shared/entities/orderMenu/order-menu.entity';
import { Menu } from './shared/entities/menu/menu.entity';
import { Review } from './shared/entities/review/review.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { FileModule } from './file/file.module';

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
    AuthModule,
    StoreModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
