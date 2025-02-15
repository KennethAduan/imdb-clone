// Type for client-side page params
export type ParamsType = Promise<{
  id: string;
}>;

// Type for client-side search params
export type SearchParamsType = Promise<{
  [key: string]: string | string[] | undefined;
}>;

// Type for client-side page components
export type PageProps = {
  params: ParamsType;
  searchParams: SearchParamsType;
};

// Type for API route params (non-Promise based)
export type ApiParamsType = {
  id: string;
};

// Type for API route context
export type ApiRouteContext = {
  params: ApiParamsType;
};

// Type for API request
export type ApiRequest = {
  params: ApiParamsType;
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Type for API handlers
export type ApiRouteProps = Request & {
  params: ApiParamsType;
};
