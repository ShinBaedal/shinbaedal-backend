import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/filter/HttpExceptionFilter';
import { Category } from 'src/shared/category/category.entity';
import { Store } from 'src/shared/store/store.entity';
import { StoreRepository } from 'src/shared/store/store.repository';
import { StoreController } from './store.controller';
import { StoreConvertor } from './store.convertor';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Category])],
  controllers: [StoreController],
  providers: [StoreService, StoreConvertor, HttpExceptionFilter],
})
export class StoreModule {}
