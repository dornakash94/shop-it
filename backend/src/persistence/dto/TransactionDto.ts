export interface TransactionDto {
  id: number;
  lineItems: LineItem[];
  totalPrice: number;
  creationTime: number;
}

export interface LineItem {
  id: number;
  count: number;
  price: number;
}
