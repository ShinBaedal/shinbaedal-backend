import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Client } from '../shared/entities/client/client.entity';
import { ClientRepository } from '../shared/entities/client/client.repository';
import * as crypto from 'crypto';
import { Owner } from '../shared/entities/owner/owner.entity';
import { OwnerRepository } from '../shared/entities/owner/owner.repository';
import { JwtService } from '@nestjs/jwt';
import {
  LoginRequestBodyDto,
  LoginRequestParamDto,
} from './dto/request/login.dto';
import { LoginResponseDto } from './dto/response/login.dto';
import * as bcrypt from 'bcrypt';
import { ClientSignupRequestDto } from './dto/request/client-signup.dto';
import { OwnerSignupRequestDto } from './dto/request/owner-signup.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmEmailRequestDto } from './dto/request/confirm-email.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly clientRepository: ClientRepository,
    private readonly mailerService: MailerService,
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

  async signup(
    payload: ClientSignupRequestDto | OwnerSignupRequestDto,
    type: string,
  ) {
    const res: Owner | Client = await (async () => {
      switch (type) {
        case 'owner':
          return await this.ownerRepository.getOneOwner(payload.email);
        case 'client':
          return await this.clientRepository.getOneClient(payload.email);
      }
    })();

    if (!res) {
      const cache = await this.cacheManager.get(payload.email);
      if (!cache || cache !== 'DONE') throw new UnauthorizedException();
      payload.password = await bcrypt.hash(payload.password, 12);
      switch (type) {
        case 'owner':
          await this.ownerRepository.insertOneOwner(
            payload as OwnerSignupRequestDto,
          );
          break;
        case 'client':
          await this.clientRepository.insertOneClient(
            payload as ClientSignupRequestDto,
          );
      }
      const token = this.jwtService.sign({
        sub: payload.email,
        role: type,
      });
      return { access_token: token };
    } else {
      throw new ConflictException();
    }
  }

  async sendMail(email: string) {
    const cache = await this.cacheManager.get<string | undefined>(email);
    const isExist =
      (await this.clientRepository.count({ where: { email } })) +
      (await this.clientRepository.count({ where: { email } }));
    if (cache === 'DONE' || isExist) throw new ConflictException();

    const number = crypto.randomInt(0, 999999).toString().padStart(6, '0');
    await this.mailerService.sendMail({
      to: email,
      from: process.env.OAUTH_USER,
      subject: '이메일 인증 요청 메일입니다.',
      html: '인증 코드: ' + `<b> ${number}</b>`,
    });
    await this.cacheManager.set(email, number);
  }

  async checkMail({ email, code }: ConfirmEmailRequestDto) {
    const cache = await this.cacheManager.get<string | undefined>(email);
    if (!cache || cache === 'DONE') throw new NotFoundException();
    if (cache === code) {
      await this.cacheManager.del(email);
      await this.cacheManager.set(email, 'DONE');
      return;
    } else throw new UnauthorizedException();
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
