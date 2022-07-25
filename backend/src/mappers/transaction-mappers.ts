import { LineItem, Transaction } from "../generated/swagger/shop-it";
import {
  LineItem as LineItemDto,
  TransactionDto,
} from "../persistence/dto/TransactionDto";

export const mapTransactionDtoToTransaction = (
  transactionDto: TransactionDto
): Transaction => {
  return {
    id: transactionDto.id,
    lineItems: transactionDto.lineItems.map(mapLineItemDtoToLineItem),
    totalPrice: transactionDto.totalPrice,
    creationTime: transactionDto.creationTime,
  };
};

export const mapLineItemDtoToLineItem = (lineItem: LineItemDto): LineItem => {
  return {
    id: lineItem.id,
    count: lineItem.count,
  };
};
