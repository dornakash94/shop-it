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
    lastSales?: { date?: number; totalProfit?: number }[];
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Shop-It
 * @version 1.0.0
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 * @baseUrl /v1
 * @contact <dornakash94@gmail.com>
 *
 * Shop-It
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  products = {
    /**
     * No description
     *
     * @tags product
     * @name CreateProduct
     * @summary create a new product
     * @request POST:/products
     */
    createProduct: (CreateProductRequest: CreateProductPayload, params: RequestParams = {}) =>
      this.request<CreateProductResponse, void>({
        path: `/products`,
        method: "POST",
        body: CreateProductRequest,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags product
     * @name EditProduct
     * @summary edit existing product
     * @request PUT:/products/{productId}
     */
    editProduct: (productId: number, EditProductRequest: EditProductPayload, params: RequestParams = {}) =>
      this.request<EditProductResponse, void>({
        path: `/products/${productId}`,
        method: "PUT",
        body: EditProductRequest,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags product
     * @name DeleteProduct
     * @summary delete existing product
     * @request DELETE:/products/{productId}
     */
    deleteProduct: (productId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/products/${productId}`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags product
     * @name ListProducts
     * @summary list existing products
     * @request GET:/products/list
     */
    listProducts: (query: ListProductsParams, params: RequestParams = {}) =>
      this.request<ListProductsResponse, any>({
        path: `/products/list`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  shop = {
    /**
     * No description
     *
     * @tags shop
     * @name Purchase
     * @request POST:/shop/purchase
     */
    purchase: (PurchaseRequest: PurchasePayload, params: RequestParams = {}) =>
      this.request<PurchaseResponse, void>({
        path: `/shop/purchase`,
        method: "POST",
        body: PurchaseRequest,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shop
     * @name GetStatsOfSales
     * @request GET:/shop/stats
     */
    getStatsOfSales: (params: RequestParams = {}) =>
      this.request<GetStatsResponse, any>({
        path: `/shop/stats`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
