import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../shared/entities/client/client.entity';
import { ClientRepository } from '../shared/entities/client/client.repository';
import { Owner } from '../shared/entities/owner/owner.entity';
import { OwnerRepository } from '../shared/entities/owner/owner.repository';
import { JwtService } from '@nestjs/jwt';
import {
  LoginRequestBodyDto,
  LoginRequestParamDto,
} from './dto/request/login.dto';
import { LoginResponseDto } from './dto/response/login.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly ownerRepository: OwnerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    payload: LoginRequestBodyDto,
    param: LoginRequestParamDto,
  ): Promise<LoginResponseDto> {
    const res = await this.validateUser(payload, param.type);
    if (res) {
      const token = this.jwtService.sign({
        sub: payload.email,
        role: param.type,
      });
      return { access_token: token };
    }
    throw new UnauthorizedException();
  }

  async validateUser(
    payload: LoginRequestBodyDto,
    type: string,
  ): Promise<boolean> {
    const res: Owner | Client = await (async () => {
      switch (type) {
        case 'owner':
          return await this.ownerRepository.getOneOwner(payload.email);
        case 'client':
          return await this.clientRepository.getOneClient(payload.email);
      }
    })();
    if (!res) return false;
    return await bcrypt.compare(payload.password, res.password);
  }
}
