import { z } from "zod";
import { idSchema } from "./schemas";

export type ParamsRequest = {
  id: z.infer<typeof idSchema>;
};

export type ApiResponse<T> = {
  success: boolean;

  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    total?: number;
    timestamp: string;
  };
};

export type OmdbParams = {
  page: string;
  type: string;
  year: string;
  searchTerm: string;
};
