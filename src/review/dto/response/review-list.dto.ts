export class ReviewListResponseDto {
  storeId: number;
  storeName: string;
  reviewCount: number;
  reviews: ReviewDto[];
}

export class ReviewDto {
  id: number;
  user: {
    id: number;
    name: string;
  };
  menuNames: string[];
  type: string;
  createdAt: Date;
  content: string;
  rate: number;
  reply: {
    id: number;
    content: string;
  };
}
