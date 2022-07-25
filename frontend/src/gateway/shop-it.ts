import {
  Api,
  GetStatsResponse,
  LineItem,
  Product,
  Transaction,
} from "../generated/swagger/shop-it";

//if (!process.env.REACT_APP_SHOP_IT_BACKEND)
//  throw "couldn't find 'REACT_APP_SHOP_IT_BACKEND' on the env";
//const baseUrl = process.env.REACT_APP_SHOP_IT_BACKEND;
const baseUrl = "http://localhost/_api/shop-it/v1";
const api = new Api({ baseUrl });

const allFields: string[] = ["id", "title", "description", "price", "image"];

const createProduct = (product: Product): Promise<Product> => {
  return api.products
    .createProduct({ product })
    .then((response) => response.data.product || {});
};

const editProduct = (product: Product): Promise<Product> => {
  return api.products
    .editProduct(product.id || -1, { product })
    .then((response) => response.data.product || {});
};

const deleteProduct = (productId: number): Promise<void> => {
  return api.products
    .deleteProduct(productId)
    .then((response) => response.data);
};

const listProducts = (
  pageNumber: number,
  pageSize: number
): Promise<Product[]> => {
  return api.products
    .listProducts({
      "field-mask": allFields,
      "page-number": pageNumber,
      "page-size": pageSize,
    })
    .then((response) => response.data.products || []);
};

const purchase = (lineItems: LineItem[]): Promise<Transaction> => {
  return api.shop
    .purchase({ lineItems })
    .then((response) => response.data.transaction || {});
};

const stats = (): Promise<GetStatsResponse> => {
  return api.shop.getStatsOfSales().then((response) => response.data || {});
};

export const apiWrapper = {
  product: {
    createProduct,
    editProduct,
    deleteProduct,
    listProducts,
  },
  shop: {
    purchase,
    stats,
  },
};
