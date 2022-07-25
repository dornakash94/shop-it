import { Controller, ControllerResponse, throwError } from "../helper";
import { Shop } from "../../generated/swagger/shop-it";
import index from "../..";
import Api = Shop.Purchase;

import { LineItem } from "../../persistence/dto/TransactionDto";
import { mapTransactionDtoToTransaction } from "../../mappers/transaction-mappers";

const controller: Controller<
  Api.RequestParams,
  Api.RequestQuery,
  Api.RequestHeaders,
  Api.RequestBody,
  Api.ResponseBody
> = {
  method: "post",
  path: "/v1/shop/purchase",
  handler: async (
    params: Api.RequestParams,
    query: Api.RequestQuery,
    headers: Api.RequestHeaders,
    body: Api.RequestBody
  ): Promise<ControllerResponse<Api.ResponseBody>> => {
    if (!body.lineItems || body.lineItems.length < 1)
      return Promise.reject({
        error: "there are no items to purchase",
      });

    const lineItemsId = body.lineItems.map((item) => item.id || -1);
    const productMap = await index.productDao.getProductsByIds(lineItemsId);

    const lineItems = body.lineItems.map((lineItem) => {
      if (!productMap.has(lineItem.id || -1)) {
        throwError(400, `could'nt find product with id: ${lineItem.id}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const productDto = productMap.get(lineItem.id!)!;
      const { price } = productDto;

      return {
        id: lineItem.id || -1,
        count: lineItem.count || 0,
        price,
      } as LineItem;
    });

    const transactionDto = await index.transactionDao.makePurchase(lineItems);

    const response: Api.ResponseBody = {
      transaction: mapTransactionDtoToTransaction(transactionDto),
    };

    return Promise.resolve({
      body: response,
    });
  },
};

export default controller;
