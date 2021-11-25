import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Client } from 'src/shared/entities/client/client.entity';
import { ClientRepository } from 'src/shared/entities/client/client.repository';
import { Owner } from 'src/shared/entities/owner/owner.entity';
import * as bcrypt from 'bcrypt';
import { OwnerRepository } from 'src/shared/entities/owner/owner.repository';
import { UpdateUserAddressDto, UpdateUserDto } from './request/patch.user';
import { GetUserResponse } from './response/get.user';

@Injectable()
export class UserService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly ownerRepo: OwnerRepository,
  ) {}

  async getUserData(user): Promise<GetUserResponse> {
    const userData = await this.getUser(user.email, user.role);
    return new GetUserResponse(userData);
  }

  async updateUser(user, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    await this.update(user.email, user.role, updateUserDto);
  }

  async updateUserAddress(user, updateUserAddressDto: UpdateUserAddressDto) {
    await this.clientRepo.updateClientAddress(
      user.email,
      updateUserAddressDto.address,
    );
  }

  private async getUser(email: string, role: string): Promise<any> {
    return await (async () => {
      switch (role) {
        case 'owner':
          return await this.ownerRepo.findOne({
            where: { email: email },
          });
        case 'client':
          return await this.clientRepo.findOne({
            where: { email: email },
          });
      }
    })();
  }

  private async update(
    email: string,
    role: string,
    updateUserDto: UpdateUserDto,
  ) {
    return await (async () => {
      switch (role) {
        case 'owner':
          return await this.ownerRepo.updateOwner(email, updateUserDto);
        case 'client':
          return await this.clientRepo.updateClient(email, updateUserDto);
      }
    })();
  }
}
