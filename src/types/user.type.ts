export type UserServerResponse = {
  success: boolean;
  message?: string;
  data?: User;
};

export type User = {
  id: string;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
