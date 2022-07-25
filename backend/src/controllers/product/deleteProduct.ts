import { Controller, ControllerResponse } from "../helper";
import index from "../..";
import { Products } from "../../generated/swagger/shop-it";
import Api = Products.DeleteProduct;

const controller: Controller<
  Api.RequestParams,
  Api.RequestQuery,
  Api.RequestHeaders,
  Api.RequestBody,
  Api.ResponseBody
> = {
  method: "delete",
  path: "/v1/products/:productId",
  handler: async (
    params: Api.RequestParams,
    query: Api.RequestQuery,
    headers: Api.RequestHeaders,
    body: Api.RequestBody
  ): Promise<ControllerResponse<Api.ResponseBody>> => {
    const product = await index.productDao.getProduct(params.productId);

    if (!product) {
      return Promise.resolve({
        code: 404,
        error: "product doesn't exists",
      });
    }

    const success = await index.productDao.deleteProduct(params.productId);

    if (!success) {
      return Promise.resolve({
        code: 500,
        error: "couldn't delete product",
      });
    }
    return Promise.resolve({
      code: 204,
    });
  },
};

export default controller;
