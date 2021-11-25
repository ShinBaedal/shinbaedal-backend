import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Client } from 'src/shared/entities/client/client.entity';
import { ClientRepository } from 'src/shared/entities/client/client.repository';
import { Owner } from 'src/shared/entities/owner/owner.entity';
import { OwnerRepository } from 'src/shared/entities/owner/owner.repository';
import { GetUserResponse } from './response/get.user';

@Injectable()
export class UserService {
  constructor(
    private readonly clientRepo: ClientRepository,
    private readonly ownerRepo: OwnerRepository,
  ) {}

  async getUserData(user): Promise<GetUserResponse> {
    const userData: Client | Owner = await (async () => {
      switch (user.role) {
        case 'owner':
          return await this.ownerRepo.findOne({
            where: { email: user.email },
          });
        case 'client':
          return await this.clientRepo.findOne({
            where: { email: user.email },
          });
      }
    })();
    return new GetUserResponse(userData);
  }
}
