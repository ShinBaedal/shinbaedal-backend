import { IsNotEmpty } from 'class-validator';

export class PostStoreDto {
  @IsNotEmpty({ message: '이름은 공백이 불가능 합니다.' })
  name: string;
  @IsNotEmpty({ message: '주소는 공백이 불가능 합니다.' })
  address: string;
  @IsNotEmpty({ message: '카테고리는 공백이 불가능 합니다.' })
  category: string;
  @IsNotEmpty({ message: '사진은 공백이 불가능 합니다.' })
  photoUrl: string;
  @IsNotEmpty({ message: '전화번호는 공백이 불가능 합니다.' })
  tel: string;
}
