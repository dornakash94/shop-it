export interface ControllerResponse<Response> {
  body?: Response;
  code?: number;
  error?: unknown;
}

export type Method =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export interface Controller<Params, Query, Headers, Body, ResponseBody> {
  method: Method;
  path: string;
  handler: (
    params: Params,
    query: Query,
    headers: Headers,
    body: Body
  ) => Promise<ControllerResponse<ResponseBody>>;
}

export const throwError = (code: number, error: string) => {
  throw { code, error };
};

export const validateMandatoryParam = <T>(paramName: string, value?: T): T => {
  if (typeof value === "undefined" || value === null)
    throwError(400, `missing parameter ${paramName}`);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return value!;
};

export const asArr = <T>(something: T[] | undefined): T[] | undefined => {
  if (!something) return undefined;
  if (!Array.isArray(something)) return [something];
  return something;
};
