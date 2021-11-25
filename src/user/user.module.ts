import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from 'src/shared/entities/client/client.repository';
import { OwnerRepository } from 'src/shared/entities/owner/owner.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository, OwnerRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
