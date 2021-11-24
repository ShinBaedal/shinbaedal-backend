import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientSignupRequestDto } from '../../../auth/dto/request/client-signup.dto';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getOneClient(email: string) {
    return await this.createQueryBuilder('client')
      .where('client.email = :email', { email })
      .getOne();
  }

  async insertOneClient(payload: ClientSignupRequestDto) {
    await this.createQueryBuilder().insert().into(Client).values({
      email: payload.email,
      password: payload.password,
      name: payload.name,
      address: payload.address,
    });
  }
}
