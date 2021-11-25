import { Store } from 'src/shared/entities/store/store.entity';

export class GetPost {
  id: number;
  name: string;
  category: string;
  photoUrl: string;
  tel: string;
  address: String;
  rate: number;

  constructor(store, avg) {
    this.id = store.id;
    this.name = store.name;
    this.rate = Number(avg.avg);
    this.photoUrl = store.photoUrl;
    this.tel = store.tel;
    this.address = store.address;
    this.category = store.category;
  }
}

export class GetPostList {
  id: number;
  name: string;
  category: string;
  photoUrl: string;
  rate: number;
  address: string;
  tel: string;
  constructor(store, rate) {
    this.id = store.id;
    this.name = store.name;
    this.rate = Number(rate.avg);
    this.photoUrl = store.photo_url;
    this.tel = store.tel;
    this.address = store.address;
    this.category = store.category;
  }
}
