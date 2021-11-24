import { HttpStatus } from '@nestjs/common';
import { Response } from './Response';

export class ResponseData<T> extends Response {
  constructor(code: HttpStatus, message: string, data: T) {
    super(code, message);
    this.data = data;
  }
  data: T;
}
