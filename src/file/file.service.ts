import { Injectable } from '@nestjs/common';
import { createImageURL } from './multerOption';

@Injectable()
export class FileService {
  public uploadFile(file): string {
    return createImageURL(file);
  }
}
