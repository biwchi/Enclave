export type User = {
  username: string;
  email: string;
  id: string;
  createdAt: Date;
  access_token?: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  username: string;
  email: string;
  password: string;
};
