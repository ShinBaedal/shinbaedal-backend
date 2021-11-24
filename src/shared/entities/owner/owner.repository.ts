import { EntityRepository, Repository } from 'typeorm';
import { Owner } from './owner.entity';

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner> {
  async getOneOwner(email: string) {
    return await this.createQueryBuilder('client')
      .where('client.email = :email', { email })
      .getOne();
  }
}
