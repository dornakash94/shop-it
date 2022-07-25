import {
  Controller,
  ControllerResponse,
  validateMandatoryParam,
} from "../helper";
import index from "../..";
import { ProductDto } from "../../persistence/dto/ProductDto";
import { Products } from "../../generated/swagger/shop-it";
import Api = Products.CreateProduct;
import { mapProductDtoToProduct } from "../../mappers/product-mappers";

const controller: Controller<
  Api.RequestParams,
  Api.RequestQuery,
  Api.RequestHeaders,
  Api.RequestBody,
  Api.ResponseBody
> = {
  method: "post",
  path: "/v1/products",
  handler: async (
    params: Api.RequestParams,
    query: Api.RequestQuery,
    headers: Api.RequestHeaders,
    body: Api.RequestBody
  ): Promise<ControllerResponse<Api.ResponseBody>> => {
    const title = validateMandatoryParam("title", body.product.title);
    const description = validateMandatoryParam(
      "description",
      body.product.description
    );
    const price = validateMandatoryParam("price", body.product.price);
    const image = validateMandatoryParam("image", body.product.image);

    const productDto: ProductDto = {
      title,
      description,
      price,
      image,
      creationTime: new Date().getTime(),
    };

    const insertedProductDto = await index.productDao.insert(productDto);

    const product = mapProductDtoToProduct(insertedProductDto);

    const response: Api.ResponseBody = {
      product,
    };

    return Promise.resolve({
      body: response,
    });
  },
};

export default controller;
