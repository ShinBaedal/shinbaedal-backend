import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/shared/filter/HttpExceptionFilter';
import { StoreRepository } from 'src/shared/entities/store/store.repository';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CategoryRepository } from 'src/shared/entities/category/category.repository';
import { OwnerRepository } from 'src/shared/entities/owner/owner.repository';
import { ReviewRepository } from 'src/shared/entities/review/review.repository';
import { MenuRepository } from 'src/shared/entities/menu/menu.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreRepository,
      CategoryRepository,
      ReviewRepository,
      MenuRepository,
      OwnerRepository,
    ]),
  ],
  controllers: [StoreController],
  providers: [StoreService, HttpExceptionFilter, JwtAuthGuard, RolesGuard],
})
export class StoreModule {}
