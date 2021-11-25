import { EntityRepository, Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { OwnerSignupRequestDto } from '../../../auth/dto/request/owner-signup.dto';

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner> {
  async getOneOwner(email: string) {
    return await this.createQueryBuilder('client')
      .where('client.email = :email', { email })
      .getOne();
  }

  async insertOneOwner(payload: OwnerSignupRequestDto) {
    await this.createQueryBuilder()
      .insert()
      .into(Owner)
      .values({
        email: payload.email,
        password: payload.password,
        name: payload.name,
      })
      .execute();
  }
}
