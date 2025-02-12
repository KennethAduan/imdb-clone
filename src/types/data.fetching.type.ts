export type LatestResponse = {
  type?: string;
  page?: number;
  year?: string;
  plot?: string;
};

export type SearchResponseParams = {
  search: string;
  page?: string;
};
