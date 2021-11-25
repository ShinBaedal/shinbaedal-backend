import { EntityRepository, Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { OwnerSignupRequestDto } from '../../../auth/dto/request/owner-signup.dto';
import { UpdateUserDto } from 'src/user/request/patch.user';

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

  async updateOwner(email: string, payload: UpdateUserDto) {
    await this.createQueryBuilder()
      .update(Owner)
      .set({
        name: payload.name,
        password: payload.password,
      })
      .where('email = :email', { email: email })
      .execute();
  }
}
