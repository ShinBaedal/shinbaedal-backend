import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multerOption';
import { FileService } from './file.service';

import { ResponseData } from 'src/shared/response/ResponseData';

@Controller('uploads')
export class FileController {
  constructor(private readonly uploadService: FileService) {}

  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  // FilesInterceptor 첫번째 매개변수: formData의 key값,
  // 두번째 매개변수: 파일 최대 갯수
  // 세번째 매개변수: 파일 설정 (위에서 작성했던 multer 옵션들)
  @Post()
  public uploadFiles(@UploadedFiles() file): ResponseData<string> {
    console.log(file);
    const uploadedFile: string = this.uploadService.uploadFile(file);

    return new ResponseData(HttpStatus.CREATED, '성공', uploadedFile);
  }
}
