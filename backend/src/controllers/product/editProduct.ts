import { Controller, ControllerResponse } from "../helper";
import index from "../..";
import { Products } from "../../generated/swagger/shop-it";
import { mapProductDtoToProduct } from "../../mappers/product-mappers";
import Api = Products.EditProduct;

const controller: Controller<
  Api.RequestParams,
  Api.RequestQuery,
  Api.RequestHeaders,
  Api.RequestBody,
  Api.ResponseBody
> = {
  method: "put",
  path: "/v1/products/:productId",
  handler: async (
    params: Api.RequestParams,
    query: Api.RequestQuery,
    headers: Api.RequestHeaders,
    body: Api.RequestBody
  ): Promise<ControllerResponse<Api.ResponseBody>> => {
    const productDto = await index.productDao.getProduct(params.productId);

    if (!productDto) {
      return Promise.resolve({
        code: 404,
        error: "product doesn't exists",
      });
    }

    const newProductDto = {
      ...productDto,
      title: body.product?.title || productDto.title,
      description: body.product?.description || productDto.description,
      price: body.product?.price || productDto.price,
      image: body.product?.image || productDto.image,
    };

    const success =
      newProductDto === productDto ||
      (await index.productDao.editProduct(newProductDto));

    if (success) {
      const product = mapProductDtoToProduct(newProductDto);

      const response: Api.ResponseBody = {
        product,
      };

      return Promise.resolve({
        body: response,
      });
    } else {
      return Promise.resolve({
        code: 404,
      });
    }
  },
};

export default controller;
