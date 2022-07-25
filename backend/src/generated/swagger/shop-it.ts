/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateProductResponse {
  product?: Product;
}

export interface EditProductResponse {
  product?: Product;
}

export interface ListProductsResponse {
  products?: Product[];
}

export interface GetStatsResponse {
  topSales?: {
    lineItems?: { title?: string; count?: number }[];
    topItems?: { title?: string; count?: number }[];
    lastSales?: { date?: number; count?: number }[];
  };
}

export interface PurchaseResponse {
  transaction?: Transaction;
}

export interface Product {
  /** @format int64 */
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  image?: string;
}

export interface LineItem {
  /** @format int64 */
  id?: number;

  /** @format int32 */
  count?: number;
}

export interface Transaction {
  /** @format int64 */
  id?: number;
  lineItems?: LineItem[];

  /** @format int32 */
  totalPrice?: number;

  /** @format int64 */
  creationTime?: number;
}

export interface CreateProductPayload {
  product: Product;
}

export interface EditProductPayload {
  product: Product;
}

export interface ListProductsParams {
  /**
   * current page
   * @min 0
   */
  "page-number"?: number;

  /**
   * Page size
   * @min 1
   * @max 50
   */
  "page-size"?: number;
  "field-mask"?: string[];
}

export interface PurchasePayload {
  lineItems?: LineItem[];
}

export namespace Products {
  /**
   * No description
   * @tags product
   * @name CreateProduct
   * @summary create a new product
   * @request POST:/products
   */
  export namespace CreateProduct {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateProductPayload;
    export type RequestHeaders = {};
    export type ResponseBody = CreateProductResponse;
  }
  /**
   * No description
   * @tags product
   * @name EditProduct
   * @summary edit existing product
   * @request PUT:/products/{productId}
   */
  export namespace EditProduct {
    export type RequestParams = { productId: number };
    export type RequestQuery = {};
    export type RequestBody = EditProductPayload;
    export type RequestHeaders = {};
    export type ResponseBody = EditProductResponse;
  }
  /**
   * No description
   * @tags product
   * @name DeleteProduct
   * @summary delete existing product
   * @request DELETE:/products/{productId}
   */
  export namespace DeleteProduct {
    export type RequestParams = { productId: number };
    export type RequestQuery = {};
    export type RequestBody = {};
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags product
   * @name ListProducts
   * @summary list existing products
   * @request GET:/products/list
   */
  export namespace ListProducts {
    export type RequestParams = {};
    export type RequestQuery = { "page-number"?: number; "page-size"?: number; "field-mask"?: string[] };
    export type RequestBody = {};
    export type RequestHeaders = {};
    export type ResponseBody = ListProductsResponse;
  }
}

export namespace Shop {
  /**
   * No description
   * @tags shop
   * @name Purchase
   * @request POST:/shop/purchase
   */
  export namespace Purchase {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PurchasePayload;
    export type RequestHeaders = {};
    export type ResponseBody = PurchaseResponse;
  }
  /**
   * No description
   * @tags shop
   * @name GetStatsOfSales
   * @request GET:/shop/stats
   */
  export namespace GetStatsOfSales {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {};
    export type RequestHeaders = {};
    export type ResponseBody = GetStatsResponse;
  }
}
