import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getOneClient(email: string) {
    return await this.createQueryBuilder('client')
      .where('client.email = :email', { email })
      .getOne();
  }
}
