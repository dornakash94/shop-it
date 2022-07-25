import { Controller, ControllerResponse } from "../helper";
import { Shop } from "../../generated/swagger/shop-it";
import index from "../..";
import Api = Shop.GetStatsOfSales;

const controller: Controller<
  Api.RequestParams,
  Api.RequestQuery,
  Api.RequestHeaders,
  Api.RequestBody,
  Api.ResponseBody
> = {
  method: "get",
  path: "/v1/shop/stats",
  handler: async (
    params: Api.RequestParams,
    query: Api.RequestQuery,
    headers: Api.RequestHeaders,
    body: Api.RequestBody
  ): Promise<ControllerResponse<Api.ResponseBody>> => {
    const topSales = index.transactionDao.getTopSales(5);
    const topItems = index.transactionDao.getTopItems(5);
    const pastDays = index.transactionDao.getPastDays(5);

    const productIds = new Set<number>();

    await topSales.then((arr) =>
      arr.forEach((item) => productIds.add(item.id))
    );

    await topItems.then((arr) =>
      arr.forEach((item) => productIds.add(item.id))
    );

    const productDtos = await index.productDao.getProductsByIds(
      Array.from(productIds)
    );

    const getProductName = (id: number): string => {
      return productDtos.get(id)?.title || `unknown-product-${id}`;
    };

    const response: Api.ResponseBody = {
      topSales: {
        lineItems: await topSales.then((lineItemArr) =>
          lineItemArr.map((lineItem) => {
            return {
              title: getProductName(lineItem.id),
              count: lineItem.count,
            };
          })
        ),
        topItems: await topItems.then((topItemsArr) =>
          topItemsArr.map((topItem) => {
            return { title: getProductName(topItem.id), count: topItem.count };
          })
        ),
        lastSales: await pastDays,
      },
    };

    return Promise.resolve({
      body: response,
    });
  },
};

export default controller;
