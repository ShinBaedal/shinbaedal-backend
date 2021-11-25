export class OrderListResponseDto {
  orders: {
    id: number;
    storeName: string;
    menuNames: string[];
    isDone: boolean;
  }[];
}
