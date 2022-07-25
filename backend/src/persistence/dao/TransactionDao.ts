import { LineItem, TransactionDto } from "../dto/TransactionDto";

export interface TransactionDao {
  makePurchase: (lineItems: LineItem[]) => Promise<TransactionDto>;
  getTopSales: (
    numberOfTops: number
  ) => Promise<{ id: number; count: number }[]>;
  getTopItems: (
    numberOfTops: number
  ) => Promise<{ id: number; count: number }[]>;
  getPastDays: (
    numberOfDays: number
  ) => Promise<{ date: number; totalProfit: number }[]>;
}
