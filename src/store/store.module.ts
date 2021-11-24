import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/shared/filter/HttpExceptionFilter';
import { Category } from 'src/shared/entities/category/category.entity';
import { Store } from 'src/shared/entities/store/store.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Category])],
  controllers: [StoreController],
  providers: [StoreService, HttpExceptionFilter],
})
export class StoreModule {}
