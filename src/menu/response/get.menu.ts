import { Menu } from 'src/shared/entities/menu/menu.entity';

export class GetMenuResponse {
  id: number;
  name: string;
  price: number;
  photoUrl: string;

  constructor(menu: Menu) {
    this.id = menu.id;
    this.name = menu.name;
    this.price = menu.price;
    this.photoUrl = menu.photoUrl;
  }
}
