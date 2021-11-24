import { HttpStatus } from '@nestjs/common';

export class Response {
  constructor(code: HttpStatus, message: string) {
    this.code = code.valueOf();
    this.message = message;
  }
  code: number;
  message: string;
}
