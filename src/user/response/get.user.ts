export class GetUserResponse {
  id: number;
  name: string;
  address: string;
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address == undefined ? '주소가 없어요.' : user.address;
  }
}
