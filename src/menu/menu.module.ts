import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRepository } from 'src/shared/entities/menu/menu.repository';
import { StoreRepository } from 'src/shared/entities/store/store.repository';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuRepository, StoreRepository])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
