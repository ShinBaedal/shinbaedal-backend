export interface CreateReviewPayload {
  content: string;
  rate: number;
  type: string;
  clientId: number;
  storeId: number;
  orderId: number;
}
