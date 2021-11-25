import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientSignupRequestDto } from '../../../auth/dto/request/client-signup.dto';
import { UpdateUserDto } from 'src/user/request/patch.user';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getOneClient(email: string) {
    return await this.createQueryBuilder('client')
      .where('client.email = :email', { email })
      .getOne();
  }

  async insertOneClient(payload: ClientSignupRequestDto) {
    await this.createQueryBuilder()
      .insert()
      .into(Client)
      .values({
        email: payload.email,
        password: payload.password,
        name: payload.name,
        address: '',
      })
      .execute();
  }

  async updateClient(email: string, payload: UpdateUserDto) {
    await this.createQueryBuilder()
      .update(Client)
      .set({
        name: payload.name,
        password: payload.password,
      })
      .where('email = :email', { email: email })
      .execute();
  }

  async updateClientAddress(email: string, address: string) {
    await this.createQueryBuilder()
      .update(Client)
      .set({
        address: address,
      })
      .where('email = :email', { email: email })
      .execute();
  }
}
