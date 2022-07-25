import { asArr, Controller, ControllerResponse } from "../helper";
import index from "../..";
import { Products } from "../../generated/swagger/shop-it";
import Api = Products.ListProducts;
import { mapProductDtosToProducts } from "../../mappers/product-mappers";

const controller: Controller<
  Api.RequestParams,
  Api.RequestQuery,
  Api.RequestHeaders,
  Api.RequestBody,
  Api.ResponseBody
> = {
  method: "get",
  path: "/v1/products/list",
  handler: async (
    params: Api.RequestParams,
    query: Api.RequestQuery,
    headers: Api.RequestHeaders,
    body: Api.RequestBody
  ): Promise<ControllerResponse<Api.ResponseBody>> => {
    const productDtos = await index.productDao.listProducts(
      query["page-size"] || 30,
      query["page-number"] || 0
    );

    const fieldMaskSet: Set<string> = new Set(asArr(query["field-mask"]));

    const products = mapProductDtosToProducts(productDtos, fieldMaskSet);

    const response: Api.ResponseBody = {
      products,
    };
    return Promise.resolve({
      body: response,
      code: 200,
    });
  },
};

export default controller;
