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

  @IsNotEmpty({ message: '메뉴는 공백이 불가능 합니다.' })
  menus: MenuDto[];
}

export class MenuDto {
  @IsNotEmpty({ message: '사진은 공백이 불가능 합니다.' })
  photoUrl: string;
  @IsNotEmpty({ message: '이름은 공백이 불가능 합니다.' })
  name: string;
  @IsNotEmpty({ message: '가격은 공백이 불가능 합니다.' })
  price: number;
}
