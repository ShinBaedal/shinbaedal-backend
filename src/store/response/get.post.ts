import { Store } from 'src/shared/entities/store/store.entity';

export class GetPost {
  id: number;
  name: string;
  category: string;
  photoUrl: string;
  tell: string;
  rate: number;

  constructor(store, avg) {
    console.log(store);
    this.id = store.id;
    this.name = store.name;
    this.rate = Number(avg.avg);
    this.photoUrl = store.photoUrl;
    this.tell = store.tel;
    this.category = store.category;
  }
}
